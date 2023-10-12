function randomizeTitle()
{
	var sets=[[["amy lastname","marimo","junebeetle","#00af00","rgb(0,175,0)","green grape"]],[["a"],["sentient","self-aware","conscious","thinking"],["bot","automaton","machine","droid"]],[["green","emerald","lime","moss"],["ball","orb","sphere","globe","circle","disc"]]]
	
	var phrases=[]
	for(var setIndex in sets)
	{
		var perms=sets[setIndex][0]
		for(var wordsIndex=1;wordsIndex<sets[setIndex].length;wordsIndex++)
		{
			var temp=[]
			for(var permIndex in sets[setIndex][wordsIndex])
			{
				for(var wordIndex in sets[setIndex][wordsIndex])
				{
					temp.push(perms[permIndex]+" "+sets[setIndex][wordsIndex][wordIndex])
				}
			}
			perms=temp
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