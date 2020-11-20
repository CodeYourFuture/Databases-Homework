# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql
1. createdb cyf_classes
   psql cyf_classes

2. CREATE TABLE mentors (
   id SERIAL PRIMARY KEY,
   name VARCHAR(30) NOT NULL,
   years_in_glasgow INT,
   address VARCHAR(120),
   favourite_programme_lang VARCHAR(30)
   );

3. INSERT INTO mentors (name, years_in_glasgow, address, favourite_programme_lang) VALUES ('Wahab Rehman', 2, '11 New Road', 'Javascript');
   INSERT INTO mentors (name, years_in_glasgow, address, favourite_programme_lang) VALUES ('Nick Holdsworth', 3, '123 New street', 'Node js');
   INSERT INTO mentors (name, years_in_glasgow, address, favourite_programme_lang) VALUES ('Simon Whitehouse', 7, '120 Old Street', 'HTML');
   INSERT INTO mentors (name, years_in_glasgow, address, favourite_programme_lang) VALUES ('Paddy T', 6, '3 High Road', 'CSS');
   INSERT INTO mentors (name, years_in_glasgow, address, favourite_programme_lang) VALUES ('Mark Farmiloe', 9, '19 Bed Street', 'React');

4. CREATE TABLE students (
   id SERIAL PRIMARY KEY,
   name VARCHAR(30) NOT NULL,
   address VARCHAR(120),
   graduated BOOL
   );

5. INSERT INTO students (name, address, graduated) VALUES ('Student 1', '5 High Road', true);
   INSERT INTO students (name, address, graduated) VALUES ('Student 2', '6 High Road', false);
   INSERT INTO students (name, address, graduated) VALUES ('Student 3', '7 High Road', true);
   INSERT INTO students (name, address, graduated) VALUES ('Student 4', '8 High Road', false);
   INSERT INTO students (name, address, graduated) VALUES ('Student 5', '9 High Road', false);
   INSERT INTO students (name, address, graduated) VALUES ('Student 6', '10 High Road', true);
   INSERT INTO students (name, address, graduated) VALUES ('Student 7', '11 High Road', true);
   INSERT INTO students (name, address, graduated) VALUES ('Student 8', '12 High Road', false);
   INSERT INTO students (name, address, graduated) VALUES ('Student 9', '13 High Road', true);
   INSERT INTO students (name, address, graduated) VALUES ('Student 10', '14 High Road', false);

6. SELECT * FROM mentors;
   SELECT * FROM students;

7. CREATE TABLE classes (
   id SERIAL PRIMARY KEY,
   mentor INT REFERENCES mentors(id),
   topic VARCHAR(50) NOT NULL,
   date DATE NOT NULL,
   location VARCHAR(100) NOT NULL
   );

8. INSERT INTO classes (mentor, topic, date, location)
   VALUES
   (1, 'Javascript', '2020-11-20', 'London'),
   (2, 'Node js', '2020-12-20', 'Glasgow'),
   (3, 'HTML', '2020-08-20', 'Bristol'),
   (4, 'CSS', '2020-11-30', 'Bristol'),
   (5, 'REACT', '2020-05-17', 'Birmingham');

9. CREATE TABLE attendance (
   id SERIAL PRIMARY KEY,
   student_id INT REFERENCES students(id),
   classes_id INT REFERENCES classes(id)
   );

   INSERT INTO attendance (student_id, classes_id)
   VALUES
   (1, 1),
   (2, 2),
   (3, 3),
   (4, 4),
   (5, 7),
   (6, 1),
   (7, 2),
   (8, 1),
   (9, 7),
   (10, 2),
   (1, 2),
   (2, 4);

10.
   SELECT * FROM mentors WHERE years_in_glasgow >5;
   SELECT * FROM mentors WHERE favourite_programme_lang = 'Javascript';
   SELECT * FROM students WHERE graduated = true;
   SELECT * FROM classes WHERE date < '2020-06-01';
   SELECT * FROM attendance WHERE classes_id = 1;


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
