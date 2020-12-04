const { query } = require("express");
const express = require(`express`);
const app = express();
const port = 3000;

const { Pool } = require(`pg`);

const pool = new Pool({
    user: `postgres`,
    host: `localhost`,
    database: `cyf_ecommerce`,
    password: `qwerty`,
    port: 5432
});

app.use(express.json());

async function invalidId(id, target) {
    if(!Number.isInteger(id) || id < 1) 
        return true;
    
    let isInvalid = true;
    await pool.query(`SELECT * FROM ${target} WHERE id = ${id}`)
        .then(result => isInvalid = !Object.keys(result.rows).length)
        .catch(error => console.error(error));       
    return isInvalid;
}


app.get(`/`, function (req, res) {
    res.status(200).send(`Welcome to the cyf E-commerce api server.`);
});

app.get(`/customers`, function (req, res) {
    pool.query(`SELECT * FROM customers`)
        .then(result => res.status(200).json(result.rows))
        .catch(error => console.error(error));
});

app.get(`/customers/:customerId`, async function (req, res) {
    const id = parseInt(req.params.customerId);

    if(await invalidId(id, `customers`)) 
        res.status(400).send(`Bad request: invalid ID`);
    else {
        pool.query(`SELECT * FROM customers WHERE id = ${id}`)
            .then(result => res.status(200).json(result.rows))
            .catch(error => console.error(error));
    }  
});

app.get(`/suppliers`, function (req, res) {
    pool.query(`SELECT * FROM suppliers`)
        .then(result => res.status(200).json(result.rows))
        .catch(error => console.error(error));
});

app.get(`/products`, function (req, res) {
    const name = req.query.name
    const queryString = `SELECT products.product_name, products.unit_price, suppliers.supplier_name`
                      + ` FROM products INNER JOIN suppliers ON suppliers.id = products.supplier_id`;

    if (name) {
        pool.query(queryString + ` WHERE products.product_name LIKE '%${req.query.name}%'`)
            .then(result => {
                if(!Object.keys(result.rows).length) 
                    res.status(404).send(`Item not found`);
                else 
                    res.status(200).json(result.rows);
            })
            .catch(error => console.error(error));
    }
    else {
        pool.query(queryString)
            .then(result => res.status(200).json(result.rows))
            .catch(error => console.error(error));
    }  
});

app.get(`/customers/:customerId/orders`, function (req, res) {
    const id = parseInt(req.params.customerId);

    pool.query(`SELECT orders.order_reference, orders.order_date, order_items.quantity,` 
            + ` products.product_name, products.unit_price, suppliers.supplier_name FROM orders`
            + ` INNER JOIN order_items ON orders.id = order_items.order_id`
            + ` INNER JOIN products ON products.id = order_items.product_id`
            + ` INNER JOIN suppliers ON suppliers.id = products.supplier_id`
            + ` WHERE orders.customer_id = ${id}`)
        .then(result => res.status(200).json(result.rows))
        .catch(error => console.error(error));
})


app.post(`/customers`, function (req, res) {
    const newCustomer = req.body;

    if(!(`name` in newCustomer) || !(`address` in newCustomer) || !(`city` in newCustomer) || !(`country` in newCustomer))
        res.status(400).send(`Bad request: missing values`);
    else {
        pool.query(`INSERT INTO customers (name, address, city, country) VALUES`
            + ` ('${newCustomer.name}', '${newCustomer.address}', '${newCustomer.city}', '${newCustomer.country}')`)
            .then(res.status(202).send(`Post request successful`))
            .catch(error => console.error(error));
    }      
});

