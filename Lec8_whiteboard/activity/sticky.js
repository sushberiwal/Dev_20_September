let addSticky = document.querySelector("#stickyAdd");

addSticky.addEventListener("click" , function(){
    
    let textarea = document.createElement("textarea");
    textarea.setAttribute("id" , "stickyText");
    textarea.setAttribute("rows" , "10");
    textarea.setAttribute("cols" , "30");
    let content = createSticky();
    content.appendChild(textarea);
})

