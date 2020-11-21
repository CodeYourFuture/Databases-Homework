# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
    CREATE DATABASE cyf_classes;
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.
   CREATE TABLE mentors(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(30) NOT NULL,
    years_lived_in_glasgow INT NOT NULL,
    address  VARCHAR(120),
    favourite_programming_language VARCHAR(120) 
    );
3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).
    INSERT INTO mentors (name, years_lived_in_glasgow, address, favourite_programming_language) VALUES ('Ali Haider',3,'1 New Road','Javascript');
    INSERT INTO mentors (name, years_lived_in_glasgow, address, favourite_programming_language) VALUES ('denis azri',4,'2 Newhampton street','css');
    INSERT INTO mentors (name, years_lived_in_glasgow, address, favourite_programming_language) VALUES ('adebola',5,'3 old Road','html');
    INSERT INTO mentors (name, years_lived_in_glasgow, address, favourite_programming_language) VALUES ('ekip',6,'4 john Road','react');
    INSERT INTO mentors (name, years_lived_in_glasgow, address, favourite_programming_language) VALUES ('claire',7,'5 hamton Road','node');
4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.
    CREATE TABLE students(                
    id       SERIAL PRIMARY KEY,         
    name     VARCHAR(30) NOT NULL,       
    address varchar(30),
    graduation_from_CYF VARCHAR(30)
    )
5. Insert 10 students in the `students` table.
    INSERT INTO students (name, address, graduation_from_CYF) VALUES ('ekip','4 john Road','yes');
    INSERT INTO students (name, address, graduation_from_CYF) VALUES ('john','5 lea Road','No');
    INSERT INTO students (name, address, graduation_from_CYF) VALUES ('ali','6 waterloo Road','yes');
    INSERT INTO students (name, address, graduation_from_CYF) VALUES ('haseeb','7 john Road','No');
    INSERT INTO students (name, address, graduation_from_CYF) VALUES ('adebola','8 penn Road','yes');
    INSERT INTO students (name, address, graduation_from_CYF) VALUES ('hassan','9 stubbs Road','No');
    INSERT INTO students (name, address, graduation_from_CYF) VALUES ('lola','10C Road','yes');
    INSERT INTO students (name, address, graduation_from_CYF) VALUES ('umair','11 john Road','No');
    INSERT INTO students (name, address, graduation_from_CYF) VALUES ('sadat','12a Road','yes');
    INSERT INTO students (name, address, graduation_from_CYF) VALUES ('yousuf','16 john Road','No');
6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).
    
     SELECT * from mentors;

 id |    name    | years_lived_in_glasgow |       address       | favourite_programming_language
----+------------+------------------------+---------------------+--------------------------------
  1 | Ali Haider |                      3 | 1 New Road          | Javascript
  2 | denis azri |                      4 | 2 Newhampton street | css
  3 | adebola    |                      5 | 3 old Road          | html
  4 | ekip       |                      6 | 4 john Road         | react
  5 | claire     |                      7 | 5 hamton Road       | node
(5 rows)
     
     SELECT * from students;

 id |  name   |     address     | graduation_from_cyf
----+---------+-----------------+---------------------
  1 | ekip    | 4 john Road     | yes
  2 | john    | 5 lea Road      | No
  3 | ali     | 6 waterloo Road | yes
  4 | haseeb  | 7 john Road     | No
  5 | adebola | 8 penn Road     | yes
  6 | hassan  | 9 stubbs Road   | No
  7 | lola    | 10C Road        | yes
  8 | umair   | 11 john Road    | No
  9 | sadat   | 12a Road        | yes
 10 | yousuf  | 16 john Road    | No
(10 rows)
7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

    CREATE TABLE classes(             
    id       SERIAL PRIMARY KEY,
    mentor   VARCHAR(30) NOT NULL, 
    topic    VARCHAR(30),
    date     DATE,
    location VARCHAR(30)
     );
8. Insert a few classes in the `classes` table
    INSERT INTO classes (mentor, topic, date, location) VALUES ('emile','react','2020-11-11','westmidlands');
    INSERT INTO classes (mentor, topic, date, location) VALUES ('wahab','node','2020-10-11','westmidlands');
    INSERT INTO classes (mentor, topic, date, location) VALUES ('shukri','javascript','2020-9-11','westmidlands');
    INSERT INTO classes (mentor, topic, date, location) VALUES ('shukri','javascript','2018-8-01','westmidlands');
    INSERT INTO classes (mentor, topic, date, location) VALUES ('wahab','node','2020-10-11','westmidlands');
9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.

         CREATE TABLE classes_attendance(
      id       SERIAL PRIMARY KEY,     
      students_id    INT REFERENCES students(id),
      javacript       VARCHAR(30),
      react           VARCHAR(30),
      node            VARCHAR(30)
     );

     INSERT INTO classes_attendance (students_id,javacript, react, node) VALUES (1,'yes','yes','yes'); 
     INSERT INTO classes_attendance (students_id,javacript, react, node) VALUES (2,'yes','yes','no');  
     INSERT INTO classes_attendance (students_id,javacript, react, node) VALUES (3,'yes','no','no');  
     INSERT INTO classes_attendance (students_id,javacript, react, node) VALUES (4,'no','no','no');  
     INSERT INTO classes_attendance (students_id,javacript, react, node) VALUES (5,'no','no','yes');
     INSERT INTO classes_attendance (students_id,javacript, react, node) VALUES (6,'no','yes','yes');
     INSERT INTO classes_attendance (students_id,javacript, react, node) VALUES (7,'yes','yes','yes'); 
     INSERT INTO classes_attendance (students_id,javacript, react, node) VALUES (8,'no','yes','yes');  
     INSERT INTO classes_attendance (students_id,javacript, react, node) VALUES (9,'no','no','yes');  
     INSERT INTO classes_attendance (students_id,javacript, react, node) VALUES (9,'no','no','no');  

10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow

    SELECT * FROM mentors where years_lived_in_glasgow > 5;
 id |  name  | years_lived_in_glasgow |    address    | favourite_programming_language
----+--------+------------------------+---------------+--------------------------------
  4 | ekip   |                      6 | 4 john Road   | react
  5 | claire |                      7 | 5 hamton Road | node
(2 rows)

    - Retrieve all the mentors whose favourite language is Javascript

    SELECT * FROM mentors where favourite_programming_language = 'Javascript';
 id |    name    | years_lived_in_glasgow |  address   | favourite_programming_language
----+------------+------------------------+------------+--------------------------------
  1 | Ali Haider |                      3 | 1 New Road | Javascript
(1 row)

    - Retrieve all the students who are CYF graduates

    SELECT * FROM students where graduation_from_cyf = 'yes';                   
 id |  name   |     address     | graduation_from_cyf
----+---------+-----------------+---------------------
  1 | ekip    | 4 john Road     | yes
  3 | ali     | 6 waterloo Road | yes
  5 | adebola | 8 penn Road     | yes
  7 | lola    | 10C Road        | yes
  9 | sadat   | 12a Road        | yes
(5 rows)

    - Retrieve all the classes taught before June this year

    SELECT * FROM classes where date < '2020-06-01';                           
 id | mentor |   topic    |    date    |   location
----+--------+------------+------------+--------------
  4 | shukri | javascript | 2018-08-01 | westmidlands
(1 row)

    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).

    SELECT students_id FROM classes_attendance where javascript = 'yes';
 students_id
-------------
           1
           2
           3
           7
(4 rows)
