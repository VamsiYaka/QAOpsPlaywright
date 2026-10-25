const {When, Then , Given}= require('@cucumber/cucumber');
const { POManager } = require('../../pageObject/POManager');
const { expect}= require('@playwright/test')
const playwright =require('@playwright/test')

Given('a login to Ecommerse application with {string} and {string}', async function (username, password) {
  // Write code here that turns the phrase above into concrete actions

    const browser=await playwright.chromium.launch({

        headless: false
    });  


      const context= await browser.newContext();
      const page = await context.newPage(); 

  this.poManager = new POManager(page);
  const products = page.locator(".card-body");
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin(username, password);


});

When('Add {string} to Cart',async  function (productName) {
  // Write code here that turns the phrase above into concrete actions
   this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddCart(productName);
  
  await this.dashboardPage.navigateToCart();
});

Then('verify the  {string} is displayed in the Cart',{timeout: 100*1000}, async function (productName) {
  // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

When('Enter valid deatils and place the order',async function () {
  // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
});

Then('vefify order present in OrderHistory',async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
