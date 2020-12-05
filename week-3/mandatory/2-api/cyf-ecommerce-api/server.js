const express = require("express");
const app = express();
const { Pool } = require("pg");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const pool = new Pool({
  user: "denes",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "masina123",
  port: 5432,
});


app.get("/customers", function (req, res) {
   
  pool.query("SELECT * FROM customers")
  .then((result) => res.json(result.rows))
  .catch((e) => console.error(e));
});


app.post("/customers", function (req, res) {

  let newCustomer = req.body;
  Object.entries(newCustomer).map(([key, value]) => {
    return !value  ? res.status(400).send(`Please complete the "${key}" field`) : '';
  })

  pool.query("INSERT INTO customers (name, address, city, country)  VALUES($1, $2, $3, $4)",[ newCustomer.name, newCustomer.address, newCustomer.city, newCustomer.country ])
  .then(() => res.send(`Customer ${newCustomer.name} was successfully added!`))
  .catch((e) => console.error(e));
});


app.get("/customers/:customerId", function (req, res) {

  let customerId = req.params.customerId;
   
  pool.query("SELECT * FROM customers WHERE id = $1", [customerId])
  .then((result) => res.json(result.rows))
  .catch((e) => console.error(e));
});


app.get("/customers/:customerId/orders", function (req, res) {
 
  let customerId = req.params.customerId;
 
  pool.query("SELECT o.order_reference, o.order_date, p.product_name, p.unit_price, s.supplier_name, i.quantity FROM customers c, orders o, products p, order_items i, suppliers s WHERE c.id= o.customer_id AND o.id=i.order_id AND i.product_id=p.id AND s.id=p.supplier_id AND c.id=$1", [customerId])
  .then((result) => res.json(result.rows))
  .catch((e) => console.error(e));
});


app.post("/customers/:customerId/orders", function (req, res) {

  let customerId = req.params.customerId;
  let newOrder = req.body;

  Object.entries(newOrder).map(([key, value]) => {
    return !value  ? res.status(400).send(`Please complete the "${key}" field`) : '';
  })


  pool.query("SELECT * FROM customers WHERE id = $1",[customerId])
  .then((result) =>{ 
    if(result.rows.length > 0) {
      pool.query("INSERT INTO orders (order_date, order_reference, customer_id)  VALUES($1, $2, $3)",[ newOrder.date, newOrder.reference, customerId])
      .then(() => res.send(`Order ${newOrder.reference} was successfully added!`))
      .catch((e) => console.error(e));
  }else{
    res.send(`Supplier with the id ${newOrder.supplierID} doesn't exist`)
  }
  })
  .catch((e) => console.error(e));

});


app.put("/customers/:customerId", function (req, res) {

  let customerId = req.params.customerId;
  let updatedCustomer = req.body;
   
  pool.query("SELECT * FROM customers WHERE id = $1",[customerId])
  .then((result) =>{ 
    if(result.rows.length > 0) {
      pool.query("UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id = $5", [updatedCustomer.name, updatedCustomer.address, updatedCustomer.city, updatedCustomer.country, customerId])
      .then((result) => res.send(`Customer's information with the id ${customerId} was updated`))
      .catch((e) => console.error(e));
  }else{
    res.send(`Customer with the id ${customerId} doesn't exist`)
  }
  })
  .catch((e) => console.error(e));

  
});


app.delete("/customers/:customerId", function (req, res) {

  let customerId = req.params.customerId;
  

  pool.query("SELECT * FROM orders WHERE customer_id = $1 ", [customerId])
  .then(result => {
    if(result.rows.length == 0){
      pool.query("DELETE FROM customers WHERE id = $1", [customerId])
      .then(result => res.send(`Customer with the id ${customerId} was deleted`))
      .catch(err => console.log(err));
    }else{
      res.send(`Customer with the id ${customerId} cannot be deleted because he have orders`)
    }
  } )
   
  
});

app.get("/suppliers", function (req, res) {
    pool
      .query("SELECT * FROM suppliers")
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
});
app.get("/products", function (req, res) {
  let searchedName = req.query.name;
  if(searchedName)
  {
    pool
    .query("SELECT products.product_name, suppliers.supplier_name FROM products INNER JOIN suppliers ON products.supplier_id = suppliers.id WHERE product_name = $1", [searchedName])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
  }else{

  }
  pool
      .query("SELECT products.product_name, suppliers.supplier_name FROM products INNER JOIN suppliers ON products.supplier_id = suppliers.id ")
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));

});

app.post("/products", function (req, res) {

  let newProduct = req.body;

  Object.entries(newProduct).map(([key, value]) => {
    return !value  ? res.status(400).send(`Please complete the "${key}" field`) : '';
  })

  if(req.body.price > 0 ){

    pool.query("SELECT * FROM suppliers WHERE id = $1",[newProduct.supplierID ])
    .then((result) =>{ 
      if(result.rows.length > 0) {
        pool.query("INSERT INTO products (product_name, unit_price, supplier_id)  VALUES($1, $2, $3)",[ newProduct.name, newProduct.price, newProduct.supplierID ])
        .then(() => res.send(`Product ${newProduct.name} was successfully added!`))
        .catch((e) => console.error(e));
    }else{
      res.send(`Supplier with the id ${newProduct.supplierID} doesn't exist`)
    }
    })
    .catch((e) => console.error(e));
  }else{
    res.send(`Please introduce a valid price`)
  }

});


app.delete("/orders/:orderId", function (req, res) {

  let orderId = req.params.orderId;

  

    pool.query("DELETE FROM orders WHERE id = $1",[orderId])
    .then((result) =>{ 
      
        pool.query("DELETE FROM order_items WHERE order_id = $1",[ orderId ])
        .then(() => res.send(`Order with the id ${orderId} was successfully deleted!`))
        .catch((e) => console.error(e));
     
    })
    .catch((e) => console.error(e));
   
});


app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

