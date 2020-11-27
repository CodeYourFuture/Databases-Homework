const express = require("express");
const app = express();
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: process.env.DB_PW,
    port: 5432
});

app.get('/', (req, res) => {
    res.send('test');
});

app.get('/customers', (req, res) => {
  pool.query('SELECT * FROM customers', (error, result) => {
    res.json(result.rows);
  });
});

app.get('/suppliers', (req, res) => {
  pool.query('SELECT * FROM suppliers', (error, result) => {
    res.json(result.rows);
  });
});

app.get('/products', (req, res) => {
  pool.query('SELECT p.product_name, s.supplier_name FROM products p INNER JOIN suppliers s ON p.supplier_id = s.id', (error, result) => {
      res.json(result.rows);
    }
  );
});

app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});