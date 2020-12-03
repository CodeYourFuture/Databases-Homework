const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER,
  host: "localhost",
  database: "cyf_ecommerce",
  password: process.env.PASSWORD,
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;

  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.post("/customers", function (req, res) {
  const newCustomerName = req.body.name;
  const newCustomerAddress = req.body.address;
  const newCustomerCity = req.body.city;
  const newCustomerCountry = req.body.country;

  pool
    .query("SELECT * FROM customers WHERE name=$1", [newCustomerName])
    .then((result) => {
      if (result.rows.length) {
        return res
          .status(400)
          .send("An customer with the same name already exists!");
      } else {
        const query =
          "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
        pool
          .query(query, [
            newCustomerName,
            newCustomerAddress,
            newCustomerCity,
            newCustomerCountry,
          ])
          .then(() => res.send("Customer created!"))
          .catch((e) => console.error(e));
      }
    });
});

app.put("/customers/:customerId", function (request, response) {
  const customerId = request.params.customerId;
  const { newName, newAddress, newCity, newCountry } = request.body;
  pool
    .query(`SELECT * FROM customers WHERE id=$1`, [customerId])
    .then((result) => {
      const { name, address, city, country } = result.rows[0];
      pool
        .query(
          "UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5",
          [
            !newName ? name : newName,
            !newAddress ? address : newAddress,
            !newCity ? city : newCity,
            !newCountry ? country : newCountry,
            customerId,
          ]
        )
        .then((result) =>
          result.rowCount
            ? response.send("Success!")
            : response.send(`Not found customer with id ${customerId}`)
        )
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
});

app.get("/customers/:customerId/orders", function (req, res) {
  const customerId = req.params.customerId;
  const orders = [];
  pool
    .query(
      "SELECT order_reference, order_date FROM orders WHERE orders.customer_id=$1",
      [customerId]
    )
    .then((result) =>
      result.rows.map((order) => {
        pool
          .query(
            "SELECT p.product_name, p.unit_price, s.supplier_name, oi.quantity" +
              " FROM orders o INNER JOIN order_items oi ON o.id=oi.order_id INNER JOIN products p ON p.id=oi.product_id " +
              "INNER JOIN suppliers s ON p.supplier_id=s.id WHERE o.order_reference=$1",
            [order.order_reference]
          )
          .then((lines) => {
            order.items = lines.rows;
            orders.push(order);
          })
          .catch((e) => console.error(e));
      })
    )
    .catch((e) => console.error(e));
  setTimeout(() => res.json(orders), 1000);
});

app.post("/customers/:customerId/orders", function (req, res) {
  const customerId = req.params.customerId;
  const orderItems = req.body.order_items;
  const orderDate = new Date();

  //Check if the user with id is present
  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => {
      if (!result.rows.length) {
        return res
          .status(400)
          .send(`A customer with the id ${customerId} doesn't exists!`);
      } else {
        //Check if all products are present
        orderItems.forEach((item) => {
          pool
            .query("SELECT id FROM products WHERE id=$1", [item.product_id])
            .then((result) => {
              if (!result.rowCount) {
                return res
                  .status(400)
                  .send(`Not found the product with id ${item.product_id}!`);
              }
            })
            .catch((e) => console.error(e));
        });
        //If it is Ok create a new order
        //Find the last order reference
        pool
          .query("SELECT MAX(REPLACE(order_reference,'ORD','')) FROM orders")
          .then((result) => {
            const orderNumber = "ORD" + ("00" + (+result.rows[0].max + 1)).slice(-3);
            //Create a new order
            pool
              .query(
                "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)",
                [orderDate, orderNumber, customerId]
              )
              .then(() =>
                pool
                  .query("SELECT id FROM orders WHERE order_reference=$1", [
                    orderNumber,
                  ])
                  .then((result) =>
                    orderItems.map((item) =>
                      pool
                        .query(
                          "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)",
                          [result.rows[0].id, item.product_id, item.quantity]
                        )
                        .catch((e) => console.error(e))
                    )
                  )
                  .then(() => res.send(`Order ${orderNumber} created.`))
                  .catch((e) => console.error(e))
              )
              .catch((e) => console.error(e));
          })

          .catch((e) => console.error(e));
      }
    });
});

app.post("/products", function (req, res) {
  const product_name = req.body.product_name;
  const unit_price = req.body.unit_price;
  const supplier_id = req.body.supplier_id;

  if (!Number.isInteger(unit_price) || unit_price < 0) {
    res.status(400).send("Unit price must be a positive number!");
  }

  pool
    .query("SELECT * FROM suppliers WHERE id=$1", [supplier_id])
    .then((result) => {
      if (!result.rows.length) {
        return res
          .status(400)
          .send(`Not found supplier with ID ${supplier_id}!`);
      } else {
        const query =
          "INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3)";
        pool
          .query(query, [product_name, unit_price, supplier_id])
          .then(() => res.send("Product created!"))
          .catch((e) => console.error(e));
      }
    });
});

app.get("/products", function (req, res) {
  const name = req.query.name;

  !name
    ? pool.query(
        `SELECT p.product_name, s.supplier_name FROM products p INNER JOIN suppliers s ON p.supplier_id=s.id`,
        (error, result) => {
          res.json(result.rows);
        }
      )
    : pool.query(
        `SELECT p.product_name, s.supplier_name FROM products p INNER JOIN suppliers s ON p.supplier_id=s.id WHERE LOWER(p.product_name) LIKE '%${name.toLowerCase()}%'`,
        (error, result) => {
          res.json(result.rows);
        }
      );
});

app.delete("/orders/:orderId", function (req, res) {
  const orderId = req.params.orderId;
  pool
    .query("DELETE FROM order_items WHERE order_id=$1", [orderId])
    .then(() =>
      pool
        .query("DELETE FROM orders WHERE id=$1", [orderId])
        .then(() => res.send("Success!"))
        .catch((e) => console.error(e))
    )
    .catch((e) => console.error(e));
});

app.delete("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;
  pool
    .query("SELECT * FROM orders WHERE customer_id=$1", [customerId])
    .then((result) => {
      if (result.rowCount) {
        res.send(
          `Can't delete customer with Id ${customerId} due to open orders.`
        );
      } else {
        pool
          .query("DELETE FROM customers WHERE id=$1", [customerId])
          .then(() => res.send("Success!"))
          .catch((e) => console.error(e));
      }
    })
    .catch((e) => console.error(e));
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
