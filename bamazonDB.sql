DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (100) NOT NULL,
    department_name VARCHAR
    (80) NOT NULL,
    price DECIMAL
    (10,2) NOT NULL,
    stock_quantity INT,
    PRIMARY KEY
    (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sekiro: Shadows Die Twice", "Video Games", 59.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Royal Tenebaums", "Movies", 14.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hills ID Low Fat - case of 12", "Pet Supplies", 34.99, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spiderman - PS4", "Video Games", 59.99, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dark Souls 3", "Video Games", 34.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Deer Antler", "Pet Supplies", 24.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("8 Slot Surge Protector", "Electronics", 22.49, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad Mini", "Electronics", 299.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Darjeeling Limited", "Movies", 9.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("God of War", "Video Games", 39.99, 17);