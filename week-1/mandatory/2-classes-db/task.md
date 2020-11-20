# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

<!-- ```sql -->
 1:create database cyf_classes;
 2:create table mentor( id SERIAL PRIMARY KEY,name VARCHAR(30) NOT NULL,duration int NOT NULL,city VARCHAR(30) NOT NULL,address VARCHAR(100) NOT NULL,favouriteProgramingLanguage VARCHAR(30) NOT NULL);
 3:insert into mentor(id,name,duration,city,address,favouriteProgramingLanguage)values(0,'zubeda',4,'birmingham','abc raod ','javascript');
 insert into mentor(id,name,duration,city,address,favouriteProgramingLanguage)values(1,'hadeesa',40,'islamabad','abc raod ','c++');
 insert into mentor(id,name,duration,city,address,favouriteProgramingLanguage)values(2,'Akeelsa',7,'oindi','abc raod ','c++');
 insert into mentor(id,name,duration,city,address,favouriteProgramingLanguage)values(3,'salina',3,'pindi','abc raod ','pascl');
insert into mentor(id,name,duration,city,address,favouriteProgramingLanguage)values(4,'hiba',6,'pindi','abc raod ','pascl');
4:create table student(id SERIAL PRIMARY KEY,name VARCHAR(30) NOT NULL,graduated VARCHAR(50));
5:insert into student(id,name,graduated)values(0,'zubeda','cyf');
insert into student(id,name,graduated)values(1,'hadiya','cyf');
insert into student(id,name,graduated)values(2,'shukrii','cyf');
insert into student(id,name,graduated)values(3,'hibba','cyf');
insert into student(id,name,graduated)values(4,'salina','cyf');
insert into student(id,name,graduated)values(5,'Clair','university of birmingham');
insert into student(id,name,graduated)values(6,'Genady','university of birmingham');
insert into student(id,name,graduated)values(7,'leaory','university of london');
 insert into student(id,name,graduated)values(8,'AISHA','university of london');
 insert into student(id,name,graduated)values(9,'lola','university of london');
6:select * from student;
   select * from mentors;
7:create table classes(id SERIAL PRIMARY KEY,name VARCHAR(30),mentor_id INT REFERENCES mentors(id),topic VARCHAR(50),date DATE,location VARCHAR(30) NOT NULL);
8:insert into classes(id,name,mentor_id,topic,date,location)values(0,'class1',0,'javascript','11/6/2020','Birmingham');
insert into classes(id,name,mentor_id,topic,date,location)values(1,'class2',1,'html','11/4/2020','London');
insert into classes(id,name,mentor_id,topic,date,location)values(2,'class1',0,'html','11/3/2020','London');
9:create table class_student(student_id INT REFERENCES student(id),class_id INT REFERENCES classes(id));
insert into class_student(student_id,class_id)values(0,1)
insert into class_student(student_id,class_id)values(1,0);

10:
Retrieve all the mentors who lived more than 5 years in Glasgow.?
select * from mentor where duration>5;

Retrieve all the mentors whose favourite language is Javascript.?
select * from mentor where favouriteprograminglanguage='javascript';

Retrieve all the students who are CYF graduates.?
select * from student where graduated='cyf';

Retrieve all the classes taught before June this year.?
select * from classes where date<'2020-06-11';

Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).?

select student_id from class_student where class_id=(select id from classes where topic='javascript');








<!-- 
``` -->

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
