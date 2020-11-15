# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:


```sql
1)
createdb cyf_classes
psql cyf_classes

2)CREATE TABLE mentors (id SERIAL PRIMARY KEY, name VARCHAR(20), glasgow INT, address VARCHAR(30), language VARCHAR(20));

3.)//(enter this line 5 times with different values)
INSERT INTO mentors ( name, glasgow, address, language) VALUES ('john snow', 5, '100 winterfell rd', 'javascript'); 

4)CREATE TABLE students (name VARCHAR(20), address VARCHAR(30), cyfgraduate VARCHAR(10);

5.)//(enter 10 times for 10 data entries)
INSERT INTO students(name, address, cyfgraduate) VALUES ('charles dickens', '19 dolman rd', 'yes');

6)SELECT * FROM students;

7)CREATE TABLE classes (mentor VARCHAR(20), topic VARCHAR(15), time DATE, location VARCHAR(20));

8.//enter a few different values
INSERT INTO classes (mentor, topic, time, location) VALUES ('john snow', 'javascript', '2020-11-11', 'birmingham');

9) create a id column in students and create a students_ids column in mentors table and reference students(id) to solve the issue.


10.1)SELECT * FROM mentors WHERE GLASGOW > 5 ;
10.2)SELECT * FROM mentors WHERE language = 'javascript' ;
10.3) SELECT * FROM students WHERE cyfgraduate = 'yes' ;
10.4)SELECT * FROM classes WHERE time < '2020-06-01' ;
10.5)SELECT student_ids, topic FROM classes WHERE student_ids > 0  ;






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
