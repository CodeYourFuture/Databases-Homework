const express = require("express");
const app = express();

app.listen(3000, function () {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});

const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cyf_ecommerce",
    password: "",
    port: 5432,
});

app.get("/customers", function (req, res) {
    pool.query("SELECT * FROM customers", (error, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", function (req, res) {
    pool.query("SELECT * FROM suppliers", (error, result) => {
        res.json(result.rows);
    });
});

/* 1. Retrieve all the customers names and addresses who lives in United States

SELECT \* FROM customers WHERE country = 'United States'; 2. Retrieve all the customers ordered by ascending name
SELECT \*FROM customers ORDER BY name ASC;

3. Retrieve all the products which cost more than 100
   SELECT DISTINCT product_name FROM products WHERE unit_price > 100;
4. Retrieve all the products whose name contains the word `socks`
   SELECT DISTINCT product_name FROM products WHERE product_name LIKE '%socks';
5. Retrieve the 5 most expensive products
   SELECT DISTINCT product_name, unit_price FROM products ORDER By unit_price DESC LIMIT 5;
6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
   SELECT products.product_name, products.unit_price, suppliers.supplier_name FROM products INNER JOIN suppliers ON suppliers.id=products.supplier_id;
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
   SELECT products.product_name, suppliers.supplier_name FROM products INNER JOIN suppliers ON suppliers.id=products.supplier_id WHERE suppliers.country='United Kingdom';
8. Retrieve all orders from customer ID `1`
   SELECT \* FROM orders WHERE customer_id = 1;
9. Retrieve all orders from customer named `Hope Crosby`
   SELECT \* FROM orders INNER JOIN customers ON orders.customer_id=customers.id WHERE customers.name='Hope Crosby';
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
    SELECT products.product_name, products.unit_price, order_items.quantity FROM order_items
    INNER JOIN products ON products.id=order_items.product_id
    INNER JOIN orders ON order_items.order_id=orders.id
    WHERE orders.order_reference='ORD006';
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference` `order_date`, `product_name`, `supplier_name` and `quantity`.

SELECT customers.name, orders.order_reference, orders.order_date, products.product_name, suppliers.supplier_name, order_items.quantity FROM products
INNER JOIN suppliers ON products.supplier_id=suppliers.id
INNER JOIN order_items ON order_items.product_id=products.id
INNER JOIN orders ON order_items.order_id = orders.id
INNER JOIN customers ON orders.customer_id=customers.id; 12. Retrieve the names of all customers who bought a product from a supplier from China.
SELECT DISTINCT customers.name FROM customers
INNER JOIN orders ON orders.customer_id=customers.id
INNER JOIN order_items ON order_items.order_id=orders.id
INNER JOIN products ON order_items.product_id=products.id
INNER JOIN suppliers ON products.supplier_id=suppliers.id
WHERE suppliers.country = 'China'; */
