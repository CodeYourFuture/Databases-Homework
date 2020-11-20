# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql
1. martinboylan=> createdb cyf_classes //This bit didnt work I only realise at the end.
2.
cyf_hotels=> CREATE TABLE mentors (
cyf_hotels(> name VARCHAR(30) NOT NULL,
cyf_hotels(> years INT NOT NULL,
cyf_hotels(> address VARCHAR(120) NOT NULL,
cyf_hotels(> language VARCHAR(20)
cyf_hotels(> );
3.
cyf_hotels=> INSERT INTO mentors (name, years, address, language) VALUES ('Paul', 8, '5 Welsh Street', 'PYTHON');
INSERT 0 1
cyf_hotels=> INSERT INTO mentors (name, years, address, language) VALUES ('Dan', 5, '5 Irishh Street', 'JAVASCRIPT');
INSERT 0 1
cyf_hotels=> INSERT INTO mentors (name, years, address, language) VALUES ('Steve', 14, '5 Welsh Street', 'JAVA');
INSERT 0 1
cyf_hotels=> INSERT INTO mentors (name, years, address, language) VALUES ('Pauline', 41, '8 Filbert Street', 'HTML');
INSERT 0 1
cyf_hotels=> INSERT INTO mentors (name, years, address, language) VALUES ('Sadhaf', 4, '12 Filbert Roadt', 'CSS');
INSERT 0 1

4.
cyf_hotels=> CREATE TABLE students (
cyf_hotels(> name VARCHAR(30),
cyf_hotels(> address VARCHAR(120),
cyf_hotels(> graduated BOOLEAN
cyf_hotels(> );
```

5. cyf_hotels=> INSERT INTO students (name, address, graduated) VALUES ('Daveen', 25, True);
   INSERT 0 1
   cyf_hotels=> INSERT INTO students (name, address, graduated) VALUES ('Dave', 28, True);
   INSERT 0 1
   cyf_hotels=> INSERT INTO students (name, address, graduated) VALUES ('Sam', 233, False);
   INSERT 0 1
   cyf_hotels=> INSERT INTO students (name, address, graduated) VALUES ('Joyce', 27, True);
   INSERT 0 1
   cyf_hotels=> INSERT INTO students (name, address, graduated) VALUES ('Frank', 19, True);
   INSERT 0 1
   cyf_hotels=> INSERT INTO students (name, address, graduated) VALUES ('Tracey', 25, False);
   INSERT 0 1
   cyf_hotels=> INSERT INTO students (name, address, graduated) VALUES ('Gennady', 34, True);
   INSERT 0 1
   cyf_hotels=> INSERT INTO students (name, address, graduated) VALUES ('Susan', 30, True);
   INSERT 0 1
   cyf_hotels=> INSERT INTO students (name, address, graduated) VALUES ('Riccardo', 45, False);
   INSERT 0 1
   cyf_hotels=> INSERT INTO students (name, address, graduated) VALUES ('Mark', 25, True);
   INSERT 0 1
6.

cyf_hotels=> SELECT \* FROM mentors;
name | years | address | language  
---------+-------+------------------+------------
Paul | 8 | 5 Welsh Street | PYTHON
Dan | 5 | 5 Irishh Street | JAVASCRIPT
Steve | 14 | 5 Welsh Street | JAVA
Pauline | 41 | 8 Filbert Street | HTML
Sadhaf | 4 | 12 Filbert Roadt | CSS
(5 rows)

cyf_hotels=> SELECT \* FROM students;
name | address | graduated
----------+---------+-----------
Daveen | 25 | t
Dave | 28 | t
Sam | 233 | f
Joyce | 27 | t
Frank | 19 | t
Tracey | 25 | f
Gennady | 34 | t
Susan | 30 | t
Riccardo | 45 | f
Mark | 25 | t
(10 rows)

7. cyf_hotels=> CREATE TABLE classes (
   cyf_hotels(> id SERIAL PRIMARY KEY,
   cyf_hotels(> leadmentor VARCHAR(30) NOT NULL,
   cyf_hotels(> topic VARCHAR(30) NOT NULL,
   cyf_hotels(> date DATE,
   cyf_hotels(> location VARCHAR(30) NOT NULL
   cyf_hotels(> );

8. cyf_hotels=> INSERT INTO classes (leadmentor, topic, date, location)
   cyf_hotels-> VALUES ('Karen', 'JAVASCRIPT', '2021-10-20', 'Birmingham');
   INSERT 0 1
   cyf_hotels=> INSERT INTO classes (leadmentor, topic, date, location) VALUES ('Jeremiah', 'JAVA', '2021-04-15', 'Manchester');
   INSERT 0 1
   cyf_hotels=> INSERT INTO classes (leadmentor, topic, date, location) VALUES ('Apollo', 'CSS', '2021-07-30', 'London');

9. cyf_hotels=> CREATE TABLE attendsclass (
   cyf_hotels(> id SERIAL PRIMARY KEY,
   cyf_hotels(> studentname VARCHAR(30),
   cyf_hotels(> classid INT
   cyf_hotels(> );

10. cyf_hotels=> SELECT \* FROM mentors WHERE years > 5;
    name | years | address | language
    ---------+-------+------------------+----------
    Paul | 8 | 5 Welsh Street | PYTHON
    Steve | 14 | 5 Welsh Street | JAVA
    Pauline | 41 | 8 Filbert Street | HTML
    (3 rows)

cyf_hotels=> SELECT \* FROM mentors WHERE language = 'JAVASCRIPT';
name | years | address | language  
------+-------+-----------------+------------
Dan | 5 | 5 Irishh Street | JAVASCRIPT
(1 row)

cyf_hotels=> SELECT \* FROM students WHERE graduated = true;
name | address | graduated
---------+---------+-----------
Daveen | 25 | t
Dave | 28 | t
Joyce | 27 | t
Frank | 19 | t
Gennady | 34 | t
Susan | 30 | t
Mark | 25 | t
(7 rows)

cyf_hotels=> SELECT \* FROM classes WHERE date < '2020-06-01';
id | leadmentor | topic | date | location
----+------------+-------+------+----------
(0 rows)

cyf_hotels=> ALTER TABLE students ADD COLUMN classid INT;
ALTER TABLE

cyf_hotels=> UPDATE students SET classid = 1 WHERE graduated = false;
UPDATE 3
cyf_hotels=> SELECT \* FROM students;
name | address | graduated | classid
----------+---------+-----------+---------
Daveen | 25 | t |  
 Dave | 28 | t |  
 Joyce | 27 | t |  
 Frank | 19 | t |  
 Gennady | 34 | t |  
 Susan | 30 | t |  
 Mark | 25 | t |  
 Sam | 233 | f | 1
Tracey | 25 | f | 1
Riccardo | 45 | f | 1
(10 rows)

cyf_hotels=> SELECT name FROM students WHERE classid = 1;
name

---

Sam
Tracey
Riccardo
(3 rows)

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.
3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).
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
