const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const { Pool } = require("pg");
const pool = new Pool({
  user: "lawal",
  password: "Olushola1",
  host: "localhost",
  database: "cyf_ecommerce",
  port: 5432,
});
//RETRIEVE ALL THE CUSTOMERS
app.get("/customers", (request, response) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    response.json(result.rows);
  });
});
//RETRIEVE ALL THE SUPPLIERS
app.get("/suppliers", (request, response) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    response.json(result.rows);
  });
});

//RETRIEVE PRODUCT NAMES & SUPPLIER'S NAME
app.get("/products", (request, response) => {
  pool.query(
    "SELECT p.product_name, s.supplier_name FROM products p, suppliers s WHERE s.id = p.supplier_id",
    (error, result) => {
      response.json(result.rows);
    }
  );
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
