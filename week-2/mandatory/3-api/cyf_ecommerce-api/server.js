const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config()

app.use(express.json());
app.use(cors());
const { Pool } = require('pg');

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: process.env.PASSWORD,
    port: 5432
});


// app.get("/hotels", function(req, res) {
//     pool.query('SELECT * FROM hotels', (error, result) => {
//         res.json(result.rows);
//     });
// });
 
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
    pool.query('SELECT * FROM products', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/orders", function(req, res) {
    pool.query('SELECT * FROM orders', (error, result) => {
        res.json(result.rows);
    });
});


app.listen(3000);
