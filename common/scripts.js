function randomizeTitle()
{
	var sets=[[["amy"]],[["marimo"]],[["junebeetle"]],[["a"],["sentient","self-aware","conscious"],["bot","automaton","machine"]],[["green","emerald","lime"],["ball","orb","sphere","globe"]]]
	
	var phrases=[]
	for(var setIndex in sets)
	{
		var set=sets[setIndex]
		var perms=[]
		for(var wordsIndex in set)
		{
			var words=set[wordsIndex]
			if(perms.length==0)
			{
				perms=words
			}
			else
			{
				var temp=[]
				for(var permIndex in perms)
				{
					for(var wordIndex in words)
					{
						temp.push(perms[permIndex]+" "+words[wordIndex])
					}
				}
				perms=temp
			}
		}
		phrases.push.apply(phrases,perms)
	}
	
	var phrase=phrases[Math.floor(Math.random()*phrases.length)]
	
	document.title=phrase
	document.getElementById("title").innerHTML=phrase
}