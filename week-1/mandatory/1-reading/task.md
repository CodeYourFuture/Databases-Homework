# Reading
##### WEEK 1
Class Exercises

osagie@osagie-Latitude-E4310:~/Desktop/SQL$ createuser --interactive
Enter name of role to add: osagiedev
Shall the new role be a superuser? (y/n) y
createuser: could not connect to database postgres: FATAL:  role "osagie" does not exist
osagie@osagie-Latitude-E4310:~/Desktop/SQL$ sudo -u postgres createuser --interactive
[sudo] password for osagie: 
could not change directory to "/home/osagie/Desktop/SQL": Permission denied
Enter name of role to add: osagie
Shall the new role be a superuser? (y/n) y
osagie@osagie-Latitude-E4310:~/Desktop/SQL$ man createuser
osagie@osagie-Latitude-E4310:~/Desktop/SQL$ createdb sammy
osagie@osagie-Latitude-E4310:~/Desktop/SQL$ createdb cyf_hotels
osagie@osagie-Latitude-E4310:~/Desktop/SQL$ psql cyf_hotels
psql (10.14 (Ubuntu 10.14-0ubuntu0.18.04.1))
Type "help" for help.

cyf_hotels=#  sudo -u postgres createuser --superuser osagie
cyf_hotels-# ^C
cyf_hotels=# ^C
cyf_hotels=# 
ABORT                      DELETE FROM                LOCK                       SELECT
ALTER                      DISCARD                    MOVE                       SET
ANALYZE                    DO                         NOTIFY                     SHOW
BEGIN                      DROP                       PREPARE                    START
CHECKPOINT                 END                        REASSIGN                   TABLE
CLOSE                      EXECUTE                    REFRESH MATERIALIZED VIEW  TRUNCATE
CLUSTER                    EXPLAIN                    REINDEX                    UNLISTEN
COMMENT                    FETCH                      RELEASE                    UPDATE
COMMIT                     GRANT                      RESET                      VACUUM
COPY                       IMPORT                     REVOKE                     VALUES
CREATE                     INSERT                     ROLLBACK                   WITH
DEALLOCATE                 LISTEN                     SAVEPOINT                  
DECLARE                    LOAD                       SECURITY LABEL             
cyf_hotels=# \q
osagie@osagie-Latitude-E4310:~/Desktop/SQL$ sudo -u postgres createuser --superuser osagie
[sudo] password for osagie: 
could not change directory to "/home/osagie/Desktop/SQL": Permission denied
createuser: creation of new role failed: ERROR:  role "osagie" already exists
osagie@osagie-Latitude-E4310:~/Desktop/SQL$ createdb osagie
osagie@osagie-Latitude-E4310:~/Desktop/SQL$ psql cyf_hotels
psql (10.14 (Ubuntu 10.14-0ubuntu0.18.04.1))
Type "help" for help.

