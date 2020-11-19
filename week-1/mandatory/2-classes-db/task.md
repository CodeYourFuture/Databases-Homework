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

SELECT * FROM mentors WHERE years >5;
SELECT * FROM mentors WHERE language='Javascript';
SELECT * FROM students WHERE graduation;
SELECT * FROM classes WHERE date<'2020-06-01';
SELECT student_id FROM classes INNER JOIN attendances ON classes.id=attendances.class_id WHERE topic='HTML';


CREATE TABLE mentors (
  id        SERIAL PRIMARY KEY,
   name      VARCHAR(30) NOT NULL,
address   VARCHAR(120),
  years     INT NOT NULL,
  language   VARCHAR(20)
);
CREATE TABLE students (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(30) NOT NULL,
  address   VARCHAR(120),
  graduation BOOLEAN NOT NULL
);

CREATE TABLE classes (
  id               SERIAL PRIMARY KEY,
  mentor_id      INT REFERENCES mentors(id),
  location   VARCHAR(120),
  date     DATE NOT NULL,
  topic        VARCHAR(60)
);

CREATE TABLE attendances (
    id        SERIAL PRIMARY KEY,
    student_id  INT REFERENCES students(id),
    class_id  INT REFERENCES classes(id)

);
INSERT INTO attendances (student_id,class_id) VALUES (1,4);
INSERT INTO attendances (student_id,class_id) VALUES (2,3);
INSERT INTO attendances (student_id,class_id) VALUES (3,2);
INSERT INTO attendances (student_id,class_id) VALUES (1,2);
INSERT INTO attendances (student_id,class_id) VALUES (2,1);


INSERT INTO mentors (name,  address, years , language) VALUES ('John Smith','11 New Road',3,'javascript');
INSERT INTO mentors (name,  address, years , language) VALUES ('NICK','11 HILL Road',2,'PYHTON');
INSERT INTO mentors (name,  address, years , language) VALUES ('CLAIRE','17 ROCK Road',5,'java');
INSERT INTO mentors (name,  address, years , language) VALUES ('EMILE','18 HALL Road',4,'csharp');
INSERT INTO mentors (name,  address, years , language) VALUES ('SIMON','15 SOUTH Road',1,'scala');

INSERT INTO students (name,  address, graduation) VALUES ('SIMON','19 SOUTH Road',TRUE);
INSERT INTO students (name,  address, graduation) VALUES ('EBENEZER','14 SOUTH Road',FALSE);
INSERT INTO students (name,  address, graduation) VALUES ('SADAT','5 SOUTH Road',TRUE);
INSERT INTO students (name,  address, graduation) VALUES ('GINTARAS','115 SOUTH Road',TRUE);
INSERT INTO students (name,  address, graduation) VALUES ('HIBA','10 SOUTH Road',FALSE);
INSERT INTO students (name,  address, graduation) VALUES ('SELINA','65 SOUTH Road',TRUE);
INSERT INTO students (name,  address, graduation) VALUES ('HADIYAH','75 SOUTH Road',TRUE);
INSERT INTO students (name,  address, graduation) VALUES ('PATRICK','35 SOUTH Road',FALSE);
INSERT INTO students (name,  address, graduation) VALUES ('ALI','25 SOUTH Road',TRUE);
INSERT INTO students (name,  address, graduation) VALUES ('NICK','95 SOUTH Road',TRUE);


INSERT INTO classes (mentor_id, topic, location, date)  VALUES (1 , 'HTML','MIDLAND','2020-06-03');
INSERT INTO classes (mentor_id,topic,location, date)  VALUES (2 , 'HTML','MIDLAND','2020-05-03');
INSERT INTO classes (mentor_id,topic,location, date)  VALUES ( 3 , 'JAVASCRIPT','MIDLAND','2020-09-03');
INSERT INTO classes (mentor_id, topic,location, date)  VALUES ( 4, 'JAVA','MIDLAND','2020-06-07');
INSERT INTO classes (mentor_id, topic, location, date)  VALUES ( 3 , 'CSS','MIDLAND','2020-10-03');

