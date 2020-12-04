
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());


const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "Beatz",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Alomuddin91!",
  port: "5432",
});

// Add a new GET endpoint `/customers` to load all the customers from the database
app.get("/customers", function (req, res) {
  const Query="SELECT * FROM customers";
  pool.query(Query)
  .then((result) => res.send(result.rows))
  .catch((e) => console.log(e));
});

// Add a new GET endpoint `/suppliers` to load all the suppliers from the database
app.get("/suppliers", function (req, res) {

  const Query="SELECT * FROM suppliers";
  pool.query(Query)
  .then((result) => res.send(result.rows))
  .catch((e) => console.log(e));
});

// Add a new GET endpoint `/products` to load all the product names along with their supplier names
// Update the previous GET endpoint `/products` to filter the list of products by name using a query parameter, for example `/products?name=Cup`. This endpoint should still work even if you don't use the `name` query parameter!
app.get("/products", function (req, res) {
  let name = req.query.name;
  console.log(name);
  if(typeof (name)=="undefined")
  {
    console.log("Name is undefined")
     const Query="SELECT product_name, supplier_name FROM products INNER JOIN suppliers ON suppliers.id=products.supplier_id"; 
     pool.query(Query)
     .then((result) => res.send(result.rows))
     .catch((e) => console.log(e));
  }else{
    const Query="SELECT product_name, supplier_name FROM products INNER JOIN suppliers ON suppliers.id=products.supplier_id WHERE product_name=$1";
    pool.query(Query,[name])
    .then((result) => res.send(result.rows))
    .catch((e) => console.log(e));
  } 
});

// Add a new GET endpoint `/customers/:customerId` to load a single customer by ID
app.get("/customers/:customerId", function (req, res) {
    let {customerId} = req.params;
    console.log(customerId)
    if(typeof (customerId)!="undefined")
    {
      const Query="SELECT * FROM customers WHERE id=$1";
      pool.query(Query,[customerId])
      .then((result) => res.send(result.rows))
      .catch((e) => console.log(e));
    }
    else{
      res.send(false);
      console.log("Present Id");
    }
});

// Add a new POST endpoint `/customers` to create a new customer
app.post("/customers", function (req, res) {
  let {name} = req.body;
  let {address} = req.body;
  let {city} = req.body;
  let {country} = req.body;
  if(typeof (name)!="undefined" || typeof (address)!="undefined" || typeof (city)!="undefined" || typeof (country)!="undefined" )
  {
    const Query="INSERT INTO customers(name, address, city, country) VALUES($1,$2,$3,$4)";
      pool.query(Query, [name, address, city, country])
      .then(result => res.send("Details added")) // confirm if it has been added or not.
      .catch((e) => console.log(e));
  }else{
    res.send("Cannot write data, please fill in the missing fields")
  }
});

// Add a new POST endpoint /products to create a new product (with a product name, a price and a supplier id). Check that the price is a positive integer and that the supplier ID exists in the database, otherwise return an error.
app.post("/products", function (req, res) {
  if (!req.body) {
    return res.status(400).send("Body not found");
  }
  const newProductName = req.body.product_name;
  const newProductPrice = req.body.unit_price;
  const newProductSupplierId = req.body.supplier_id;
  if (!Number.isInteger(newProductPrice) || newProductPrice <= 0) {
    console.log(newProductPrice);
    return res
      .status(400)
      .send("The price of products should be a positive integer.");     
  }
  pool
    .query("SELECT * FROM suppliers WHERE id =$1", [newProductSupplierId])
    .then((result) => {
      if (!result.rows.length) {
        return res
          .status(400)
          .send(`Supplier with the ${newProductSupplierId} does not exists!`);
      }});
        const query =
          "INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3)";
        pool
          .query(query, [newProductName, newProductPrice, newProductSupplierId])
          .then(() => res.send("product has been created!"))
          .catch((e) => console.error(e));
});

