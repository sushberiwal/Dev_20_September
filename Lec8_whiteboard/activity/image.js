let imgUpload = document.querySelector("#imgUpload");
let imageLabel = document.querySelector("#image-label");

imageLabel.addEventListener("click" , function(){
    // console.log(imgUpload.files);
      let src = URL.createObjectURL(imgUpload.files[0]);
      console.log(src);
      let img = document.createElement("img"); // <img src=""     />  
      img.src = src;  // <img src = "asjdbhjadsbhjd" />
      img.setAttribute("class" , "img-upload");
      let content = createSticky();
      content.appendChild(img);
})