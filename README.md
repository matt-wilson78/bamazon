# bamazon
### An "Amazon" like app that runs in node.js

This app is designed to work on several different levels, as an "Amazon" like program. The app consists of 3 different sections; bamazon Customer, bamazon Manager, & bamazon Supervisor. This app uses mysql for database storage, node.js to run the program, and the inquirer npm package for prompts throughout.

# bamazonCustomer.js

The app is organized in distinct files for each of the different sections. The bamazonCustomer.js files has the code for the "Customer" side of the app. To run this file, be sure to first install the mysql & inquirer npm packages:

  - npm install mysql
  - npm install inquirer

The command to run the bamazonCustomer.js file in terminal is: node bamazonCustomer.js

![Run bamazonCustomer.js in node](/images/bamazonCustomer1.png)

The first function of the app is to produce a table of all of the items for sale. You will then be asked to choose the item you would like to purchase by the item_id (see screenshot below).

![bamazonCustomer initial view](/images/bamazonCustomer2.png)

Once the item is selected by id, you will be asked how many you would like to purchase. If the stock_quantity is sufficient to fill your order, you will be given a total for the number of items you're purchasing. You will then be asked if you would like to make another purchase. If you choose yes, the screen will be cleared using console.clear, the database will be updated to reflect new stock_quantity less your previous purchase, and the app will start again from item select (screenshot below).

![bamazonCustomer items purchased, price, and prompt for more purchases](/images/bamazonCustomer3.png)
![bamazonCustomer purchase prompt with updated database from previous purchase](/images/bamazonCustomer4.png)

If you ask to purchase more than what is available, the app will inform you that there is insufficient quantity to complete your purchase, and ask if you would like to update the amount or make another purchase. If you choose yes, you will be taken back to the initial prompt.

![bamazonCustomer insufficient quantity & prompt to change amount or make another purchase](/images/bamazonCustomer5.png)

Upon completion of a purchase, if you do not wish to make another, the app will exit.

![bamazonCustomer exit screen](/images/bamazonCustomer6.png)

## bamazonManager.js

The purpose of the bamazonManager.js section of the app is to provide a "manager" access to 
  - View Current Stock (view products)
  - View Low Inventory
  - Add to Inventory
  - Add a New Product

This section starts with a simple menu for the manager to choose from:

![bamazonManager main menu](/images/bamazonManager1.png)

If View Products is selected, the manager is taken to a table of all products currently in stock:

![bamazonManager view products](/images/bamazonManager2.png)

If Add More Inventory is selected, the manager is taken to a table showing all items currently in stock, and is then prompted to select the item to add inventory to by item_id. They are then asked how many units they would like to add. (This function isn't currently working. The values of the selections aren't being passed to the updateAmount function. I am working to resolve this!)

![bamazonManager Add More Inventory screen](/images/bamazonManager3.png)

If Add a New Product is selected, the manager is prompted to give a name of the product, the department the product belongs in, the price per unit, and how many are being added to the inventory. Upon completion, the manager is notified that the product has been added.

![bamazonManager Add Product screen](/images/bamazonManager4.png)

After adding a new product, the full inventory table is updated to reflect the addition of the new product when the manager chooses View Products (the stapler was added in the previous screenshot & is now available in the full produce table.)

![bamazonManager updated product inventory](/images/bamazonManager5.png)

I haven't had time to get the View Low Inventory function added in yet. This functionality will be added soon.

## bamazonSupervisor.js

This part of the app has not yet been implemented.





