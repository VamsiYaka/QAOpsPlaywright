const { test, expect } = require('@playwright/test');
const {gotoEventsViaGmail}=require('../utils/loginReuse')

const BASE_URL = "https://api.eventhub.rahulshettyacademy.com";
const API_URL = `${BASE_URL}/api`;

let bookingID;

const yahooUser = {
    email: "vamsi@yahoo.com",
    password: "Vamsiyaka@0806"
};
const gmailUser = {
    email: "vamsiyaka@.com",
    password: "Vamsiyaka@gmail.com"
};
const GMAIL_USER = {
    email: "vamsiyaka@gmail.com",
    password: "Vamsiyaka@0806"
};


test("Step 1 - Login as Yahoo user via API and extract token", async ({ request }) => {

    // 1. Send POST request to login endpoint
    const loginRes = await request.post(`${API_URL}/auth/login`, {
        data: {
           "email": yahooUser.email,
           "password": yahooUser.password
        }
    });

    // 2. Assert the response is OK (status in the 2xx range)

    console.log(loginRes.status());
    expect(loginRes.ok()).toBeTruthy();

   const loginResJson= await loginRes.json();

   const token =await loginResJson.token;

   console.log(token);


     const eventsResp=await request.get(`${API_URL}/events`, {

         headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'

         }

     })

      console.log(`Events Response Status: ${eventsResp.status()}`);
    expect(eventsResp.ok()).toBeTruthy();
    expect(eventsResp.status()).toBe(200);

      const eventRespJson=await eventsResp.json();
      const eventid=await eventRespJson.data[0].id;
      console.log(eventid)



    const createEventResp=  await request.post(`${API_URL}/bookings`,{

     headers: {
            'Authorization': `Bearer ${token}`
        },
        data: {
            eventId: eventid,
            customerName: yahooUser,
            customerEmail: yahooUser.email,
            customerPhone: '9876543210',
            quantity: 1
        }


    })

 console.log(createEventResp.status());

  expect(createEventResp.ok()).toBeTruthy()

  const createEventRespJosn=await  createEventResp.json();

   bookingID= createEventRespJosn.data.id;

  console.log(bookingID)



  

});

test.only("Step 4 - Login as Gmail user via browser UI", async ({ page }) => {
    // Call your login helper passing the page and the user object
    await gotoEventsViaGmail(page, GMAIL_USER);

  // Step 5 — Navigate to Yahoo's booking URL as Gmail user
  await page.goto(`${API_URL}/bookings/${bookingID}`, { waitUntil: 'networkidle' });

  await page.pause();

  // Step 6 — Validate Access Denied
  await expect(page.getByText('Unauthorized')).toBeVisible();
  //await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();



});
