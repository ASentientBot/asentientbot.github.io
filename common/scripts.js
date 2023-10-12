function randomizeTitle()
{
	var sets=[[["amy lastname","marimo","junebeetle","#00af00","rgb(0,175,0)","green grape","🟢"]],[["a"],["sentient","self-aware","conscious","thinking"],["bot","automaton","machine","droid"]],[["green","emerald","lime","moss"],["ball","orb","sphere","globe","circle","disc"]]]
	
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
	
	if(Math.random()>0.999)
	{
		document.getElementById("header").style.backgroundColor="#fabefd"
	}
}