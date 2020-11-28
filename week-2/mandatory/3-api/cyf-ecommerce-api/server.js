const express = require("express");
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded());;


const { Pool } = require('pg');

const pool = new Pool({
    user: 'ige_a',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'Dorcas88',
    port: 5432
});

app.get("/hotels", function(req, res) {
    pool.query('SELECT * FROM hotels', (error, result) => {
        res.json(result.rows);
    });
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
    pool.query('SELECT product_name, supplier_name FROM products INNER JOIN suppliers ON products.supplier_id = suppliers.id ', (error, result) => {
        res.json(result.rows);
    });
})

app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});