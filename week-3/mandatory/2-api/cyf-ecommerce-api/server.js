const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const { Pool } = require('pg');

const pool = new Pool({
    user: 'ameer',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'ameer',
    port: 5432
});

/** Start SQL Week-3 Homework **/

/* Update the previous GET endpoint /products to filter the list of products by name using a query parameter, for example /products?name=Cup. This endpoint should still work even if you don't use the name query parameter! */
app.get("/products", function(req, res) {
  const productNameQuery = req.query.name;
  let query = "SELECT products.product_name, suppliers.supplier_name FROM products INNER JOIN suppliers on products.supplier_id = suppliers.id ORDER BY product_name"
  if(productNameQuery){
    query = `SELECT products.product_name, suppliers.supplier_name FROM products INNER JOIN suppliers on products.supplier_id = suppliers.id WHERE products.product_name LIKE '%${productNameQuery}%' ORDER BY product_name`
  }
  pool.query(query) 
      .then((result) => res.json(result.rows)) 
      .catch((e) => console.error(e));
});
/*Add a new GET endpoint /customers/:customerId to load a single customer by ID. */
app.get("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;
  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});
/* Add a new POST endpoint /customers to create a new customer. */
app.post("/customers", function (req, res) {
  const newCustomerName = req.body.name;
  const newAddress = req.body.address;
  const newCity = req.body.city;
  const newCountry = req.body.country;

  pool.query("SELECT * FROM customers WHERE name=$1", [newCustomerName])
    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(400).send("A customer with the same name already exists!");
      } else {
          const query =
          "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
          pool.query(query, [newCustomerName, newAddress, newCity, newCountry])
          .then(() => res.send("customer Added!"))
          .catch((e) => console.error(e));
      }
  });
});
/* Add a new POST endpoint /products to create a new product (with a product name, a price and a supplier id). Check that the price is a positive integer and that the supplier ID exists in the database, otherwise return an error. */
app.post('/products', function (req, res) {
  const newProductName = req.body.product_name;
  const newProductPrice = req.body.unit_price;
  const newProductSupplier = req.body.supplier_id;

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
/* Add a new POST endpoint /customers/:customerId/orders to create a new order (including an order date, and an order reference) for a customer. Check that the customerId corresponds to an existing customer or return an error. */
app.post('/customers/:customerId/orders', function (req, res) {
  const newOrderDate = req.body.order_date;
  const newOrderReference = req.body.order_reference;
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
/* Add a new PUT endpoint /customers/:customerId to update an existing customer (name, address, city and country). */
app.put("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;
  const newName = req.body.name;
  const newAddress = req.body.address;
  const newCity = req.body.city;
  const newCountry= req.body.country;
  let sql = "";
  if(newName !== undefined){
    sql += "name ='" + newName + "',"  
  }
  if(newAddress !== undefined){
    sql += "address ='" + newAddress + "',"  
  }
  if(newCity !== undefined){
    sql += "city ='" + newCity + "',"  
  }
  if(newCountry !== undefined){
    sql += "country ='" + newCountry + "',"  
  }
  sql = sql.substring(0, sql.length-1);
  sql= "UPDATE customers SET " + sql + " WHERE id = "+ customerId; 
  console.log(sql);
  pool
  .query(sql)
  .then(() => res.send(`Customer ${customerId} updated!`))
  .catch((e) => console.error(e));
});
/* Add a new DELETE endpoint /orders/:orderId to delete an existing order along all the associated order items. */
app.delete("/orders/:orderId", function (req, res) {
  const orderId = req.params.orderId;
  pool
  .query("DELETE FROM order_items WHERE order_id=$1", [orderId])
  .then(() => {
    pool
      .query("DELETE FROM orders WHERE id=$1", [orderId])
      .then(() => res.send(`Order ${orderId} deleted!`))
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));
});
/* Add a new DELETE endpoint /customers/:customerId to delete an existing customer only if this customer doesn't have orders. */
app.delete("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;
  pool
    .query("DELETE FROM customers WHERE id=$1", [customerId])
    .then(() => res.send(`Customer ${customerId} deleted!`))
    .catch((e) => console.error(e));
});
/* Add a new GET endpoint /customers/:customerId/orders to load all the orders along the items in the orders of a specific customer. Especially, the following information should be returned: order references, order dates, product names, unit prices, suppliers and quantities. */
app.get('/customers/:customerId/orders', (req, res)=> {
  const {customerId} = req.params;
  let query = 'SELECT c.name, o.order_date, o.order_reference, oi.quantity, p.product_name,    p.unit_price, s.supplier_name FROM customers AS c INNER JOIN orders AS o ON c.id=o.customer_id INNER JOIN order_items AS oi ON o.id=oi.order_id INNER JOIN products AS p ON p.id=oi.product_id INNER JOIN suppliers AS s ON s.id=p.supplier_id WHERE c.id=$1';

  pool
  .query(query, [customerId] )
  .then((result) => res.json(result.rows))
  .catch(e => {
      console.error(e);
  })
});
/** End of SQL Week-3 Homework **/
app.listen(3000, function() {
console.log("Server is listening on port 3000. Ready to accept requests!");
}); 


