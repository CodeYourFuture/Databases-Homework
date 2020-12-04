const express = require("express");
const app = express();
const { Pool } = require('pg');
require('dotenv').config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

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
    let { name } = req.query;
    let query = 'SELECT p.product_name, s.supplier_name FROM products p INNER JOIN suppliers s ON p.supplier_id = s.id';
    
    if (name) {
      query += `WHERE Lower(p.product_name) LIKE Lower('%${name}%')`;
    }
    
    pool
    .query(query, (error, result) => {
        res.json(result.rows);
    });
});

app.get('/customers/:customerId', function (req, res) {
    const { customerId } = req.params;
    
    pool
    .query(`SELECT * from customers c WHERE c.id = ${customerId}`)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.post('/customers', function (req, res) {
    const newCustomerName = req.body.name;
    const newCustomerAddress = req.body.address;
    const newCustomerCity = req.body.city;
    const newCustomerCountry = req.body.country;
    
    pool
    .query('SELECT * FROM customers WHERE name=$1', [newCustomerName])
    .then((result) => {
        if (result.rows.length > 0) {
            return res.status(400).send('An customer with the same name already exists!');
        } else {
            const query = "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
            
            pool
            .query(query, [
            newCustomerName,
            newCustomerAddress,
            newCustomerCity,
            newCustomerCountry,
        ])
            .then(() => res.send("Customer added!"))
            .catch((e) => console.error(e));
      }
    });
});

app.post('/products', function (req, res) {
    const newProductName = req.body.name;
    const newProductPrice = req.body.price;
    const newProductSupplier = req.body.supplier;
    
    pool
    .query('SELECT * FROM products WHERE supplier_id=$1', [newProductSupplier])
    .then((result) => {
        if (result.rows.length === 0) {
            return res.status(400).send("This supplier does not exist.");
        } else if (!Number.isInteger(newProductPrice) || newProductPrice <= 0) {
            return res.status(400).send("Invalid Price");
        } else {
            const query ="INSERT INTO products(product_name, unit_price, supplier_id) VALUES ($1, $2, $3)";
            
            pool
            .query(query, [newProductName, newProductPrice, newProductSupplier])
            .then(() => res.send("Product created!"))
            .catch((e) => console.error(e));
        }
    });
});

app.post('/customers/:customerId/orders', function (req, res) {
    const newOrderDate = req.body.date;
    const newOrderReference = req.body.reference;
    const customerId = req.params.customerId;
    
    pool
    .query('SELECT * FROM customers WHERE id = $1', [customerId])
    .then((result) => {
        if (result.rows.length === 0) {
            return res.status(400).send("This customer does not exist.");
        } else {
            const query = "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)";
            
            pool
            .query(query, [newOrderDate, newOrderReference, customerId])
            .then(() => res.send("Order created!"))
            .catch((e) => console.error(e));
        }
    });
});

app.put('/customers/:customerId', function (req, res) {
    const {customerId} = req.params;
    const newName = req.body.name;
    const newAddress = req.body.address;
    const newCity = req.body.city;
    const newCountry = req.body.country;
    
    pool
    .query('SELECT * FROM customers WHERE id = $1', [customerId])
    .then((result) => {
        if (result.rows.length === 0) {
            return res.status(400).send(`Customer with an id ${customerId} doesn't exist.`);
        } else {
            const query = "UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5";
            pool
            .query(query, [newName, newAddress, newCity, newCountry, customerId])
            .then(() => res.send(`Customer ${customerId} updated!`))
            .catch((e) => console.error(e));
        }
    });
});

app.delete('/orders/:orderId', function (req, res) {
    const {orderId} = req.params;
    
    pool
    .query("DELETE FROM orders WHERE id=$1", [orderId])
    .then(() => res.send(`Order ${orderId} deleted!`))
    .catch((e) => console.error(e));
});

app.delete('/customers/:customerId', function (req, res) {
    const {customerId} = req.params;
    
    pool
    .query('SELECT * FROM orders WHERE customer_id=$1', [customerId])
    .then((result) => {
        if (result.rows.length > 0) {
            return res.status(400).send("This customer has existing orders.");
        } else {
            pool
            .query("DELETE FROM customers WHERE id=$1", [customerId])
            .then(() => res.send(`Customer ${customerId} deleted!`))
            .catch((e) => console.error(e));
        }
    });
});

app.get('/customers/:customerId/orders', (req, res)=> {
    const {customerId} = req.params;
    let query = 'SELECT c.name, o.order_date, o.order_reference, oi.quantity, p.product_name, p.unit_price, s.supplier_name FROM customers AS c INNER JOIN orders AS o ON c.id=o.customer_id INNER JOIN order_items AS oi ON o.id=oi.order_id INNER JOIN products AS p ON p.id=oi.product_id INNER JOIN suppliers AS s ON s.id=p.supplier_id WHERE c.id=$1';

    pool
    .query(query, [customerId] )
    .then((result) => res.json(result.rows))
    .catch(e => {
        console.error(e);
    })
});

app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});