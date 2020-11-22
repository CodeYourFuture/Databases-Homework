(base) aaenesek@AAENESEKs-MBP ~ % psql cyf_ecommerce;
psql (13.1)
Type "help" for help.

cyf_ecommerce=# \dt
            List of relations
 Schema |    Name     | Type  |  Owner   
--------+-------------+-------+----------
 public | customers   | table | aaenesek
 public | order_items | table | aaenesek
 public | orders      | table | aaenesek
 public | products    | table | aaenesek
 public | suppliers   | table | aaenesek
(5 rows)

cyf_ecommerce=# SELECT *FROM customers;
 id |        name        |           address           |       city       |    country     
----+--------------------+-----------------------------+------------------+----------------
  1 | Guy Crawford       | 770-2839 Ligula Road        | Paris            | France
  2 | Hope Crosby        | P.O. Box 276, 4976 Sit Rd.  | Steyr            | United Kingdom
  3 | Britanney Kirkland | P.O. Box 577, 5601 Sem, St. | Little Rock      | United Kingdom
  4 | Amber Tran         | 6967 Ac Road                | Villafranca Asti | United States
  5 | Edan Higgins       | Ap #840-3255 Tincidunt St.  | Arles            | United States
  6 | Quintessa Austin   | 597-2737 Nunc Rd.           | Saint-Marc       | United Kingdom
(6 rows)

cyf_ecommerce=# SELECT *FROM suppliers; 

 id | supplier_name |    country  
----+------------+-----------------+-------------  
  1 | Amazon        | United States  
  2 | Taobao        | China
  3 | Argos         | United Kingdom
  4 | Sainsburys    | United Kingdom
(4 rows)

cyf_ecommerce=# SELECT *FROM orders;
 id | order_date | order_reference | customer_id 
----+------------+-----------------+-------------
  1 | 2019-06-01 | ORD001          |           1 
  2 | 2019-07-15 | ORD002          |           1
  3 | 2019-07-11 | ORD003          |           1
  4 | 2019-05-24 | ORD004          |           2
  5 | 2019-05-30 | ORD005          |           3
  6 | 2019-07-05 | ORD006          |           4
  7 | 2019-04-05 | ORD007          |           4
  8 | 2019-07-23 | ORD008          |           5
  9 | 2019-07-24 | ORD009          |           5
 10 | 2019-05-10 | ORD010          |           5
(10 rows)

cyf_ecommerce=# SELECT *FROM products;
 id |      product_name       | unit_price | supplier_id 
----+-------------------------+------------+-------------
  1 | Tee Shirt Olympic Games |         20 |           1
  2 | Tee Shirt Olympic Games |         18 |           2
  3 | Tee Shirt Olympic Games |         21 |           3
  4 | Mobile Phone X          |        299 |           1
  5 | Mobile Phone X          |        249 |           4
  6 | Super warm socks        |         10 |           1
  7 | Super warm socks        |          5 |           2
  8 | Super warm socks        |          8 |           3
  9 | Super warm socks        |         10 |           4
 10 | Le Petit Prince         |         10 |           1
 11 | Le Petit Prince         |         10 |           4
 12 | Ball                    |         14 |           1
 13 | Ball                    |         15 |           4
 14 | Ball                    |         20 |           2
 15 | Javascript Book         |         40 |           1
 16 | Javascript Book         |         39 |           3
 17 | Javascript Book         |         41 |           2
 18 | Coffee Cup              |          3 |           1
 19 | Coffee Cup              |          4 |           2
 20 | Coffee Cup              |          4 |           3
 21 | Coffee Cup              |          5 |           4
(21 rows)

cyf_ecommerce=# SELECT *FROM order_items;
 id | order_id | product_id | quantity 
----+----------+------------+----------
  1 |        1 |          2 |        1
  2 |        1 |          7 |        5
  3 |        2 |          8 |        4
  4 |        2 |         11 |        1
  5 |        3 |         20 |       10
  6 |        3 |         14 |        2
  7 |        4 |          4 |        1
  8 |        5 |         16 |        2
  9 |        5 |         10 |        1
 10 |        6 |         19 |        3
 11 |        6 |         17 |        1
 12 |        6 |         11 |        1
 13 |        6 |          9 |        3
 14 |        7 |          8 |       15
 15 |        8 |          1 |        1
 16 |        8 |          5 |        1
 17 |        9 |         13 |        2
 18 |       10 |         14 |        1
 19 |       10 |          6 |        5
(19 rows)

cyf_ecommerce=# SELECT name, address FROM customers WHERE country = 'United States';
     name     |          address           
--------------+----------------------------
 Amber Tran   | 6967 Ac Road
 Edan Higgins | Ap #840-3255 Tincidunt St.
(2 rows)

