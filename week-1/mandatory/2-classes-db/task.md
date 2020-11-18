# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql
1. createdb cyf_classes;

2. CREATE TABLE mentors (
   id             SERIAL PRIMARY KEY,
   name           VARCHAR(30) NOT NULL,
   years          INT,
   address        VARCHAR(120),
   prog_language  VARCHAR(20) NOT NULL
   );

3. INSERT INTO mentors (name, years, address, prog_language) VALUES('Shukri Ali', 5, 'West Midlands, Glassgow', 'Java');
   INSERT INTO mentors (name, years, address, prog_language) VALUES('Nadir Khan', 3, 'East Midlands, Glassgow', 'JavaScript');
   INSERT INTO mentors (name, years, address, prog_language) VALUES('Emile Paffard-Wray', 10, 'South Midlands, Glasgow', 'React');
   INSERT INTO mentors (name, years, address, prog_language) VALUES('Wahab Rehman', 8, 'North Midlands, Glasgow', 'React');
   INSERT INTO mentors (name, years, address, prog_language) VALUES('Mark Farmiloe', 15, 'Great Midlands, Glassgow', 'SQL');

4. CREATE TABLE students (
   id       SERIAL PRIMARY KEY,
   name     VARCHAR(30) NOT NULL,
   address  VARCHAR(120),
   graduate BOOLEAN NOT NULL
   );

5. INSERT INTO students (name, address, graduate) VALUES('Hadiyah Lawal', 'West Midlands, Birmingham', false);
   INSERT INTO students (name, address, graduate) VALUES('Sonjide Hussain', 'Clarkson, London', true);
   INSERT INTO students (name, address, graduate) VALUES('Omolola Bello', 'Smethwick, Birmingham', false);
   INSERT INTO students (name, address, graduate) VALUES('Cynthia Eburu', 'Chaltam House, London', true);
   INSERT INTO students (name, address, graduate) VALUES('Min ko', 'Cape Town, South-Africa', true);
   INSERT INTO students (name, address, graduate) VALUES('Zubeda Khanum', 'Green Lane, Birmingham', false);
   INSERT INTO students (name, address, graduate) VALUES('Adebola Alaba-Ige', 'Coventry, Birmingham', false);
   INSERT INTO students (name, address, graduate) VALUES('Gintaras Stankus', 'Solihull Quarters, Birmingham', false);
   INSERT INTO students (name, address, graduate) VALUES('Ellie Tahmasebi', 'Alexandra Avenue, London', true);
   INSERT INTO students (name, address, graduate) VALUES('Denis Peptanariu', 'Egbaston Avenue, Birmingham', false);

6. SELECT * FROM mentors;
   SELECT * FROM students;

7. CREATE TABLE classes (
   id             SERIAL PRIMARY KEY,
   leading_mentor VARCHAR(30) NOT NULL,
   module         VARCHAR(30) NOT NULL,
   location       VARCHAR(30) NOT NULL,
   date           DATE NOT NULL
   );

8. INSERT INTO classes (leading_mentor, module, location, date) VALUES('Cemil Okay', 'HTML/CSS', 'Aston University, Birmingham',    '2020-04-25');
   INSERT INTO classes (leading_mentor, module, location, date) VALUES('Wahab Rehman', 'JavaScript', 'Zoom Online class', '2020-05-28');
   INSERT INTO classes (leading_mentor, module, location, date) VALUES('Andy Delaney', 'React', 'Zoom Online class', '2020-06-30');
   INSERT INTO classes (leading_mentor, module, location, date) VALUES('Nick Holdsworth', 'Node.js', 'Zoom Online class', '2020-07-31');
   INSERT INTO classes (leading_mentor, module, location, date) VALUES('Mark Farmiloe', 'SQL', 'Zoom Online class', '2020-09-02');

9. CREATE TABLE javascript (
   id             SERIAL PRIMARY KEY,
   student_id     INT REFERENCES students(id),
   class_id       INT REFERENCES classes(id)
   );

   INSERT INTO javascript (student_id, class_id) VALUES (3, 2);
   INSERT INTO javascript (student_id, class_id) VALUES (4, 2);
   INSERT INTO javascript (student_id, class_id) VALUES (6, 2);
   INSERT INTO javascript (student_id, class_id) VALUES (7, 2);
   INSERT INTO javascript (student_id, class_id) VALUES (9, 2);
   INSERT INTO javascript (student_id, class_id) VALUES (10, 2);


10. SELECT * FROM mentors WHERE years > 5;
    SELECT * FROM mentors WHERE prog_language = 'JavaScript';
    SELECT * FROM students WHERE graduate = true;
    SELECT * FROM classes WHERE date < '2020/06/01';
    SELECT stu.name, stu.id, cla.leading_mentor FROM students stu,classes cla, javascript jav  WHERE stu.id = student_id AND cla.id =class_id;
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
