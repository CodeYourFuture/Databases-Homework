const express = require("express");
const app = express();

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
