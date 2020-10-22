let imgUpload = document.querySelector("#imgUpload");
let download = document.querySelector("#download-img");

imgUpload.addEventListener("change" , function(){
      let src = URL.createObjectURL(imgUpload.files[0]);
      console.log(src);
      let img = document.createElement("img"); // <img src=""     />  
      img.src = src;  // <img src = "asjdbhjadsbhjd" />
      img.setAttribute("class" , "img-upload");
      let content = createSticky();
      content.appendChild(img);
})


download.addEventListener("click" , function(){
  let aTag = document.createElement('a');  // <a href="" > </a>
  aTag.download = 'filename.png';         // <a href="" download = "filename.png" > </a>
  aTag.href = canvas.toDataURL("image/png"); // <a href="image ki link" download = "filename.png" > </a>
  aTag.click();
})