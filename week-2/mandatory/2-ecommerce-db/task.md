# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql
##### 1
SELECT customers.name, customers.address FROM customers WHERE country = 'United States';
     name     |          address           
--------------+----------------------------
 Amber Tran   | 6967 Ac Road
 Edan Higgins | Ap #840-3255 Tincidunt St.
(2 rows)

##### 2
SELECT * FROM customers ORDER BY name ASC;
 id |        name        |           address           |       city       |    country     
----+--------------------+-----------------------------+------------------+----------------
  4 | Amber Tran         | 6967 Ac Road                | Villafranca Asti | United States
  3 | Britanney Kirkland | P.O. Box 577, 5601 Sem, St. | Little Rock      | United Kingdom
  5 | Edan Higgins       | Ap #840-3255 Tincidunt St.  | Arles            | United States
  1 | Guy Crawford       | 770-2839 Ligula Road        | Paris            | France
  2 | Hope Crosby        | P.O. Box 276, 4976 Sit Rd.  | Steyr            | United Kingdom
  6 | Quintessa Austin   | 597-2737 Nunc Rd.           | Saint-Marc       | United Kingdom
(6 rows)


##### 3
SELECT * FROM products WHERE unit_price > 100;
 id |  product_name  | unit_price | supplier_id 
----+----------------+------------+-------------
  4 | Mobile Phone X |        299 |           1
  5 | Mobile Phone X |        249 |           4
(2 rows)

##### 4
SELECT * FROM products WHERE product_name LIKE '%socks';
 id |   product_name   | unit_price | supplier_id 
----+------------------+------------+-------------
  6 | Super warm socks |         10 |           1
  7 | Super warm socks |          5 |           2
  8 | Super warm socks |          8 |           3
  9 | Super warm socks |         10 |           4
(4 rows)

##### 5 
SELECT * FROM products ORDER BY unit_price DESC LIMIT 5;
 id |  product_name   | unit_price | supplier_id 
----+-----------------+------------+-------------
  4 | Mobile Phone X  |        299 |           1
  5 | Mobile Phone X  |        249 |           4
 17 | Javascript Book |         41 |           2
 15 | Javascript Book |         40 |           1
 16 | Javascript Book |         39 |           3
(5 rows)

##### 6
SELECT product_name, unit_price, supplier_name FROM products, suppliers WHERE products.supplier_id = suppliers.id;
      product_name       | unit_price | supplier_name 
-------------------------+------------+---------------
 Tee Shirt Olympic Games |         20 | Amazon
 Tee Shirt Olympic Games |         18 | Taobao
 Tee Shirt Olympic Games |         21 | Argos
 Mobile Phone X          |        299 | Amazon
 Mobile Phone X          |        249 | Sainsburys
 Super warm socks        |         10 | Amazon
 Super warm socks        |          5 | Taobao
 Super warm socks        |          8 | Argos
 Super warm socks        |         10 | Sainsburys
 Le Petit Prince         |         10 | Amazon
 Le Petit Prince         |         10 | Sainsburys
 Ball                    |         14 | Amazon
 Ball                    |         15 | Sainsburys
 Ball                    |         20 | Taobao
 Javascript Book         |         40 | Amazon
 Javascript Book         |         39 | Argos
 Javascript Book         |         41 | Taobao
 Coffee Cup              |          3 | Amazon
 Coffee Cup              |          4 | Taobao
 Coffee Cup              |          4 | Argos
 Coffee Cup              |          5 | Sainsburys
(21 rows)

##### 7

SELECT product_name, supplier_name FROM products, supplIers WHERE suppliers.country = 'United States';

      product_name       | supplier_name 
-------------------------+---------------
 Tee Shirt Olympic Games | Amazon
 Tee Shirt Olympic Games | Amazon
 Tee Shirt Olympic Games | Amazon
 Mobile Phone X          | Amazon
 Mobile Phone X          | Amazon
 Super warm socks        | Amazon
 Super warm socks        | Amazon
 Super warm socks        | Amazon
 Super warm socks        | Amazon
 Le Petit Prince         | Amazon
 Le Petit Prince         | Amazon
 Ball                    | Amazon
 Ball                    | Amazon
 Ball                    | Amazon
 Javascript Book         | Amazon
 Javascript Book         | Amazon
 Javascript Book         | Amazon
 Coffee Cup              | Amazon
 Coffee Cup              | Amazon
 Coffee Cup              | Amazon
 Coffee Cup              | Amazon
(21 rows)

##### 8

SELECT * FROM orders WHERE customer_id = 1; 
 id | order_date | order_reference | customer_id 
----+------------+-----------------+-------------
  1 | 2019-06-01 | ORD001          |           1
  2 | 2019-07-15 | ORD002          |           1
  3 | 2019-07-11 | ORD003          |           1
(3 rows)

##### 9

SELECT * FROM orders, customers WHERE orders.customer_id = customers.id AND customers.name = 'Hope Crosby'; 

 id | order_date | order_reference | customer_id | id |    name     |          address           | city  |    country     
----+------------+-----------------+-------------+----+-------------+----------------------------+-------+----------------
  4 | 2019-05-24 | ORD004          |           2 |  2 | Hope Crosby | P.O. Box 276, 4976 Sit Rd. | Steyr | United Kingdom
(1 row)

##### 10 

