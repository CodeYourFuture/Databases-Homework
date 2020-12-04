const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3000, function () {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});

const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cyf_ecommerce",
    password: "",
    port: 5432,
});
/* Add a new GET endpoint /customers/:customerId to load a single customer by ID. */
app.get("/customers/:customersId", function (req, res) {
    const customersId = req.params.customersId;

    pool.query("SELECT * FROM customers WHERE id=$1", [customersId])
        .then((result) => res.json(result.rows))
        .catch((e) => console.error(e));
});

app.get("/customers", function (req, res) {
    pool.query("SELECT * FROM customers", (error, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", function (req, res) {
    pool.query("SELECT * FROM suppliers", (error, result) => {
        res.json(result.rows);
    });
});

app.get("/orders", function (req, res) {
    pool.query("SELECT * FROM orders", (error, result) => {
        res.json(result.rows);
    });
});

app.get("/order_items", function (req, res) {
    pool.query("SELECT * FROM order_items", (error, result) => {
        res.json(result.rows);
    });
});
/* Add a new POST endpoint /products to create a new product (with a product name, a price and a supplier id). Check that the price is a positive integer and that the supplier ID exists in the database, otherwise return an error. */
app.post("/products", function (req, res) {
    const productName = req.body.product_name;
    const price = req.body.unit_price;
    const supplierId = req.body.supplier_id;

    if (!Number.isInteger(price) || price <= 0) {
        return res.status(400).send("The price should be a positive integer.");
    }

    pool.query("SELECT * FROM products WHERE product_name=$1", [
        productName,
    ]).then((result) => {
        if (result.rows.length > 0) {
            return res.status(400).send("This product already exists!");
        } else {
            const query =
                "INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3)";
            pool.query(query, [productName, price, supplierId])
                .then(() => res.send("Product created!"))
                .catch((e) => console.error(e));
        }
    });
});

/* Update the previous GET endpoint /products to filter the list of products by name using a query parameter, for example /products?name=Cup. This endpoint should still work even if you don't use the name query parameter! */
app.get("/products", function (req, res) {
    let productName = req.query.name;
    let query =
        "SELECT product_name, suppliers.supplier_name FROM products INNER JOIN suppliers ON suppliers.id=products.supplier_id";
    if (productName) {
        query = `SELECT product_name, suppliers.supplier_name FROM products INNER JOIN suppliers ON suppliers.id=products.supplier_id WHERE product_name LIKE '%${productName}%' ORDER BY product_name`;
    }
    pool.query(query)
        .then((result) => res.json(result.rows))
        .catch((e) => console.error(e));
});

/* Add a new POST endpoint /customers/:customerId/orders to create a new order (including an order date, and an order reference) for a customer. Check that the customerId corresponds to an existing customer or return an error. */
app.post("/customers/:customerId/orders", (req, res) => {
    const orderDate = req.body.order_date;
    const orderReference = req.body.order_reference;
    const customerId = req.params.customerId;

    pool.query("SELECT * FROM orders WHERE customer_id=$1", [customerId]).then(
        (result) => {
            if (result.rows.length === 0) {
                return res
                    .status(400)
                    .send("We can only take an order from an existing error!");
            } else {
                const query =
                    "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)";
                pool.query(query, [orderDate, orderReference, customerId])
                    .then(() => res.send("Order created!"))
                    .catch((e) => console.error(e));
            }
        }
    );
});
/* Add a new POST endpoint /customers to create a new customer. */
app.post("/customers", (req, res) => {
    const newCustomerName = req.body.name;
    const newCustomerAddress = req.body.address;
    const city = req.body.city;
    const country = req.body.country;

    pool.query("SELECT * FROM customers WHERE name=$1", [newCustomerName]).then(
        (result) => {
            if (result.rows.length > 0) {
                return res
                    .status(400)
                    .send("A customer with the same name already exists!");
            } else {
                const query =
                    "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
                pool.query(query, [
                    newCustomerName,
                    newCustomerAddress,
                    city,
                    country,
                ])
                    .then(() => res.send("Customer created!"))
                    .catch((e) => console.error(e));
            }
        }
    );
});
/* Add a new PUT endpoint /customers/:customerId to update an existing customer (name, address, city and country). */
app.put("/customers/:customerId", function (req, res) {
    const customerId = req.params.customerId;
    const name = req.body.name;
    const newAddress = req.body.address;
    const newCity = req.body.city;
    const country = req.body.country;
    if (!name || !newAddress || !newCity || !country) {
        return res.status(400).send("Please complete all fields");
    }
    pool.query(
        "UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5",
        [name, newAddress, newCity, country, customerId]
    )
        .then(() => res.send(`Customer ${customerId} updated!`))
        .catch((e) => console.error(e));
});

/* Add a new DELETE endpoint /orders/:orderId to delete an existing order along all the associated order items. */

app.delete("/orders/:orderId", function (req, res) {
    const orderId = req.params.orderId;

    pool.query("DELETE FROM order_items WHERE order_id=$1", [orderId])

        .then(() => {
            pool.query("DELETE FROM orders WHERE id=$1", [orderId])
                .then(() => res.send(`Order ${orderId} deleted!`))
                .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
});

/* Add a new DELETE endpoint /customers/:customerId to delete an existing customer only if this customer doesn't have orders. */

app.delete("/customers/:customerId", function (req, res) {
    const customerId = req.params.customerId;

    pool.query("SELECT * FROM orders WHERE customer_id = $1", [
        customerId,
    ]).then((result) => {
        if (result.rows.length > 0) {
            return res
                .status(400)
                .send(
                    "Not sure you want to do that..this customer has orders.."
                );
        } else {
            pool.query("DELETE FROM customers WHERE id=$1", [customerId])
                .then(() => res.send(`Customer ${customerId} deleted`))
                .catch((e) => console.error(e));
        }
    });
});

/* Add a new GET endpoint /customers/:customerId/orders to load all the orders along the items in the orders of a specific customer. Especially, the following information should be returned: order references, order dates, product names, unit prices, suppliers and quantities. */

app.get("/customers/:customersId/orders", function (req, res) {
    const customersId = req.params.customersId;

    pool.query(
        "SELECT customers.name, orders.order_reference, orders.order_date, order_items.quantity, products.product_name, products.unit_price, suppliers.supplier_name FROM customers INNER JOIN orders ON customers.id = orders.customer_id INNER JOIN order_items ON order_items.order_id=orders.id INNER JOIN products ON products.id = order_items.product_id INNER JOIN suppliers ON suppliers.id=products.supplier_id WHERE customers.id=$1",
        [customersId]
    )
        .then((result) => res.json(result.rows))
        .catch((e) => console.error(e));
});