cyf_ecommerce=# SELECT * FROM customers ORDER BY name;
 id |        name        |           address           |       city       |    country     
----+--------------------+-----------------------------+------------------+----------------
  4 | Amber Tran         | 6967 Ac Road                | Villafranca Asti | United States
  3 | Britanney Kirkland | P.O. Box 577, 5601 Sem, St. | Little Rock      | United Kingdom
  5 | Edan Higgins       | Ap #840-3255 Tincidunt St.  | Arles            | United States
  1 | Guy Crawford       | 770-2839 Ligula Road        | Paris            | France
  2 | Hope Crosby        | P.O. Box 276, 4976 Sit Rd.  | Steyr            | United Kingdom
  6 | Quintessa Austin   | 597-2737 Nunc Rd.           | Saint-Marc       | United Kingdom
(6 rows)

cyf_ecommerce=# SELECT * FROM products WHERE unit_price > 100;
 id |  product_name  | unit_price | supplier_id 
----+----------------+------------+-------------
  4 | Mobile Phone X |        299 |           1
  5 | Mobile Phone X |        249 |           4
(2 rows)

cyf_ecommerce=# SELECT * FROM products WHERE product_name LIKE '%socks%';
 id |   product_name   | unit_price | supplier_id 
----+------------------+------------+-------------
  6 | Super warm socks |         10 |           1
  7 | Super warm socks |          5 |           2
  8 | Super warm socks |          8 |           3
  9 | Super warm socks |         10 |           4
(4 rows)

cyf_ecommerce=# SELECT * FROM products ORDER BY unit_price LIMIT 5;
 id |   product_name   | unit_price | supplier_id 
----+------------------+------------+-------------
 18 | Coffee Cup       |          3 |           1
 20 | Coffee Cup       |          4 |           3
 19 | Coffee Cup       |          4 |           2
  7 | Super warm socks |          5 |           2
 21 | Coffee Cup       |          5 |           4
(5 rows)

cyf_ecommerce=# SELECT * FROM products ORDER BY unit_price DESC LIMIT 5;
 id |  product_name   | unit_price | supplier_id 
----+-----------------+------------+-------------
  4 | Mobile Phone X  |        299 |           1
  5 | Mobile Phone X  |        249 |           4
 17 | Javascript Book |         41 |           2
 15 | Javascript Book |         40 |           1
 16 | Javascript Book |         39 |           3
(5 rows)


cyf_ecommerce=# SELECT products.product_name, products.unit_price, suppliers.supplier_name FROM suppliers INNER JOIN products ON suppliers.id = products.supplier_id;

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

cyf_ecommerce=# SELECT products.product_name, suppliers.supplier_name FROM suppliers INNER JOIN products ON suppliers.id = products.supplier_s WHERE suppliers.supplier_name = 'United Kingdom';

      product_name       | supplier_name 
-------------------------+---------------
 Tee Shirt Olympic Games | Argos
 Mobile Phone X          | Sainsburys
 Super warm socks        | Argos
 Super warm socks        | Sainsburys
 Le Petit Prince         | Sainsburys
 Ball                    | Sainsburys
 Javascript Book         | Argos
 Coffee Cup              | Argos
 Coffee Cup              | Sainsburys
(9 rows)

cyf_ecommerce=# SELECT orders.order_reference, customers.name, customers.id FROM customers INNER JOIN orders ON customers.id = orders.customer_id WHERE customers.id = 1;
 order_reference |     name     | id 
-----------------+--------------+----
 ORD001          | Guy Crawford |  1
 ORD002          | Guy Crawford |  1
 ORD003          | Guy Crawford |  1
(3 rows)

cyf_ecommerce=# SELECT orders.order_reference, customers.name, customers.id FROM customers INNER JOIN orders ON customers.id = orders.customer_id WHERE customers.name = 'Hope Crosby';
 order_reference |    name     | id 
-----------------+-------------+----
 ORD004          | Hope Crosby |  2
(1 row)

cyf_ecommerce=# SELECT products.product_name, products.unit_price, order_items.quantity FROM products INNER JOIN order_items ON products.id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id WHERE orders.order_reference = 'ORD006';

   product_name   | unit_price | quantity 
------------------+------------+----------
 Coffee Cup       |          4 |        3
 Javascript Book  |         41 |        1
 Le Petit Prince  |         10 |        1
 Super warm socks |         10 |        3
(4 rows)

cyf_ecommerce=# SELECT orders.order_date, orders.order_reference, customers.name, suppliers.supplier_name, order_items.quantity FROM products, orders, order_items, suppliers, customers WHERE customers.id = orders.customer_id AND suppliers.id = products.supplier_id AND products.id = order_items.product_id AND orders.id = order_items.order_id;




