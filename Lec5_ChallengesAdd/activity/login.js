const puppeteer = require("puppeteer");
const { id, pw } = require("./credentials");
const challenges = require("./challenges");

let gTab;

(async function () {
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  let pages = await browser.pages();
  let tab = pages[0];
  gTab = tab;
  await tab.goto("https://www.hackerrank.com/auth/login");
  await tab.type("#input-1", id);
  await tab.type("#input-2", pw);
  await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
  await tab.waitForSelector('a[data-analytics="NavBarProfileDropDown"]' , {visible:true});
  await tab.click('a[data-analytics="NavBarProfileDropDown"]');
  await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
  await Promise.all( [ tab.waitForNavigation({waitUntil:"networkidle0"})  ,tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]') ]  );
  await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li" , {visible:true});
  let allLis = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
  let manageChallengeLi = allLis[allLis.length-1];
  await Promise.all( [ tab.waitForNavigation({waitUntil:"networkidle0"}) , manageChallengeLi.click()]); 
  let createChallUrl = await tab.url();
  await tab.waitForSelector(".btn.btn-green.backbone.pull-right");
  await tab.click(".btn.btn-green.backbone.pull-right");
  await addChallenge(challenges[0]);
  for(let i=1 ; i<challenges.length ; i++){
      await tab.goto(createChallUrl);
      await tab.waitForSelector(".btn.btn-green.backbone.pull-right");
      await tab.click(".btn.btn-green.backbone.pull-right");
      await addChallenge(challenges[i]);
  }

})();

async function addChallenge(challenge){
     let challengeName = challenge["Challenge Name"];
     let description = challenge["Description"];
     let probStatement = challenge["Problem Statement"];
     let inputFormat = challenge["Input Format"];
     let constraints = challenge["Constraints"];
     let outputFormat = challenge["Output Format"];
     let tags = challenge["Tags"];
     await gTab.waitForSelector("#name" , {visible:true});
     await gTab.type("#name" , challengeName);
     await gTab.type("#preview" , description);
     await gTab.waitForSelector("#problem_statement-container .CodeMirror textarea" , {visible:true});
     await gTab.type("#problem_statement-container .CodeMirror textarea" , probStatement);
     await gTab.type("#input_format-container .CodeMirror textarea" , inputFormat);
     await gTab.type("#constraints-container .CodeMirror textarea" , constraints);
     await gTab.type("#output_format-container .CodeMirror textarea" , outputFormat);
     await gTab.type("#tags_tag" , tags)
     await gTab.keyboard.press("Enter");
     await gTab.click(".save-challenge.btn.btn-green");
}

