const btn=document.querySelector('.pickerbtn');
const colorgrid=document.querySelector('.colorgrid');
const colorvalue=document.querySelector('.colorvalue');
const text=document.querySelector('.text')


btn.addEventListener('click',async () =>{
	let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
	

	chrome.scripting.executeScript({
		target:{tabId: tab.id},
		function:pickcolor,
	}, async(injectionresults)=>{
		const [data]= injectionresults;
		if(data.result){
			const color=data.result.sRGBHex;
			text.innerText="Your selected color is :";
			colorgrid.style.backgroundColor= color;
			colorvalue.innerText=color;
			try{
				await navigator.clipboard.writeText(color);
			}catch(err){
				console.error(err);
			}
		}
	});
});

async function pickcolor(){
	try{
		//Pickier
		const eyeDropper = new EyeDropper();
		return await eyeDropper.open();
	}catch(err){
		console.error(err);
	}
}