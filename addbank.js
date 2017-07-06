/*
 * Test Script ID: xxxxxx
 * Test case ID: xxxxxx
 * Author: Kevin Huang
 * Date: July 5th, 2017
 *
 * Prerequisite: 
 * 1. npm install selenium-webdriver
 * 2. have Selenium driver for Chrome brower at PATH
 * 3. Logout Xero.com before testing
 *
 * Test story and testcase:
 * https://github.com/hkaiopen/webtest
 *
 * Reference:
 * http://seleniumhq.github.io/selenium/docs/api/javascript/index.html
 *
 * The script can run and work successfully adding a new bank account.
 */

//Load dependencies
const {Builder, By, promise, until} = require('selenium-webdriver');

var xeroUserName = "hkaiopen@foxmail.com";
var xeroPassword = "4Interview";
//If the account has already been added to the system, please change Account Name and Number or set newAccount as false
var anzAccountName = "3nd Auto input";  //Change another if it has been in the system
var anzAccountType = "Everyday (day-to-day)"; 
var anzAccountNum ="01-1842-0123456-78"; //Change another if it has been in the system
var newAccount = true;


// Use Promise objects to control the flow of asynchronous operations.
let result = promise.consume(function* doAddBankAccount() {
  let driver = new Builder().forBrowser('chrome').build();
   
  driver.manage().window().maximize();

  //---Xero website---
  yield driver.get('https://go.xero.com/');
  
  //---Login Page---
  yield driver.wait(until.titleContains('Login'), 3000);
  yield driver.findElement(By.name('userName')).sendKeys(xeroUserName);
  yield driver.findElement(By.name('password')).sendKeys(xeroPassword);
  yield driver.findElement(By.id('submitButton')).click();

  //---Dashboard Page---Initiate request of adding bank account
  yield driver.wait(until.titleContains('Xero | Dashboard'), 3000);  
  yield driver.findElement(By.id('Accounts')).click();
  yield driver.findElement(By.linkText('Bank Accounts')).click();

  //If you want to have a new Account, then initiating adding request, otherwise just confirm the existing account
  if(newAccount){

  yield driver.findElement(By.partialLinkText('Add Bank Account')).click();

  //---Find your bank Page---Find ANZ (NZ) in the list element
  yield driver.wait(until.titleContains('Xero | Find your bank'), 3000); 
  yield driver.findElement(By.xpath("//*[text()[contains(.,'ANZ (NZ)')]]")).click(); 

  //---Enter account details Page---
  yield driver.wait(until.titleContains('account details'), 3000); 

  //!!Make the none display element visible
  yield driver.executeScript("javascript:document.getElementById('accountname-1037-inputEl').setAttribute('style','visibility:visible;');");
  yield driver.findElement(By.id("accountname-1037-inputEl")).sendKeys(anzAccountName);

  yield driver.executeScript("javascript:document.getElementById('accounttype-1039-inputEl').setAttribute('style','visibility:visible;');");
  //!!Remove readonly Attribute so as to input by test script--
  yield driver.executeScript("javascript:document.getElementById('accounttype-1039-inputEl').removeAttribute('readonly');");
  //yield driver.findElement(By.id('accounttype-1039-inputEl')).click();
  yield driver.findElement(By.id('accounttype-1039-inputEl')).sendKeys(anzAccountType);

  //Continue input and continue
  yield driver.findElement(By.id("accountnumber-1068-inputEl")).sendKeys(anzAccountNum);
  yield driver.findElement(By.id('common-button-submit-1015-btnInnerEl')).click();
  
  }//end of if(newAccount)

  //---Bank Accounts Page---Confirm the bank account has been added and is displayed in the page.
  yield driver.wait(until.titleContains('Xero | Bank Accounts'), 3000); 
  yield driver.findElement(By.xpath("//*[text()[contains(.,'" + anzAccountNum + "')]]")).click(); 

  //---Transactions Page---Detailed transaction page of this account.
  yield driver.wait(until.titleContains('Xero | Transactions'), 3000); 

  /*
   *To be developed to connect to internal database to check whether bank account detail above
   *has been recorded so as to be available for any products.
   */

  /*
   *Holding at the last recovery steps so as to verify the account adding test result manually.
   */
  //Delete the bank account (if possible) to recover the test environment -- not developed this time.
  //Logout Xero by clicking Logout button-- not developed this time.
  //driver.quit();
});

//Should one of the test executions is failed, detailed failure reason will be shown by below error handling.
result.then(_ => console.log('SUCCESS! Testcase is finished.'),
            e => console.error('FAILURE: ' + e)); 
//To be developed to report to Test Management platform (e.g. JIRA) on the test result after test script is finalized.