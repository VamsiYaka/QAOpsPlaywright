const {test, expect}=require('@playwright/test')

test('practice test',async ({browser})=>{
   const context =await  browser.newContext();
   const page    =await  context.newPage();

const userEmail= page.locator('input#userEmail');
const userPassword = page.locator('input#userPassword');
const loginBtn=page.locator('input#login');
const titles =page.locator('div.card-body h5 b');



     await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

     await userEmail.fill('vamsiyaka@gmail.com');
     await userPassword.fill('Vamsiyaka@080');
     await loginBtn.click();

console.log(await page.locator('[aria-label="Incorrect email or password."]').textContent());
await expect(page.locator("[aria-label='Incorrect email or password.']")).toContainText('Incorrect email or password.')
     
await userEmail.fill("");
await userEmail.fill('vamsiyaka@gmail.com');
await userPassword.fill("");
await userPassword.fill('Vamsiyaka@0806');
await loginBtn.click();


/*this method stops the execution and make wait---not suggested*/
//await page.waitForTimeout(2000);
/* this method has inbuild wait capibility becuase we are aking for nth elemnt to print so it know that the list is not blank.*/
//console.log(await titles.first().textContent());
//so to solve this case we have one more method
//await page.waitForLoadState('networkidle'); //incase of any issue in this method

await titles.first().waitFor();


const alliteams= await titles.allTextContents();
console.log(alliteams);







});