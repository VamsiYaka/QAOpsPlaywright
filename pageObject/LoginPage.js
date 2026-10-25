class LoginPage {


    constructor(page) {

        this.page  = page;


        this.signinButton = page.getByRole("button", { name: "Login" });
        this.userName = page.locator("#userEmail")
        this.passowrd = page.locator("#userPassword")
        this.page.waitForLoadState('networkidle');


    }

    async goto(){

     await this.page.goto('https://rahulshettyacademy.com/client/')


    }

    async validLogin(username, password) {

        await this.userName.fill(username);
        await this.passowrd.fill(password);
        await this.signinButton.click();
    }


}
module.exports={LoginPage}
