# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql

//CREATE DATABASE 
createdb -p 5432 -U postgres cyf_classes

//LOG IN TO DATABASE
psql cyf_classes

//CREATE mentors TABLE

CREATE TABLE mentors ( 
id SERIAL PRIMARY KEY,
name VARCHAR(30) NOT NULL,
address VARCHAR(120),
years_in_Glascow INT NOT NULL,
fav_prog_language VARCHAR(30));

// verifying mentors Table created

\d mentors

//inserting mentors

INSERT INTO mentors (name, address, years_in_Glascow,fav_prog_language) VALUES ('James Brown', '125 Barker St, MK112AA',6,'Python');
INSERT INTO mentors (name, address, years_in_Glascow,fav_prog_language) VALUES ('Billi Jean', '5 George St,B12UF',11,'Javascript');
INSERT INTO mentors (name, address, years_in_Glascow,fav_prog_language) VALUES ('Sara Major', '13 Prince Rd,DL62GH',2,'Java');
INSERT INTO mentors (name, address, years_in_Glascow,fav_prog_language) VALUES ('Mark Twain', '133 Elzabeth Rd,GL11BD',23,'C++');
INSERT INTO mentors (name, address, years_in_Glascow,fav_prog_language) VALUES ('Mel Gibson', '12 Gibson St,GL23FK',13,'HTML');


//verifying entries for mentors
 SELECT * FROM mentors;

//Create Table students

CREATE TABLE students ( name VARCHAR(30) NOT NULL,address VARCHAR(120),CYF_graduate VARCHAR(30));

//verifying Students Table created

\d students

// Inserting students

INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('kanye west','56 Rood End Rood, B665FG ','Yes');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('kim Lee','56 Moat Road, B562Gl ','Yes');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Brian McNight','20 Cross Street, WS110BZ ','No');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Sam Cook','29 Briage Street, WS110DQ ','yes');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Herman Cooper','97 Loxley Road, CV359JY ','yes');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('North Hampton','1 Crispin Street, NN12JH','No'); 
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Barton Smith','87 Finchfiels Road, WV39LQ','Yes');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Simone Malanga','56 Ashworth Road, WS115DS','Yes'); 
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Bobby Brown','51 Overdale Road, TF34BX','No'); 
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Mathew Perry','10 Mathew Street, L34AA','Yes');

//verifying entries for students

 SELECT * FROM students;

//classes Table created 

CREATE TABLE classes(mentor_name VARCHAR(30), module VARCHAR(30),course_date DATE NOT NULL, course_location VARCHAR(30)); 

//Verify classes table created

\d classes

//Insert entries to classes table
 
 INSERT INTO classes(mentor_name , module ,course_date , course_location ) VALUES ('Rody Kirwan','React', '2019-10-01','West Midland');
 INSERT INTO classes(mentor_name , module ,course_date , course_location ) VALUES ('Jason Sancho','Javascript', '2019-11-05','West Midland');
 INSERT INTO classes(mentor_name , module ,course_date , course_location ) VALUES ('Andrew Jackson','Node', '2019-07-02','London');  
 INSERT INTO classes(mentor_name , module ,course_date , course_location ) VALUES ('Stella Markov','HTML', '2019-02-07','Manchester');
 INSERT INTO classes(mentor_name , module ,course_date , course_location ) VALUES ('Sandeep Singh','CSS', '2019-03-09','Glascow');

// verify data Entries to classes

 select * from classes;


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