SELECT products.product_name, products.unit_price, order_items.quantity FROM products, order_items, orders WHERE order_items.product_id = products.id AND orders.order_reference = 'ORD006'; 

 Tee Shirt Olympic Games |         18 |        1
 Super warm socks        |          5 |        5
 Super warm socks        |          8 |        4
 Le Petit Prince         |         10 |        1
 Coffee Cup              |          4 |       10
 Ball                    |         20 |        2
 Mobile Phone X          |        299 |        1
 Javascript Book         |         39 |        2
 Le Petit Prince         |         10 |        1
 Coffee Cup              |          4 |        3
 Javascript Book         |         41 |        1
 Le Petit Prince         |         10 |        1
 Super warm socks        |         10 |        3
 Super warm socks        |          8 |       15
 Tee Shirt Olympic Games |         20 |        1
 Mobile Phone X          |        249 |        1
 Ball                    |         15 |        2
 Ball                    |         20 |        1
 Super warm socks        |         10 |        5
(19 rows)

##### 11
SELECT customers.name, orders.order_reference, orders.order_date, products.product_name, suppliers.supplier_name FROM customers, order_items, orders, products, suppliers WHERE customers.id = orders.customer_id AND orders.id = order_items.order_id AND products.id = order_items.product_id AND suppliers.id = products.supplier_id;

INNER JOIN ON OPTION with DESTRUCTING:
SELECT c.name, o.order_reference, o.order_date, p.product_name, s.supplier_name FROM customers c INNER JOIN orders o ON c.id = o.customer_id INNER JOIN order_items o_i ON o.id = o_i.order_id INNER JOIN products p ON p.id = o_i.product_id INNER JOIN suppliers s ON s.id = p.supplier_id;

        name        | order_reference | order_date |      product_name       | supplier_name 
--------------------+-----------------+------------+-------------------------+---------------
 Guy Crawford       | ORD001          | 2019-06-01 | Tee Shirt Olympic Games | Taobao
 Guy Crawford       | ORD001          | 2019-06-01 | Super warm socks        | Taobao
 Guy Crawford       | ORD002          | 2019-07-15 | Super warm socks        | Argos
 Guy Crawford       | ORD002          | 2019-07-15 | Le Petit Prince         | Sainsburys
 Guy Crawford       | ORD003          | 2019-07-11 | Coffee Cup              | Argos
 Guy Crawford       | ORD003          | 2019-07-11 | Ball                    | Taobao
 Hope Crosby        | ORD004          | 2019-05-24 | Mobile Phone X          | Amazon
 Britanney Kirkland | ORD005          | 2019-05-30 | Javascript Book         | Argos
 Britanney Kirkland | ORD005          | 2019-05-30 | Le Petit Prince         | Amazon
 Amber Tran         | ORD006          | 2019-07-05 | Coffee Cup              | Taobao
 Amber Tran         | ORD006          | 2019-07-05 | Javascript Book         | Taobao
 Amber Tran         | ORD006          | 2019-07-05 | Le Petit Prince         | Sainsburys
 Amber Tran         | ORD006          | 2019-07-05 | Super warm socks        | Sainsburys
 Amber Tran         | ORD007          | 2019-04-05 | Super warm socks        | Argos
 Edan Higgins       | ORD008          | 2019-07-23 | Tee Shirt Olympic Games | Amazon
 Edan Higgins       | ORD008          | 2019-07-23 | Mobile Phone X          | Sainsburys
 Edan Higgins       | ORD009          | 2019-07-24 | Ball                    | Sainsburys
 Edan Higgins       | ORD010          | 2019-05-10 | Ball                    | Taobao
 Edan Higgins       | ORD010          | 2019-05-10 | Super warm socks        | Amazon
(19 rows)


##### 12 
SELECT customers.name FROM customers, order_items, orders, products, suppliers WHERE customers.id = orders.customer_id AND orders.id = order_items.order_id AND products.id = order_items.product_id AND suppliers.id = products.supplier_id AND suppliers.country = 'China';

INNER JOIN OPTION ON with DESTRUCTURING:
SELECT c.name FROM customers c INNER JOIN orders o ON c.id = o.customer_id INNER JOIN order_items o_i ON o.id = o_i.order_id INNER JOIN products p ON p.id = o_i.product_id INNER JOIN suppliers s ON s.id = p.supplier_id WHERE s.country = 'China';

     name     
--------------
 Guy Crawford
 Guy Crawford
 Guy Crawford
 Amber Tran
 Amber Tran
 Edan Higgins
(6 rows)

##### the End;

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

#### Personal Note: 
The above code MUST be ran on the Ubuntu Terminal, NOT on the VSCode TERMINAL. Before running it, I need to be on the folder containing the file 'cyf_ecommerce'.sql (in this Homework it is '2-ecommerce-db'). This is the method for importing file for psql DB before going on to connect to the created DB with the command line 'psql DATABASE' ('psql cyf_ecommerce' for this homework).
#####
```

Open the file `cyf_ecommerce.sql` in VSCode and make sure you understand all the SQL code. Take a piece of paper and draw the database with the different relations between tables. Identify the foreign keys and make sure you understand the full database schema.

## Task

Once you understand the database that you are going to work with, solve the following challenge by writing SQL queries using everything you learned about SQL:

1. Retrieve all the customers names and addresses who lives in United States
2. Retrieve all the customers ordered by ascending name
3. Retrieve all the products which cost more than 100
4. Retrieve all the products whose name contains the word `socks`
5. Retrieve the 5 most expensive products
6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
8. Retrieve all orders from customer ID `1`
9. Retrieve all orders from customer named `Hope Crosby`
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference` `order_date`, `product_name`, `supplier_name` and `quantity`.
12. Retrieve the names of all customers who bought a product from a supplier from China.
