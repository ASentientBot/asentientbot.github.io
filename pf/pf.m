// clang -fmodules pf.m -o /tmp/pf && sudo /tmp/pf

@import Foundation;
#define trace NSLog

#define OSObject void
#define TARGET_OS_OSX_X86 0
#import "AppleSmartBatteryCommands.h"

#define kSBExclusiveSMBusAccessType 1
#define kSBSMBusReadWriteWord 3

io_connect_t connection;

void call(EXSMBUSInputStruct input,EXSMBUSOutputStruct* output)
{
	size_t outCount=sizeof(*output);
	kern_return_t result=IOConnectCallStructMethod(connection,kSBSMBusReadWriteWord,&input,sizeof(input),output,&outCount);
	trace(@"call %d",result);
	
	if(result!=KERN_SUCCESS)
	{
		trace(@"bruh");
		exit(1);
	}
}

void writeWord(unsigned char address,unsigned short value)
{
	EXSMBUSInputStruct input={};
	input.type=kEXWriteWord;
	input.address=address;
	input.inByteCount=2;
	*(short*)input.inBuf=value;
	EXSMBUSOutputStruct output={};
	call(input,&output);
}

unsigned short readWord(unsigned char address)
{
	EXSMBUSInputStruct input={};
	input.type=kEXReadWord;
	input.address=address;
	EXSMBUSOutputStruct output={};
	call(input,&output);
	
	trace(@"readWord %d",output.outByteCount);
	
	return *(short*)output.outBuf;
}

int main()
{
	io_service_t manager=IOServiceGetMatchingService(kIOMainPortDefault,IOServiceMatching("AppleSmartBatteryManager"));
	trace(@"manager %d",manager);
	trace(@"open %d",IOServiceOpen(manager,mach_task_self(),kSBExclusiveSMBusAccessType,&connection));
	
	trace(@"cycle count %d",readWord(kBCycleCountCmd));
	
	writeWord(kBManufacturerAccessCmd,0x0006);
	trace(@"manufacturer status %x",readWord(kBManufacturerAccessCmd));
	
	// unseal
	writeWord(kBManufacturerAccessCmd,0x0414);
	writeWord(kBManufacturerAccessCmd,0x3672);
	
	// clear PF
	writeWord(kBManufacturerAccessCmd,0x2673);
	writeWord(kBManufacturerAccessCmd,0x1712);
	
	trace(@"pf status %x",readWord(0x53));
	
	IOServiceClose(connection);
}
