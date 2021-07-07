# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql
Number 1
osagie@osagie-Latitude-E4310:~/Desktop/SQL/Databases-Homework$ createdb cyf_classes;
// connect to the DataBase //
   osagie@osagie-Latitude-E4310:~/Desktop/SQL/Databases-Homework$ psql cyf_classes;

Number 2   
cyf_classes=# CREATE TABLE mentors (
cyf_classes(#  id        SERIAL PRIMARY KEY,
cyf_classes(# name       VARCHAR(30) NOT NULL,
cyf_classes(# years_lived INT NOT NULL, 
cyf_classes(# address   VARCHAR(120),
cyf_classes(# fav_prog  VARCHAR(20)
cyf_classes(# );
CREATE TABLE

   cyf_classes=# \dt
 List of relations
 Schema |  Name   | Type  | Owner  
--------+---------+-------+--------
 public | mentors | table | osagie
(1 row)

##### with some updating tables etc
Number 3 - Number 9. 

cyf_classes=# INSERT INTO mentors (name, years_lived, address, fav_prog) VALUES ('Wahab Rehman', 10, '11 New Road', 'JavaScript'), ('Tom Paine', 4, '144 Birmingham Road', 'ReactJS'), ('Jane Smith', 12, 'Walsall Road', 'CSS'), ('Noble Goodman', 20, '111 London Str', 'NodeJS'), ('Harry Williams', 6, '9 Windsor Castle', 'ProstgreSQL');
INSERT 0 5
cyf_classes=# SELECT * FROM mentors;
 id |      name      | years_lived |       address       |  fav_prog   
----+----------------+-------------+---------------------+-------------
  1 | Wahab Rehman   |          10 | 11 New Road         | JavaScript
  2 | Tom Paine      |           4 | 144 Birmingham Road | ReactJS
  3 | Jane Smith     |          12 | Walsall Road        | CSS
  4 | Noble Goodman  |          20 | 111 London Str      | NodeJS
  5 | Harry Williams |           6 | 9 Windsor Castle    | ProstgreSQL
(5 rows)

cyf_classes=# CREATE TABLE students (
cyf_classes(# id SERIAL PRIMARY KEY,
cyf_classes(# name VARCHAR(30) NOT NULL,
cyf_classes(# address VARCHAR(120),
cyf_classes(# cyf_graduate VARCHAR(8)
cyf_classes(# );
CREATE TABLE

cyf_classes=# INSERT INTO students (name, address, cyf_graduate) VALUES ('Stephen Hale', '21 Darledale Avenue', 'YES'), ('Mary Peters', '129 Kingscross Lane', 'NO'), ('Martin Davids', '56 Parks Street', 'NO'), ('Sally Coco', '98 Maryland Lane', 'NO'), ('James Bond', '57 Wendy Bypass', 'YES'), ('Felix Liberty', '10 shady Lane', 'YES'), ('Thomas Cook', '53 Gloryland Close', 'NO'), ('Raymond Long', '1 Aggregate Plot', 'YES'), ('Debbie Green', '245 Lutterworth Villa', 'NO'), ('Hilary Clinton', '189 Washinton House', 'YES');
INSERT 0 10
cyf_classes=# SELECT * FROM students;
 id |      name      |        address        | cyf_graduate 
----+----------------+-----------------------+--------------
  1 | Stephen Hale   | 21 Darledale Avenue   | YES
  2 | Mary Peters    | 129 Kingscross Lane   | NO
  3 | Martin Davids  | 56 Parks Street       | NO
  4 | Sally Coco     | 98 Maryland Lane      | NO
  5 | James Bond     | 57 Wendy Bypass       | YES
  6 | Felix Liberty  | 10 shady Lane         | YES
  7 | Thomas Cook    | 53 Gloryland Close    | NO
  8 | Raymond Long   | 1 Aggregate Plot      | YES
  9 | Debbie Green   | 245 Lutterworth Villa | NO
 10 | Hilary Clinton | 189 Washinton House   | YES
(10 rows)

cyf_classes=# CREATE TABLE classes (
cyf_classes(# lead_mentor VARCHAR(30) NOT NULL,
cyf_classes(# topic VARCHAR(30) NOT NULL,
cyf_classes(# date_taught DATE NOT NULL,
cyf_classes(# location VARCHAR(30)
cyf_classes(# );
CREATE TABLE
                                                             ^
cyf_classes=# INSERT INTO classes (lead_mentor, topic, date_taught, location) VALUES ('Carol Straw', 'NodeJS', '2020-08-09', 'Birmingham'), ('Daniel Smith', 'ReactJS', '2020-09-11', 'London'), ('Glory Fayne', 'HTML/CSS', '2020-05-23', 'Birmingham'), ('Fashanu Dane', 'NodeJS', '2019-12-12', 'Manchester'), ('Harry Blake', 'JavaScript', '2020-10-09', 'Glasgow');
INSERT 0 5
cyf_classes=# SELECT * FROM classes;
 lead_mentor  |   topic    | date_taught |  location  
--------------+------------+-------------+------------
 Carol Straw  | NodeJS     | 2020-08-09  | Birmingham
 Daniel Smith | ReactJS    | 2020-09-11  | London
 Glory Fayne  | HTML/CSS   | 2020-05-23  | Birmingham
 Fashanu Dane | NodeJS     | 2019-12-12  | Manchester
 Harry Blake  | JavaScript | 2020-10-09  | Glasgow
(5 rows)


cyf_classes=# ALTER TABLE classes ADD id SERIAL PRIMARY KEY;
ALTER TABLE
cyf_classes=# SELECT * FROM classes;
 lead_mentor  |   topic    | date_taught |  location  | id 
--------------+------------+-------------+------------+----
 Carol Straw  | NodeJS     | 2020-08-09  | Birmingham |  1
 Daniel Smith | ReactJS    | 2020-09-11  | London     |  2
 Glory Fayne  | HTML/CSS   | 2020-05-23  | Birmingham |  3
 Fashanu Dane | NodeJS     | 2019-12-12  | Manchester |  4
 Harry Blake  | JavaScript | 2020-10-09  | Glasgow    |  5
(5 rows)

cyf_classes=# 

osagie@osagie-Latitude-E4310:~$ touch .psql_history
osagie@osagie-Latitude-E4310:~$ psql cyf_classes
psql (10.14 (Ubuntu 10.14-0ubuntu0.18.04.1))
Type "help" for help.

cyf_classes=# SELECT * FROM classes;
 lead_mentor  |   topic    | date_taught |  location  | classid 
--------------+------------+-------------+------------+---------
 Carol Straw  | NodeJS     | 2020-08-09  | Birmingham |       1
 Daniel Smith | ReactJS    | 2020-09-11  | London     |       2
 Glory Fayne  | HTML/CSS   | 2020-05-23  | Birmingham |       3
 Fashanu Dane | NodeJS     | 2019-12-12  | Manchester |       4
 Harry Blake  | JavaScript | 2020-10-09  | Glasgow    |       5
(5 rows)

cyf_classes=# SELECT * FROM students;
      name      |        address        | cyf_graduate | studentid 
----------------+-----------------------+--------------+-----------
 Stephen Hale   | 21 Darledale Avenue   | YES          |         1
 Mary Peters    | 129 Kingscross Lane   | NO           |         2
 Martin Davids  | 56 Parks Street       | NO           |         3
 Sally Coco     | 98 Maryland Lane      | NO           |         4
 James Bond     | 57 Wendy Bypass       | YES          |         5
 Felix Liberty  | 10 shady Lane         | YES          |         6
 Thomas Cook    | 53 Gloryland Close    | NO           |         7
 Raymond Long   | 1 Aggregate Plot      | YES          |         8
 Debbie Green   | 245 Lutterworth Villa | NO           |         9
 Hilary Clinton | 189 Washinton House   | YES          |        10
(10 rows)

cyf_classes=# SELECT * FROM mentors;
 id |      name      | years_lived |       address       |  fav_prog   
----+----------------+-------------+---------------------+-------------
  1 | Wahab Rehman   |          10 | 11 New Road         | JavaScript
  2 | Tom Paine      |           4 | 144 Birmingham Road | ReactJS
  3 | Jane Smith     |          12 | Walsall Road        | CSS
  4 | Noble Goodman  |          20 | 111 London Str      | NodeJS
  5 | Harry Williams |           6 | 9 Windsor Castle    | ProstgreSQL
(5 rows)

cyf_classes=# CREATE TABLE attendances (
cyf_classes(#  attendanceid        SERIAL PRIMARY KEY,
cyf_classes(# attend_date       VARCHAR(30) NOT NULL,
cyf_classes(# studentid INTEGER REFERENCES students(studentid), 
cyf_classes(# classid INTEGER REFERENCES classes(classid)
cyf_classes(# );
CREATE TABLE

INSERT INTO attendances (attend_date, studentid, classesid) VALUES ('2020-06-18', '2', '4'), ('2020-07-28', '7', '4');

cyf_classes=# SELECT * FROM attendances;
 attendanceid | attend_date | studentid | classesid 
--------------+-------------+-----------+-----------
            1 | 2020-06-18  |         2 |         4
            2 | 2020-07-28  |         7 |         4
(2 rows)
INSERT 0 2

osagie@osagie-Latitude-E4310:~$ psql cyf_classes
psql (10.14 (Ubuntu 10.14-0ubuntu0.18.04.1))
Type "help" for help.

cyf_classes=# ALTER TABLE attendances RENAME COLUMN classesid TO classid;
ALTER TABLE
cyf_classes=# SELECT * FROM attendances;
 attendanceid | attend_date | studentid | classid 
--------------+-------------+-----------+---------
            1 | 2020-06-18  |         2 |       4
            2 | 2020-07-28  |         7 |       4
(2 rows)
    
 
cyf_classes=# INSERT INTO attendances (attend_date, studentid, classid) VALUES ('2020-03-28', 3, 1);
INSERT 0 1                                                                             cyf_classes=# INSERT INTO attendances (attend_date, studentid, classid) VALUES ('2020-03-02',4, 3);
INSERT 0 1
cyf_classes=# INSERT INTO attendances (attend_date, studentid, classid) VALUES ('2020-05-12',2, 2);
INSERT 0 1
cyf_classes=# SELECT * FROM mentors;
 id |      name      | years_lived |       address       |  fav_prog   
----+----------------+-------------+---------------------+-------------
  1 | Wahab Rehman   |          10 | 11 New Road         | JavaScript
  2 | Tom Paine      |           4 | 144 Birmingham Road | ReactJS
  3 | Jane Smith     |          12 | Walsall Road        | CSS
  4 | Noble Goodman  |          20 | 111 London Str      | NodeJS
  5 | Harry Williams |           6 | 9 Windsor Castle    | ProstgreSQL
(5 rows)

######
10. 
cyf_classes=# SELECT * FROM mentors WHERE years_lived > 5;
 id |      name      | years_lived |     address      |  fav_prog   
----+----------------+-------------+------------------+-------------
  1 | Wahab Rehman   |          10 | 11 New Road      | JavaScript
  3 | Jane Smith     |          12 | Walsall Road     | CSS
  4 | Noble Goodman  |          20 | 111 London Str   | NodeJS
  5 | Harry Williams |           6 | 9 Windsor Castle | ProstgreSQL
(4 rows)

cyf_classes=# SELECT * FROM mentors WHERE fav_prog = 'JavaScript';
 id |     name     | years_lived |   address   |  fav_prog  
----+--------------+-------------+-------------+------------
  1 | Wahab Rehman |          10 | 11 New Road | JavaScript
(1 row)

cyf_classes=# SELECT * FROM students;
      name      |        address        | cyf_graduate | studentid 
----------------+-----------------------+--------------+-----------
 Stephen Hale   | 21 Darledale Avenue   | YES          |         1
 Mary Peters    | 129 Kingscross Lane   | NO           |         2
 Martin Davids  | 56 Parks Street       | NO           |         3
 Sally Coco     | 98 Maryland Lane      | NO           |         4
 James Bond     | 57 Wendy Bypass       | YES          |         5
 Felix Liberty  | 10 shady Lane         | YES          |         6
 Thomas Cook    | 53 Gloryland Close    | NO           |         7
 Raymond Long   | 1 Aggregate Plot      | YES          |         8
 Debbie Green   | 245 Lutterworth Villa | NO           |         9
 Hilary Clinton | 189 Washinton House   | YES          |        10
(10 rows)

cyf_classes=# SELECT * FROM students WHERE cyf_graduate = 'YES';
      name      |       address       | cyf_graduate | studentid 
----------------+---------------------+--------------+-----------
 Stephen Hale   | 21 Darledale Avenue | YES          |         1
 James Bond     | 57 Wendy Bypass     | YES          |         5
 Felix Liberty  | 10 shady Lane       | YES          |         6
 Raymond Long   | 1 Aggregate Plot    | YES          |         8
 Hilary Clinton | 189 Washinton House | YES          |        10
(5 rows)

cyf_classes=# SELECT * FROM classes;
 lead_mentor  |   topic    | date_taught |  location  | classid 
--------------+------------+-------------+------------+---------
 Carol Straw  | NodeJS     | 2020-08-09  | Birmingham |       1
 Daniel Smith | ReactJS    | 2020-09-11  | London     |       2
 Glory Fayne  | HTML/CSS   | 2020-05-23  | Birmingham |       3
 Fashanu Dane | NodeJS     | 2019-12-12  | Manchester |       4
 Harry Blake  | JavaScript | 2020-10-09  | Glasgow    |       5
(5 rows)

cyf_classes=# SELECT * FROM classes WHERE date_taught < '2020-06-01';
 lead_mentor  |  topic   | date_taught |  location  | classid 
--------------+----------+-------------+------------+---------
 Glory Fayne  | HTML/CSS | 2020-05-23  | Birmingham |       3
 Fashanu Dane | NodeJS   | 2019-12-12  | Manchester |       4
(2 rows)

cyf_classes=# SELECT * FROM attendances;
 attendanceid | attend_date | studentid | classid 
--------------+-------------+-----------+---------
            1 | 2020-06-18  |         2 |       4
            2 | 2020-07-28  |         7 |       4
            3 | 2020-03-28  |         3 |       1
            4 | 2020-03-02  |         4 |       3
            5 | 2020-05-12  |         2 |       2
(5 rows)


cyf_classes=# SELECT classes.topic, attendances.studentid FROM classes, attendances WHERE classes.topic = 'JavaScript' AND classes.classid = attendances.classid;
 topic | studentid 
-------+-----------
(0 rows)

cyf_classes=# INSERT INTO attendances (attend_date, studentid, classid) VALUES ('2020-05-12',2, 5);INSERT 0 1
cyf_classes=# SELECT * FROM attendances; attendanceid | attend_date | studentid | classid 
--------------+-------------+-----------+---------
            1 | 2020-06-18  |         2 |       4
            2 | 2020-07-28  |         7 |       4
            3 | 2020-03-28  |         3 |       1
            4 | 2020-03-02  |         4 |       3
            5 | 2020-05-12  |         2 |       2
            6 | 2020-05-12  |         2 |       5
(6 rows)

cyf_classes=# SELECT classes.topic, attendances.studentid FROM classes, attendances WHERE classes.topic = 'JavaScript' AND classes.classid = attendances.classid;
   topic    | studentid 
------------+-----------
 JavaScript |         2
(1 row)

cyf_classes=# 

###### the End

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.
3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate).
4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.
5. Insert 10 students in the `students` table.
6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).
7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

8. Insert a few classes in the `classes` table
9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.
10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
    - Retrieve all the mentors whose favourite language is Javascript
    - Retrieve all the students who are CYF graduates
    - Retrieve all the classes taught before June this year
    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).


