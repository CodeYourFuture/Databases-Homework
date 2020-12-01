const express = require("express");
const app = express();
const { Pool } = require('pg');
require('dotenv').config()

const pool = new Pool({
    user: process.env.USERNAME,
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: process.env.PASSWORD,
    port: 5432
});

app.get("/customers", function(req, res) {
    pool.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
 });

    app.get("/suppliers", function(req, res) {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/products", function(req, res) {
    pool.query('SELECT products.product_name, suppliers.supplier_name FROM products INNER JOIN suppliers ON suppliers.id = products.supplier_id', (error, result) => {
        res.json(result.rows);
    });
});

app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
}); 
