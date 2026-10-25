const { test, expect } = require('@playwright/test');

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const API_URL = `${BASE_URL}/api`;

// Credentials for both accounts
const yahooUser = {
    email: "vamsi@yahoo.com",
    password: "Vamsiyaka@0806"
};

const gmailUser = {
    email: "gmail_test_user@example.com",
    password: "GmailPassword123!"
};

test("Verify user authorization isolation on booking details page", async ({ request, page }) => {

    // ==========================================
    // Step 1 — Login as Yahoo user via API
    // ==========================================
    const loginRes = await request.post(`${API_URL}/auth/login`, {
        data: {
            email: yahooUser.email,
            password: yahooUser.password
        }
    });

    expect(loginRes.ok()).toBeTruthy();
    const loginBody = await loginRes.json();
    const yahooToken = loginBody.token || loginBody.accessToken;
    expect(yahooToken).toBeDefined();

    // ==========================================
    // Step 2 — Fetch events via API to get eventId
    // ==========================================
    const eventsRes = await request.get(`${API_URL}/events`, {
        headers: {
            'Authorization': `Bearer ${yahooToken}`
        }
    });

    expect(eventsRes.ok()).toBeTruthy();
    const eventsBody = await eventsRes.json();
    
    // Read data[0].id to store as eventId
    const eventId = eventsBody.data[0].id;
    expect(eventId).toBeDefined();

    // ==========================================
    // Step 3 — Create a booking via API as Yahoo user
    // ==========================================
    const bookingRes = await request.post(`${API_URL}/bookings`, {
        headers: {
            'Authorization': `Bearer ${yahooToken}`
        },
        data: {
            eventId: eventId,
            customerName: 'Yahoo User',
            customerEmail: yahooUser.email,
            customerPhone: '9876543210',
            quantity: 1
        }
    });

    expect(bookingRes.ok()).toBeTruthy();
    const bookingBody = await bookingRes.json();
    
    // Extract data.id as yahooBookingId
    const yahooBookingId = bookingBody.data.id || bookingBody.data._id;
    expect(yahooBookingId).toBeDefined();

    // ==========================================
    // Step 4 — Login as Gmail user via browser UI
    // ==========================================
    // Navigate to login page
    await page.goto(`${BASE_URL}/auth/login`);

    // Fill Gmail user credentials and login
    await page.getByPlaceholder("email@example.com").fill(gmailUser.email);
    await page.getByPlaceholder("enter your passsword").fill(gmailUser.password);
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for authentication and network settlement
    await page.waitForLoadState('networkidle');

    // ==========================================
    // Step 5 — Navigate to Yahoo's booking URL as Gmail user
    // ==========================================
    await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, {
        waitUntil: 'networkidle'
    });

    // ==========================================
    // Step 6 — Validate Access Denied
    // ==========================================
    await expect(page.getByText('Access Denied')).toBeVisible();
    await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();

});