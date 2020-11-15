# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```
createdb cyf_classes 
psql cyf_classes

CREATE TABLE mentors (
 id SERIAL PRIMARY KEY,
name VARCHAR(30) NOT NULL,
years_in_glasgow INT,
address VARCHAR(120),
language VARCHAR(30)
); 

INSERT INTO mentors (
name,
years_in_glasgow,
address,
language
 ) VALUES ('Nitin','0','78 London Street','python');

INSERT INTO mentors (
name,
years_in_glasgow,
address,
language
 ) VALUES ('Martin','7','12 Down Street','Node.js');

INSERT INTO mentors (
name,
years_in_glasgow,
address,
language
 ) VALUES ('Peter','1','47 Crown Street','SQL');

INSERT INTO mentors (
name,
years_in_glasgow,
address,
language
 ) VALUES ('Boris','7','10 Downing Street','HTML'); 

INSERT INTO mentors (
name,
years_in_glasgow,
address,
language
 ) VALUES ('Irina','5','11 Albany Street','python'); 



CREATE TABLE students(
id SERIAL PRIMARY KEY,
name VARCHAR(30) NOT NULL,
address VARCHAR(120),
cyf_student BOOL DEFAULT TRUE
);

INSERT INTO students (name, address) VALUES ('Jack Reaper','2th Road');              

INSERT INTO students (name, address, cyf_student) VALUES ('Barack Obama','7 Secret place', 'false'); 

INSERT INTO students (name, address, cyf_student) VALUES ('Joe Biden','2 Secret place', 'false');    

INSERT INTO students (name, address) VALUES ('Donald Trump','1600 Pennsylvania Avenue'); 

INSERT INTO students (name, address) VALUES ('Aston Martin','777 Mulholland drive');     

INSERT INTO students (name, address) VALUES ('Mersy Jhons','7 avenue');              

INSERT INTO students (name, address, cyf_student) VALUES ('Hercules','1 Greace street', 'false');    

INSERT INTO students (name, address, cyf_student) VALUES ('Stig','000 Races track', 'false');        

INSERT INTO students (name, address) VALUES ('Beowulf','127 Backer street'); 

INSERT INTO students (name, address) VALUES ('Final Fantasy','1999 Hollywood road'); 

SELECT * FROM mentors;
SELECT * FROM students;

CREATE TABLE classes(
id SERIAL PRIMARY KEY,
mentor_id      INT REFERENCES mentors(id),
topic VARCHAR(30),
date DATE NOT NULL,
place VARCHAR(30)
);

INSERT INTO classes (mentor_id, topic, date, place) VALUES ('1','python','2020-11-22','Glasgow'); 

INSERT INTO classes (mentor_id, topic, date, place) VALUES ('4','HTML','2020-11-25','London');    

INSERT INTO classes (mentor_id, topic, date, place) VALUES ('2','Node.js','2020-12-02','Boston'); 

CREATE TABLE attendings (
id SERIAL PRIMARY KEY,
student_id  INT REFERENCES students(id),
class_id  INT REFERENCES classes(id)  
);

INSERT INTO attendings (student_id, class_id) VALUES ('2','1');  

INSERT INTO attendings (student_id, class_id) VALUES ('3','2');  

INSERT INTO attendings (student_id, class_id) VALUES ('3','3');  

INSERT INTO attendings (student_id, class_id) VALUES ('4','3');  

INSERT INTO attendings (student_id, class_id) VALUES ('5','3');  

INSERT INTO attendings (student_id, class_id) VALUES ('5','1');  

INSERT INTO attendings (student_id, class_id) VALUES ('6','2');  

INSERT INTO attendings (student_id, class_id) VALUES ('7','2');  

INSERT INTO attendings (student_id, class_id) VALUES ('8','1');  

INSERT INTO attendings (student_id, class_id) VALUES ('9','3');  

INSERT INTO attendings (student_id, class_id) VALUES ('9','1');  

INSERT INTO attendings (student_id, class_id) VALUES ('10','2');

SELECT * FROM mentors WHERE years_in_glasgow > 5; 

SELECT * FROM mentors WHERE language = 'python'; 

SELECT * FROM students WHERE cyf_student = 'true';

SELECT * FROM classes  WHERE date <= '2020-12-01';
// Retrieve all the students who attended the python class
SELECT name FROM students, classes, attendings WHERE students.id = attendings.student_id AND classes.topic = 'python' AND attendings.class_id = classes.id; 

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
