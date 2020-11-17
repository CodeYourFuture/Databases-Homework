# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.

   CREATE TABLE mentors (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(30) NOT NULL,
  yearsinglasgow  INT NOT NULL,
  address   VARCHAR(120) NOT NULL,
  favlang     VARCHAR(40)

);
3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).
   INSERT INTO MENTORS(name, yearsinglasgow, address, favlang) VALUES('Ebenezer Joshua', 5, '1 Georgia Street,Glasgow', 'AF44TO');
   INSERT INTO MENTORS(name, yearsinglasgow, address, favlang) VALUES('Donald Tramp',25, '2 Georgia Nose,Glasgow', 'AE58TO');
   INSERT INTO MENTORS(name, yearsinglasgow, address, favlang) VALUES('Mayor Daniels', 19, '381 Alphonso Road,Glasgow', 'AF88TO');
   INSERT INTO MENTORS(name, yearsinglasgow, address, favlang) VALUES('John Rawlings', 47, '90 Konado Street,Glasgow', 'TY74TO');
   INSERT INTO MENTORS(name, yearsinglasgow, address, favlang) VALUES('Freddie Bo', 20, '303 Poke Your Nose,Glasgow', 'ZP99LO');
4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.

   CREATE TABLE students (
  id         SERIAL PRIMARY KEY,
  address    VARCHAR(120) NOT NULL,
  cyfgraduate BOOLEAN NOT NULL
);
5. Insert 10 students in the `students` table.
   INSERT INTO STUDENTS(name, address, cyfgraduate) VALUES('John Smith', '123 CHurch Street,Glasgow', TRUE);
   INSERT INTO STUDENTS(name, address, cyfgraduate) VALUES('Joe Diggie', '45 St Johns Street,Glasgow', FALSE);
     INSERT INTO STUDENTS(name, address, cyfgraduate) VALUES('Osagie Jonas', '563 Joker Street,Glasgow', TRUE);
      INSERT INTO STUDENTS(name, address, cyfgraduate) VALUES('Joyce Offei', '123 Nosey Jobs,Glasgow', TRUE);
       INSERT INTO STUDENTS(name, address, cyfgraduate) VALUES('John Jovi', '78 Obstruction Street,Glasgow', TRUE);
6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).
7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

 CREATE TABLE classes (
  id         SERIAL PRIMARY KEY,
  student_id  INT references students(id),
  mentor_id   INT references mentors(id),
  topic  VARCHAR(120) NOT NULL,
  location    VARCHAR(120) NOT NULL,
  datetaught   DATE NOT NULL
);

8. Insert a few classes in the `classes` table
9.  We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.

insert into classes(student_id, mentor_id, topic, location, datetaught) values (4, 2, 'Javascript','Glasgow','20-04-20' );
10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
   Ans :
   select * from mentors where yearsinglasgow > 5;
 id |     name      | yearsinglasgow |          address           | favlang
----+---------------+----------------+----------------------------+---------
  2 | Donald Tramp  |             25 | 2 Georgia Nose,Glasgow     | CSS
  3 | Mayor Daniels |             19 | 381 Alphonso Road,Glasgow  | React
  4 | John Rawlings |             47 | 90 Konado Street,Glasgow   | HTML
  5 | Freddie Bo    |             20 | 303 Poke Your Nose,Glasgow | SQL
(4 rows)

    - Retrieve all the mentors whose favourite language is Javascript
   select * from mentors where favlang = 'Javascript';
cyf_classes=# select * from mentors where favlang = 'Javascript';
 id |      name       | yearsinglasgow |         address          |  favlang
----+-----------------+----------------+--------------------------+------------
  1 | Ebenezer Joshua |              5 | 1 Georgia Street,Glasgow | Javascript
(1 row)
    - Retrieve all the students who are CYF graduates
Ans -  select * from students where cyfgraduate = true;
      id |            address            | cyfgraduate |     name
----+-------------------------------+-------------+--------------
  1 | 123 CHurch Street,Glasgow     | t           | John Smith
  3 | 563 Joker Street,Glasgow      | t           | Osagie Jonas
  4 | 123 Nosey Jobs,Glasgow        | t           | Joyce Offei
  5 | 78 Obstruction Street,Glasgow | t           | John Jovi
(4 rows)
    - Retrieve all the classes taught before June this year
Ans - select * from classes where datetaught < '2020-05-31';
 id | student_id | mentor_id | topic | location | datetaught
----+------------+-----------+-------+----------+------------
  2 |          2 |         3 | HTML  | Glasgow  | 2015-09-20
  3 |          2 |         1 | CSS   | Glasgow  | 2008-11-20
  4 |          1 |         3 | React | London   | 2017-12-20
(3 rows)

    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).
Ans : select student_id from classes where topic='Javascript';
 student_id
------------
          1
          4
(2 rows)
