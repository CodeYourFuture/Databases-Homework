const express = require("express");
const app = express();
app.use(express.json());
// app.use(express.urlencoded());
require('dotenv').config();

const { Pool } = require("pg");

const pool = new Pool({
  user: "osagie",
  host: "localhost",
  database: "cyf_ecommerce",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get("/products", function (req, res) {
  let queryList = req.query.name; 
  // let queryList = req.query.search; // e.g this will still work with search, term or any other words.
  if(queryList) {
    query = `SELECT * FROM products WHERE product_name LIKE '%${queryList}%'`;
  };
  pool
    .query(query)
    .then((result) => res.status(200).json(result.rows))
    .catch((e) => console.error(e));
}); 
 
app.get("/customers/:id", function (req, res) {
  const customerId = req.params.id;
  pool
    .query("SELECT * FROM customers WHERE id = $1", [customerId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.post("/customers", (req, res) => {
  const newCustomerName = req.body.name;
  const newCustomerAddress = req.body.address;
  const newCustomerCity = req.body.city;
  const newCustomerCountry = req.body.country;

  const query =
    "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4) returning *";
  pool
    .query(query, [
      newCustomerName,
      newCustomerAddress,
      newCustomerCity,
      newCustomerCountry,
    ])
    .then(() => res.json(query.rows))
    .catch((e) => console.error(e));
});

app.post("/products", (req, res) => {
  console.log(req.params.id);
  const newProductName = req.body.product_name;
  const newUnitPrice = req.body.unit_price;
  const supplierId = req.body.id;
  if (!Number.isInteger(newUnitPrice)) {
    return res.status(400).send("Product unit price must be an integer");
  }
  pool
    .query("SELECT * FROM suppliers WHERE id=$1", [supplierId])
    .then((result) => {
      if (result.rows.length > 0) {
        const query =
          "INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3)";
        pool
          .query(query, [newProductName, newUnitPrice, supplierId])
          .then((result) => res.json(result.rows))

          .catch((e) => console.error(e));
      } else {
        return res.status(404).send("The supplier does not exist on the database!");
      }
    });
});

app.post("/customers/:customerId/orders", (req, res) => {
  const newOrderDate = req.body.order_date;
  const newOrderRef = req.body.order_reference;  
  const customerId = req.body.customerId;
  // const customerId = req.body.customer_id;
 
  pool
    .query("SELECT * FROM orders WHERE customer_id=$1", [customerId])
    .then((result) => {
      if (result.rows.length > 0) {
        const query =
          "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)";
        pool
          .query(query, [newOrderDate, newOrderRef, customerId])
          .then((result) => res.json(result.rows))

          .catch((e) => console.error(e));
      } else {
        return res.status(404).send("The customer is not valid!");
      }
    });
    console.log("result.rows.length");
});

app.put("/customers/:customerId", (req, res) => {
  const newCustomerId = req.params.customerId;
  const newCustomerName = req.body.name;
  const newCustomerAddress = req.body.address;
  const newCustomerCountry = req.body.country;

  const query =
    "UPDATE customers SET name = $1, address = $2, country = $3 WHERE id = $4";
  pool
    .query(query, [
      newCustomerName,
      newCustomerAddress,
      newCustomerCountry,
      newCustomerId
    ])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
})

app.delete("/orders/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const query1 = "DELETE FROM order_items WHERE order_id = $1";
  const query2 = "DELETE FROM orders WHERE id = $1";

  pool.query(query1, [orderId])
  .then (() => {
    pool
    .query(query2, [orderId])
    .then (() => res.send(`Order ${orderId} is deleted!`))
    .catch((e) => console.error(e));
    })
   .catch((e) => console.error(e));
});

// I couldn't test this on Postman as order_date and order_reference are set to NOT NULL
// So an Order must have both order_date and order_reference as FK
app.delete("customers/:customerId", (req, res) => {
  const customerId = req.params.customerId;
  const query1 = "SELECT * FROM orders WHERE customer_id = $1";
  const query2 = "DELETE * FROM customers WHERE id = $1";
  pool
  .query(query1, customerId)
  .then ((result) => {
    if(result.rows.length > 0) {
      res.send(`The customer ${customerId} has an order`);
    }
    else {
      pool
        .query(query2, [customerId])
        .then(() => res.send(`Customer ${customerId} is deleted!`))
        .catch((e) => console.error(e));
    }
  });
});

app.get("/customers/:customerId/orders", function (req, res) {
  let customerId = req.params.customerId;
  let query =
    "SELECT o.order_reference, o.order_date, p.product_name, p.unit_price, s.supplier_name, i.quantity FROM customers c, orders o, products p, order_items i, suppliers s WHERE c.id= o.customer_id AND o.id=i.order_id AND i.product_id=p.id AND s.id=p.supplier_id AND c.id=$1";
  pool
  .query(query, [customerId])
  .then((result) => res.json(result.rows))
  .catch((e) => console.error(e));
});

app.listen(3005, function () {
  console.log("Server is listening on port 3005. Ready to accept requests!");
});
