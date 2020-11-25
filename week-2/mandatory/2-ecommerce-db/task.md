# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Setup

To prepare your environment for this homework, open a terminal and create a new database called `cyf_ecommerce`:

```sql
createdb cyf_ecommerce
```

Import the file [`cyf_ecommerce.sql`](./cyf_ecommerce.sql) in your newly created database:

```sql
psql -d cyf_ecommerce -f cyf_ecommerce.sql
```

Open the file `cyf_ecommerce.sql` in VSCode and make sure you understand all the SQL code. Take a piece of paper and draw the database with the different relations between tables. Identify the foreign keys and make sure you understand the full database schema.

## Task

Once you understand the database that you are going to work with, solve the following challenge by writing SQL queries using everything you learned about SQL:

1. Retrieve all the customers names and addresses who lives in United States
```sql
SELECT name,address FROM customers where country = 'United States';
```

2. Retrieve all the customers ordered by ascending name
```sql
SELECT name  FROM customers ORDER BY name ASC;
```
3. Retrieve all the products which cost more than 100
```sql
SELECT product_name  from products WHERE unit_price > 100;
```
4. Retrieve all the products whose name contains the word `socks`
```sql
SELECT product_name  from products WHERE product_name LIKE '%socks%';
```
5. Retrieve the 5 most expensive products
```sql

SELECT unit_price FROM products ORDER BY unit_price DESC limit 5;
```
6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
```sql
SELECT product_name,unit_price,supplier_name FROM suppliers INNER JOIN products ON suppliers.id=products.supplier_id;
```
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
```sql
SELECT product_name FROM suppliers INNER JOIN products ON suppliers.id=products.supplier_id WHERE country = 'United Kingdom';
```
8. Retrieve all orders from customer ID `1`
```sql
SELECT * FROM customers INNER JOIN orders ON customers.id=orders.customer_id WHERE customers.id=1;
```
9. Retrieve all orders from customer named `Hope Crosby`
```sql
SELECT * FROM customers INNER JOIN orders ON customers.id=orders.customer_id WHERE name ='Hope Crosby';
```
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
```sql
SELECT product_name,unit_price,quantity FROM order_items INNER JOIN orders ON order_items.id=orders.customer_id
INNER JOIN products ON order_items.id=products.supplier_id WHERE order_reference ='ORD006';
```
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference` `order_date`, `product_name`, `supplier_name` and `quantity`.
```sql
SELECT name,order_reference,order_date,product_name,supplier_name,quantity FROM order_items INNER JOIN orders ON order_items.id=orders.customer_id
INNER JOIN products ON order_items.id=products.supplier_id
INNER JOIN customers ON order_items.id=customers.id
INNER JOIN suppliers ON order_items.id=suppliers.id;

```
12. Retrieve the names of all customers who bought a product from a supplier from China.
```sql
SELECT name FROM order_items INNER JOIN orders ON order_items.id=orders.customer_id
INNER JOIN products ON order_items.id=products.supplier_id
INNER JOIN customers ON order_items.id=customers.id
INNER JOIN suppliers ON order_items.id=suppliers.id WHERE suppliers.country = 'China';
```
