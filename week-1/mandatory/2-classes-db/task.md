# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql
1. CREATEDB cyf_classes;
2. CREATE TABLE mentors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  yearsInGlasgow INTEGER NOT NULL,
  address VARCHAR(100) NOT NULL,
  programmingLanguage VARCHAR(40) NOT NULL
 );
 3. INSERT INTO mentors 
(name, yearsInGlasgow, address, programmingLanguage)
VALUES 
('Patrick', 5, 'Manchester road', 'Matlab'),
('Osagie', 1, 'Birmingham road', 'C++'),
('Atanas', 7, 'Coventry road', 'Ruby'),
('Lola', 3, 'London road', 'SQL'),
('Gabriel', 2, 'Warwick road', 'Java');
4. CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  address VARCHAR(40) NOT NULL,
  graduated BOOLEAN NOT NULL
);
5. INSERT INTO students (name, address, graduated)
VALUES ('Denis', 'Denis road', TRUE),
			 ('Deniz', 'Deniz road', TRUE),
       ('Mursel', 'Mursel road', TRUE),
       ('Islam', 'Islam road', TRUE),
       ('Hiba', 'Hiba road', TRUE),
       ('Hadiya', 'Hadiya road', TRUE),
       ('Ebeneze', 'Ebeneze road', TRUE),
       ('Leroy', 'Leroy road road', TRUE),
       ('Ekip', 'Ekip road', TRUE),
       ('Gennady', 'Gennady road', TRUE);
6. SELECT * FROM mentors;
   SELECT * FROM students;
7. CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  leading_mentor VARCHAR(40),
  topic VARCHAR(40),
  date DATE NOT NULL,
  location VARCHAR(40)
  );
8. INSERT INTO classes 
(leading_mentor, topic, date, location)
VALUES ('Atanas', 'Personal development','2020-11-11' ,'Birmingham'),
			 ('Marcin', 'Node.js', '2020-12-12', 'Birmingham'),
       ('Emile', 'Javascript', '2020-11-21', 'London'),
       ('Wahab', 'React.js', '2020-10-10', 'Manchester');
9. <!--We have to link  students table to classes tables, in our case we have a many to many relationship so we need to create a new table students_classes to link them.-->
   CREATE TABLE students_classes (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  class_id INT REFERENCES classes(id)
);
INSERT INTO students_classes (student_id, class_id)
VALUES (1, 2), (1, 3),(2, 4),(2, 1), (4, 2);

10. SELECT * FROM mentors WHERE yearsInGlasgow > 5;
    SELECT * FROM mentors WHERE programmingLanguage = 'Javascript';
    SELECT * FROM students WHERE graduated IN(TRUE);
    SELECT * FROM classes WHERE date < '2020-06-01';
    SELECT DISTINCT students.name, topic 
      FROM classes
      JOIN students_classes
      ON class_id =classes.id
      JOIN  students
      ON student_id = students.id
      WHERE topic = 'Javascript';



    


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
