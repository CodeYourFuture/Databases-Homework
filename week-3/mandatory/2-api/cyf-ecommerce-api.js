const express = require("express");
const app = express();


const { Pool } = require('pg');

const pool = new Pool({
    user: 'murse',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'Mursel1299.',
    port: 5432
});

app.get ('/customers', (req, res) => {
    pool.query ('SELECT * FROM  customers', (error, result) => {
      res.json (result.rows);
    });
  });


app.get ('/suppliers', (req, res) => {
    pool.query ('SELECT * FROM suppliers', (error, result) => {
      res.json (result.rows);
    });
  });

/////////---products/?name=....---////////
  app.get('/products', (req, res) => {
    let { name } = req.query;
  
    let query = `SELECT p.product_name, s.supplier_name
      FROM products p 
      INNER JOIN suppliers s ON p.supplier_id = s.id`;
  
    if (name) {
      query += ` WHERE Lower(p.product_name) LIKE Lower('%${name}%')`;
    }
  
    pool.query(query, (error, result) => {
      res.json(result.rows);
    });
  });

////////---customer/ :customerId ----////////
app.get('/customers/:customerId', (req, res) => {
    const { customerId } = req.params;
  
    pool
      .query(`SELECT * from customers c WHERE c.id = ${customerId}`)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.json('No matches');
        }
        return res.json(result.rows[0]);
      })
      .catch((err) => console.error(err));
  });

////////---/customers / CREATE NEW CUSTOMERS    ////////////
app.post('/customers/:customerId/orders', (req, res) => {
    const { date, reference } = req.body;
    const { customerId } = req.params;
  
    if (!date || !reference) {
      return res.json({ error: 'Order date and reference number are required.' });
    }
  
    pool
      .query(`SELECT * FROM customers c WHERE c.id=${customerId}`)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.json(`Customer with id ${customerId} doesn't exist`);
        } else {
          pool
            .query(
              `INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)`,
              [date, reference, customerId]
            )
            .then((result) => {
              return res.json({ success: true });
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  });


app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
}); 