cyf_hotels=# CREATE TABLE customers (
cyf_hotels(#   id        SERIAL PRIMARY KEY,
cyf_hotels(#   name      VARCHAR(30) NOT NULL,
cyf_hotels(#   email     VARCHAR(120) NOT NULL,
cyf_hotels(#   address   VARCHAR(120),
cyf_hotels(#   city      VARCHAR(30),
cyf_hotels(#   postcode  VARCHAR(12),
cyf_hotels(#   country   VARCHAR(20)
cyf_hotels(# );/dt
CREATE TABLE
cyf_hotels-# /dt
cyf_hotels-# CREATE TABLE customers (
cyf_hotels(#   id        SERIAL PRIMARY KEY,
cyf_hotels(#   name      VARCHAR(30) NOT NULL,
cyf_hotels(#   email     VARCHAR(120) NOT NULL,
cyf_hotels(#   address   VARCHAR(120),
cyf_hotels(#   city      VARCHAR(30),
cyf_hotels(#   postcode  VARCHAR(12),
cyf_hotels(#   country   VARCHAR(20)
cyf_hotels(# );
ERROR:  syntax error at or near "/"
LINE 1: /dt
        ^
cyf_hotels=# /dt
cyf_hotels-# \d customers
                                     Table "public.customers"
  Column  |          Type          | Collation | Nullable |                Default                
----------+------------------------+-----------+----------+---------------------------------------
 id       | integer                |           | not null | nextval('customers_id_seq'::regclass)
 name     | character varying(30)  |           | not null | 
 email    | character varying(120) |           | not null | 
 address  | character varying(120) |           |          | 
 city     | character varying(30)  |           |          | 
 postcode | character varying(12)  |           |          | 
 country  | character varying(20)  |           |          | 
Indexes:
    "customers_pkey" PRIMARY KEY, btree (id)

cyf_hotels-# CREATE TABLE hotels (
cyf_hotels(# id SERIAL PRIMARY KEY,
cyf_hotels(# name VARCHAR(40) NOT NULL,
cyf_hotels(# rooms INT NOT NULL,
cyf_hotels(# postcode VARCHAR(8)
cyf_hotels(# ;
cyf_hotels(# );
ERROR:  syntax error at or near "/"
LINE 1: /dt
        ^
cyf_hotels=# \dt
          List of relations
 Schema |   Name    | Type  | Owner  
--------+-----------+-------+--------
 public | customers | table | osagie
(1 row)

cyf_hotels=# ^C
cyf_hotels=# CREATE TABLE hotels (
cyf_hotels(# id SERIAL PRIMARY KEY,
cyf_hotels(# name VARCHAR(40) NOT NULL,
cyf_hotels(# rooms INT NOT NULL,
cyf_hotels(# postcode VARCHAR(8)
cyf_hotels(# );
CREATE TABLE
cyf_hotels=# \dt
          List of relations
 Schema |   Name    | Type  | Owner  
--------+-----------+-------+--------
 public | customers | table | osagie
 public | hotels    | table | osagie
(2 rows)

cyf_hotels=# CREATE TABLE bookings (
cyf_hotels(#   id               SERIAL PRIMARY KEY,
cyf_hotels(#   customer_id      INT REFERENCES customers(id),
cyf_hotels(#   hotel_id         INT REFERENCES hotels(id),
cyf_hotels(#   checkin_date     DATE NOT NULL,
cyf_hotels(#   nights           INT NOT NULL
cyf_hotels(# );
CREATE TABLE
cyf_hotels=# \dt
          List of relations
 Schema |   Name    | Type  | Owner  
--------+-----------+-------+--------
 public | bookings  | table | osagie
 public | customers | table | osagie
 public | hotels    | table | osagie
(3 rows)

cyf_hotels=# INSERT INTO customers (name, email, address, city, postcode, country) VALUES ('John Smith','j.smith@johnsmith.org','11 New Road','Liverpool','L10 2AB','UK');
 VALUES ('Triple Point Hotel', 10, 'CM194JS');
INSERT INTO bookings (customer_id, hotel_id, checkin_INSERT 0 1
cyf_hotels=# INSERT INTO hotels (name, rooms, postcode) VALUES ('Triple Point Hotel', 10, 'CM194JS');
INSERT 0 1
cyf_hotels=# INSERT INTO bookings (customer_id, hotel_id, checkin_date, nights) VALUES (1, 1, '2019-10-01', 2);
INSERT 0 1
cyf_hotels=# INSERT INTO customers (name, email, address, city, postcode, country) VALUES ('Osagie Okoedo', 'o.okoedo@codeyourfuture.org', '79 Billionaire Str', 'Birmingham', 'B44 6YP', 'UK');
INSERT 0 1
cyf_hotels=# \d customers
                                     Table "public.customers"
  Column  |          Type          | Collation | Nullable |                Default                
----------+------------------------+-----------+----------+---------------------------------------
 id       | integer                |           | not null | nextval('customers_id_seq'::regclass)
 name     | character varying(30)  |           | not null | 
 email    | character varying(120) |           | not null | 
 address  | character varying(120) |           |          | 
 city     | character varying(30)  |           |          | 
 postcode | character varying(12)  |           |          | 
 country  | character varying(20)  |           |          | 
Indexes:
    "customers_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "bookings" CONSTRAINT "bookings_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(id)

cyf_hotels=# SELECT * FROM customers
cyf_hotels-# SELECT * FROM customer;
ERROR:  syntax error at or near "SELECT"
LINE 2: SELECT * FROM customer;
        ^
cyf_hotels=# SELECT * FROM customers
SELECT * FROM customers;
ERROR:  syntax error at or near "SELECT"
LINE 2: SELECT * FROM customers;
        ^
cyf_hotels=# SELECT * FROM customers;
 id |     name      |            email            |      address       |    city    | postcode | country 
----+---------------+-----------------------------+--------------------+------------+----------+---------
  1 | John Smith    | j.smith@johnsmith.org       | 11 New Road        | Liverpool  | L10 2AB  | UK
  2 | Osagie Okoedo | o.okoedo@codeyourfuture.org | 79 Billionaire Str | Birmingham | B44 6YP  | UK
(2 rows)

cyf_hotels=# INSERT INTO hotels (name, rooms, postcode) VALUES ('Triple Point Hotel', 10, 'CM194JS'), ('Royal Cosmos Hotel', 5, 'TR209AX'), ('Pacific Petal Motel', 15, 'BN180TG');
INSERT 0 3
cyf_hotels=# \d hotels                                            Table "public.hotels"
  Column  |         Type          | Collation | Nullable |              Default               
----------+-----------------------+-----------+----------+------------------------------------
 id       | integer               |           | not null | nextval('hotels_id_seq'::regclass)
 name     | character varying(40) |           | not null | 
 rooms    | integer               |           | not null | 
 postcode | character varying(8)  |           |          | 
Indexes:
    "hotels_pkey" PRIMARY KEY, b tree (id)
Referenced by:
    TABLE "bookings" CONSTRAINT "bookings_hotel_id_fkey" FOREIGN KEY (hotel_id) REFERENCES hotels(id)

cyf_hotels=# SELECT * FROM hotels;         id |        name         | rooms | postcode 
----+---------------------+-------+----------
  1 | Triple Point Hotel  |    10 | CM194JS
  2 | Triple Point Hotel  |    10 | CM194JS
  3 | Royal Cosmos Hotel  |     5 | TR209AX
  4 | Pacific Petal Motel |    15 | BN180TG
(4 rows)

cyf_hotels=# INSERT INTO bookings (customer_id, hotel_id, checkin_date, nights) VALUES (100);        ERROR:  INSERT has more target columns than expressions
LINE 1: INSERT INTO bookings (customer_id, hotel_id, checkin_date, n...
                                           ^
cyf_hotels=# SELECT name,address FROM customers;
     name      |      address       
---------------+--------------------
 John Smith    | 11 New Road
 Osagie Okoedo | 79 Billionaire Str
(2 rows)

cyf_hotels=# SELECT * FROM hotels WHERE rooms > 7;
 id |        name         | rooms | postcode 
----+---------------------+-------+----------
  1 | Triple Point Hotel  |    10 | CM194JS
  2 | Triple Point Hotel  |    10 | CM194JS
  4 | Pacific Petal Motel |    15 | BN180TG
(3 rows)

cyf_hotels=# SELECT name,address FROM customers WHERE id = 1;
    name    |   address   
------------+-------------
 John Smith | 11 New Road
(1 row)

cyf_hotels=# SELECT * FROM bookings WHERE checkin_date > '2019/10/01' AND nights >= 2;
 id | customer_id | hotel_id | checkin_date | nights 
----+-------------+----------+--------------+--------
(0 rows)

cyf_hotels=# SELECT * FROM bookings
cyf_hotels-# SELECT * FROM bookings;
ERROR:  syntax error at or near "SELECT"
LINE 2: SELECT * FROM bookings;
        ^
cyf_hotels=# SELECT * FROM bookings;
 id | customer_id | hotel_id | checkin_date | nights 
----+-------------+----------+--------------+--------
  1 |           1 |        1 | 2019-10-01   |      2
(1 row)

cyf_hotels=# SELECT * FROM hotels WHERE postcode = 'CM194JS' OR postcode = 'TR209AX';
 id |        name        | rooms | postcode 
----+--------------------+-------+----------
  1 | Triple Point Hotel |    10 | CM194JS
  2 | Triple Point Hotel |    10 | CM194JS
  3 | Royal Cosmos Hotel |     5 | TR209AX
(3 rows)

cyf_hotels=# psql -d cyf_hotels -f cyf_hotels_exercise5.sql
cyf_hotels-# psql -d cyf_hotels -f cyf_hotels_exercise5.sql
cyf_hotels-# psql -d cyf_hotels -f cyf_hotels_exercise5.sql
cyf_hotels-# SELECT * FROM customers;
ERROR:  syntax error at or near "psql"
LINE 1: psql -d cyf_hotels -f cyf_hotels_exercise5.sql
        ^
cyf_hotels=# psql -d cyf_hotels -f cyf_hotels_exercise5.sql
psql -d cyf_hotels -f cyf_hotels_exercise5.sql
psql -d cyf_hotels -f cyf_hotels_exercise5.sql
SELECT * FROM customers;
ERROR:  syntax error at or near "psql"
LINE 1: psql -d cyf_hotels -f cyf_hotels_exercise5.sql
        ^
cyf_hotels=# SELECT * FROM customers;
 id |       name       |           email            |       address        |    city    | postcode | country 
----+------------------+----------------------------+----------------------+------------+----------+---------
  1 | John Smith       | j.smith@johnsmith.org      | 11 New Road          | Liverpool  | L10 2AB  | UK
  2 | Sue Jones        | s.jones1234@gmail.com      | 120 Old Street       | London     | N10 3CD  | UK
  3 | Alice Evans      | alice.evans001@hotmail.com | 3 High Road          | Manchester | m13 4ef  | UK
  4 | Mohammed Trungpa | mo.trungpa@hotmail.com     | 25 Blue Road         | Manchester | M25 6GH  | UK
  5 | Steven King      | steve.king123@hotmail.com  | 19 Bed Street        | Newtown    | xy2 3ac  | UK
  6 | Nadia Sethuraman | nadia.sethuraman@mail.com  | 135 Green Street     | Manchester | M10 4BG  | UK
  7 | Melinda Marsh    | mel.marsh-123@gmail.com    | 7 Preston Road       | Oldham     | OL3 5XZ  | UK
  8 | Martín Sommer    | martin.sommer@dfgg.net     | C/ Romero, 33        | Madrid     | 28016    | Spain
  9 | Laurence Lebihan | laurence.lebihan@xmzx.net  | 12, rue des Bouchers | Marseille  | 13008    | France
 10 | Keith Stewart    | keith.stewart@gmail.com    | 84 Town Lane         | Tadworth   | td5 7ng  | UK
(10 rows)

cyf_hotels=# SELECT * FROM customers WHERE name = 'Laurence Lebihan';
 id |       name       |           email           |       address        |   city    | postcode | country 
----+------------------+---------------------------+----------------------+-----------+----------+---------
  9 | Laurence Lebihan | laurence.lebihan@xmzx.net | 12, rue des Bouchers | Marseille | 13008    | France
(1 row)

cyf_hotels=# SELECT * FROM customers WHERE country = 'UK';
 id |       name       |           email            |     address      |    city    | postcode | country 
----+------------------+----------------------------+------------------+------------+----------+---------
  1 | John Smith       | j.smith@johnsmith.org      | 11 New Road      | Liverpool  | L10 2AB  | UK
  2 | Sue Jones        | s.jones1234@gmail.com      | 120 Old Street   | London     | N10 3CD  | UK
  3 | Alice Evans      | alice.evans001@hotmail.com | 3 High Road      | Manchester | m13 4ef  | UK
  4 | Mohammed Trungpa | mo.trungpa@hotmail.com     | 25 Blue Road     | Manchester | M25 6GH  | UK
  5 | Steven King      | steve.king123@hotmail.com  | 19 Bed Street    | Newtown    | xy2 3ac  | UK
  6 | Nadia Sethuraman | nadia.sethuraman@mail.com  | 135 Green Street | Manchester | M10 4BG  | UK
  7 | Melinda Marsh    | mel.marsh-123@gmail.com    | 7 Preston Road   | Oldham     | OL3 5XZ  | UK
 10 | Keith Stewart    | keith.stewart@gmail.com    | 84 Town Lane     | Tadworth   | td5 7ng  | UK
(8 rows)

cyf_hotels=# SELECT address, city, postcode FROM customers WHERE name = 'Melinda Marsh';
    address     |  city  | postcode 
----------------+--------+----------
 7 Preston Road | Oldham | OL3 5XZ
(1 row)

cyf_hotels=# SELECT * FROM hotels WHERE postcode = 'DGQ127';
 id |           name           | rooms | postcode 
----+--------------------------+-------+----------
  4 | Azure Crown Resort & Spa |    18 | DGQ127
  5 | Jade Peaks Hotel         |     4 | DGQ127
  6 | Elegant Resort           |    14 | DGQ127
(3 rows)

cyf_hotels=# SELECT * FROM hotels WHERE room > 11;
ERROR:  column "room" does not exist
LINE 1: SELECT * FROM hotels WHERE room > 11;
                                   ^
HINT:  Perhaps you meant to reference the column "hotels.rooms".
cyf_hotels=# SELECT * FROM hotels WHERE rooms > 11;
 id |           name           | rooms | postcode 
----+--------------------------+-------+----------
  4 | Azure Crown Resort & Spa |    18 | DGQ127
  6 | Elegant Resort           |    14 | DGQ127
  7 | Cozy Hotel               |    20 | AYD189
  8 | Snowy Echo Motel         |    15 | AYD189
(4 rows)

cyf_hotels=# SELECT * FROM hotels WHERE rooms <6 AND <11;
ERROR:  syntax error at or near "<"
LINE 1: SELECT * FROM hotels WHERE rooms <6 AND <11;
                                                ^
cyf_hotels=# SELECT * FROM hotels WHERE rooms >6 AND <11;
ERROR:  syntax error at or near "<"
LINE 1: SELECT * FROM hotels WHERE rooms >6 AND <11;
                                                ^
cyf_hotels=# SELECT * FROM hotels WHERE rooms >6 AND <15;
ERROR:  syntax error at or near "<"
LINE 1: SELECT * FROM hotels WHERE rooms >6 AND <15;
                                                ^
cyf_hotels=# SELECT * FROM hotels WHERE rooms >6 AND rooms<15;
 id |          name           | rooms | postcode 
----+-------------------------+-------+----------
  1 | Golden Cavern Resort    |    10 | L10ABC
  3 | Pleasant Mountain Hotel |     7 | ABCDE1
  6 | Elegant Resort          |    14 | DGQ127
(3 rows)

cyf_hotels=# SELECT * FROM hotels WHERE rooms = 10 OR rooms = 20;
 id |         name         | rooms | postcode 
----+----------------------+-------+----------
  1 | Golden Cavern Resort |    10 | L10ABC
  7 | Cozy Hotel           |    20 | AYD189
(2 rows)

cyf_hotels=# SELECT * FROM bookings WHERE customer_id = 1;
 id | customer_id | hotel_id | checkin_date | nights 
----+-------------+----------+--------------+--------
  1 |           1 |        1 | 2019-10-01   |      2
  2 |           1 |        1 | 2019-12-10   |      6
  3 |           1 |        3 | 2019-07-20   |      4
(3 rows)

cyf_hotels=# SELECT * FROM bookings WHERE nights > 4;
 id | customer_id | hotel_id | checkin_date | nights 
----+-------------+----------+--------------+--------
  2 |           1 |        1 | 2019-12-10   |      6
  9 |           4 |        2 | 2019-09-16   |      5
 11 |           6 |        6 | 2020-01-14   |      5
 13 |           8 |        5 | 2020-01-03   |      7
(4 rows)

cyf_hotels=# SELECT * FROM bookings WHERE checkin_date >= 2020-01-01;
ERROR:  operator does not exist: date >= integer
LINE 1: SELECT * FROM bookings WHERE checkin_date >= 2020-01-01;
                                                  ^
HINT:  No operator matches the given name and argument type(s). You might need to add explicit type casts.
cyf_hotels=# SELECT * FROM bookings WHERE checkin_date => 2020-01-01;
ERROR:  syntax error at or near "=>"
LINE 1: SELECT * FROM bookings WHERE checkin_date => 2020-01-01;
                                                  ^
cyf_hotels=# SELECT * FROM bookings WHERE checkin_date >= '2020-01-01';
 id | customer_id | hotel_id | checkin_date | nights 
----+-------------+----------+--------------+--------
  4 |           2 |        3 | 2020-03-10   |      4
  5 |           2 |        5 | 2020-04-01   |      1
 11 |           6 |        6 | 2020-01-14   |      5
 12 |           8 |        4 | 2020-02-01   |      3
 13 |           8 |        5 | 2020-01-03   |      7
(5 rows)

cyf_hotels=# SELECT * FROM bookings WHERE checkin_date < '2020-01-01' AND night < 4;
ERROR:  column "night" does not exist
LINE 1: ...OM bookings WHERE checkin_date < '2020-01-01' AND night < 4;
                                                             ^
HINT:  Perhaps you meant to reference the column "bookings.nights".
cyf_hotels=# SELECT * FROM bookings WHERE checkin_date < '2020-01-01' AND nights < 4;
 id | customer_id | hotel_id | checkin_date | nights 
----+-------------+----------+--------------+--------
  1 |           1 |        1 | 2019-10-01   |      2
  6 |           3 |        1 | 2019-11-01   |      1
  7 |           3 |        2 | 2019-11-23   |      2
  8 |           4 |        8 | 2019-12-23   |      3
 10 |           6 |        5 | 2019-09-14   |      2
(5 rows)

cyf_hotels=# ^C
cyf_hotels=# 

##### Week 2

# Reading

Exercise 1#
Add a column date_of_birth of type DATE in the customers table.
Rename the column date_of_birth to birthdate in the customers table.
Delete the column birthdate from the customers table

Exercise 2#
Create a new table test
Drop the table test

Exercise 3#
Update the postcode of the hotel named Elder Lake Hotel to L10XYZ
Update the number of rooms of Cozy Hotel to 25
For the customer named Nadia Sethuraman, update her address to 2 Blue Street, her city to Glasgow and her postcode to G11ABC in one query
Update all the bookings of customer with ID 1 for the hotel with ID 1 to 5 nights in one query

Exercise 4#
Delete the booking of customer ID 8 for the date 2020-01-03
Delete all the bookings of customer ID 6
Delete the customer with customer ID 6

Exercise 5#
Try and understand each of the queries above in your psql prompt
Retrieve all the bookings along with customer data for bookings starting in 2020
Retrieve the customer names, booking start dates and number of nights for all customers who booked the hotel name Jade Peaks Hotel
Retrieve all the booking start dates with customer names and hotel names for all bookings for more than 5 nights


Exercise 6#
Retrieve all customers whose name starts with the letter S
Retrieve all hotels which have the word Hotel in their name
Retrieve the booking start date, customer name, hotel name for the top 5 bookings ordered by number of nights in descending order

##### Solutions

osagie@osagie-Latitude-E4310:~/Desktop/SQL/Dses-Homework$ psql cyf_hotels
psql (10.15 (Ubuntu 10.15-0ubuntu0.18.04.1))
Type "help" for help.

cyf_hotels=# \dt
          List of relations
 Schema |   Name    | Type  | Owner  
--------+-----------+-------+--------
 public | bookings  | table | osagie
 public | customers | table | osagie
 public | hotels    | table | osagie
(3 rows)

cyf_hotels=# CREATE TABLE test;
ERROR:  syntax error at or near ";"
LINE 1: CREATE TABLE test;
                         ^
cyf_hotels=# CREATE TABLE test (testId INT PRIMARY KEY NOT NULL);
CREATE TABLE
cyf_hotels=# \dt
          List of relations
 Schema |   Name    | Type  | Owner  
--------+-----------+-------+--------
 public | bookings  | table | osagie
 public | customers | table | osagie
 public | hotels    | table | osagie
 public | test      | table | osagie
(4 rows)

cyf_hotels=# \test
Invalid command \test. Try \? for help.
cyf_hotels=# \d test
                Table "public.test"
 Column |  Type   | Collation | Nullable | Default 
--------+---------+-----------+----------+---------
 testid | integer |           | not null | 
Indexes:
    "test_pkey" PRIMARY KEY, btree (testid)

cyf_hotels=# DROP table test;
DROP TABLE
cyf_hotels=# \d hotel
Did not find any relation named "hotel".
cyf_hotels=# \dt hotel
Did not find any relation named "hotel".
cyf_hotels=# \d customers
                                     Table "public.customers"
  Column  |          Type          | Collation | Nullable |                Default                
----------+------------------------+-----------+----------+---------------------------------------
 id       | integer                |           | not null | nextval('customers_id_seq'::regclass)
 name     | character varying(30)  |           | not null | 
 email    | character varying(120) |           | not null | 
 address  | character varying(120) |           |          | 
 city     | character varying(30)  |           |          | 
 postcode | character varying(12)  |           |          | 
 country  | character varying(20)  |           |          | 
Indexes:
    "customers_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "bookings" CONSTRAINT "bookings_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(id)

cyf_hotels=# \dt
          List of relations
 Schema |   Name    | Type  | Owner  
--------+-----------+-------+--------
 public | bookings  | table | osagie
 public | customers | table | osagie
 public | hotels    | table | osagie
(3 rows)

cyf_hotels=# \d hotels
                                     Table "public.hotels"
  Column  |          Type          | Collation | Nullable |              Default               
----------+------------------------+-----------+----------+------------------------------------
 id       | integer                |           | not null | nextval('hotels_id_seq'::regclass)
 name     | character varying(120) |           | not null | 
 rooms    | integer                |           | not null | 
 postcode | character varying(10)  |           |          | 
Indexes:
    "hotels_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "bookings" CONSTRAINT "bookings_hotel_id_fkey" FOREIGN KEY (hotel_id) REFERENCES hotels(id)

cyf_hotels=# SELECT * FROM hotels
cyf_hotels-# \q
osagie@osagie-Latitude-E4310:~/Desktop/SQL/Databases-Homework$ SELECT * FROM hotels;
SELECT: command not found
osagie@osagie-Latitude-E4310:~/Desktop/SQL/Databases-Homework$ ls
README.md  week-1  week-2  week-3
osagie@osagie-Latitude-E4310:~/Desktop/SQL/Databases-Homework$ psql cyf_hotels
psql (10.15 (Ubuntu 10.15-0ubuntu0.18.04.1))
Type "help" for help.

cyf_hotels=# SELECT * FROM hotels;
 id |           name           | rooms | postcode 
----+--------------------------+-------+----------
  1 | Golden Cavern Resort     |    10 | L10ABC
  2 | Elder Lake Hotel         |     5 | L10ABC
  3 | Pleasant Mountain Hotel  |     7 | ABCDE1
  4 | Azure Crown Resort & Spa |    18 | DGQ127
  5 | Jade Peaks Hotel         |     4 | DGQ127
  6 | Elegant Resort           |    14 | DGQ127
  7 | Cozy Hotel               |    20 | AYD189
  8 | Snowy Echo Motel         |    15 | AYD189
(8 rows)

cyf_hotels=# UPDATE hotels SET postcode = "L10XYZ" WHERE id = 2; 
ERROR:  column "L10XYZ" does not exist
LINE 1: UPDATE hotels SET postcode = "L10XYZ" WHERE id = 2;
                                     ^
cyf_hotels=# UPDATE hotels SET postcode = 'L10XY'" WHERE id = 2; 
cyf_hotels"# UPDATE hotels SET postcode = 'L10XYZ' WHERE id = 2; 
cyf_hotels"# SELECT * FROM hotels;
cyf_hotels"# SELECT * FROM hotels;
cyf_hotels"# \Q
cyf_hotels"# \q
cyf_hotels"# \q
cyf_hotels"# SELECT * FROM hotels;
cyf_hotels"# \q
cyf_hotels"# ^Z
[1]+  Stopped                 psql cyf_hotels
osagie@osagie-Latitude-E4310:~/Desktop/SQL/Databases-Homework$ psql cyf_hotels
psql (10.15 (Ubuntu 10.15-0ubuntu0.18.04.1))
Type "help" for help.

cyf_hotels=# SELECT * FROM hotels;
 id |           name           | rooms | postcode 
----+--------------------------+-------+----------
  1 | Golden Cavern Resort     |    10 | L10ABC
  2 | Elder Lake Hotel         |     5 | L10ABC
  3 | Pleasant Mountain Hotel  |     7 | ABCDE1
  4 | Azure Crown Resort & Spa |    18 | DGQ127
  5 | Jade Peaks Hotel         |     4 | DGQ127
  6 | Elegant Resort           |    14 | DGQ127
  7 | Cozy Hotel               |    20 | AYD189
  8 | Snowy Echo Motel         |    15 | AYD189
(8 rows)

cyf_hotels=# UPDATE hotels SET postcode = 'L10XYZ' WHERE id = 2;
UPDATE 1
cyf_hotels=# UPDATE hotels SET rooms = 25 WHERE name = 'Cozy Hotel';
UPDATE 1
cyf_hotels=# SELECT * FROM hotels;
 id |           name           | rooms | postcode 
----+--------------------------+-------+----------
  1 | Golden Cavern Resort     |    10 | L10ABC
  3 | Pleasant Mountain Hotel  |     7 | ABCDE1
  4 | Azure Crown Resort & Spa |    18 | DGQ127
  5 | Jade Peaks Hotel         |     4 | DGQ127
  6 | Elegant Resort           |    14 | DGQ127
  8 | Snowy Echo Motel         |    15 | AYD189
  2 | Elder Lake Hotel         |     5 | L10XYZ
  7 | Cozy Hotel               |    25 | AYD189
(8 rows)

cyf_hotels=# SELECT * FROM customers;
 id |       name       |           email            |       address        |    city    | postcode | country 
----+------------------+----------------------------+----------------------+------------+----------+---------
  1 | John Smith       | j.smith@johnsmith.org      | 11 New Road          | Liverpool  | L10 2AB  | UK
  2 | Sue Jones        | s.jones1234@gmail.com      | 120 Old Street       | London     | N10 3CD  | UK
  3 | Alice Evans      | alice.evans001@hotmail.com | 3 High Road          | Manchester | m13 4ef  | UK
  4 | Mohammed Trungpa | mo.trungpa@hotmail.com     | 25 Blue Road         | Manchester | M25 6GH  | UK
  5 | Steven King      | steve.king123@hotmail.com  | 19 Bed Street        | Newtown    | xy2 3ac  | UK
  6 | Nadia Sethuraman | nadia.sethuraman@mail.com  | 135 Green Street     | Manchester | M10 4BG  | UK
  7 | Melinda Marsh    | mel.marsh-123@gmail.com    | 7 Preston Road       | Oldham     | OL3 5XZ  | UK
  8 | Martín Sommer    | martin.sommer@dfgg.net     | C/ Romero, 33        | Madrid     | 28016    | Spain
  9 | Laurence Lebihan | laurence.lebihan@xmzx.net  | 12, rue des Bouchers | Marseille  | 13008    | France
 10 | Keith Stewart    | keith.stewart@gmail.com    | 84 Town Lane         | Tadworth   | td5 7ng  | UK
(10 rows)

cyf_hotels=# UPDATE CUSTOMERs SET address = '2 Blue Street', city = 'Glasglow' WHERE name = 'Nadia Sethuraman';            UPDATE 1
cyf_hotels=# SELECT * FROM customers;
 id |       name       |           email            |       address        |    city    | postcode | country 
----+------------------+----------------------------+----------------------+------------+----------+---------
  1 | John Smith       | j.smith@johnsmith.org      | 11 New Road          | Liverpool  | L10 2AB  | UK
  2 | Sue Jones        | s.jones1234@gmail.com      | 120 Old Street       | London     | N10 3CD  | UK
  3 | Alice Evans      | alice.evans001@hotmail.com | 3 High Road          | Manchester | m13 4ef  | UK
  4 | Mohammed Trungpa | mo.trungpa@hotmail.com     | 25 Blue Road         | Manchester | M25 6GH  | UK
  5 | Steven King      | steve.king123@hotmail.com  | 19 Bed Street        | Newtown    | xy2 3ac  | UK
  7 | Melinda Marsh    | mel.marsh-123@gmail.com    | 7 Preston Road       | Oldham     | OL3 5XZ  | UK
  8 | Martín Sommer    | martin.sommer@dfgg.net     | C/ Romero, 33        | Madrid     | 28016    | Spain
  9 | Laurence Lebihan | laurence.lebihan@xmzx.net  | 12, rue des Bouchers | Marseille  | 13008    | France
 10 | Keith Stewart    | keith.stewart@gmail.com    | 84 Town Lane         | Tadworth   | td5 7ng  | UK
  6 | Nadia Sethuraman | nadia.sethuraman@mail.com  | 2 Blue Street        | Glasglow   | M10 4BG  | UK
(10 rows)

cyf_hotels=# UPDATE CUSTOMERs SET address = '2 Blue-Red Street' AND city = 'Glasglow' WHERE name = 'Nadia Sethuraman';
ERROR:  invalid input syntax for type boolean: "2 Blue-Red Street"
LINE 1: UPDATE CUSTOMERs SET address = '2 Blue-Red Street' AND city ...
                                       ^
cyf_hotels=# UPDATE CUSTOMERs SET address = '2 Bluered Street' AND city = 'Glasglow' WHERE name = 'Nadia Sethuraman';
ERROR:  invalid input syntax for type boolean: "2 Bluered Street"
LINE 1: UPDATE CUSTOMERs SET address = '2 Bluered Street' AND city =...
                                       ^
cyf_hotels=# UPDATE CUSTOMERs SET address = '2 Blue Street', city = 'Glasglow', postcode = 'G11ABC' WHERE name = 'Nadia Sethuraman';
UPDATE 1
cyf_hotels=# SELECT * FROM bookings;
 id | customer_id | hotel_id | checkin_date | nights 
----+-------------+----------+--------------+--------
  1 |           1 |        1 | 2019-10-01   |      2
  2 |           1 |        1 | 2019-12-10   |      6
  3 |           1 |        3 | 2019-07-20   |      4
  4 |           2 |        3 | 2020-03-10   |      4
  5 |           2 |        5 | 2020-04-01   |      1
  6 |           3 |        1 | 2019-11-01   |      1
  7 |           3 |        2 | 2019-11-23   |      2
  8 |           4 |        8 | 2019-12-23   |      3
  9 |           4 |        2 | 2019-09-16   |      5
 10 |           6 |        5 | 2019-09-14   |      2
 11 |           6 |        6 | 2020-01-14   |      5
 12 |           8 |        4 | 2020-02-01   |      3
 13 |           8 |        5 | 2020-01-03   |      7
 14 |           8 |        8 | 2019-12-25   |      4
(14 rows)

cyf_hotels=# UPDATE bookings SET nights = 5 WHERE id = 1;
UPDATE 1
cyf_hotels=# SELECT * FROM bookings;
 id | customer_id | hotel_id | checkin_date | nights 
----+-------------+----------+--------------+--------
  2 |           1 |        1 | 2019-12-10   |      6
  3 |           1 |        3 | 2019-07-20   |      4
  4 |           2 |        3 | 2020-03-10   |      4
  5 |           2 |        5 | 2020-04-01   |      1
  6 |           3 |        1 | 2019-11-01   |      1
  7 |           3 |        2 | 2019-11-23   |      2
  8 |           4 |        8 | 2019-12-23   |      3
  9 |           4 |        2 | 2019-09-16   |      5
 10 |           6 |        5 | 2019-09-14   |      2
 11 |           6 |        6 | 2020-01-14   |      5
 12 |           8 |        4 | 2020-02-01   |      3
 13 |           8 |        5 | 2020-01-03   |      7
 14 |           8 |        8 | 2019-12-25   |      4
  1 |           1 |        1 | 2019-10-01   |      5
(14 rows)

cyf_hotels=# DELETE from bookings WHERE customer_id = 8 AND checkin_date '2020-01-03'; 
ERROR:  type "checkin_date" does not exist
LINE 1: DELETE from bookings WHERE customer_id = 8 AND checkin_date ...
                                                       ^
cyf_hotels=# DELETE from bookings WHERE customer_id = 8 AND checkin_date = '2020-01-03'; 
DELETE 1
cyf_hotels=# SELECT * FROM bookings;
 id | customer_id | hotel_id | checkin_date | nights 
----+-------------+----------+--------------+--------
  2 |           1 |        1 | 2019-12-10   |      6
  3 |           1 |        3 | 2019-07-20   |      4
  4 |           2 |        3 | 2020-03-10   |      4
  5 |           2 |        5 | 2020-04-01   |      1
  6 |           3 |        1 | 2019-11-01   |      1
  7 |           3 |        2 | 2019-11-23   |      2
  8 |           4 |        8 | 2019-12-23   |      3
  9 |           4 |        2 | 2019-09-16   |      5
 10 |           6 |        5 | 2019-09-14   |      2
 11 |           6 |        6 | 2020-01-14   |      5
 12 |           8 |        4 | 2020-02-01   |      3
 14 |           8 |        8 | 2019-12-25   |      4
  1 |           1 |        1 | 2019-10-01   |      5
(13 rows)

cyf_hotels=# DELETE from bookings WHERE customer_id = 6;
DELETE 2
cyf_hotels=# SELECT * FROM bookings;
 id | customer_id | hotel_id | checkin_date | nights 
----+-------------+----------+--------------+--------
  2 |           1 |        1 | 2019-12-10   |      6
  3 |           1 |        3 | 2019-07-20   |      4
  4 |           2 |        3 | 2020-03-10   |      4
  5 |           2 |        5 | 2020-04-01   |      1
  6 |           3 |        1 | 2019-11-01   |      1
  7 |           3 |        2 | 2019-11-23   |      2
  8 |           4 |        8 | 2019-12-23   |      3
  9 |           4 |        2 | 2019-09-16   |      5
 12 |           8 |        4 | 2020-02-01   |      3
 14 |           8 |        8 | 2019-12-25   |      4
  1 |           1 |        1 | 2019-10-01   |      5
(11 rows)

cyf_hotels=# SELECT * FROM customers;
 id |       name       |           email            |       address        |    city    | postcode | country 
----+------------------+----------------------------+----------------------+------------+----------+---------
  1 | John Smith       | j.smith@johnsmith.org      | 11 New Road          | Liverpool  | L10 2AB  | UK
  2 | Sue Jones        | s.jones1234@gmail.com      | 120 Old Street       | London     | N10 3CD  | UK
  3 | Alice Evans      | alice.evans001@hotmail.com | 3 High Road          | Manchester | m13 4ef  | UK
  4 | Mohammed Trungpa | mo.trungpa@hotmail.com     | 25 Blue Road         | Manchester | M25 6GH  | UK
  5 | Steven King      | steve.king123@hotmail.com  | 19 Bed Street        | Newtown    | xy2 3ac  | UK
  7 | Melinda Marsh    | mel.marsh-123@gmail.com    | 7 Preston Road       | Oldham     | OL3 5XZ  | UK
  8 | Martín Sommer    | martin.sommer@dfgg.net     | C/ Romero, 33        | Madrid     | 28016    | Spain
  9 | Laurence Lebihan | laurence.lebihan@xmzx.net  | 12, rue des Bouchers | Marseille  | 13008    | France
 10 | Keith Stewart    | keith.stewart@gmail.com    | 84 Town Lane         | Tadworth   | td5 7ng  | UK
  6 | Nadia Sethuraman | nadia.sethuraman@mail.com  | 2 Blue Street        | Glasglow   | G11ABC   | UK
(10 rows)

cyf_hotels=# DELETE from customers WHERE_id = 6;
ERROR:  syntax error at or near "="
LINE 1: DELETE from customers WHERE_id = 6;
                                       ^
cyf_hotels=# DELETE from customers WHERE id = 6;
DELETE 1
cyf_hotels=# SELECT * FROM customers INNER JOIN bookings ON customers.id=bookings.customer_id;
[2]+  Stopped                 psql cyf_hotels
osagie@osagie-Latitude-E4310:~/Desktop/SQL/Databases-Homework$ psql cyf_hotels
psql (10.15 (Ubuntu 10.15-0ubuntu0.18.04.1))
Type "help" for help.

cyf_hotels=# SELECT bookings.checkin_date,customers.name,hotels.name FROM bookings
cyf_hotels-# INNER JOIN customers ON customers.id=bookings.customer_id
cyf_hotels-# INNER JOIN hotels ON hotels.id=bookings.hotel_id
cyf_hotels-# WHERE customers.id=1;
 checkin_date |    name    |          name           
--------------+------------+-------------------------
 2019-10-01   | John Smith | Golden Cavern Resort
 2019-12-10   | John Smith | Golden Cavern Resort
 2019-07-20   | John Smith | Pleasant Mountain Hotel
(3 rows)

cyf_hotels=# SELECT * FROM bookings;
 id | customer_id | hotel_id | checkin_date | nights 
----+-------------+----------+--------------+--------
  2 |           1 |        1 | 2019-12-10   |      6
  3 |           1 |        3 | 2019-07-20   |      4
  4 |           2 |        3 | 2020-03-10   |      4
  5 |           2 |        5 | 2020-04-01   |      1
  6 |           3 |        1 | 2019-11-01   |      1
  7 |           3 |        2 | 2019-11-23   |      2
  8 |           4 |        8 | 2019-12-23   |      3
  9 |           4 |        2 | 2019-09-16   |      5
 12 |           8 |        4 | 2020-02-01   |      3
 14 |           8 |        8 | 2019-12-25   |      4
  1 |           1 |        1 | 2019-10-01   |      5
(11 rows)

cyf_hotels=# SELECT bookings.checkin_date,customers.name,hotels.name FROM bookings
cyf_hotels-# INNER JOIN customers ON customers.id=bookings.customer_id
cyf_hotels-# INNER JOIN hotels ON hotels.id=bookings.hotel_id
cyf_hotels-# WHERE customers.id=1;
 checkin_date |    name    |          name           
--------------+------------+-------------------------
 2019-10-01   | John Smith | Golden Cavern Resort
 2019-12-10   | John Smith | Golden Cavern Resort
 2019-07-20   | John Smith | Pleasant Mountain Hotel
(3 rows)

cyf_hotels=# SELECT * FROM customers;
 id |       name       |           email            |       address        |    city    | postcode | country 
----+------------------+----------------------------+----------------------+------------+----------+---------
  1 | John Smith       | j.smith@johnsmith.org      | 11 New Road          | Liverpool  | L10 2AB  | UK
  2 | Sue Jones        | s.jones1234@gmail.com      | 120 Old Street       | London     | N10 3CD  | UK
  3 | Alice Evans      | alice.evans001@hotmail.com | 3 High Road          | Manchester | m13 4ef  | UK
  4 | Mohammed Trungpa | mo.trungpa@hotmail.com     | 25 Blue Road         | Manchester | M25 6GH  | UK
  5 | Steven King      | steve.king123@hotmail.com  | 19 Bed Street        | Newtown    | xy2 3ac  | UK
  7 | Melinda Marsh    | mel.marsh-123@gmail.com    | 7 Preston Road       | Oldham     | OL3 5XZ  | UK
  8 | Martín Sommer    | martin.sommer@dfgg.net     | C/ Romero, 33        | Madrid     | 28016    | Spain
  9 | Laurence Lebihan | laurence.lebihan@xmzx.net  | 12, rue des Bouchers | Marseille  | 13008    | France
 10 | Keith Stewart    | keith.stewart@gmail.com    | 84 Town Lane         | Tadworth   | td5 7ng  | UK
(9 rows)

cyf_hotels=# SELECT * FROM bookings;
 id | customer_id | hotel_id | checkin_date | nights 
----+-------------+----------+--------------+--------
  2 |           1 |        1 | 2019-12-10   |      6
  3 |           1 |        3 | 2019-07-20   |      4
  4 |           2 |        3 | 2020-03-10   |      4
  5 |           2 |        5 | 2020-04-01   |      1
  6 |           3 |        1 | 2019-11-01   |      1
  7 |           3 |        2 | 2019-11-23   |      2
  8 |           4 |        8 | 2019-12-23   |      3
  9 |           4 |        2 | 2019-09-16   |      5
 12 |           8 |        4 | 2020-02-01   |      3
 14 |           8 |        8 | 2019-12-25   |      4
  1 |           1 |        1 | 2019-10-01   |      5
(11 rows)

cyf_hotels=# SELECT * FROM customers INNER JOIN bookings ON customer.id = bookings.customer_id WHERE bookings.checkin_date > '2020-01-01';
ERROR:  missing FROM-clause entry for table "customer"
LINE 1: SELECT * FROM customers INNER JOIN bookings ON customer.id =...
                                                       ^
cyf_hotels=# SELECT * FROM customers INNER JOIN bookings ON bookings.customers_id = customer.id WHERE bookings.checkin_date > '2020-01-01';
ERROR:  column bookings.customers_id does not exist
LINE 1: SELECT * FROM customers INNER JOIN bookings ON bookings.cust...
                                                       ^
HINT:  Perhaps you meant to reference the column "bookings.customer_id".
cyf_hotels=# SELECT * FROM customers INNER JOIN bookings ON bookings.customer_id = customer.id WHERE bookings.checkin_date > '2020-01-01';
ERROR:  missing FROM-clause entry for table "customer"
LINE 1: ...ers INNER JOIN bookings ON bookings.customer_id = customer.i...
                                                             ^
cyf_hotels=# SELECT * FROM customers;
 id |       name       |           email            |       address        |    city    | postcode | country 
----+------------------+----------------------------+----------------------+------------+----------+---------
  1 | John Smith       | j.smith@johnsmith.org      | 11 New Road          | Liverpool  | L10 2AB  | UK
  2 | Sue Jones        | s.jones1234@gmail.com      | 120 Old Street       | London     | N10 3CD  | UK
  3 | Alice Evans      | alice.evans001@hotmail.com | 3 High Road          | Manchester | m13 4ef  | UK
  4 | Mohammed Trungpa | mo.trungpa@hotmail.com     | 25 Blue Road         | Manchester | M25 6GH  | UK
  5 | Steven King      | steve.king123@hotmail.com  | 19 Bed Street        | Newtown    | xy2 3ac  | UK
  7 | Melinda Marsh    | mel.marsh-123@gmail.com    | 7 Preston Road       | Oldham     | OL3 5XZ  | UK
  8 | Martín Sommer    | martin.sommer@dfgg.net     | C/ Romero, 33        | Madrid     | 28016    | Spain
  9 | Laurence Lebihan | laurence.lebihan@xmzx.net  | 12, rue des Bouchers | Marseille  | 13008    | France
 10 | Keith Stewart    | keith.stewart@gmail.com    | 84 Town Lane         | Tadworth   | td5 7ng  | UK
(9 rows)

cyf_hotels=# SELECT * FROM bookings;
 id | customer_id | hotel_id | checkin_date | nights 
----+-------------+----------+--------------+--------
  2 |           1 |        1 | 2019-12-10   |      6
  3 |           1 |        3 | 2019-07-20   |      4
  4 |           2 |        3 | 2020-03-10   |      4
  5 |           2 |        5 | 2020-04-01   |      1
  6 |           3 |        1 | 2019-11-01   |      1
  7 |           3 |        2 | 2019-11-23   |      2
  8 |           4 |        8 | 2019-12-23   |      3
  9 |           4 |        2 | 2019-09-16   |      5
 12 |           8 |        4 | 2020-02-01   |      3
 14 |           8 |        8 | 2019-12-25   |      4
  1 |           1 |        1 | 2019-10-01   |      5
(11 rows)

cyf_hotels=# SELECT * FROM customers INNER JOIN bookings ON bookings.customer_id = customers.id WHERE bookings.checkin_date > '2020-01-01';
 id |     name      |         email          |    address     |  city  | postcode | country | id | customer_id | hotel_id | checkin_date | nights 
----+---------------+------------------------+----------------+--------+----------+---------+----+-------------+----------+--------------+--------
  2 | Sue Jones     | s.jones1234@gmail.com  | 120 Old Street | London | N10 3CD  | UK      |  4 |           2 |        3 | 2020-03-10   |      4
  2 | Sue Jones     | s.jones1234@gmail.com  | 120 Old Street | London | N10 3CD  | UK      |  5 |           2 |        5 | 2020-04-01   |      1
  8 | Martín Sommer | martin.sommer@dfgg.net | C/ Romero, 33  | Madrid | 28016    | Spain   | 12 |           8 |        4 | 2020-02-01   |      3
(3 rows)

cyf_hotels=# SELECT * FROM customers INNER JOIN bookings ON bookings.customer_id = customers.id WHERE bookings.checkin_date > '2019-12-31';
 id |     name      |         email          |    address     |  city  | postcode | country | id | customer_id | hotel_id | checkin_date | nights 
----+---------------+------------------------+----------------+--------+----------+---------+----+-------------+----------+--------------+--------
  2 | Sue Jones     | s.jones1234@gmail.com  | 120 Old Street | London | N10 3CD  | UK      |  4 |           2 |        3 | 2020-03-10   |      4
  2 | Sue Jones     | s.jones1234@gmail.com  | 120 Old Street | London | N10 3CD  | UK      |  5 |           2 |        5 | 2020-04-01   |      1
  8 | Martín Sommer | martin.sommer@dfgg.net | C/ Romero, 33  | Madrid | 28016    | Spain   | 12 |           8 |        4 | 2020-02-01   |      3
(3 rows)

cyf_hotels=# SELECT bookings.checkin_date,customers.name,hotels.name FROM bookings
cyf_hotels-# INNER JOIN customers ON customers.id=bookings.customer_id
cyf_hotels-# INNER JOIN hotels ON hotels.id=bookings.hotel_id
cyf_hotels-# ^ZERE customers.id=1;
[3]+  Stopped                 psql cyf_hotels
osagie@osagie-Latitude-E4310:~/Desktop/SQL/Databases-Homework$ psql cyf_hotels
psql (10.15 (Ubuntu 10.15-0ubuntu0.18.04.1))
Type "help" for help.

cyf_hotels=# SELECT customers.name, bookings.checkin_date, bookings.nights FROM bookings INNER JOIN customers ON customers.id = bookings.customer_id INNER JOIN hotels hotels.id = bookings.hotel_id; 
ERROR:  syntax error at or near "."
LINE 1: ...id = bookings.customer_id INNER JOIN hotels hotels.id = book...
                                                             ^
cyf_hotels=# SELECT customers.name, bookings.checkin_date, bookings.nights FROM bookings INNER JOIN customers ON customers.id = bookings.customer_id INNER JOIN hotel hotel.id = bookings.hotel_id; 
ERROR:  syntax error at or near "."
LINE 1: ...s.id = bookings.customer_id INNER JOIN hotel hotel.id = book...
                                                             ^
cyf_hotels=# SELECT customers.name, bookings.checkin_date, bookings.nights, hotels.name FROM bookings INNER JOIN customers ON customers.id = bookings.customer_id INNER JOIN hotels ON hotels.id = bookings.hotel_id; 
       name       | checkin_date | nights |           name           
------------------+--------------+--------+--------------------------
 John Smith       | 2019-12-10   |      6 | Golden Cavern Resort
 John Smith       | 2019-07-20   |      4 | Pleasant Mountain Hotel
 Sue Jones        | 2020-03-10   |      4 | Pleasant Mountain Hotel
 Sue Jones        | 2020-04-01   |      1 | Jade Peaks Hotel
 Alice Evans      | 2019-11-01   |      1 | Golden Cavern Resort
 Alice Evans      | 2019-11-23   |      2 | Elder Lake Hotel
 Mohammed Trungpa | 2019-12-23   |      3 | Snowy Echo Motel
 Mohammed Trungpa | 2019-09-16   |      5 | Elder Lake Hotel
 Martín Sommer    | 2020-02-01   |      3 | Azure Crown Resort & Spa
 Martín Sommer    | 2019-12-25   |      4 | Snowy Echo Motel
 John Smith       | 2019-10-01   |      5 | Golden Cavern Resort
(11 rows)

cyf_hotels=# SELECT customers.name, bookings.checkin_date, bookings.nights, hotels.name FROM bookings INNER JOIN customers ON customers.id = bookings.customer_id INNER JOIN hotels ON hotels.id = bookings.hotel_id WHERE hotel.name = 'Jade Peaks Hotel'; 
ERROR:  missing FROM-clause entry for table "hotel"
LINE 1: ...OIN hotels ON hotels.id = bookings.hotel_id WHERE hotel.name...
                                                             ^
cyf_hotels=# SELECT customers.name, bookings.checkin_date, bookings.nights, hotels.name FROM bookings INNER JOIN customers ON customers.id = bookings.customer_id INNER JOIN hotels ON hotels.id = bookings.hotel_id WHERE hotels.name = 'Jade Peaks Hotel'; 
   name    | checkin_date | nights |       name       
-----------+--------------+--------+------------------
 Sue Jones | 2020-04-01   |      1 | Jade Peaks Hotel
(1 row)

cyf_hotels=# SELECT customers.name, bookings.nights, hotels.name FROM bookings INNER JOIN customers ON customers.id = bookings.customer_id INNER JOIN hotels ON hotels.id = bookings.hotel_id WHERE bookings.nights > 5; 
    name    | nights |         name         
------------+--------+----------------------
 John Smith |      6 | Golden Cavern Resort
(1 row)

cyf_hotels=# SELECT * FROM customers WHERE id IN (1,2,3,4);
 id |       name       |           email            |    address     |    city    | postcode | country 
----+------------------+----------------------------+----------------+------------+----------+---------
  1 | John Smith       | j.smith@johnsmith.org      | 11 New Road    | Liverpool  | L10 2AB  | UK
  2 | Sue Jones        | s.jones1234@gmail.com      | 120 Old Street | London     | N10 3CD  | UK
  3 | Alice Evans      | alice.evans001@hotmail.com | 3 High Road    | Manchester | m13 4ef  | UK
  4 | Mohammed Trungpa | mo.trungpa@hotmail.com     | 25 Blue Road   | Manchester | M25 6GH  | UK
(4 rows)

cyf_hotels=# SELECT * FROM customers WHERE name LIKE 'Bob%';
 id | name | email | address | city | postcode | country 
----+------+-------+---------+------+----------+---------
(0 rows)

cyf_hotels=# SELECT * FROM customers WHERE name LIKE '%Bob%';
 id | name | email | address | city | postcode | country 
----+------+-------+---------+------+----------+---------
(0 rows)

cyf_hotels=# SELECT * FROM customers; id |       name       |           email            |       address        |    city    | postcode | country 
----+------------------+----------------------------+----------------------+------------+----------+---------
  1 | John Smith       | j.smith@johnsmith.org      | 11 New Road          | Liverpool  | L10 2AB  | UK
  2 | Sue Jones        | s.jones1234@gmail.com      | 120 Old Street       | London     | N10 3CD  | UK
  3 | Alice Evans      | alice.evans001@hotmail.com | 3 High Road          | Manchester | m13 4ef  | UK
  4 | Mohammed Trungpa | mo.trungpa@hotmail.com     | 25 Blue Road         | Manchester | M25 6GH  | UK
  5 | Steven King      | steve.king123@hotmail.com  | 19 Bed Street        | Newtown    | xy2 3ac  | UK
  7 | Melinda Marsh    | mel.marsh-123@gmail.com    | 7 Preston Road       | Oldham     | OL3 5XZ  | UK
  8 | Martín Sommer    | martin.sommer@dfgg.net     | C/ Romero, 33        | Madrid     | 28016    | Spain
  9 | Laurence Lebihan | laurence.lebihan@xmzx.net  | 12, rue des Bouchers | Marseille  | 13008    | France
 10 | Keith Stewart    | keith.stewart@gmail.com    | 84 Town Lane         | Tadworth   | td5 7ng  | UK
(9 rows)

cyf_hotels=# SELECT * FROM customers WHERE name LIKE 's%';
 id | name | email | address | city | postcode | country 
----+------+-------+---------+------+----------+---------
(0 rows)

cyf_hotels=# SELECT * FROM customers WHERE name LIKE 'S%';
 id |    name     |           email           |    address     |  city   | postcode | country 
----+-------------+---------------------------+----------------+---------+----------+---------
  2 | Sue Jones   | s.jones1234@gmail.com     | 120 Old Street | London  | N10 3CD  | UK
  5 | Steven King | steve.king123@hotmail.com | 19 Bed Street  | Newtown | xy2 3ac  | UK
(2 rows)

cyf_hotels=# SELECT * FROM hotels WHERE name LIKE '%Hotel%';
 id |          name           | rooms | postcode 
----+-------------------------+-------+----------
  3 | Pleasant Mountain Hotel |     7 | ABCDE1
  5 | Jade Peaks Hotel        |     4 | DGQ127
  2 | Elder Lake Hotel        |     5 | L10XYZ
  7 | Cozy Hotel              |    25 | AYD189
(4 rows)

cyf_hotels=# SELECT bookings.night, bookings.checkin_date, customers.name, hotels.name FROM bookings INNER JOIN customers ON customers.id = bookings.customer_id INNER JOIN hotels ON hotels.id = bookings.hotel_id ORDER BY DESC LIMIT 5;ERROR:  syntax error at or near "DESC"
LINE 1: ... hotels ON hotels.id = bookings.hotel_id ORDER BY DESC LIMIT...
                                                             ^
cyf_hotels=# SELECT bookings.night, bookings.checkin_date, customers.name, hotels.name FROM bookings INNER JOIN customers ON customers.id = bookings.customer_id INNER JOIN hotels ON hotels.id = bookings.hotel_id ORDER BY bookings.night DESC LIMIT 5;
ERROR:  column bookings.night does not exist
LINE 1: SELECT bookings.night, bookings.checkin_date, customers.name...
               ^
HINT:  Perhaps you meant to reference the column "bookings.nights".
cyf_hotels=# SELECT bookings.nights, bookings.checkin_date, customers.name, hotels.name FROM bookings INNER JOIN customers ON customers.id = bookings.customer_id INNER JOIN hotels ON hotels.id = bookings.hotel_id ORDER BY bookings.nights DESC LIMIT 5;
 nights | checkin_date |       name       |          name           
--------+--------------+------------------+-------------------------
      6 | 2019-12-10   | John Smith       | Golden Cavern Resort
      5 | 2019-09-16   | Mohammed Trungpa | Elder Lake Hotel
      5 | 2019-10-01   | John Smith       | Golden Cavern Resort
      4 | 2020-03-10   | Sue Jones        | Pleasant Mountain Hotel
      4 | 2019-07-20   | John Smith       | Pleasant Mountain Hotel
(5 rows)

cyf_hotels=# 

##### Week 3


