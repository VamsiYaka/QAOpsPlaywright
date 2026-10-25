const {test,expect}=require('@playwright/test')
const {customtest}=require('../utils/fixtures')

customtest("Fixtures Demo", async({authenticatedPage,createOrder,testDataforOrders})=>{

    await authenticatedPage.goto("https://rahulshettyacademy.com/client/")
    


//Login to application and //create order and then verify order created 


await authenticatedPage.locator("button[routerlink*='myorders']").click();
 await authenticatedPage.locator("tbody").waitFor();

 await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();

 console.log(testDataforOrders.productName);
 



})