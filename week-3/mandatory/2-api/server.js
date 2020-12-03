if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const { Pool } = require("pg");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "cyf_ecommerce",
	password: "12345",
	port: 5432,
});
app.get("/", function (req, res) {
	res.json("Hello you are connected to the server!");
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
		.then((result) => {
			if (result.rows.length === 0) {
				return res
					.status(400)
					.send(`There is no customer with id ${customerId} `);
			} else {
				return res.json(result.rows);
			}
		})
		.catch((e) => console.error(e));
});

app.post("/customers", function (req, res) {
	const newCustomerName = req.body.name;
	const newCustomerAddress = req.body.address;

	const newCustomerCity = req.body.city;
	const newCustomerCountry = req.body.country;

	pool
		.query("SELECT * FROM customers WHERE name=$1", [newCustomerName])
		.then((result) => {
			if (result.rows.length > 0) {
				return res
					.status(400)
					.send("A customer with the same name already exists!");
			} else {
				const query =
					"INSERT INTO customers (name,address,city,country) VALUES ($1, $2, $3,$4)";
				pool
					.query(query, [
						newCustomerName,
						newCustomerAddress,
						newCustomerCity,
						newCustomerCountry,
					])
					.then(() => res.send("new Customer created!"))
					.catch((e) => console.error(e));
			}
		});
});

app.get("/suppliers", function (req, res) {
	pool.query("SELECT * FROM suppliers", (error, result) => {
		res.json(result.rows);
	});
});
app.get("/products", function (req, res) {
	// searchedTyped = req.query.name
	const searchedWord = req.query.name;
	if (!searchedWord) {
		pool.query(
			"SELECT  supplier_name ,product_name FROM suppliers INNER JOIN PRODUCTS ON products.supplier_id=suppliers.id ",
			(error, result) => {
				res.json(result.rows);
			}
		);
	} else {
		pool
			.query(
				"SELECT  supplier_name ,product_name FROM suppliers INNER JOIN PRODUCTS ON products.supplier_id=suppliers.id WHERE  product_name LIKE $1",
				[`%${searchedWord}%`]
			)
			.then((result) => {
				if (result.rows.length === 0) {
					return res
						.status(400)
						.send(`No product found with the name :${searchedWord}`);
				} else {
					res.json(result.rows);
				}
			})
			.catch((e) => console.error(e));
	}
});

//Add a new POST endpoint /products to create a new product (with a product name, a price and a supplier id). Check that the price is a positive integer and that the supplier ID exists in the database, otherwise return an error

app.post("/products", function (req, res) {
	const newProduct_name = req.body.product_name;
	const newUnit_price = req.body.unit_price;
	const supplier_id = req.body.supplier_id;

	pool
		.query("SELECT * FROM suppliers WHERE id=$1 ", [supplier_id])
		.then((result) => {
			if (result.rows.length === 0) {
				return res
					.status(400)
					.send(
						`Product ${newProduct_name} has no supplier, cannot add it to the list!`
					);
			} else if (newUnit_price < 0) {
				return res
					.status(400)
					.send(
						`Product price cannot be a negative number, Please enter a positive number!`
					);
			} else {
				pool
					.query("SELECT * FROM products WHERE product_name=$1", [
						newProduct_name,
					])
					.then((result) => {
						if (result.rows.length > 0) {
							return res
								.status(400)
								.send(
									`Product name ${newProduct_name} already exists! please enter another one`
								);
						} else {
							pool
								.query(
									"INSERT INTO products (product_name,unit_price,supplier_id) VALUES ($1,$2,$3)",
									[newProduct_name, newUnit_price, supplier_id]
								)
								.then(() => res.send("new product added"))
								.catch((error) => console.error(error));
						}
					});
			}
		});
});

