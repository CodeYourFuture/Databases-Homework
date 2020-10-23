const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'password',
    port: 5432
});

app.get("/customers", (req, res) => {
    pool.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", (req, res) => {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/products", (req, res) => {
    pool.query('SELECT product_name, supplier_name FROM products INNER JOIN suppliers ON supplier_id=suppliers.id', (error, result) => {
        res.json(result.rows);
    });
});

const listener = app.listen(3000, function () {
    console.log("Your app is listening on port 3000");
});