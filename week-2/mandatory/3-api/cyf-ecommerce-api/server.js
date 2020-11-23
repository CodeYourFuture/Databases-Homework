const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: 'localhost',
  database: 'cyf_ecommerce',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('hihi');
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
  pool.query(
    'SELECT p.product_name, s.supplier_name FROM products p INNER JOIN suppliers s ON p.supplier_id = s.id',
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.listen(PORT, () => console.log(`App listening on port ${PORT || 3000}`));