app.post("/customers/:customerId/orders", function (req, res) {
	const customerId = req.params.customerId;
	const newOrder_date = req.body.order_date;
	const newOrder_reference = req.body.order_reference;
	pool
		.query("SELECT * FROM customers WHERE id=$1", [customerId])

		.then((result) => {
			if (result.rows.length === 0) {
				return res
					.status(400)
					.send("This order has no customer! please enter a valid customer id");
			} else {
				pool
					.query(
						"INSERT INTO orders (order_date,order_reference, customer_id) VALUES ($1,$2,$3)",
						[newOrder_date, newOrder_reference, customerId]
					)
					.then(() => res.send("new product added"))
					.catch((error) => console.error(error));
			}
		});
});

app.put("/customers/:customer_id", function (req, res) {
	const customer_id = req.params.customer_id;
	const updatedName = req.body.name;
	const updatedAddress = req.body.address;
	const updatedCity = req.body.city;
	const updatedCountry = req.body.country;
	pool
		.query("SELECT * FROM customers WHERE id=$1", [customer_id])
		.then((result) => {
			if (result.rows.length === 0) {
				return res
					.status(400)
					.send(
						`There is no customer with the id ${customer_id} to update ! please enter a valid customer id`
					);
			} else {
				pool
					.query(
						"UPDATE customers SET name=$1,address=$2,city=$3,country=$4 WHERE id=$5",
						[
							updatedName,
							updatedAddress,
							updatedCity,
							updatedCountry,
							customer_id,
						]
					)
					.then(() =>
						res.send(`customer with id ${customer_id} has been updated`)
					)
					.catch((e) => console.error(e));
			}
		});
});
app.delete("/orders/:orderId", function (req, res) {
	const orderId = req.params.orderId;
	pool.query("SELECT * FROM orders WHERE id=$1", [orderId]).then((result) => {
		if (result.rows.length === 0) {
			return res
				.status(400)
				.send(`No order found with id : ${orderId}! please enter a valid id.`);
		} else {
			pool
				.query("DELETE FROM order_items WHERE order_id=$1", [orderId])
				.then(() => {
					pool
						.query("DELETE FROM orders WHERE id=$1", [orderId])
						.then(
							res.send(
								`order with id ${orderId} has been deleted successfully!`
							)
						);
				});
		}
	});
});

app.delete("/customers/:customerId", function (req, res) {
	const customerId = req.params.customerId;
	pool
		.query("SELECT * FROM orders WHERE customer_id=$1", [customerId])
		.then((result) => {
			if (result.rows.length > 0) {
				return res
					.status(400)
					.send(
						`cannot delete customer with id ${customerId}! since he/she has orders`
					);
			} else {
				pool
					.query("DELETE FROM customers WHERE id=$1", [customerId])
					.then(() => {
						res
							.send(
								`order with id ${customerId} has been deleted successfully!`
							)
							.catch((e) => console.error(e));
					});
			}
		});
});
app.get("/customers/:customerId/orders", function (req, res) {
	const customerId = req.params.customerId;
	pool
		.query("SELECT * FROM customers WHERE id=$1", [customerId])
		.then((result) => {
			if (result.rows.length === 0) {
				return res
					.status(400)
					.send(
						`No customer with id ${customerId} found! please enter a valid customer id.`
					);
			} else {
				pool
					.query("SELECT * FROM orders WHERE customer_id=$1", [customerId])
					.then((result) => {
						if (result.rows.length === 0) {
							return res
								.status(400)
								.send(
									`The customer with id: ${customerId} has no orders, please enter another customer id.`
								);
						} else {
							pool
							
								.query(
									"SELECT orders.order_reference , orders.order_date  , products.product_name , products.unit_price , suppliers.supplier_name , order_items.quantity  FROM orders INNER JOIN order_items ON order_items.order_id= orders.id INNER JOIN  products ON products.id=order_items.product_id INNER JOIN suppliers ON suppliers.id= products.supplier_id INNER JOIN customers ON customers.id=orders.customer_id WHERE customers.id=$1",
									[customerId]
								)
								.then((result) => {
									return res.json(result.rows);
								})
								.catch((e) => console.error(e));
						}
					});
			}
		});
});

app.listen(3000, function () {
	console.log("Server is listening on port 3000. Ready to accept requests!");
});
