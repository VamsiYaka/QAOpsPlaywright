const { test, expect } = require('@playwright/test');
const { assert } = require('node:console');


function futureDateValue() {
    const date = new Date();
    date.setDate(date.getDate() + 7); // Adds 7 days into the future
    return date.toISOString().slice(0, 16); // Formats it for datetime-local inputs
}

test('Assessment test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const eventDescp = "This event is to text the actual event creattion";

    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.locator("#email").fill("vamsiyaka@gmail.com");
    await page.getByLabel("password").fill("Vamsiyaka@0806");
    await page.getByRole("button", { type: "submit" }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText("Browse Events →")).toBeVisible();
    console.log("Your login is successfull");
    await page.getByRole("button", { name: "Admin" }).click();
    await page.getByRole("link", { name: "Manage Events" }).first().click();
    await page.waitForTimeout(3000);

    const eventTitle = `Test Event ${Date.now()}`;


    const EventTitle = await page.getByLabel("Title").fill(eventTitle);
    await page.locator("#admin-event-form textarea").fill(eventDescp);
    await page.getByLabel("category").selectOption("Sports");

    await page.getByLabel("city").fill("Hyderabad");

    await page.getByLabel("venue").fill("Hitech City , Road No 100, street of Villas");


    const Datee = futureDateValue();


    await page.getByLabel("Event Date & Time").fill(Datee);

    await page.getByLabel("Price ($)").fill("100");

    await page.getByLabel("Total Seats").fill("50");

    await page.locator("#add-event-btn").click();

    await expect(page.getByText("Event created!")).toBeVisible();

    console.log("Event created successfully !");

    await page.waitForTimeout(5000);

    //Go  to events page

    await page.locator("[href='/events']").first().click();

    const Events =  page.locator("[data-testid='event-card']");

    expect(page.locator("[data-testid='event-card']").first()).toBeVisible();

    console.log("page loaded successfull with Events");

    const matchingEvent = Events.filter({ hasText: eventTitle });
    await expect(matchingEvent).toBeVisible({ timeout: 5000 });

    console.log("Your crated event is found one events page");


    const seatsText = await matchingEvent.locator("span.text-emerald-600").textContent();

    console.log("Seats available text:", seatsText);

    const availableSeats = seatsText.split(" ")[0];

    console.log(availableSeats);

    await matchingEvent.getByText("Book Now").click();

   await  page.waitForTimeout(3000);

    expect(page.locator(".ticket-count")).toContainText("1");

    await page.getByLabel("Full Name").fill("Vamsi Yaka");

    await page.locator("#customer-email").fill("vamsiyaka800@gmail.com");

    await page.getByLabel("Phone Number").fill("+91 98765 43210");

    await page.locator("#confirm-booking").click();

    await page.waitForTimeout(6000);

    
   const bookingRefLocator = page.locator(".booking-ref");

    await expect(bookingRefLocator).toBeVisible();

    const BookingRefText = await bookingRefLocator.textContent();

    console.log("Booking Reference is:", BookingRefText);



    await page.getByText("My Bookings").first().click()

    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");

    const AllBookingCards= page.locator("#booking-card")

    await expect(AllBookingCards.first()).toBeVisible();

    await expect(AllBookingCards.filter({hasText:eventTitle}).first()).toBeVisible();



await page.locator("[href='/events']").first().click();

expect(page.locator("[data-testid='event-card']").first()).toBeVisible();

await expect(matchingEvent).toBeVisible({ timeout: 5000 });

const Seatsafterbooking=await matchingEvent.locator("span.text-emerald-600").textContent();

    console.log("Seats available text after booking:", Seatsafterbooking);

    const availableSeatsafterbooking = Seatsafterbooking.split(" ")[0];

    console.log(availableSeatsafterbooking);

  const seatsBeforeNum = parseInt(availableSeats, 10);
const seatsAfterNum = parseInt(availableSeatsafterbooking, 10);

expect(seatsAfterNum).toBe(seatsBeforeNum - 1);


})