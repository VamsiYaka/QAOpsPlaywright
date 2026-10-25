const { test, expect } = require('@playwright/test');
const {customtest}=require('../utils/test-base')
const { POManager } = require('../pageObject/POManager');

const dataset = JSON.parse(JSON.stringify(require('../utils/PlaceOrderTestData.json')));

for(const data of dataset){
test(`Client App login for ${data.productName}`, async ({ page }) => {
  const poManager = new POManager(page);
  //js file- Login js, DashboardPage
  // const username = "vamsiyaka@gmail.com";
  // const password = "Vamsiyaka@0806"
  // const productName = 'iphone 13 pro';
  const products = page.locator(".card-body");
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin(data.username, data.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(data.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(data.productName);
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();



});
}
customtest('Client App login ', async ({ page,testDataForOrder }) => {


  const poManager = new POManager(page);
  //js file- Login js, DashboardPage
  // const username = "vamsiyaka@gmail.com";
  // const password = "Vamsiyaka@0806"
  // const productName = 'iphone 13 pro';
  const products = page.locator(".card-body");
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
   await  page.pause();
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();

})






