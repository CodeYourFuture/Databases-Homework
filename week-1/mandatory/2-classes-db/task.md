# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql

CREATE DATABASE cyf_classes;

//Create the mentors table:

CREATE TABLE mentors ( 
id SERIAL PRIMARY KEY, name varchar(200) NOT NULL, years_in_Glasgow INT(100) NOT NULL, address varchar(300) NOT NULL, favourate_programming_language varchar(100) NOT NULL
);

//Insert the mentors data:

INSERT INTO mentors values(1,'ola', 10, 'London', 'JavaScript'),
(2, 'Donald', 4, 'glasgow', 'C'),
(3,'Martin', 11, 'Birmingham', 'Java'),
(4,'Sanna', 6, 'London', 'C'),
(5,'Hind', 1, 'Bristol', 'C');

//Create the student table:

CREATE TABLE student (
name varchar (100) NOT NULL, address varchar(300) NOT NULL, graduated BOOLEAN NOT NULL

);

// Insert student data:

INT INTO student values ('Noor', 'Ladywood' , False),
('Lama', 'Birmingham' , False),
('Nihal', 'Manchester' , True),
('Omar', 'London' , True),
('Sozan', 'London' , False),
('Dorman', 'Darby' , False),
('Soliman', 'Lister' , True),
('Sammar', 'Lister' , False),
('Hossain', 'London' , True),
('Ali', 'Birmingham' , True),
('Rana', 'Birmingham' , False);

// Select from the student table:

select\*from students;


// Create classes table:

CREATE TABLE classes ( 
id SERIAL PRIMARY KEY, leading_mentor varchar(100), topic varchar(300) primary key, class_date date, class_location varchar(300) 

);

//Insert the data:

INSERT INTO classes values(1,'Noorhan', 'C++', '01-02-2021', 'center building'),
(2, 'Ali', 'Node JS', '01-02-2021', 'main tower'),
(3, 'Susan', 'JavaScrept', '28-08-2020', ' main tower'),
(4, 'Ala', 'C++', '01-12-2020', 'CLT building'),
(5, 'Flora', 'Java', '01-03-2020', 'center building'),
(6, 'Mosa', 'C++', '20-05-2020', ' center building');

g
//9-Create table to show students attends:

CREATE TABLE student_attends (student_id INT REFERENCES student(id),class_id INT REFERENCES classes(id));
INSERT INTO student_attends(student_id,class_id)values
(0,1),
(8,1),
(3,3)
(1,0);

//select from mentor:
select * from mentor where years_in_Glasgow > 5;
select * from mentor where favourate_programming_language = 'JavasCript';
select * from student where graduated = True;
select * from classes where class_date < '2020-06-01';
select * from student_attends where topic = 'Node JS';


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in mentors, their address and their favourite programming language.
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

