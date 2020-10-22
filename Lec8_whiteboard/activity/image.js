let imgUpload = document.querySelector("#imgUpload");


imgUpload.addEventListener("change" , function(){
  
      let src = URL.createObjectURL(imgUpload.files[0]);
      console.log(src);
      let img = document.createElement("img"); // <img src=""     />  
      img.src = src;  // <img src = "asjdbhjadsbhjd" />
      img.setAttribute("class" , "img-upload");
      let content = createSticky();
      content.appendChild(img);
})