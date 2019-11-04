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

//Starts the Manager interface, presents initial menu, points to corresponding function based on choice
function start() {
    inquirer.prompt([{
        name: "choices",
        type: "list",
        message: "Welcome! What would you like to do?",
        choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function (answer) {
        switch (answer.choices) {
            case 'View Products':
                viewProducts();
                break;
            case 'View Low Inventory':
                viewLowInventory();
                break;
            case 'Add to Inventory':
                addToInventory();
                break;
            case 'Add New Product':
                addNewProduct();
                break;
            default:
                start();
                break;
        }
    })
}

// Displays current products table
function viewProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        console.clear();
        console.log("Viewing Products: \n");
        console.table(res);
        chooseAgain();
    })
}

// Allows manager to view any products that have a quantity of five or less
function viewLowInventory() {
    console.log("low inventory");
}

// Allows the manager to add more to an existing products inventory
function addToInventory() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("Adding to Inventory: \n")
        inquirer.prompt([{
                name: "id",
                type: Number,
                message: "Select product by item_id to add inventory"
            },
            {
                name: "amount",
                type: Number,
                message: "How many would you like to add?"
            }
        ]).then(function (answers) {
            var selectedItem;
            for (let i = 0; i < res.length; i++) {
                if (res[i].item_id === answers.id) {
                    selectedItem = res[i];
                    updateAmount(selectedItem.stock_quantity, answers.amount, selectedItem.item_id);
                }
            }
            chooseAgain();
        })
    })
}

// Allows the manager to add a completely new product
function addNewProduct() {
    console.log("Adding Product: \n");
    inquirer.prompt([{
            name: "product",
            type: "input",
            message: "What is the name of the product you would like to add?"
        },
        {
            name: "department",
            type: "input",
            message: "What department does this product belong in?"
        },
        {
            name: "price",
            type: "number",
            message: "What is the price per unit?"
        },
        {
            name: "quantity",
            type: "number",
            message: "How many are you adding?"
        }
    ]).then(function (answers) {
        connection.query("INSERT INTO products SET ?", {
                product_name: answers.product,
                department_name: answers.department,
                price: answers.price,
                stock_quantity: answers.quantity
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " product inserted!\n");
                chooseAgain();
            })
    })
}

// gives the manager a chance to pick a new option or end the program
function chooseAgain() {
    inquirer.prompt([{
        name: "continue",
        type: "confirm",
        message: "Would you like to do anything else?"
    }]).then(function (answer) {
        if (answer.continue === true) {
            console.clear();
            start();
        } else {
            connection.end();
        }
    })
}

// updates the amount of inventory, for use in the addToInventory function
function updateAmount(currentStock, amountAdded, productUpdated) {
    newStock = currentStock + amountAdded;
    console.log(newStock);
    connection.query("UPDATE products SET ? WHERE ?",
        [{
                stock_quantity: newStock
            },
            {
                item_id: productUpdated
            }
        ])
}