const puppeteer = require("puppeteer");
const { id, pw } = require("./credentials");

let gTab;
let gBrowser;
(async function () {
    try{
        let browser = await puppeteer.launch({
          headless: false,
          defaultViewport: null,
          args: ["--start-maximized"],
          slowMo:50
        });
        gBrowser = browser;
        let pages = await browser.pages();
        let tab = pages[0];
        gTab = tab;
        await tab.goto("https://www.hackerrank.com/auth/login");
        await tab.type("#input-1", id);
        await tab.type("#input-2", pw);
        await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
        await waitAndClick('a[data-analytics="NavBarProfileDropDown"]');
        await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
        await Promise.all( [ tab.waitForNavigation({waitUntil:"networkidle0"})  ,tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]') ]  );
        await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li" , {visible:true});
        let allLis = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
        let manageChallengeLi = allLis[allLis.length-1];
        await Promise.all( [ tab.waitForNavigation({waitUntil:"networkidle0"}) , manageChallengeLi.click()]); 
        await addModerators();
    }
    catch(err){
        console.log(err);
    }
})();

async function waitAndClick(selector){
    await gTab.waitForSelector(selector , {visible:true});
    await gTab.click(selector);
}


async function addModerators(){
    try{
        // get all links of questions on current tab
        await gTab.waitForSelector(".backbone.block-center");
        let allATags = await gTab.$$(".backbone.block-center");
        // [ <a> </a> ,<a> </a> ,<a> </a> ,<a> </a> ,<a> </a>];
        await handleSinglePage(allATags);
        let allLis = await gTab.$$('.pagination li');
        let nextBtn = allLis[allLis.length-2];
        let isDisabled = await gTab.evaluate( function(elem){  return elem.classList.contains("disabled"); } , nextBtn);
        if(isDisabled){
            return;
        }
        await nextBtn.click();
        await addModerators();
    }
    catch(err){
        console.log(err);
    }
}

async function handleSinglePage(allATags){
    for(let i=0 ; i<allATags.length ; i++){
        let link = await gTab.evaluate(function(elem){ return elem.getAttribute("href")  }   , allATags[i] );
        let completeLink = `https://www.hackerrank.com${link}`;
        let newTab = await gBrowser.newPage();
        addModeratorToAQuestion(completeLink , newTab);
    }
}


async function addModeratorToAQuestion(link , tab){
    try{
        await tab.goto(link);
        await handleConfirmBtn(tab);
        await tab.waitForSelector('li[data-tab="moderators"]' , {visible:true});
        await Promise.all(  [ tab.waitForNavigation({waitUntil:"networkidle0"}) , tab.click('li[data-tab="moderators"]')  ] );
        await tab.waitForSelector('#moderator' , {visible:true});
        await tab.type("#moderator" , "pepcoding");
        await tab.keyboard.press("Enter");
        await tab.click('.save-challenge.btn.btn-green');
        await tab.close();
    }
    catch(err){
        return err;
    }
}

async function handleConfirmBtn(tab){
    try{
        await tab.waitForSelector("#confirm-modal" , {visible:true , timeout:5000});
        await tab.click("#confirmBtn");
    }
    catch(err){
        console.log("Confirm modal not found !!");
        return;
    }
}