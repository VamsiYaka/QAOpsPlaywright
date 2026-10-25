const { test, expect } = require('@playwright/test');
const { TIMEOUT } = require('node:dns');

async function loginAndGoToBooking(page) {



    const eventDescp = "This event is to text the actual event creattion";

    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.locator("#email").fill("vamsiyaka@gmail.com");
    await page.getByLabel("password").fill("Vamsiyaka@0806");
    await page.getByRole("button", { type: "submit" }).click();
    await page.waitForLoadState('networkidle');
    const browseEventsLink = page.locator("text=Browse Events →");
    await expect(browseEventsLink).toBeVisible();

}

test('refund Eligibility check', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await loginAndGoToBooking(page);

    await page.locator("[data-testid='event-card']").first().locator("[data-testid='book-now-btn']").click();

   await page.getByLabel("Full Name").fill("Vamsi Yaka")

   await page.getByLabel("Email").fill("vamsiyaka1234@gmail.com")

   await page.getByLabel("Phone Number").fill("9876543210");

   await page.getByRole("button",{type:"submit"}).last().click();

   await expect(page.locator("//h3[contains(., 'Booking Confirmed!')]")).toBeVisible();

   await page.locator("text='View My Bookings'").click();

   await  expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");

   await page.locator("text='View Details'").first().click();

    await page.waitForTimeout(3000);

   await expect(page.locator("//h2[text()='Booking Information']")).toBeVisible();


   const EventTitle= await page.locator("div h1").textContent();
   const EventBookingID= await page.locator("//nav//a[text()='My Bookings']/following-sibling::span[2]").textContent();

   console.log(EventTitle);
   console.log(EventBookingID);

   

 const FistCharEventTitle= EventTitle.trim().charAt[0]
  const firstChartBookingID=EventBookingID.trim().charAt[0]

  expect(FistCharEventTitle).toEqual(firstChartBookingID);


  await page.locator("[data-testid='check-refund-btn']").click();

    await expect(page.locator("[data-testid='refund-spinner']")).toBeVisible({timeout:500});

     await expect(page.locator("[data-testid='refund-spinner']")).toBeHidden({timeout:6000})



   await page.waitForTimeout(3000);

   // 1. Locate the result element and assert it is visible
const refundResult = page.locator('#refund-result');
await expect(refundResult).toBeVisible();

// 2. Assert it contains the first piece of text
await expect(refundResult).toContainText('Eligible for refund');

// 3. Assert it contains the second piece of text
await expect(refundResult).toContainText('Single-ticket bookings qualify for a full refund');


});


test("Not Eligible Refund for group booking", async({browser})=>{


  const context=await browser.newContext();
  const page=await context.newPage();



await loginAndGoToBooking(page);


 await page.locator("[data-testid='event-card']").first().locator("[data-testid='book-now-btn']").click();


const ticketCont= page.locator("#ticket-count + button");

for (let i=1;i<3;i++){

await ticketCont.click();

}
   await page.getByLabel("Full Name").fill("Vamsi Yaka")

   await page.getByLabel("Email").fill("vamsiyaka1234@gmail.com")

   await page.getByLabel("Phone Number").fill("9876543210");

   await page.getByRole("button",{type:"submit"}).last().click();


   await expect(page.locator("//h3[contains(., 'Booking Confirmed!')]")).toBeVisible();

   await page.locator("text='View My Bookings'").click();

   await  expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");

   await page.locator("text='View Details'").first().click();

    await page.waitForTimeout(3000);


    await expect(page.locator("//h2[text()='Booking Information']")).toBeVisible();


   const EventTitle= await page.locator("div h1").textContent();
   const EventBookingID= await page.locator("//nav//a[text()='My Bookings']/following-sibling::span[2]").textContent();

   console.log(EventTitle);
   console.log(EventBookingID);

   

 const FistCharEventTitle= EventTitle.trim().charAt[0]
  const firstChartBookingID=EventBookingID.trim().charAt[0]

  expect(FistCharEventTitle).toEqual(firstChartBookingID);


  await page.locator("[data-testid='check-refund-btn']").click();

    await expect(page.locator("[data-testid='refund-spinner']")).toBeVisible({timeout:500});

     await expect(page.locator("[data-testid='refund-spinner']")).toBeHidden({timeout:6000})



   await page.waitForTimeout(3000);


  await expect(page.getByText('Not eligible for refund')).toBeVisible(); 
  
await expect(page.getByText('Group bookings (3 tickets) are non-refundable')).toBeVisible();


});