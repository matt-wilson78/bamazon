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
            var selectedItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id === answers.item) {
                    selectedItem = results[i];
                }
            }
            if (answers.amount > selectedItem.stock_quantity) {
                console.log("We're sorry, we don't have enough " + selectedItem.product_name + " in stock to complete your order");
                inquirer.prompt([{
                    name: "continue",
                    type: "confirm",
                    message: "Would you like to choose a different amount or make another purchase?"
                }]).then(function (ans) {
                    if (ans.continue === true) {
                        console.clear();
                        start();
                    } else {
                        console.log("\nThank you for shopping Bamazon!\n")
                    }
                })
            } else {
                // var currentStock = selectedItem.stock_quantity;
                // var unitsSold = answers.amount;
                // var productSold = selectedItem.item_id;
                var totalPrice = answers.amount * selectedItem.price;
                console.log("Your total cost for your order of: \n" +
                    answers.amount + " units of " + selectedItem.product_name + " is: " + totalPrice + "\n");
                updateAmount(selectedItem.stock_quantity, answers.amount, selectedItem.item_id);
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
            console.clear();
            start();
        } else {
            console.log("Thank you for shopping with Bamazon!");
        }
    })
}


//Function to update the amount of product in database when an item is sold
function updateAmount(currentStock, unitsSold, productSold) {
    newStock = currentStock - unitsSold;
    connection.query("UPDATE products SET ? WHERE ?",
        [{
                stock_quantity: newStock
            },
            {
                item_id: productSold
            }
        ])
}