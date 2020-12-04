const { request, response } = require("express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

//2. Add a new GET endpoint `/customers/:customerId` to load a single customer by ID.
//LOAD A SINGLE CUSTOMER BY ID
app.get("/customers/:customerId", (request, response) => {
  const customerId = request.params.customerId;
  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => response.json(result.rows))
    .catch((err) => console.log(err));
});

// 3.Add a new POST endpoint `/customers` to create a new customer.
//  CREATE A NEW CUSTOMER
app.post("/customers", (request, response) => {
  const { name, address, city, country } = request.body;
  if (!name || !address || !city || !country) {
    return response.status(400).send("Please complete all the fields!");
  }
  pool
    .query("SELECT * FROM customers WHERE name=$1", [name])
    .then((result) => {
      if (result.rowCount > 0) {
        response.status(400).send("Customer already exists!");
      } else {
        pool
          .query(
            "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)",
            [name, address, city, country]
          )
          .then(() => response.send("New customer successfully added!"))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});
//6. Add a new PUT endpoint `/customers/:customerId` to update an existing customer (name, address, city and country).
//UPDATE AN EXISTING CUSTOMER
app.put("/customers/:customerId", (request, response) => {
  const customerId = request.params.customerId;
  const {
    name: newName,
    address: newAddress,
    city: newCity,
    country: newCountry,
  } = request.body;
  if (!newName || !newAddress || !newCity || !newCountry) {
    return response.status(400).send("Please complete all fields!");
  }
  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => {
      const { name, address, city, country } = result.rows[0];
      pool
        .query(
          "UPDATE customers SET name=$1, address=$2, city=$3, country=$4  WHERE id=$5",
          [
            newName || name,
            newAddress || address,
            newCity || city,
            newCountry || country,
            customerId,
          ]
        )
        .then(() => response.send(`Customer ${customerId} updated!`))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

//9. Add a new GET endpoint `/customers/:customerId/orders` to load all the orders along the items in the orders of a specific customer. Especially, the following information should be returned: order references, order dates, product names, unit prices, suppliers and quantities.
//GET ALL ITEMS IN THE ORDERS OF A SPECIFIC CUSTOMER
app.get("/customers/:customerId/orders", (request, response) => {
  const customerId = request.params.customerId;
  pool
    .query(
      "SELECT o.order_reference, o.order_date, p.product_name, p.unit_price, s.supplier_name, i.quantity FROM customers c, orders o, products p, order_items i, suppliers s WHERE c.id= o.customer_id AND o.id=i.order_id AND i.product_id=p.id AND s.id=p.supplier_id AND c.id=$1",
      [customerId]
    )
    .then((result) => response.json(result.rows))
    .catch((err) => console.log(err));
});

//5. Add a new POST endpoint `/customers/:customerId/orders` to create a new order (including an order date, and an order reference) for a customer. Check that the customerId corresponds to an existing customer or return an error.
//ADD A NEW ORDER
app.post("/customers/:customerId/orders", (request, response) => {
  const customerId = request.params.customerId;
  const { order_date, order_reference, customer_id } = request.body;
  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => {
      if (result.rowCount === 0) {
        response
          .status(400)
          .send("Customer does not exist, please add a correct customer Id!");
      } else {
        pool
          .query(
            "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)",
            [order_date, order_reference, customer_id]
          )
          .then(() =>
            response.send(`New order for customer ${customerId} completed!`)
          )
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

//8. Add a new DELETE endpoint `/customers/:customerId` to delete an existing customer only if this customer doesn't have orders.
//DELETE AN EXISTING CUSTOMER ONLY IF HE HAS NO ORDERS
app.delete("/customer/:customerId", (request, response) => {
  const customerId = request.params.customerId;
  pool
    .query("SELECT FROM customers WHERE id=$1", [customerId])
    .then((result) => {
      if (result.rowCount === 0) {
        response
          .status(400)
          .send(
            `Customer ${customerId} does not exist, please enter a correct customer Id!`
          );
      } else {
        pool
          .query("SELECT * FROM orders WHERE customer_id=$1", [customerId])
          .then((result) => {
            if (result.rowCount > 0) {
              response
                .status(400)
                .send(
                  `Customer ${customerId} has existing orders, customers with existing orders cannot be deleted!`
                );
            } else {
              pool
                .query("DELETE FROM customers WHERE id=$1", [customerId])
                .then(() => response.send(`Customer ${customerId} deleted!`))
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

//RETRIEVE ALL THE SUPPLIERS
app.get("/suppliers", (request, response) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    response.json(result.rows);
  });
});

//RETRIEVE PRODUCTS
app.get("/all-products", (request, response) => {
  pool
    .query("SELECT * FROM products")
    .then((result) => response.json(result.rows))
    .catch((err) => console.log(err));
});

//1. Update the previous GET endpoint `/products` to filter the list of products by name using a query parameter, for example `/products?name=Cup`. This endpoint should still work even if you don't use the `name` query parameter!
//RETRIEVE PRODUCT NAMES & SUPPLIER'S NAME
app.get("/products", (request, response) => {
  const productNameQuery = request.query.name;
  let query =
    "SELECT p.product_name, s.supplier_name FROM products p, suppliers s WHERE s.id = p.supplier_id";
  if (productNameQuery) {
    query = `SELECT p.product_name, s.supplier_name FROM products p, suppliers s WHERE s.id=p.supplier_id AND LOWER(product_name) LIKE LOWER('%${productNameQuery}%')`;
  }
  pool
    .query(query)
    .then((result) => response.json(result.rows))
    .catch((err) => console.log(err));
});

//4. Add a new POST endpoint `/products` to create a new product (with a product name, a price and a supplier id). Check that the price is a positive integer and that the supplier ID exists in the database, otherwise return an error.
//ADD A NEW PRODUCT
app.post("/products", (request, response) => {
  const { product_name, unit_price, supplier_id } = request.body;
  if (!Number.isInteger(unit_price) || unit_price <= 0) {
    return response.status(400).send("Enter an accurate price");
  }
  pool
    .query("SELECT * FROM suppliers WHERE id=$1", [supplier_id])
    .then((result) => {
      if (result.rowCount === 0) {
        response
          .status(400)
          .send("Supplier does not exist, please enter a correct supplier Id!");
      } else {
        pool
          .query(
            "INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3)",
            [product_name, unit_price, supplier_id]
          )
          .then(() => response.send("Product successfully added!"))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

//7. Add a new DELETE endpoint `/orders/:orderId` to delete an existing order along all the associated order items.
//DELETE AN ORDER ALONG WITH ASSOCIATED ORDER ITEMS
app.delete("/orders/:orderId", (request, response) => {
  const orderId = request.params.orderId;
  pool
    .query("DELETE FROM order_items WHERE order_id=$1", [orderId])
    .then(() => {
      pool
        .query("DELETE FROM orders WHERE id=$1", [orderId])
        .then(() => response.send(`Order ${orderId} Successfully deleted`))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
