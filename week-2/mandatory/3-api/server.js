if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "cyf_ecommerce",
	password: "12345",
	port: 5432,
});
app.get("/", function (req, res) {
	res.json('Hello you are connected to the server!');
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
app.get("/products", function (req, res) {
	pool.query(
		"SELECT  supplier_name ,product_name FROM suppliers INNER JOIN PRODUCTS ON products.supplier_id=suppliers.id ",
		(error, result) => {
			res.json(result.rows);
		}
	);
});

app.listen(3000, function () {
	console.log("Server is listening on port 3000. Ready to accept requests!");
});
