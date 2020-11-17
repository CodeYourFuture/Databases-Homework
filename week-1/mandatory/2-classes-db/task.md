# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql

CREATE TABLE mentors ( 
    name VARCHAR(30) NOT NULL PRIMARY KEY,
    years_lived_in_Glasgow INT,
    address VARCHAR(120),
    favourite_programming_language VARCHAR(30)

);

INSERT INTO mentors(name,years_lived_in_Glasgow,address,favourite_programming_language) VALUES ('Tom Pain',3,'30 Hight street G1 4SS','JavaScript');
INSERT INTO mentors(name,years_lived_in_Glasgow,address,favourite_programming_language) VALUES ('Brandon Oliver',10,'Flat 4 London Road G2 6RT','Pathon');
INSERT INTO mentors(name,years_lived_in_Glasgow,address,favourite_programming_language) VALUES ('Athanas shwasaniger',2,'11 Woodlands G1 9PA','C++');
INSERT INTO mentors(name,years_lived_in_Glasgow,address,favourite_programming_language) VALUES ('Simon White',10,'6 Brent cross Road G12 2SX','Rubi');
INSERT INTO mentors(name,years_lived_in_Glasgow,address,favourite_programming_language) VALUES ('Padi Cole',8,'100 Hight street G1 4SS','Java');

CREATE TABLE students ( 
    name VARCHAR(30) NOT NULL PRIMARY KEY,
    address VARCHAR(120),
   graduated_from_CYF  BOOLEAN NOT NULL

);


INSERT INTO students (name,address,graduated_from_CYF)VALUES('nour housi','10 saint georges way Birmingham B1 6DL',true);
INSERT INTO students (name,address,graduated_from_CYF)VALUES('Ekip Elik','981 High Road Hays TA 9PP',false);
INSERT INTO students (name,address,graduated_from_CYF)VALUES('Osagie Okadio','Flat 32 the Hives Birmingham B4 8YT',false);
INSERT INTO students (name,address,graduated_from_CYF)VALUES('Osman Hadjer','17 London Road Birmingham B2 3GG',false);
INSERT INTO students (name,address,graduated_from_CYF)VALUES('Leroy Douglass','77 High Road Hays TA 9PP',false);
INSERT INTO students (name,address,graduated_from_CYF)VALUES('Deniz tania','44  Colney Hatch Lane  London N12 55P',false);
INSERT INTO students (name,address,graduated_from_CYF)VALUES('Ebinezer bonzo','14  Holy Lane NW1 9PP London',false);
INSERT INTO students (name,address,graduated_from_CYF)VALUES('Hussein Sakaf','64 Wembley way London HA9 5PA High London',true);
INSERT INTO students (name,address,graduated_from_CYF)VALUES('Hadiya Bello','67 Cricklwood Broadway Leicester L3 6TY',false);

SELECT * FROM mentors;
SELECT * FROM students;

CREATE TABLE classes ( 
    leading_mentor VARCHAR(30) NOT NULL PRIMARY KEY,
    topic VARCHAR(30),
   taught_date_at_Loction   VARCHAR(60)

);
INSERT INTO classes (leading_mentor,topic,taught_date_at_Loction)VALUES('Mark','SQL','Saturday-Birmingam'),('Tom','JavaScript','Saturday-Birmingam');

SELECT * FROM mentors where years_lived_in_Glasgow >5;

INSERT INTO classes (leading_mentor,topic,taught_date_at_Loction)VALUES('Chris','Introduction to Programming','Sunday-London');

CREATE TABLE students_in_classes ( 
    class VARCHAR(30) NOT NULL PRIMARY KEY,
    student_name VARCHAR(30)
);

INSERT INTO students_in_classes (class,student_name)VALUES( 'SQL','Abennour Hachemi'),('JavaScript','Ekip Elik'),('Introduction to Programming','Osman Hadjer');

SELECT * FROM mentors WHERE years_lived_in_Glasgow >5;
SELECT * FROM mentors WHERE favourite_programming_language= 'JavaScript';
SELECT * FROM students WHERE graduated_from_CYF=true;
SELECT * FROM classes WHERE class_date<'31-05-2020';s
cyf_classes=# INSERT INTO classes (location, class_date) VALUES ('Birmingham','2020-11-11');
INSERT INTO classes (leading_mentor,topic,location, class_date) VALUES ('Wahab','React','London','2020-06-10');
select * from students_in_classes where class='JavaScript';


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
