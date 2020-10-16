// npm install puppeteer
const puppeteer = require("puppeteer");
//object destructuring
const { id, pw } = require("./credentials");

let tab;
let gCodes;
let gCode;
// all functions of puppeteer gives a pending promise

// creates a browser instance
const browserPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  // slowMo:50,
  args: ["--start-maximized"],
});

browserPromise
  .then(function (browser) {
    //return all tabs opened in the browser
    let pagesPromise = browser.pages();
    return pagesPromise;
  })
  .then(function (pages) {
    // an array of all pages
    let page = pages[0];
    tab = page;
    let pp = tab.goto("https://www.hackerrank.com/auth/login");
    return pp;
  })
  .then(function () {
    let idEnteredPromise = tab.type("#input-1", id);
    return idEnteredPromise;
  })
  .then(function () {
    let pwEnteredPromise = tab.type("#input-2", pw);
    return pwEnteredPromise;
  })
  .then(function () {
    let loginPromise = tab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button"
    );
    return loginPromise;
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick("#base-card-1-link");
    return waitAndClickPromise;
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick("a[data-attr1='warmup']");
    return waitAndClickPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector(
      ".js-track-click.challenge-list-item",
      { visible: true }
    );
    return waitPromise;
  })
  .then(function () {
    let allATagsPromise = tab.$$(".js-track-click.challenge-list-item");
    return allATagsPromise;
  })
  .then(function (allATags) {
    // [ <a> </a> , <a> </a> , <a> </a> , <a> </a> ]
    let allLinksPromise = [];
    for (let i = 0; i < allATags.length; i++) {
      let linkPromise = tab.evaluate(function (elem) {
        return elem.getAttribute("href");
      }, allATags[i]);
      allLinksPromise.push(linkPromise);
    }
    // [ PP , PP , PP , PP ]
    let allLinksFullfilledP = Promise.all(allLinksPromise);
    return allLinksFullfilledP;
  })
  .then(function (allLinks) {
    // map function array ke sbhhi elements pe jaayega
    let completeLinks = allLinks.map(function (link) {
      return `https://www.hackerrank.com${link}`;
    });
    // let cLinks = [];
    // for(let i=0 ; i<allLinks.length ; i++){
    //     cLinks.push(  `https://www.hackerrank.com${allLinks[i]}` );
    // }
    // console.log(completeLinks);
    let oneQuesSolvedP = solveChallenge(completeLinks[0]);
    for (let i = 1; i < completeLinks.length; i++) {
      oneQuesSolvedP = oneQuesSolvedP.then(function () {
        let nextQuesSolveP = solveChallenge(completeLinks[i]);
        return nextQuesSolveP;
      });
    }
    return oneQuesSolvedP;
  })
  .then(function () {
    console.log("All question solved !!");
  })
  .catch(function (err) {
    console.log(err);
  });

function waitAndClick(selector) {
  return new Promise(function (resolve, reject) {
    let waitPromise = tab.waitForSelector(selector, { visible: true , timeout: 10000});
    waitPromise
      .then(function () {
        let ipKitPromise = tab.click(selector);
        return ipKitPromise;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

function getCode() {
  return new Promise(function (resolve, reject) {
    let waitPromise = tab.waitForSelector(".hackdown-content h3");
    waitPromise
      .then(function () {
        let allCodesNamesP = tab.$$(".hackdown-content h3"); // [pp , pp , pp]
        let allCodesP = tab.$$(".hackdown-content .highlight"); // [pp ,pp ,pp];
        let pendingPromise = Promise.all([allCodesNamesP, allCodesP]);
        return pendingPromise;
      })
      .then(function (codeNamesAndCode) {
        let allCodeNames = codeNamesAndCode[0]; // [<h3>C++<h3>  , <h3>JAva </h3> ,<h3>Python</h3> ];
        gCodes = codeNamesAndCode[1];
        // [ C++ , JAVA , Pyhton]
        let allNamesP = []; // => [pp,pp,pp]
        for (let i = 0; i < allCodeNames.length; i++) {
          let namePromise = tab.evaluate(function (elem) {
            return elem.textContent;
          }, allCodeNames[i]);
          allNamesP.push(namePromise);
        }
        let pp = Promise.all(allNamesP);
        return pp;
      })
      .then(function (codeNames) {
        // console.log(codeNames)
        let idx;
        for (let i = 0; i < codeNames.length; i++) {
          if (codeNames[i] == "C++") {
            idx = i;
            break;
          }
        }
        let codeDiv = gCodes[idx];
        let codePromise = tab.evaluate(function (elem) {
          return elem.textContent;
        }, codeDiv);
        return codePromise;
      })
      .then(function (code) {
        gCode = code;
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

function pasteCode() {
  return new Promise(function (resolve, reject) {
    let waitAndClickPromise = waitAndClick(".custom-input-checkbox");
    waitAndClickPromise
      .then(function () {
        let codeTypedPromise = tab.type(".custominput", gCode);
        return codeTypedPromise;
      })
      .then(function () {
        let controlHold = tab.keyboard.down("Control");
        return controlHold;
      })
      .then(function () {
        let akeyPress = tab.keyboard.press("a");
        return akeyPress;
      })
      .then(function () {
        let xkeyPress = tab.keyboard.press("x");
        return xkeyPress;
      })
      .then(function () {
        let clickedP = tab.click(".monaco-editor.no-user-select.vs");
        return clickedP;
      })
      .then(function () {
        let akeyPress = tab.keyboard.press("a");
        return akeyPress;
      })
      .then(function () {
        let vkeyPress = tab.keyboard.press("v");
        return vkeyPress;
      })
      .then(function () {
        let ctrlKeyUp = tab.keyboard.up("Control");
        return ctrlKeyUp;
      })
      .then(function () {
        let submitP = tab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
        return submitP;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

function handleLockBtn(){
  return new Promise(function(resolve,reject){
    let waitForLockBtn = waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary");
    waitForLockBtn.then(function(){
      console.log("Lock btn found !!");
      resolve();
    })
    waitForLockBtn.catch(function(){
      console.log("Lock btn not found !!");
      resolve();
    })
  })
}

function solveChallenge(qLink) {
  return new Promise(function (resolve, reject) {
    //goto ques link
    let quesOpenedP = tab.goto(qLink);
    quesOpenedP
      .then(function () {
        let editorailClickedPromise = waitAndClick("#Editorial");
        return editorailClickedPromise;
      })
      .then(function(){
        let handleBtnPromise = handleLockBtn();
        return handleBtnPromise;
      })
      .then(function () {
        let getCodePromise = getCode();
        return getCodePromise;
      })
      .then(function () {
        let problemCLickedP = tab.click("#Problem");
        return problemCLickedP;
      })
      .then(function () {
        let codePastedP = pasteCode();
        return codePastedP;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
    //goto editorial tab
    //copy code
    // go to question again
    // paste code in codebox
    // click on submit
  });
}
