const express = require("express");
const app = express();

require('dotenv').config();

const { Pool } = require("pg");

const pool = new Pool({
  user: "osagie",
  host: "localhost",
  database: "cyf_ecommerce",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// loads all the customers on the DB
app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

// loads all the suppliers on the DB
app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

// loads all products along with their supplier names
app.get("/products/suppliers", function (req, res) {
  pool.query(
    "SELECT product_name, supplier_name FROM products INNER JOIN suppliers ON products.supplier_id = supplier_id;",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

// Stretch goals
app.get("/orders", function (req, res) {
  pool.query("SELECT * FROM orders", (error, result) => {
    res.json(result.rows);
  });
});

// supplier from country as China
app.get("/supplier_china", function (req, res) {
  pool.query(
      "SELECT customers.name FROM customers, order_items, orders, products, suppliers WHERE customers.id = orders.customer_id AND orders.id = order_items.order_id AND products.id = order_items.product_id AND suppliers.id = products.supplier_id AND suppliers.country = 'China';", 
      (error, result) => {
    res.json(result.rows);
  });
}); 

app.get("/order_items", function (req, res) {
  pool.query("SELECT * FROM order_items", (error, result) => {
    res.json(result.rows);
  });
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
