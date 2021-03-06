
function createSticky(){
    let stickyPad = document.createElement("div");
    // <div> </div>
    let stickyNav = document.createElement("div");
    let minimize = document.createElement("div");
    let closeBtn = document.createElement("div");
    let content = document.createElement("div");

    stickyPad.classList.add("stickyPad");
    stickyNav.classList.add("stickyNav");
    minimize.classList.add("minimize");
    closeBtn.classList.add("close");
    content.classList.add("content");

    
    stickyNav.appendChild(minimize);
    stickyNav.appendChild(closeBtn);
    stickyPad.appendChild(stickyNav);
    stickyPad.appendChild(content);

    document.body.appendChild(stickyPad);

    
    minimize.addEventListener("click" , function(){
        content.style.display = content.style.display == "none" ? "block" : "none";
    })

    closeBtn.addEventListener("click" , function(){
        stickyPad.remove();
    })

    let isStickyHold = false;
    let initialX;
    let initialY;
    stickyNav.addEventListener("mousedown" , function(e){
        isStickyHold = true;
        initialX = e.clientX;
        initialY = e.clientY;
    })

    window.addEventListener("mousemove" , function(e){
        if(isStickyHold){
            let finalX = e.clientX;
            let finalY = e.clientY;
            let dx = finalX - initialX;
            let dy = finalY - initialY;

            stickyPad.style.top =  stickyPad.getBoundingClientRect().top + dy+"px";
            stickyPad.style.left = stickyPad.getBoundingClientRect().left + dx + "px";

            initialX = finalX;
            initialY = finalY;
        }
    })

    stickyNav.addEventListener("mouseup" , function(e){
        isStickyHold = false;
    })
    return content;
}
