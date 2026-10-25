const{test,expect}=require('@playwright/test')


test('locatorsPractice', async ({browser})=>{

    const context=await browser.newContext();
    const page=await await context.newPage()

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder("Password").fill("pass@123");
    await page.getByRole("button",{name: 'Submit'}).click();


    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    //for expect assertion there is default fime of 5 sec.
    //that can be changed by delclaring the time out we need -step level
    //for same expet assertion , can be declared globally from palywright config.js file.
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: '10000'});

    await page.getByRole("link",{name: "Shop"}).click();

    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();









});


// 30 sec timeout for tests-- if not completed in 30 sec-then timeout error comes.
test('test level timeouts', async ({browser})=>{
    //this time out we are delcaring to override the global timeout in config file. this test has time out of 60 sec now --then it fails


    test.timeout(60000);
    const slowExpect = expect.configure({timeout: '9000'});
    page.setDefaultTimeout(15000);

    const context=await browser.newContext();
    const page=await await context.newPage()

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder("Password").fill("pass@123");
    await page.getByRole("button",{name: 'Submit'}).click();


    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

    await page.getByRole("link",{name: "Shop"}).click();




    await slowExpect(page.locator("my-4").first()).toHaveText("Shop Name");

    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();







})