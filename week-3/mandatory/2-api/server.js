const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  user: "S225693",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "lucianome1",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.get("/suppliers", function (req, res) {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});
app.get("/products", function (req, res) {
  pool
    .query(
      "SELECT products.product_name, suppliers.supplier_name FROM products INNER JOIN suppliers ON products.supplier_id = suppliers.id "
    )
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.get("/products?name=Ball", function (req, res) {
  const productByName = req.query.name;
  let query = `SELECT * FROM products ORDER BY name`;

  if (productByName) {
    query = `SELECT * FROM products WHERE name LIKE '%${productByName}%' ORDER BY name`;
  }

  pool
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.get("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;

  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});


app.post("/customers", function (req, res) {
  const newCustomerName = req.body.name;
  const newCustomerAddress = req.body.address;
  const newCustomerCity = req.body.city;
   const newCustomerCountry = req.body.country;

pool
    .query("SELECT * FROM customers WHERE name=$1", [newCustomerName])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("A customer with the same name already exists!");
      } else {
        const query =
          "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
        pool
          .query(query, [
            newCustomerName,
            newCustomerAddress,
            newCustomerCity,
            newCustomerCountry,
          ])
          .then(() => res.send("customer created!"))
          .catch((e) => console.error(e));
      }
    });
});

app.post("/products", function (req, res) {
  const newProductsName = req.body.product_name;
  const newProductPrice = req.body.unit_price;
  const newSupplierId = req.body.supplier_id;

  if (!Number.isInteger(newProductPrice) && newSupplierId) {
    return res
      .status(400)
      .send("The the product price and supplier-ID should be a positive integer.");
  }
  
  pool
    .query("SELECT * FROM products WHERE product_name=$1", [newProductsName])
    .then((result) => {
      if (result.rows.length > 0) {

        return res
          .status(400)
          .send("A product with the same name already exists!");

      } 
      else 
      {
        const query =
          "INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3)";

        pool
          .query(query, [newProductsName, newProductPrice, newSupplierId])
          .then(() => res.send("product created!"))
          .catch((e) => console.error(e));
      }
    });
});


app.post('/customers/:customerId/orders', (req, res) => {
  const { date, reference } = req.body;
  const { customerId } = req.params;

  if (!date || !reference) {
    return res.json({ error: 'Order date and reference number are required.' });
  }

  pool
    .query(`SELECT * FROM customers  WHERE customers.id=${customerId}`)
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
    name: newCustomerName,
    address: newCustomerAddress,
    city: newCustomerCity,
    country: newCustomerCountry,
  } = req.body;
  const { customerId } = req.params;

  try {
    const customer = await pool.query(
      `SELECT * from customers  WHERE customers.id=${customerId}`
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
        newCustomerName || name,
        newCustomerAddress || address,
        newCustomerCity || city,
        newCustomerCountry || country,
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
      `DELETE FROM order_items  WHERE order_items.order_id=${orderId}`
    );

    const orders = await pool.query(
      `DELETE FROM orders  WHERE orders.id=${orderId}`
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
      `SELECT * FROM orders  WHERE orders.customer_id=${customerId}`
    );

    if (customerOrders.rowCount > 0) {
      return res.json({
        success: false,
        message: "Can't delete a customer with existing orders",
      });
    }

    const customer = await pool.query(
      `DELETE FROM customers  WHERE customers.id=${customerId}`
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
      SELECT customers.name, orders.order_reference, orders.order_date, order_items.quantity, products.product_name, products.unit_price, suppliers.supplier_name FROM customers c
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
      const indx = acc.findIndex(
        (e) => e.order_reference === cur.order_reference
      );

      if (indx === -1) {
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


