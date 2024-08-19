var randomizeTitleDone=false

function randomizeTitle()
{
	if(randomizeTitleDone)
	{
		return
	}
	randomizeTitleDone=true
	
	var sets=[[["amy","marimo","junebeetle","green grape"]],[["a"],["sentient","self-aware","conscious"],["bot","automaton","machine","droid"]],[["green","emerald","lime","moss"],["ball","orb","sphere","globe"]]]
	
	var phrases=[]
	for(var setIndex in sets)
	{
		var perms=sets[setIndex][0]
		for(var wordsIndex=1;wordsIndex<sets[setIndex].length;wordsIndex++)
		{
			var temp=[]
			for(var permIndex in perms)
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
}

document.addEventListener("DOMContentLoaded",randomizeTitle)
