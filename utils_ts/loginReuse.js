const {test,expect}=require('@playwright/test')





async function loginAndGoToEvents(page) {




   await page.goto("https://eventhub.rahulshettyacademy.com/");

await page.getByLabel("email").fill("Vamsiyaka@gmail.com");
await page.getByLabel("password").fill("Vamsiyaka@0806")
await page.locator("#login-btn").click()

await page.waitForLoadState('networkidle');

await page.locator("#nav-events").click();

await page.waitForTimeout(3000);

}

async function gotoEventsViaGmail(page, user) {
    await page.goto("https://eventhub.rahulshettyacademy.com/");

    await page.getByLabel("email").fill(user.email);
    await page.getByLabel("password").fill(user.password);
    await page.locator("#login-btn").click();
}


module.exports= {loginAndGoToEvents,gotoEventsViaGmail};
