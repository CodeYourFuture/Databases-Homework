const express = require ('express');
const app = express ();
const {Pool} = require ('pg');
const port = process.env.PORT || 3000;

const pool = new Pool ({
  user: 'postgres',
  password: 'hiba',
  host: 'localhost',
  database: 'cyf_ecommerce',
  port: 5432,
});

app.get ('/customers', (req, res) => {
  pool.query ('select *from customers', (error, result) => {
    res.json (result.rows);
  });
});
app.get ('/suppliers', (req, res) => {
  pool.query ('select *from suppliers', (error, result) => {
    res.json (result.rows);
  });
});
app.get ('/products', (req, res) => {
  pool.query (
    'select products.product_name,suppliers.supplier_name from products inner join suppliers on suppliers.id = products.supplier_id',
    (error, result) => {
      res.json (result.rows);
    }
  );
});

app.listen (port, () => {
  console.log ('Server works fine ...');
});
