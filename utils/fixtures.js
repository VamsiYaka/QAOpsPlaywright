const base=require('@playwright/test')
const { request} = require('@playwright/test');
const {APiUtils}=require('../utils/APiUtils')
const loginPayLoad = {userEmail:"vamsiyaka@gmail.com",userPassword:"Vamsiyaka@0806"};

const orderPayLoad ={orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}
 

exports.customtest=base.test.extend(

{

authenticatedPage : async ({browser},use)=>{


  const context= await browser.newContext();
      const page = await context.newPage(); 

const userEmail= page.getByPlaceholder("email@example.com");
const userPassword = page.getByPlaceholder("enter your passsword");
const loginBtn=page.getByRole("button",{name:"Login"});
const titles =page.locator('div.card-body h5 b');
const products = page.locator("div.card-body");
const email="vamsiyaka@gmail.com";



     await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
     await page.setViewportSize({ width: 1920, height: 1080 });

     await userEmail.fill(email);
     await userPassword.fill("Vamsiyaka@0806");
     await loginBtn.click();
     await page.waitForLoadState('networkidle');

     await use(page)
      await context.close();

},
createOrder: async({},use)=>{

  const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   const response =  await apiUtils.createOrder(orderPayLoad);

   use(response)

   await apiContext.dispose();

},
testDataforOrders: {

    productName: 'TAYOTO FORTUNER'
}
}

)