var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Kashul1996!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
})

//function to load products table, then begin purchase
function start() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        buyProduct();
    })
}

//function to purchase a product if stock_quantity is sufficient
function buyProduct() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([{
            name: "item",
            type: "number",
            message: "Please select the product you would like to purchase by item_id"
        }, {
            name: "amount",
            type: "number",
            message: "How many would you like to purchase?"
        }]).then(function (answers) {
            console.log(answers.item)
            var selectedItem;
            for (var i = 0; i < results.length; i++) {
                //console.log(results[i]);
                if (results[i].item_id === answers.item) {
                    selectedItem = results[i];
                    console.log(selectedItem);
                }
            }
            if (answers.amount > selectedItem.stock_quantity) {
                console.log("We're sorry, we don't have enough " + selectedItem.product_name + " in stock to complete your order");
                start();
            } else {
                var currentStock = selectedItem.stock_quantity;
                console.log("currentStock: " +
                    currentStock);
                var unitsSold = answers.amount;
                console.log("unitsSols: " + unitsSold)
                var productSold = selectedItem.item_id;
                console.log("productSold: " + productSold);
                var totalPrice = answers.amount * selectedItem.price;
                console.log("Your total cost for your order of: \n" +
                    answers.amount + " units of " + selectedItem.product_name + " is: " + totalPrice + "\n");
                //updateAmount();
                restartPurchase();
            }
        })
    })
}

//Function for a new purchase
function restartPurchase() {
    inquirer.prompt([{
        name: "newPurchase",
        type: "confirm",
        message: "Would you like to make another purchase?"
    }]).then(function (answer) {
        if (answer.newPurchase === true) {
            start();
        } else {
            console.log("Thank you for shopping with Bamazon!");
        }
    })
}


// //Function to update the amount of product in database when an item is sold
// function updateAmount(currentStock, unitsSold, productSold) {
//     console.log("currentStock getting passed? " + currentStock);
//     newStock = currentStock - unitsSold;
//     console.log(newStock);
//     // connection.query("UPDATE products SET ? WHERE ?",
//     //     [{
//     //             stock_quantity: newStock
//     //         },
//     //         {
//     //             item_id: productSold
//     //         }
//     //     ])
// }