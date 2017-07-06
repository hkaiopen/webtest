Add bank account with Selenium Webdriver
===========================
In summary the script works, **able to add bank account as Xero user on Xero website successfully**.

The script is developed by Node.js. I just use Selenium Webdriver module to **keep it as simple as possible**, and didn't use any other modules (e.g. Mocha).

The script first uses Promise to control the asynchronus step-by-step clicking and datafilling executions for web test. Should one of the test executions is failed, it will then be handled by the last error handling.

In regarding to the test executions, the script uses **Selenium Webdriver APIs to click and sendKeys by identifying the right elements. The key point solved is that when encountering the element whose Attribute value is display: none or readonly, I alter the HTML Attribute by executing javascript, so that Selenium Webdriver could see and input the elements.**

I also refine the given user story as belows. 

Thank you for your time and consideration!

****
### Author: Kevin Huang
****

### User Story
As a Xero User,
In order to manage my business successfully,
I want to be able to add an ¡°ANZ (NZ)¡± bank account inside any Xero Organisation.

**Prerequisite**
 1. Have node.js installed from www.nodejs.org
 2. Install Selenium Webdriver module successfully by *npm install selenium-webdriver*
 3. Have the control driver available for Chrome brower at PATH
 4. **Logout** Xero.com
 5. **Run the script by *node addbank.js* command on Node.js command prompt.**

**Test steps** 
 1. Visit Xero user login website.
 2. Input username and password, click submit button.     
Verify if *Dashboard* page is accessed in several seconds.    
If not, testcase is failed (for incorrect username and password) and error could be handled by last error handling script, which just fires console log this time, but should report the test result to test management platform in actual testing.
 3. Initiate bank account adding request by clicking the menu items.    
 Verify if *Find your bank* page is accessed. If not, testcase is failed.
 4. Select ANZ (NZ) from the list.  
 Verify *Enter your ANZ (NZ) account details* Page is accessed.
 5. Input the ANZ account username, type and number, then submit.   
 Verify *Bank Accounts Page* is accessed.
 6. Verify the above account number is shown, and clicking the account number it will move on to Transaction page of this account.   
 Testcase reaches SUCCESS by adding the account to the system.
 7. Recover and clear the test environment by deleting the bank account, so that the test script could be run again successfully next time.    
 (not developed this time. Could change account username and number as an alternative.)
 8. Logout Xero and quit the Webdriver. (not developed this time for manually checking the test result)
 
**Test results (Acceptance Criteria)** 
1. Should see the account successfully added in Bank Accounts Page.
2. Should be able to retrieve the account details from internal database so as to be used by any products and organisation. (not developed in script this time)

**Technical Consideration**
* When encountering the element whose Attribute value is *display: none* or *readonly*, I alter the HTML Attribute by executing javascript, so that Selenium Webdriver could see and input the elements.

**QA Consideration**
* Beside PC, should also verify user could add bank account from various terminal, e.g Pad or mobile, and from various web browers.
Could do this by running the script with various browsers and configuring user agent. (not developed in the script this time)
* Should also verify user could add bank account from apps (ios/Android) by mobile test tools. Native and hybrid app may require different test tool and script. (not required this time)
* Bank account validation is not required by the user story. So fake account is used this time.
