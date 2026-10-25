const base=require('@playwright/test');


exports.customtest=base.test.extend(
{
testDataForOrder:   {
    username: "vamsiyaka@gmail.com",
    password: "Vamsiyaka@0806",
    productName: "iphone 13 pro"
  }




}
)