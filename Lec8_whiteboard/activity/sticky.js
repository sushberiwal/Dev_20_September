let addSticky = document.querySelector("#stickyAdd");

addSticky.addEventListener("click" , function(){
    let stickyPad = document.createElement("div");
    // <div> </div>
    let stickyNav = document.createElement("div");
    let minimize = document.createElement("div");
    let closeBtn = document.createElement("div");
    let content = document.createElement("div");
    let textarea = document.createElement("textarea");
    
    stickyPad.classList.add("stickyPad");
    stickyNav.classList.add("stickyNav");
    minimize.classList.add("minimize");
    closeBtn.classList.add("close");
    content.classList.add("content");
    textarea.setAttribute("id" , "stickyText");
    textarea.setAttribute("rows" , "10");
    textarea.setAttribute("cols" , "30");
    
    stickyNav.appendChild(minimize);
    stickyNav.appendChild(closeBtn);
    stickyPad.appendChild(stickyNav);
    content.appendChild(textarea);
    stickyPad.appendChild(content);

    document.body.appendChild(stickyPad);

    minimize.addEventListener("click" , function(){
        content.style.display = content.style.display == "none" ? "block" : "none";
    })

    closeBtn.addEventListener("click" , function(){
        stickyPad.remove();
    })
})

