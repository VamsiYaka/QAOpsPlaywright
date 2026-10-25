const { test } = require('@playwright/test');

test("Quick API check", async ({ request }) => {
    const response = await request.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login", {
        data: {
            email: "vamsi@yahoo.com",
            password: "Vamsiyaka@0806"
        }
    });

    console.log("Status:", response.status());
    
});