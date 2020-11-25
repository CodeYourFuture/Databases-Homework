SELECT * FROM customers INNER JOIN orders ON customers.id=orders.customer_id;

SELECT name FROM customers orders BY column DESC where INNER JOIN ON customers.id=orders.customer_id;

 ORDER BY column DESC

SELECT name  FROM customers INNER JOIN orders ON customers.id=orders.customer_id ORDER BY name ASC;

SELECT name  FROM customers ORDER BY name ASC;

SELECT product_name  from products WHERE product_name LIKE '%socks%';

SELECT unit_price FROM products ORDER BY unit_price DESC limit 5;

SELECT * FROM suppliers INNER JOIN products ON suppliers.id=products.supplier_id;

SELECT product_name,unit_price,supplier_name FROM suppliers INNER JOIN products ON suppliers.id=products.supplier_id;

SELECT product_name,supplier_name FROM suppliers INNER JOIN products ON suppliers.id=products.supplier_id;

SELECT * FROM customers INNER JOIN orders ON customers.id=orders.customer_id WHERE customers.id=1;

SELECT * FROM customers INNER JOIN orders ON customers.id=orders.customer_id WHERE name ='Hope Crosby';

SELECT product_name,unit_price,quantity FROM products INNER JOIN orders ON products.id=orders.product_id WHERE order_reference ='ORD006';

SELECT * FROM bookings
INNER JOIN customers ON customers.id=bookings.customer_id
INNER JOIN hotels ON hotels.id=bookings.hotel_id

SELECT * FROM products 
INNER JOIN order_items ON order_items.id=products.supplier_id 
INNER JOIN orders ON orders.id=products.product_id;

SELECT product_name,unit_price,quantity FROM order_items INNER JOIN orders ON order_items.id=orders.customer_id
INNER JOIN products ON order_items.id=products.supplier_id WHERE order_reference ='ORD006';



SELECT name FROM order_items INNER JOIN orders ON order_items.id=orders.customer_id
INNER JOIN products ON order_items.id=products.supplier_id
INNER JOIN customers ON order_items.id=customers.id
INNER JOIN suppliers ON order_items.id=suppliers.id WHERE suppliers.country = 'China';





SELECT name FROM order_items INNER JOIN orders ON order_items.id=orders.customer_id
INNER JOIN products ON order_items.id=products.supplier_id
INNER JOIN customers ON order_items.id=customers.id;



