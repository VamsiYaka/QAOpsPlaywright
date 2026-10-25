const { test, expect } = require('@playwright/test')


test("Security test Resquest intercept", async ({ page }) => {
    const userEmail = page.getByPlaceholder("email@example.com");
    const userPassword = page.getByPlaceholder("enter your passsword");
    const loginBtn = page.getByRole("button", { name: "Login" });
    const titles = page.locator('div.card-body h5 b');
    const products = page.locator("div.card-body");
    const email = "vamsiyaka@gmail.com";



    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    

    await userEmail.fill(email);
    await userPassword.fill("Vamsiyaka@0806");
    await loginBtn.click();
     await page.waitForLoadState('networkidle');
      await products.first().waitFor();
 await page.locator("li [routerlink='/dashboard/myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",

        async route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6aca855b2be7a4bl2b9bac94' })



    )



    await page.locator("button:has-text('View')").first().click();

    //await page.pause();

   //  console.log(await page.locator("div p[class='blink_me']").textContent());
       await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");






})