// Add a new POST endpoint /customers/:customerId/orders to create a new order (including an order date, and an order reference) for a customer. Check that the customerId corresponds to an existing customer or return an error.
app.post("/customers/:customerId/orders", function (req, res) {
  if (!req.body) {
    return res.status(400).send("Body not found");
  }

  let {order_date} = req.body;
  let {order_reference} = req.body; 
  let customer_id = req.params.customerId;

 if(typeof (order_date)=="undefined" || typeof (order_reference)=="undefined" || typeof (customer_id)=="undefined" )
  {
    res.send("There is a missing field");
  }
  pool
    .query("SELECT * FROM customers WHERE id =$1", [customer_id])
    .then((result) => {
      if (!result.rows.length) {
        return res
          .status(400)
          .send(`Customer with the ${customer_id} does not exist!`);
      }});
  const query =
    "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)";
  pool
    .query(query, [order_date, order_reference, customer_id])
    .then(() => res.send("Order created!"))
    .catch((e) => console.error(e));
});

// Add a new PUT endpoint /customers/:customerId to update an existing customer (name, address, city and country)
app.put("/customers/:customerId", function (req, res) {
  let customer_id = req.params.customerId;
  let {name} = req.body;
  let {address} = req.body;
  let {city} = req.body;
  let {country} = req.body;
  if(typeof (name)!="undefined" || typeof (address)!="undefined" || typeof (city)!="undefined" || typeof (country)!="undefined" || typeof (customer_id)!="undefined" )
  {
    const Query="UPDATE customers SET name = $1, address = $2, city=$3,country=$4 WHERE id=$5;";
      pool.query(Query,[name,address,city,country,customer_id])
      .then(result => res.send("It has been updated")) // confirm if it has been added or not.
      .catch((e) => console.log(e));
  }
  
  else{
    res.send("Cannot write data, please fill in the missing fields")
  }
});

// Add a new DELETE endpoint /orders/:orderId to delete an existing order along all the associated order items
app.delete("/orders/:orderId", function (req, res) {
  if (!req.body) {
    return res.status(400).send("Body not found");
  }
 
  let order_id = req.params.orderId;

 if(typeof (order_id) == "undefined" )
  {
    res.send("missing Id");
  }
  const Query="DELETE FROM orders WHERE id=$1";
  pool.query(Query, [order_id])
  .then(result => res.send("Order deleted"))
  .catch((e) => console.log(e))
});

// Add a new DELETE endpoint /customers/:customerId to delete an existing customer only if this customer doesn't have orders
app.delete("/customers/:customerId", function (req, res) {
  if (!req.body) {
    return res.status(400).send("Body not found");
  }
 
  let customer_id = req.params.customerId;

 if(typeof customer_id == "undefined" )
  {
    res.send("Missing Id");
  }

  pool
    .query("SELECT * FROM orders WHERE customer_id =$1", [customer_id])
    .then((result) => {
      if (result.rows.length) {
        res.send("This customer has orders, we can not delete")
      }});
  const Query="DELETE FROM customers WHERE id=$1";
    pool.query(Query,[customer_id])
    .then(result => res.send("Deleted customer with no orders"))
    .catch((e) => console.log(e))
});

// Add a new GET endpoint /customers/:customerId/orders to load all the orders along the items in the orders of a specific customer
// Especially, the following information should be returned: order references, order dates, product names, unit prices, suppliers and quantities.
app.get("/customers/:customerId/orders", function (req, res) {

  let customer_id=req.params.customerId;

 if(typeof (customer_id) == "undefined" )
  {
    res.send("Missing Id");
  }
  const Query="SELECT order_reference, order_date, unit_price, supplier_name, quantity FROM orders INNER JOIN order_items ON order_items.order_id=orders.id INNER JOIN products ON products.id= order_items.product_id INNER JOIN suppliers ON suppliers.id=products.supplier_id WHERE customer_id=$1";
  pool.query(Query,[customer_id])
  .then(result => res.send(result.rows))
  .catch((e) => console.log(e))
});

app.listen(3001,function(){
  console.log("Listening at port 3001");
});