# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql
createdb cyf_classes;
(enter password)

psql cyf_classes;
(enter password)

CREATE TABLE mentors (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(30) NOT NULL,
  years_lived_in_glasgow INT,
  address   VARCHAR(120),
  city      VARCHAR(30),
  postcode  VARCHAR(12),
  country   VARCHAR(20),
  favourite_programming_language VARCHAR(30)
);

INSERT INTO mentors (name, years_lived_in_glasgow, address, city, postcode, country, favourite_programming_language) VALUES ('John Smith',5,'11 New Road','Liverpool','L10 2AB','UK', 'Javascript');
INSERT INTO mentors (name, years_lived_in_glasgow, address, city, postcode, country, favourite_programming_language) VALUES ('Dave Smith',10,'11 New Road','Liverpool','L10 2AB','UK', 'SQL');
INSERT INTO mentors (name, years_lived_in_glasgow, address, city, postcode, country, favourite_programming_language) VALUES ('Sally Smith',2,'11 New Road','Liverpool','L10 2AB','UK', 'HTML');
INSERT INTO mentors (name, years_lived_in_glasgow, address, city, postcode, country, favourite_programming_language) VALUES ('Bob Smith',1,'11 New Road','Liverpool','L10 2AB','UK', 'NODEJS');
INSERT INTO mentors (name, years_lived_in_glasgow, address, city, postcode, country, favourite_programming_language) VALUES ('Sam Smith',3,'11 New Road','Liverpool','L10 2AB','UK', 'SQL');

CREATE TABLE students (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(30) NOT NULL,
  address   VARCHAR(120),
  city      VARCHAR(30),
  postcode  VARCHAR(12),
  country   VARCHAR(20),
  graduated BOOLEAN
);

INSERT INTO students (name, address, city, postcode, country, graduated) VALUES ('John Jones', '11 New Road','Liverpool','L10 2AB','UK', true);
INSERT INTO students (name, address, city, postcode, country, graduated) VALUES ('Jack Jones', '11 New Road','Liverpool','L10 2AB','UK', false);
INSERT INTO students (name, address, city, postcode, country, graduated) VALUES ('Susan Jones', '11 New Road','Liverpool','L10 2AB','UK', true);
INSERT INTO students (name, address, city, postcode, country, graduated) VALUES ('Dave Jones', '11 New Road','Liverpool','L10 2AB','UK', false);
INSERT INTO students (name, address, city, postcode, country, graduated) VALUES ('Bob Jones', '11 New Road','Liverpool','L10 2AB','UK', true);
INSERT INTO students (name, address, city, postcode, country, graduated) VALUES ('Sue Jones', '11 New Road','Liverpool','L10 2AB','UK', true);
INSERT INTO students (name, address, city, postcode, country, graduated) VALUES ('Sally Jones', '11 New Road','Liverpool','L10 2AB','UK', false);
INSERT INTO students (name, address, city, postcode, country, graduated) VALUES ('Jim Jones', '11 New Road','Liverpool','L10 2AB','UK', true);
INSERT INTO students (name, address, city, postcode, country, graduated) VALUES ('James Jones', '11 New Road','Liverpool','L10 2AB','UK', true);
INSERT INTO students (name, address, city, postcode, country, graduated) VALUES ('Dan Jones', '11 New Road','Liverpool','L10 2AB','UK', false);

SELECT * FROM mentors;
SELECT * FROM students;

CREATE TABLE classes (
 id        SERIAL PRIMARY KEY,
 mentor INT REFERENCES mentors(id),
 topic VARCHAR(30),
 date DATE,
 location VARCHAR(30)
);

INSERT INTO classes (mentor, topic, date, location) VALUES (2, 'SQL', '2020-11-14', 'Birmingham');
INSERT INTO classes (mentor, topic, date, location) VALUES (4, 'HTML', '2020-07-14', 'Birmingham');
INSERT INTO classes (mentor, topic, date, location) VALUES (5, 'NODEJS', '2020-01-14', 'Birmingham');

CREATE TABLE attendance (
 id        SERIAL PRIMARY KEY,
 class INT REFERENCES classes(id),
 student INT REFERENCES students(id),
 attended BOOLEAN NOT NULL
);

INSERT INTO attendance (class, student, attended) VALUES (1, 5,  true);
INSERT INTO attendance (class, student, attended) VALUES (2, 5,  false);
INSERT INTO attendance (class, student, attended) VALUES (3, 4,  true);

SELECT name FROM mentors WHERE years_lived_in_glasgow > 5;
SELECT name FROM mentors WHERE favourite_programming_language = 'Javascript';
SELECT name FROM students WHERE graduated = true;
SELECT * FROM classes WHERE date < '2020-06-01';

// attended SQL class
SELECT student FROM attendance WHERE attended = true and class=1; 


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
