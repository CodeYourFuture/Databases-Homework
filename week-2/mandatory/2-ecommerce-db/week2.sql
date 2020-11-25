odeyourfuture@codeyourfuture-ThinkPad-X1-Carbon-2nd:~/Documents/GitHub/Databases-Homework/week-2/mandatory/2-ecommerce-db$ psql -d cyf_ecommerce -f cyf_ecommerce.sql
psql:cyf_ecommerce.sql:1: NOTICE:  table "order_items" does not exist, skipping
DROP TABLE
psql:cyf_ecommerce.sql:2: NOTICE:  table "orders" does not exist, skipping
DROP TABLE
psql:cyf_ecommerce.sql:3: NOTICE:  table "customers" does not exist, skipping
DROP TABLE
psql:cyf_ecommerce.sql:4: NOTICE:  table "products" does not exist, skipping
DROP TABLE
psql:cyf_ecommerce.sql:5: NOTICE:  table "suppliers" does not exist, skipping
DROP TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
codeyourfuture@codeyourfuture-ThinkPad-X1-Carbon-2nd:~/Documents/GitHub/Databases-Homework/week-2/mandatory/2-ecommerce-db$ SELECT name FROM customers WHERE country='United States';
SELECT: command not found
codeyourfuture@codeyourfuture-ThinkPad-X1-Carbon-2nd:~/Documents/GitHub/Databases-Homework/week-2/mandatory/2-ecommerce-db$ SELECT * name FROM customers WHERE country='United States';
SELECT: command not found
codeyourfuture@codeyourfuture-ThinkPad-X1-Carbon-2nd:~/Documents/GitHub/Databases-Homework/week-2/mandatory/2-ecommerce-db$ cd ../../..codeyourfuture@codeyourfuture-ThinkPad-X1-Carbon-2nd:~/Documents/GitHub/Databases-Homework$ SELECT * name FROM customers WHERE country='United States';
SELECT: command not found
codeyourfuture@codeyourfuture-ThinkPad-X1-Carbon-2nd:~/Documents/GitHub/Databases-Homework$ SELECT name FROM customers WHERE country='United States';
SELECT: command not found
codeyourfuture@codeyourfuture-ThinkPad-X1-Carbon-2nd:~/Documents/GitHub/Databases-Homework$ psql SELECT;
psql: error: FATAL:  database "SELECT" does not exist
codeyourfuture@codeyourfuture-ThinkPad-X1-Carbon-2nd:~/Documents/GitHub/Databases-Homework$ psql SELECT name FROM customers WHERE country='United States';
psql: warning: extra command-line argument "FROM" ignored
psql: warning: extra command-line argument "customers" ignored
psql: warning: extra command-line argument "WHERE" ignored
psql: warning: extra command-line argument "country=United States" ignored
psql: error: FATAL:  Peer authentication failed for user "name"
codeyourfuture@codeyourfuture-ThinkPad-X1-Carbon-2nd:~/Documents/GitHub/Databases-Homework$ psql cyf_ecommerce
psql (13.1 (Ubuntu 13.1-1.pgdg18.04+1))
Type "help" for help.

cyf_ecommerce=# SELECT * name FROM customers WHERE country='United States';
ERROR:  syntax error at or near "name"
LINE 1: SELECT * name FROM customers WHERE country='United States';
                 ^
cyf_ecommerce=# SELECT * FROM customers WHERE country='United States';
 id |     name     |          address           |       city       |    country    
----+--------------+----------------------------+------------------+---------------
  4 | Amber Tran   | 6967 Ac Road               | Villafranca Asti | United States
  5 | Edan Higgins | Ap #840-3255 Tincidunt St. | Arles            | United States
(2 rows)

cyf_ecommerce=# SELECT name, address FROM customers WHERE country='United States';
     name     |          address           
--------------+----------------------------
 Amber Tran   | 6967 Ac Road
 Edan Higgins | Ap #840-3255 Tincidunt St.
(2 rows)

cyf_ecommerce=# SELECT * FROM customers order by name asc; 
 id |        name        |           address           |       city       |    country     
----+--------------------+-----------------------------+------------------+----------------
  4 | Amber Tran         | 6967 Ac Road                | Villafranca Asti | United States
  3 | Britanney Kirkland | P.O. Box 577, 5601 Sem, St. | Little Rock      | United Kingdom
  5 | Edan Higgins       | Ap #840-3255 Tincidunt St.  | Arles            | United States
  1 | Guy Crawford       | 770-2839 Ligula Road        | Paris            | France
  2 | Hope Crosby        | P.O. Box 276, 4976 Sit Rd.  | Steyr            | United Kingdom
  6 | Quintessa Austin   | 597-2737 Nunc Rd.           | Saint-Marc       | United Kingdom
(6 rows)

cyf_ecommerce=# SELECT * FROM products WHERE cost > 100;
ERROR:  column "cost" does not exist
LINE 1: SELECT * FROM products WHERE cost > 100;
                                     ^
cyf_ecommerce=# SELECT * FROM products WHERE unit_price > 100;
 id |  product_name  | unit_price | supplier_id 
----+----------------+------------+-------------
  4 | Mobile Phone X |        299 |           1
  5 | Mobile Phone X |        249 |           4
(2 rows)

cyf_ecommerce=# SELECT * FROM products WHERE name like '%socks%';
ERROR:  column "name" does not exist
LINE 1: SELECT * FROM products WHERE name like '%socks%';
                                     ^
