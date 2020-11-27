const express = require(`express`);
const app = express();
const port = 3000;

/* I wasn't able to run the server because I couldn't access the postgres database on my computer,
 however I written the code that I think would run if I was able to access it. */

const { Pool } = require(`pg`);

const pool = new Pool({
    user: `postgres`,
    host: `localhost`,
    database: `cyf_ecommerce`,
    password: ``,
    port: 5432
});


app.get(`/`, function (req, res) {
    res.send(`Welcome to the cyf E-commerce api server.`);
});

app.get(`/customers`, function (req, res) {
    pool.query(`SELECT * FROM customers`, function (error, result) {
        res.json(result.rows);
    });
});

app.get(`/suppliers`, function (req, res) {
    pool.query(`SELECT * FROM suppliers`, function (error, result) {
        res.json(result.rows);
    });
});

app.get(`/products`, function (req, res) {
    pool.query(`SELECT products.product_name, products.unit_price, suppliers.supplier_name `
        + `FROM products INNER JOIN suppliers ON suppliers.id = products.supplier_id`,
        function(error, result) {
            res.json(result.rows);
        });
});

app.listen(port, function() {
    console.log(`Server is listening on port ${port}. Ready to accept requests!`);
});
