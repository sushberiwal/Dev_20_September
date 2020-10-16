// npm init -y => package.json file created
// npm install cheerio

// FS => File System => communicate with file system

let fs = require("fs");
let cheerio = require("cheerio");

let f1KaData = fs.readFileSync("./f1.txt");
// console.log("F1 Ka Data = " + f1KaData);



let htmlKaData = fs.readFileSync("./index.html" , "utf-8") ;
// console.log(htmlKaData);
let ch = cheerio.load(htmlKaData);

// on the basis of class => dot
let pKaData = ch(".pa.outer-p").text();
// console.log(pKaData);
let pKaText = ch("ul p").text();
console.log(pKaText);


// on the basis of id => unique => #
// classes => duplicate
let h1KaData = ch("#unique").text();
console.log(h1KaData);

