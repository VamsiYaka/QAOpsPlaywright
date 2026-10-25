  
  Feature: Ecommerse validations
  
      
  
  Scenario: placing the order
  Given a login to Ecommerse application with "vamsiyaka@gmail.com" and "Vamsiyaka@0806"
  When Add "ZARA COAT 4" to Cart
  Then verify the  "ZARA COAT 4" is displayed in the Cart
  When Enter valid deatils and place the order
  Then vefify order present in OrderHistory