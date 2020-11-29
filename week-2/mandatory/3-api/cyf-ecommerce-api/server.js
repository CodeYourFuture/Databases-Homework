const express = require("express");
const app = express();
const { Pool } = require("pg");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const pool = new Pool({
  user: "",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/customers", function (req, res) {
   
      pool.query("SELECT * FROM customers")
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
});
app.get("/suppliers", function (req, res) {
    pool
      .query("SELECT * FROM suppliers")
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
});
app.get("/products", function (req, res) {
    pool
      .query("SELECT products.product_name, suppliers.supplier_name FROM products INNER JOIN suppliers ON products.supplier_id = suppliers.id ")
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
});


app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

