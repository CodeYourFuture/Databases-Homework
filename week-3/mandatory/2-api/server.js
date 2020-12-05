const express = require("express");
const app = express();
const { Pool } = require("pg");
app.use(express.json())
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "cyf",
  port: 5432,
});
//return the product and supplier name
app.get("/products", function (req, res) {
  const product_name=req.query.name;
  let query=`select products.product_name,suppliers.supplier_name from products inner join suppliers on products.supplier_id=suppliers.id`;
  if(product_name){
    //'%${hotelNameQuery}%'
    query=`select product_name from products where product_name like '%${product_name}%' order by product_name`;
  }
  pool
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});
////
app.get("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;

  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});
///////////post create customer

app.post("/customers", function (req, res) {
  const customerId = req.body.id;
  const name=req.body.name;
  const address=req.body.address;
  const city=req.body.city;
  const country=req.body.country;


  const query =
  "INSERT INTO customers (id,name,address,city,country) VALUES ($1, $2, $3,$4,$5)";

pool
  .query(query, [customerId, name, address,city,country])
  .then(() => res.send("customer created!"))
  .catch((e) => console.error(e));
});
///////////post create product
app.post("/products", function (req, res) {
  let id="select count(*) from products";
  id=id+1;
  const name=req.body.product_name;
  const price=req.body.unit_price;
  const supplier_id=req.body.supplier_id;
  const check=`select * from suppliers where id=${supplier_id}`
  if(check){
  const query =
  `INSERT INTO products(id,product_name,unit_price,supplier_id) VALUES (${id},$1, $2, $3)`;

pool
  .query(query, [name, price, supplier_id])
  .then(() => res.send("product created!"))
  .catch((e) => console.error(e));
  }else{
    console.log("supplier doest not exist")
  }
});
/////////////////customers/:customerId/orders
app.post("customers/:customerId/orders", function (req, res) {
  let id="select count(*) from orders";
  id=id+1;
  const date=req.body.order_date;
  const reference=req.body.order-reference;
  const customerId=req.body.customer_is
  const check=`select * from customers where id=${customer_id}`
  if(check){
  const query =
  `INSERT INTO orders(id,order_date,order_reference,customer_id) VALUES (${id},$1, $2, $3)`;

pool
  .query(query, [date, reference, customerId])
  .then(() => res.send("order created!"))
  .catch((e) => console.error(e));
  }else{
    console.log("customer doest not exist")
  }
});
////////////update///customers/:customerId`
app.put("/customers/:customerId", function (req, res) {
  const customerId = req.body.id;
  const name=req.body.name;
  const address=req.body.address;
  const city=req.body.city;
  const country=req.body.country;


  const query =
  "update customers set name=$2,address=$3,city=$4,country=$5 where id=$1";

pool
  .query(query, [customerId, name, address,city,country])
  .then(() => res.send("customer updated!"))
  .catch((e) => console.error(e));
});
//////DELETE endpoint `/orders/:orderId` 
app.delete("/orders/:orderId",function(req,res){
  const id=req.params.orderId;
  pool
  .query(`delete from order where id=${id}`)
  .then(() => res.send("order deleted!"))
  .catch((e) => console.error(e));

})
app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});