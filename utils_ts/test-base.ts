//const base=require('@playwright/test');

import {test as baseTest} from '@playwright/test';


 interface TestDataForOrder {
 username: string;
 password: string;
 productName: string;
};



export const customtest=baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{
testDataForOrder:   {
    username: "vamsiyaka@gmail.com",
    password: "Vamsiyaka@0806",
    productName: "iphone 13 pro"
  }




}
)