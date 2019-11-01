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

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("Connection Est");
    })
}