const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: 'localhost',
  database: 'cyf_ecommerce',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('hihi');
});

app.get('/customers', (req, res) => {
  pool.query('SELECT * FROM customers', (error, result) => {
    res.json(result.rows);
  });
});

app.get('/suppliers', (req, res) => {
  pool.query('SELECT * FROM suppliers', (error, result) => {
    res.json(result.rows);
  });
});

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
        return res.json(`Customer with id ${customerId} don't exist`);
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

app.put('/customers/:customerId', async (req, res) => {
  const {
    name: newName,
    address: newAddress,
    city: newCity,
    country: newCountry,
  } = req.body;
  const { customerId } = req.params;

  try {
    const customer = await pool.query(
      `SELECT * from customers c WHERE c.id=${customerId}`
    );
    if (customer.rowCount < 1) {
      return res.json({
        error: `Customer with an id ${customerId} doesn't exist.`,
      });
    }
    const { name, address, city, country } = customer.rows[0];
    const updatedCustomer = await pool.query(
      `
      UPDATE customers c
      SET name=$1, address=$2, city=$3, country=$4
      WHERE c.id=${customerId}`,
      [
        newName || name,
        newAddress || address,
        newCity || city,
        newCountry || country,
      ]
    );
    return res.json({ success: true });
  } catch (e) {
    console.error(e);
  }
});

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

app.delete('/customers/:customerId', async (req, res) => {
  const { customerId } = req.params;

  try {
    const customerOrders = await pool.query(
      `SELECT * FROM orders o WHERE o.customer_id=${customerId}`
    );

    if (customerOrders.rowCount > 0) {
      return res.json({
        success: false,
        message: "Can't delete a customer with existing orders",
      });
    }

    const customer = await pool.query(
      `DELETE FROM customers c WHERE c.id=${customerId}`
    );

    if (customer.rowCount < 1) {
      return res.json({
        success: false,
        message: `Customer with id ${customerId} doesn't exist`,
      });
    }

    return res.json({ success: true });
  } catch (e) {
    console.error(e);
  }
});

app.get('/customers/:customerId/orders', async (req, res) => {
  const { customerId } = req.params;

  try {
    const orders = await pool.query(`
      SELECT c.name, o.order_reference, o.order_date, oi.quantity, p.product_name, p.unit_price, s.supplier_name FROM customers c
      INNER JOIN orders o ON c.id=o.customer_id
      INNER JOIN order_items oi ON o.id=oi.order_id
      INNER JOIN products p ON oi.product_id=p.id
      INNER JOIN suppliers s ON s.id=p.supplier_id
      WHERE c.id=${customerId}
    `);

    if (orders.rowCount < 1) {
      return res.json({ message: 'No orders found for this customer' });
    }

    // to display data more nicely
    const getProductInfo = (obj) => {
      return {
        product_name: obj.product_name,
        quantity: obj.quantity,
        unit_price: obj.unit_price,
        supplier_name: obj.supplier_name,
      };
    };

    const result = orders.rows.reduce((acc, cur) => {
      const idx = acc.findIndex(
        (e) => e.order_reference === cur.order_reference
      );

      if (idx === -1) {
        // new order
        const order = {};
        order.customer = cur.name;
        order.order_reference = cur.order_reference;
        order.order_date = cur.order_date;
        order.products = [getProductInfo(cur)];
        acc.push(order);
      } else {
        // order already exists, add product info to products array
        acc[idx].products.push(getProductInfo(cur));
      }
      return acc;
    }, []);

    return res.json({ data: result });
  } catch (e) {
    console.error(e);
  }
});

app.listen(PORT, () => console.log(`App listening on port ${PORT || 3000}`));