app.put(`/customers/:customerId`, async function (req, res) {
    const updatedInfo = req.body;
    const id = parseInt(req.params.customerId);
    let parameters = [];

    if(!(`name` in updatedInfo) && !(`address` in updatedInfo) && !(`city` in updatedInfo) && !(`country` in updatedInfo))
        res.status(400).send(`Bad request: nothing to modify`);

    if(await invalidId(id, `customers`))
        res.status(400).send(`Bad request: invalid ID`);
    
    if(`name` in updatedInfo) {
        await pool.query(`UPDATE customers SET name = '${updatedInfo.name}' WHERE id = ${id};`)
            .catch(error => console.error(error));
        parameters.push(`name`);
    }       
    if(`address` in updatedInfo) {
        await pool.query(`UPDATE customers SET address = '${updatedInfo.address}' WHERE id = ${id};`)
            .catch(error => console.error(error));
        parameters.push(`address`);
    }       
    if(`city` in updatedInfo) {
        await pool.query(`UPDATE customers SET city = '${updatedInfo.city}' WHERE id = ${id};`)
            .catch(error => console.error(error));
        parameters.push(`city`);
    }       
    if(`country` in updatedInfo) {
        await pool.query(`UPDATE customers SET country = '${updatedInfo.country}' WHERE id = ${id};`)
            .catch(error => console.error(error));
        parameters.push(`country`);
    }

    res.status(202).send(`Updated successfully: ${parameters.toString()}`);
});

app.post(`/products`, async function (req, res) {
    const newProduct = req.body;

    if(!(`product_name` in newProduct) || !(`unit_price` in newProduct) || !(`supplier_id` in newProduct ))
        res.status(400).send(`Bad request: missing values`);
    else if(!Number.isInteger(newProduct.unit_price) || newProduct.unit_price <= 0)
        res.status(400).send(`Bad request: invalid unit_price value`);
    else if(await invalidId(newProduct.supplier_id, `suppliers`))
        res.status(400).send(`Bad request: invalid supplier_id`);
    else {
        pool.query(`INSERT INTO products (product_name, unit_price, supplier_id) VALUES`
            + ` ('${newProduct.product_name}', ${newProduct.unit_price}, ${newProduct.supplier_id});`)
            .then(res.status(202).send(`Post request successful`))
            .catch(error => console.error(error));
    }
});

app.post(`/customers/:customerId/orders`, async function (req, res) {
    const newOrder = req.body;
    const id = parseInt(req.params.customerId);

    if(!(`order_date` in newOrder) || !(`order_reference` in newOrder))
        res.status(400).send(`Bad request: missing values`);
    else if(await invalidId(id, `customers`))
        res.status(400).send(`Bad request: invalid customer_id`);
    else {
        pool.query(`INSERT INTO orders (order_date, order_reference, customer_id) VALUES`
            + ` ('${newOrder.order_date}', '${newOrder.order_reference}', ${id});`)
            .then(res.status(202).send(`Post request successful`))
            .catch(error => console.error(error));
    }
});


app.delete(`/orders/:orderId`, async function (req, res) {
    const id = parseInt(req.params.orderId);

    if(await invalidId(id, `orders`))
        res.status(400).send(`Bad request: invalid ID`);
    else {
        pool.query(`DELETE FROM order_items WHERE order_id = ${id}; `
             + `DELETE FROM orders WHERE id = ${id};`)
        .then(res.status(202).send(`Delete request successful`))
        .catch(error => console.error(error));
    }
});

app.delete(`/customers/:customerId`, async function (req, res) {
    const id = parseInt(req.params.customerId);

    async function hasOrders() {
        orders = true;
        await pool.query(`SELECT * FROM orders WHERE customer_id = ${id};`)
            .then(result => orders = Object.keys(result.rows).length)
            .catch(error => console.error(error));
        return orders;
    }

    if(await invalidId(id, `customers`))
        res.status(400).send(`Bad request: invalid ID`);
    else if(await hasOrders())
        res.status(400).send(`Bad request: the customer still has uncancelled orders`);
    else {
        pool.query(`DELETE FROM customers WHERE id = ${id};`)
        .then(res.status(202).send(`Delete request successful`))
        .catch(error => console.error(error));
    }
})


app.listen(port, function() {
    console.log(`Server is listening on port ${port}. Ready to accept requests!`);
});
