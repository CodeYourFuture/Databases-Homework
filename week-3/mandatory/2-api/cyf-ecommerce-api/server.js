const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config()


app.use(express.json());
app.use(cors());
const { Pool } = require('pg');
const { response } = require("express");

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'Nether2016',
    port: 5432
});


// app.get("/hotels", function(req, res) {
//     pool.query('SELECT * FROM hotels', (error, result) => {
//         res.json(result.rows);
//     });
// });
 //GET CUSTOMERS ENDPOINT
app.get("/customers", function(req, res) {
    pool.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
});

//SELECT SUPPLIERS
app.get("/suppliers", function(req, res) {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    });
});
//SELECT PRODUCTS
app.get("/products/suppliers", function(req, res) {
   const filterProductName = req.query.name;
   let query = 'SELECT product_name, supplier_name FROM products pro, suppliers sup WHERE sup.id=pro.supplier_id'
    if(filterProductName) {
        query = `SELECT product_name, supplier_name FROM products pro, suppliers sup WHERE sup.id=pro.supplier_id AND LOWER(product_name) LIKE LOWER('%${filterProductName}%')`
    }
    
   
   pool.query(query)
        .then((result)=> res.json(result.rows))
        .catch((error)=> console.log(error));
  });
//SELECT ORDER
app.get("/orders", function(req, res) {
    pool.query('SELECT * FROM orders', (error, result) => {
        res.json(result.rows);
    });
});

 //Add a new GET endpoint `/customers/:customerId` to load a single customer by ID.
 app.get("/customers/:customerId", (req, res) =>{
     const customerId = req.params.customerId;
     pool.query('SELECT * FROM customers WHERE id=$1',[customerId])
     .then((result) =>{
         if(result.rowCount ===0){
             res.status(404).send(`customer ${customerId} does not exist`)
         }else{
             res.json(result.rows)
         }
    })
     .catch((error) => console.log(error));
 });
 //Add a new POST endpoint `/customers` to create a new customer.
 //CREATE NEW CUSTOMER
 app.post("/customers",(req, res) =>{
     const{name, address, city, country} = req.body;
     if(!name ||!address ||!city ||!country ) {
         return res
         .status(400)
         .send("Please fill all the required field")
     }
     pool.query("SELECT * FROM customers WHERE name=$1", [name])
     .then((result)=>{
         if(result.rows.length > 0) {            
           res.status(400).send("The customer already exist in the system")
         }
         else{
             pool
             .query('INSERT INTO customers(name, address, city, country) VALUES ($1, $2, $3,$4)',
             [name, address, city, country])
             .then(()=> res.send("Yes, l have a new customer now"))
             .catch((error)=> console.log(error));
         }
     })
     .catch((error)=> console.log(error));
 });

 //GET PRODUCTS
 
 app.get("/products", function (req, res){

     pool.query('SELECT * FROM products')
     .then((result) => res.json(result.rows))
     .catch((error) => console.log(error));
     
 })

// Add a new POST endpoint `/products` to create a new product (with a product name, a price and a supplier id). Check that the price is a positive integer and that the supplier ID exists in the database, otherwise return an error.
app.post("/products",function (req, res) {
    const{product_name, unit_price, supplier_id} = req.body;
    if(unit_price <= 0){
        return res.send("Please enter a more appropriate price")
    }       
    pool.query('SELECT * FROM suppliers WHERE id =$1',[supplier_id])    
        .then((result)=> {
            if(result.rowCount ===0){
                res.status(404)
                .send("This supplier id does not exist in the database");
            }else{
                pool
                .query('INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3)',[product_name, unit_price, supplier_id])
                .then(() => res.send("New product with name, price and unit name has been created"))
        .catch((error) => console.log(error)) 
    }
})

pool
.query('INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3)',[product_name, unit_price, supplier_id])
.then(() => res.send("New product with name, price and unit name has been created"))
.catch((error) => console.log(error)) 
});

 //Add a new POST endpoint `/customers/:customerId/orders` to create a new order (including an order date, and an order reference) for a customer.
 // Check that the customerId corresponds to an existing customer or return an error.  
