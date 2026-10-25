const { test, expect } = require('@playwright/test')


test('End to end automation test', async ({ browser }) => {

     const productName = 'iphone 13 pro';

     const context = await browser.newContext();
     const page = await context.newPage();

     const userEmail = page.getByPlaceholder("email@example.com");
     const userPassword = page.getByPlaceholder("enter your passsword");
     const loginBtn = page.getByRole("button", { name: "Login" });
     const titles = page.locator('div.card-body h5 b');
     const products = page.locator("div.card-body");
     const email = "vamsiyaka@gmail.com";



     await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
     await page.setViewportSize({ width: 1920, height: 1080 });

     await userEmail.fill(email);
     await userPassword.fill("Vamsiyaka@0806");
     await loginBtn.click();
     await page.waitForLoadState('networkidle');
     await products.first().waitFor();

     const alliteams = await titles.allTextContents();
     console.log(alliteams);

     const count = await products.count();


     await products.filter({ hasText: productName }).getByRole("button", { name: "Add to Cart" }).click();




     //await page.locator("[routerlink*='/dashboard/cart']").click();
     await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

     await page.locator("div li").first().waitFor();

     await expect(page.getByText(productName)).toBeVisible();



     //new locator 
     await page.getByRole("button", { name: "Checkout" }).click();

     await page.getByPlaceholder("Select Country").pressSequentially("ind")



     await page.getByText("Place Order ").click();

     await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

     const orderID = await page.locator(".em-spacer-1 [class='ng-star-inserted']").textContent();

     console.log(orderID);


     await page.locator("li [routerlink='/dashboard/myorders']").click();

     await page.locator("tbody").waitFor();

     //order ids; .table-bordered tr [scope='row']


     const rows = page.locator("tbody tr");

     for (let i = 0; i < await rows.count(); i++) {

          const rowOderId = await rows.nth(i).locator("th").textContent();

          if (orderID.includes(rowOderId)) {

               await rows.locator("button").first().click();
               break;

          }

     }

     const OrderIDdetailspage = await page.locator(".col-text").textContent();

     expect(orderID.includes(OrderIDdetailspage)).toBeTruthy();








});