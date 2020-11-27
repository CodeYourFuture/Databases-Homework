const express = require("express");
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'ameer',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'ameer',
    port: 5432
});
app.get("/", function(req, res) {
      res.json('Hello Database');   
});
app.get("/customers", function(req, res) {
    console.log(req);
    pool.query("SELECT * FROM customers", (error, result) => {
        if (error) {
            console.error(error.stack)
        } else {
            res.json(result.rows);
        }
    })
});
app.get("/suppliers", function(req, res) {
    console.log(req);
    pool.query("SELECT * FROM suppliers", (error, result) => {
        if (error) {
            console.error(error.stack)
        } else {
            res.json(result.rows);
        }
    })
});
app.get("/products", function(req, res) {
    console.log(req);
    pool.query("SELECT products.product_name, suppliers.supplier_name FROM products INNER JOIN suppliers on products.supplier_id = suppliers.id", (error, result) => {
        if (error) {
            console.error(error.stack)
        } else {
            res.json(result.rows);
        }
    })
});
app.listen(3300, function() {
    console.log("Server is listening on port 3200. Ready to accept requests!");
});