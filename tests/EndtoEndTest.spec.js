const {test,expect}=require('@playwright/test')


test('End to end automation test', async({browser})=>{

    const productName ='iphone 13 pro';

     const context= await browser.newContext();
      const page = await context.newPage(); 

const userEmail= page.locator('input#userEmail');
const userPassword = page.locator('input#userPassword');
const loginBtn=page.locator('input#login');
const titles =page.locator('div.card-body h5 b');
const products = page.locator("div.card-body");
const email="vamsiyaka@gmail.com";



     await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
     await page.setViewportSize({ width: 1920, height: 1080 });

     await userEmail.fill(email);
     await userPassword.fill("Vamsiyaka@0806");
     await loginBtn.click();
     await page.waitForLoadState('networkidle');
     await products.first().waitFor();

     const alliteams= await titles.allTextContents();
     console.log(alliteams);

     const count = await products.count();

for (let i=0; i<count;i++){

if(await products.nth(i).locator("b").textContent()===productName){

     await products.nth(i).locator("text= Add To Cart").click();
break;

}



}


      await page.locator("[routerlink*='/dashboard/cart']").click();

      await page.locator("div li").first().waitFor();
     const bool= await page.locator("h3:has-text('iphone 13 pro')").isVisible();
     expect(bool).toBeTruthy();


     //new locator 
    await page.locator("button:has-text('Checkout')").click();

    await page.locator("[placeholder='Select Country']").pressSequentially('Ind')

   const dropdown=   page.locator(".ta-results");
    
   await  dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();

   console.log(optionsCount);

    for(let i=0;i<optionsCount;i++){

     const text= await  dropdown.locator('button').nth(i).textContent();

     if(text === " India"){
          await dropdown.locator('button').nth(i).click();
          break;
     }
     

    }
  expect(page.locator(".user__name  [type='text']").first()).toHaveText(email);

  await page.locator(".action__submit").click();

 await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

 const orderID=await page.locator(".em-spacer-1 [class='ng-star-inserted']").textContent();

 console.log(orderID);
 


 await page.locator("li [routerlink='/dashboard/myorders']").click();

 await page.locator("tbody").waitFor();

 //order ids; .table-bordered tr [scope='row']


const rows= page.locator("tbody tr");

for(let i=0;i< await rows.count();i++){
       
const rowOderId=await rows.nth(i).locator("th").textContent();

if(orderID.includes(rowOderId)){

     await rows.locator("button").first().click();
     break;

}

}

const OrderIDdetailspage=await page.locator(".col-text").textContent();

expect(orderID.includes(OrderIDdetailspage)).toBeTruthy();








});