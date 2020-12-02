const express = require("express");

const app = express();


const { Pool } = require('pg');

const pool = new Pool({
    user: 'murse',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'Mursel1299.',
    port: 5432
});

app.get ('/customers', (req, res) => {
    pool.query ('SELECT * FROM  customers', (error, result) => {
      res.json (result.rows);
    });
  });


app.get ('/suppliers', (req, res) => {
    pool.query ('SELECT * FROM suppliers', (error, result) => {
      res.json (result.rows);
    });
  });


app.get ('/products', (req, res) => {
    pool.query (
      'SELECT products.product_name,suppliers.supplier_name FROM products INNER JOIN suppliers ON suppliers.id = products.supplier_id',
      (error, result) => {
        res.json (result.rows);
      }
    );
  });
//testing
  app.get ('/orders', (req, res) => {
    pool.query (
      'SELECT * FROM orders WHERE customer_id = 1',
      (error, result) => {
        res.json (result.rows);
      }
    );
  });


app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});