app.post('/customers/:customerId/orders', function(req, res){
    const customerId = req.params.customerId;
    const{order_date, order_reference, customer_id}= req.body;
    pool.query('SELECT * FROM customers WHERE id=$1', [customerId])
    .then((result)=> {
        if(result.rowCount === 0) {
            return res.status(404)
            .send('The customer id does not exist')
        }else{
             pool.query('INSERT INTO orders(order_date, order_reference, customer_id) VALUES($1, $2, $3)', [order_date, order_reference, customer_id])
    .then(()=> res.send('New data inserted into order'))
    .catch((error)=> console.log(error));         
     
        }
    })
   
    })
    // Add a new PUT endpoint `/customers/:customerId` to update an existing customer (name, address, city and country).
    app.put('/customers/:customerId', function(req, res) {
        const customerId = req.params.customerId;
        const{name:newName, address:newAddress, city:newCity, country:newCountry}= req.body;
         pool.query('SELECT *FROM customers WHERE id=$1', [customerId])
         .then((result)=>{
             if(result.rowCount ===0){
                 res.status(404).send('This customer does not exist, please enter the correct customer id')
             }else{
               pool
                 .query(
                   "UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5",
                   [
                     newName || name,
                     newAddress || address,
                     newCity || city,
                     newCountry || country,
                     customerId,
                   ]
                 )
                 .then(() => res.send("customer profile has been updated"))
                 .catch((error) => console.log(error));
             }
         })
            
        })
        
 //DELETE
 //- Add a new DELETE endpoint `/orders/:orderId` to delete an existing order along all the associated order items.
app.delete('/orders/:orderId', function(req, res){
    const orderId = req.params.orderId;
    pool.query('DELETE FROM order_items WHERE order_id=$1',[orderId])
    .then(()=>{
         pool.query('DELETE FROM orders WHERE id=$1', [orderId])
    .then(()=>res.send(`order ${orderId} deleted`))
    .catch((error)=> console.log(error));

    })  
})


 //Add a new DELETE endpoint `/customers/:customerId` to delete an existing customer only if this customer doesn't have orders.
//DELETE
app.delete('/customers/:customerId', function(req, res){
    const customerId = req.params.customerId;  

    pool.query('SELECT * FROM orders WHERE customer_id=$1', [customerId])
    .then((result)=> {   
       if(result.rowCount >0){
           res.status(404).send('This customer has existing order, you cannot delete this customer')
        }else{
          pool.query('DELETE FROM customers WHERE id=$1', [customerId])
            .then(()=>res.send(`customer ${customerId} deleted`))
            .catch((error)=> console.log(error));
        }  
    })
    .catch((error)=>console.log(error))
});
//- Add a new GET endpoint `/customers/:customerId/orders` to load all the orders along the items in the orders of a specific customer. Especially, the following information should be returned: order references, order dates, product names, unit prices, suppliers and quantities.

// app.get("customers/:customerId/orders", function(req, res){
//     const customerId = req.params.customerId; 
     
//     pool.query('SELECT o.order_reference, o.order_date, p.product_name, p.unit_price, s.supplier_name, oi.quantity FROM orders o, order_items oi, suppliers s, products p, customers c WHERE s.id=p.supplier_id AND p.id=oi.product_id AND oi.order_id=o.id AND c.id= o.customer_id AND c.id=$1', [customerId])
//     .then((result)=>res.json(result.rows))
//     .catch((error)=>console.log(error));

// });

app.get("/customers/:customerId/orders", (req, res) => {
  const customerId = req.params.customerId;
  pool
    .query(
      "SELECT o.order_reference, o.order_date, p.product_name, p.unit_price, s.supplier_name, i.quantity FROM customers c, orders o, products p, order_items i, suppliers s WHERE c.id= o.customer_id AND o.id=i.order_id AND i.product_id=p.id AND s.id=p.supplier_id AND c.id=$1",
      [customerId]
    )
    .then((result) => res.json(result.rows))
    .catch((error) => console.log(error));
});


app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  
});

