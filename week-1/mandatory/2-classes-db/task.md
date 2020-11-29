# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)

//ANSWER:
 createdb cyf_classes

2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.

//ANSWER:

CREATE TABLE mentors(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    years_in_glasgow VARCHAR(5),
    address VARCHAR(30),
    fav_programming_lang VARCHAR(20)
);

3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).

//ANSWER:

INSERT INTO mentors(id, name, years_in_glasgow, address, fav_programming_lang) VALUES ('1', 'Mentor1', '3', '10 High Street', 'JavaScript');
INSERT INTO mentors(id, name, years_in_glasgow, address, fav_programming_lang) VALUES ('2', 'Mentor2', '6', '20 High Street', 'C++');
INSERT INTO mentors(id, name, years_in_glasgow, address, fav_programming_lang) VALUES ('3', 'Mentor3', '2', '40 High Street', 'C#');
INSERT INTO mentors(id, name, years_in_glasgow, address, fav_programming_lang) VALUES ('4', 'Mentor4', '8', '82 High Street', 'Python');
INSERT INTO mentors(id, name, years_in_glasgow, address, fav_programming_lang) VALUES ('5', 'Mentor5', '1', '91 High Street', 'C');

4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.

//ANSWER:

CREATE TABLE students(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    address VARCHAR(30),
    cyf_graduated VARCHAR(20)
);

5. Insert 10 students in the `students` table.

//ANSWER:

INSERT INTO students(id, name, address, cyf_graduated) VALUES ('1', 'Student1','10 Bake Street', 'yes');
INSERT INTO students(id, name, address, cyf_graduated) VALUES ('2', 'Student2','20 Bake Street', 'no');
INSERT INTO students(id, name, address, cyf_graduated) VALUES ('3', 'Student3','40 Bake Street', 'no');
INSERT INTO students(id, name, address, cyf_graduated) VALUES ('4', 'Student4','82 Bake Street', 'yes');
INSERT INTO students(id, name, address, cyf_graduated) VALUES ('5', 'Student5','91 Bake Street', 'no');
INSERT INTO students(id, name, address, cyf_graduated) VALUES ('6', 'Student6','10 Bake Street', 'yes');
INSERT INTO students(id, name, address, cyf_graduated) VALUES ('7', 'Student7','20 Bake Street', 'no');
INSERT INTO students(id, name, address, cyf_graduated) VALUES ('8', 'Student8','40 Bake Street', 'no');
INSERT INTO students(id, name, address, cyf_graduated) VALUES ('9', 'Student9','82 Bake Street', 'yes');
INSERT INTO students(id, name, address, cyf_graduated) VALUES ('10', 'Student10','91 Bake Street', 'yes');
6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).

//ANSWER:

SELECT * FROM mentors;
SELECT * FROM students;

7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

//ANSWER:

CREATE TABLE classes(
    id SERIAL PRIMARY KEY,
    mentor VARCHAR(20),
    topic VARCHAR(20),
    date VARCHAR(15),
    location VARCHAR(20)
);

8. Insert a few classes in the `classes` table

//ANSWER:

INSERT INTO classes(id, mentor, topic, date, location) VALUES ('1', 'Mentor1','JavaScript', '2020-01-02', 'Birmingham');
INSERT INTO classes(id, mentor, topic, date, location) VALUES ('2', 'Mentor2','HTML', '2020-01-09', 'London');
INSERT INTO classes(id, mentor, topic, date, location) VALUES ('3', 'Mentor3','CSS', '2020-01-16', 'Manchester');
INSERT INTO classes(id, mentor, topic, date, location) VALUES ('4', 'Mentor4','React', '2020-01-23', 'Glasgow');
INSERT INTO classes(id, mentor, topic, date, location) VALUES ('5', 'Mentor5','Node', '2020-02-01', 'London');


9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.

//ANSWER:

CREATE TABLE classes_attended (
  id               SERIAL PRIMARY KEY,
  class      INT REFERENCES classes(id),
  student     INT REFERENCES students(id)
);


INSERT INTO classes_attended (id, class, student) VALUES (1, 1, 1);
INSERT INTO classes_attended (id, class, student) VALUES (2, 1, 2);
INSERT INTO classes_attended (id, class, student) VALUES (3, 2, 3);
INSERT INTO classes_attended (id, class, student) VALUES (4, 4, 1);
INSERT INTO classes_attended (id, class, student) VALUES (5, 3, 1);
INSERT INTO classes_attended (id, class, student) VALUES (6, 5, 4);

10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
        //ANSWER:
        SELECT * FROM mentors WHERE years_in_glasgow > '5';
    - Retrieve all the mentors whose favourite language is Javascript
        //ANSWER:
        SELECT * FROM mentors WHERE fav_programming_lang = 'JavaScript';
    - Retrieve all the students who are CYF graduates
        //ANSWER:
        SELECT * FROM students WHERE cyf_graduated = 'yes';
    - Retrieve all the classes taught before June this year
        //ANSWER:
        SELECT * FROM classes WHERE date < '2020-06-01';
    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).
        //ANSWER:
        SELECT student FROM classes_attended WHERE class = '1';