cyf_ecommerce=# SELECT * FROM products WHERE product_ name like '%socks%';
ERROR:  syntax error at or near "name"
LINE 1: SELECT * FROM products WHERE product_ name like '%socks%';
                                              ^
cyf_ecommerce=# SELECT * FROM products WHERE product_name like '%socks%';
 id |   product_name   | unit_price | supplier_id 
----+------------------+------------+-------------
  6 | Super warm socks |         10 |           1
  7 | Super warm socks |          5 |           2
  8 | Super warm socks |          8 |           3
  9 | Super warm socks |         10 |           4
(4 rows)

cyf_ecommerce=# SELECT * FROM products order by unit_price decending;
ERROR:  syntax error at or near "decending"
LINE 1: SELECT * FROM products order by unit_price decending;
                                                   ^
cyf_ecommerce=# SELECT * FROM products order by unit_price descending;
ERROR:  syntax error at or near "descending"
LINE 1: SELECT * FROM products order by unit_price descending;
                                                   ^
cyf_ecommerce=# SELECT * FROM products order by unit_price desc;

[1]+  Stopped                 psql cyf_ecommerce
codeyourfuture@codeyourfuture-ThinkPad-X1-Carbon-2nd:~/Documents/GitHub/Databases-Homework$ psql cyf_ecommerce;
psql (13.1 (Ubuntu 13.1-1.pgdg18.04+1))
Type "help" for help.

cyf_ecommerce=# SELECT * FROM products order by unit_price desc limit 5;
 id |  product_name   | unit_price | supplier_id 
----+-----------------+------------+-------------
  4 | Mobile Phone X  |        299 |           1
  5 | Mobile Phone X  |        249 |           4
 17 | Javascript Book |         41 |           2
 15 | Javascript Book |         40 |           1
 16 | Javascript Book |         39 |           3
(5 rows)

cyf_ecommerce=# SELECT  product_name, unit_price, supplier_name FROM products, suppliers WHERE supplier_id=id;
ERROR:  column reference "id" is ambiguous
LINE 1: ...supplier_name FROM products, suppliers WHERE supplier_id=id;
                                                                    ^
cyf_ecommerce=# SELECT  product_name, unit_price, supplier_name FROM products, suppliers WHERE products.supplier_id=supplier.id;
ERROR:  missing FROM-clause entry for table "supplier"
LINE 1: ...OM products, suppliers WHERE products.supplier_id=supplier.i...
                                                             ^
cyf_ecommerce=# SELECT  product_name, unit_price, supplier_name FROM products, suppliers WHERE products.supplier_id=suppliers.id;

[2]+  Stopped                 psql cyf_ecommerce
codeyourfuture@codeyourfuture-ThinkPad-X1-Carbon-2nd:~/Documents/GitHub/Databases-Homework$ psql cyf_ecommerce;
psql (13.1 (Ubuntu 13.1-1.pgdg18.04+1))
Type "help" for help.

Que7. SELECT product_name, supplier_name  FROM products, suppliers WHERE products.supplier_id = suppliers.id AND suppliers.country = 'United Kingdom';
 Q8. SELECT * FROM orders, customers WHERE orders.customer_id = customers.id AND customers.id = 1;
 q9. SELECT * FROM orders, customers WHERE orders.customer_id = customers.id AND customers.name = 'Hope Crosby';

 cyf_ecommerce=# SELECT customers.name,order_reference,order_date,product_name,supplier_name,quantity FROM customers,suppliers,orders,products,order_items WHERE order_items.order_id=orders.id AND order_items.product_id=products.id AND customers.id=orders.customer_id AND suppliers.id=products.id;
     name     | order_reference | order_date |      product_name       | supplier_name | quantity 
--------------+-----------------+------------+-------------------------+---------------+----------
 Guy Crawford | ORD001          | 2019-06-01 | Tee Shirt Olympic Games | Taobao        |        1
 Hope Crosby  | ORD004          | 2019-05-24 | Mobile Phone X          | Sainsburys    |        1
 Edan Higgins | ORD008          | 2019-07-23 | Tee Shirt Olympic Games | Amazon        |        1
(3 rows)

cyf_ecommerce=# SELECT customers.name  FROM customers,suppliers,orders,products,order_items WHERE order_items.order_id=orders.id AND order_items.product_id=products.id AND customers.id=orders.customer_id AND suppliers.id=products.id WHERE suppliers.country='China';
ERROR:  syntax error at or near "WHERE"
LINE 1: ...d=orders.customer_id AND suppliers.id=products.id WHERE supp...
                                                             ^
cyf_ecommerce=# SELECT customers.name  FROM customers,suppliers,orders,products,order_items WHERE order_items.order_id=orders.id AND order_items.product_id=products.id AND customers.id=orders.customer_id AND suppliers.id=products.id AND  suppliers.country='China';
     name     
--------------
 Guy Crawford
(1 row)

cyf_ecommerce=# SELECT *  FROM customers,suppliers,orders,products,order_items WHERE order_items.order_id=orders.id AND order_items.product_id=products.id AND customers.id=orders.customer_id AND suppliers.id=products.id AND  suppliers.country='China';
^C^C        


cyf_ecommerce=#  SELECT  customers.name  FROM customers,suppliers,orders,products,order_items WHERE order_items.order_id=orders.id AND order_items.product_id=products.id AND customers.id=orders.customer_id AND suppliers.id=products.id AND  suppliers.country='China';
     name     
--------------
 Guy Crawford
(1 row)

cyf_ecommerce=# 