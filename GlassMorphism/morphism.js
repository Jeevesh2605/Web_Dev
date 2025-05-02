const bod = document.body;
const cards = document.querySelectorAll(".cards");

let isDragging = false;
let offsetX, offsetY;
let current = null;




cards.forEach((element) => {
    const randomL = Math.random() * (bod.clientWidth - element.offsetWidth);
    const randomT = Math.random() * (bod.clientHeight - element.offsetHeight); 

    element.style.position = "absolute";
    element.style.left = randomL + "px";
    element.style.top = randomT + "px";
});

cards.forEach((element)=>{
    element.addEventListener("mousedown",(e)=>{
        isDragging=true;
        offsetX=e.clientX-element.offsetLeft;
        offsetY=e.clientY-element.offsetTop;
        current=element;
    })
})

document.addEventListener("mousemove",(e)=>{
    if(isDragging){
        let newleft = e.clientX-offsetX;
        let newTop = e.clientY-offsetY;
newleft=Math.max(0,Math.min(bod.clientWidth-current.offsetWidth,newleft)) 
newTop=Math.max(0,Math.min(bod.clientHeight-current.offsetHeight,newTop))
        current.style.left=newleft+"px";
        current.style.top=newTop+"px";
    }
})

document.addEventListener("mouseup",(e)=>{
    isDragging=false;
    current=null;
})

cards.forEach((element) => {
    element.addEventListener("dblclick", () => {
        const img = element.querySelector("img");
        let place = img ? img.src.split("/").pop().split(".")[0] : "India";
        place = place.replace(/[-_]/g, ' ');
        const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(place)}`;
        window.open(wikiUrl, "_blank");
    });
});



element.classList.add("clicked");
setTimeout(() => element.classList.remove("clicked"), 300);


