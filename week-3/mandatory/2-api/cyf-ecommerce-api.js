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
/////////////////////////////////////////////
app.get ('/suppliers', (req, res) => {
    pool.query ('SELECT * FROM suppliers', (error, result) => {
      res.json (result.rows);
    });
  });
/////////////////////////////////////////////
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
/////////////////////////////////////////////
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
/////////////////////////////////////////////
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
/////////////////////////////////////////////
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
/////////////////////////////////////////////
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
/////////////////////////////////////////////
app.delete('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const orderItems = await pool.query(
      `DELETE FROM order_items oi WHERE oi.order_id=${orderId}`
    );

    const orders = await pool.query(
      `DELETE FROM orders o WHERE o.id=${orderId}`
    );

    if (orders.rowCount < 1) {
      return res.json({
        success: false,
        message: `No orders with id ${orderId} found.`,
      });
    } else {
      return res.json({ success: true });
    }
  } catch (e) {
    console.error(e);
  }
});
/////////////////////////////////////////////
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
/////////////////////////////////////////////
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
/////////////////////////////////////////////
app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
}); 