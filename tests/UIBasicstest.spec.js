const {test, expect}=require('@playwright/test');
const { assert } = require('node:console');
const { promises } = require('node:dns');
const { expectFailure } = require('node:test');




test('browser context  playwright test', async ({browser})=>
{
       



    //fresh browser page and also we can pass cookies
      const context= await browser.newContext();
      const page = await context.newPage(); 

         const userName= page.locator('input#username');
         const password=page.locator("[name='password']");
         const singIn  = page.locator("[value='Sign In']");
         const cardTitles =page.locator("div.card-body h4 a");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   //type method deprictaed so use fill method
   await userName.fill('vamsi yaka')
   await password.fill('password')
   await singIn.click();
   console.log(await page.locator("[style*=block]").textContent());

   await expect(page.locator("[style*=block]")).toContainText('Incorrect username/password.')

   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await password.fill("");
   await password.fill("Learning@830$3mK2");
   await singIn.click();
   await page.waitForTimeout(5000);
   

   console.log(await cardTitles.first().textContent());
   console.log(await cardTitles.nth(1).textContent());
   console.log(await cardTitles.nth(2).textContent());
   console.log(await cardTitles.nth(3).textContent()); 

   const allTitles=await cardTitles.allTextContents();
   console.log(allTitles);

});

// test.only --- run only that specificed test in the whole file/class
test('UI validation', async ({page})=>
{
    
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");


     const userName= page.locator('input#username');
     const password=page.locator("[name='password']");
     const singIn  = page.locator("[value='Sign In']");
     const documentLink= page.locator("[href*='documents-request']");


   await userName.fill('vamsi yaka')
   await password.fill('password')

   const dropdown=await page.locator('select.form-control');
   await dropdown.selectOption('consult');

   await page.waitForTimeout(2000);
   //pauses execution by opening inspect tab of playwright
   //await page.pause();

    await page.locator('.radiotextsty').last().check();
    await page.locator('#okayBtn').click();
    
    //this is an essertion, this passes when value returns true only
    await expect( page.locator('.radiotextsty').last()).toBeChecked();

    //this is not an assertion , it retuns boolean value
    console.log(await page.locator('.radiotextsty').last().isChecked())


    await page.locator('input#terms').first().click();
    await expect( page.locator('input#terms')).toBeChecked();

   await page.locator('input#terms').uncheck();
    expect(await page.locator('input#terms').isChecked()).toBeFalsy();


    await expect(documentLink).toHaveAttribute('class','blinkingTexts');
    //await expect( documentLink).toHaveAttribute('class','blinkingTexts');

    //   console.log('test check');
    // console.log(blink);
    // console.log(blink1);


     

    await singIn.click();



});


test('Child window handel',async ({browser})=>{

  const context=await browser.newContext();
   const page=await  context.newPage();
    const userName= page.locator('input#username');
   

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

 const documentLink= page.locator("[href*='documents-request']");
 

//this function has three promises 1. Pending, 2.Rejected, 3.fullfilled
//until it gets fullfilled it retuns othen than fullfilled it fails
//so what all steps need we nees to pass as an array all those passes steps performs simultaneously
//it retuns newpage. the that new oage can be used.

   const [newPage]= await Promise.all([

      context.waitForEvent('page'),

      await documentLink.click()])

      const text=await newPage.locator('p.red').textContent();

       console.log(text);

       const ArrayText= text.split("@")
       const domain=ArrayText[1].split(" ")[0];
       console.log(domain);

       await userName.fill(domain);

      //console.log(userName.inputValue());



 //await page.pause();



});