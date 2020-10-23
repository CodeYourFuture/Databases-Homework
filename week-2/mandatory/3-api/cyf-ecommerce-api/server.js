const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  ser: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/customers", (req, res) => {
  pool.query("select * from customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/suppliers", (req, res) => {
  pool.query("select * from suppliers", (error, result) => {
    res.json(result.rows);
  });
});


app.get("/products", (req, res) => {
  pool.query(
    "SELECT products.product_name, suppliers.supplier_name FROM orders INNER JOIN customers ON orders.customer_id = customers.id INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN products ON products.id = order_items.product_id INNER JOIN suppliers ON products.supplier_id = suppliers.id;",
    (error, result) => {
      res.json(result.rows);
    });
});

app.listen(3200, () => {
  console.log("Server is listening on port 3200!");
});
