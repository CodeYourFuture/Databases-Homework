# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql

createdb cyf_classes;
psql cyf_classes;
	
CREATE TABLE mentors (
	id SERIAL PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	yearsInGlasgow INT,
	address VARCHAR(120),
	favLanguage VARCHAR(20)
	);
		
INSERT INTO mentors (name, yearsInGlasgow, address, favLanguage) VALUES ('John Smith', 3, '12 New Road', 'JavaScript');
INSERT INTO mentors (name, yearsInGlasgow, address, favLanguage) VALUES ('Jim Doe', 1, '13 Long Road', 'C++');
INSERT INTO mentors (name, yearsInGlasgow, address, favLanguage) VALUES ('Jane Smith', 0, '14 Short Road', 'Python');
INSERT INTO mentors (name, yearsInGlasgow, address, favLanguage) VALUES ('Joe Johnson', 12, '15 Old Road', 'Java');
INSERT INTO mentors (name, yearsInGlasgow, address, favLanguage) VALUES ('Mike Miller', 12, '16 New Street', 'Javascript');

CREATE TABLE students (
	id SERIAL PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	address VARCHAR(120),
	graduated BOOL
	);

INSERT INTO students (name, address, graduated) VALUES ('Mehmet Lord', '3A Sandy Point Road, Hayling Island', true);
INSERT INTO students (name, address, graduated) VALUES ('Zayyan Redmond', '4 Wilder Grove, Hartlepool', true);
INSERT INTO students (name, address, graduated) VALUES ('Dora Corbett', '1 Stubbs Close, Downham Market', false);
INSERT INTO students (name, address, graduated) VALUES ('Payton Bautista', 'High Steeps, Peaslake Lane, Peaslake', false);
INSERT INTO students (name, address, graduated) VALUES ('Rachel Morton', '10 Branston Road, Tatenhill', false);
INSERT INTO students (name, address, graduated) VALUES ('Diogo Carty', '103 Brook Road, Buckhurst Hill', true);
INSERT INTO students (name, address, graduated) VALUES ('Francisco Griffiths', '4 St Georges Court, Sutton Coldfield', true);
INSERT INTO students (name, address, graduated) VALUES ('Riyad Witt', '23 Audrey Walk, Liverpool', false);
INSERT INTO students (name, address, graduated) VALUES ('Nikkita Conley', '42 Swine Hill, Harlaxton', false);
INSERT INTO students (name, address, graduated) VALUES ('Tymon Mckeown', '1 High View Gardens, Kirkby In Ashfield', false);

SELECT * FROM mentors;
SELECT * FROM students;

UPDATE mentors SET favLanguage = 'JavaScript' WHERE id = 5;		/* Correcting a mistake from earlier */ 

CREATE TABLE classes (
	id SERIAL PRIMARY KEY,
	mentor_id INT REFERENCES mentors(id) NOT NULL,
	topic VARCHAR(30) NOT NULL,
	time DATE NOT NULL,
	location VARCHAR(120)
	);
	
INSERT INTO classes (mentor_id, topic, time, location) VALUES (5, 'Javascript 1', '2021-01-01', 'Zoom');
INSERT INTO classes (mentor_id, topic, time, location) VALUES (3, 'HTML 1', '2020-12-12', 'Zoom');
INSERT INTO classes (mentor_id, topic, time, location) VALUES (1, 'SQL 3', '2021-03-01', 'Zoom');

ALTER TABLE classes ADD attending_students_ids VARCHAR(200);
UPDATE classes SET attending_students_ids = '3 5 8 9 10' WHERE id = 1;


SELECT * FROM mentors WHERE yearsInGlasgow > 5;
SELECT * FROM mentors WHERE favLanguage = 'JavaScript';
SELECT * FROM students WHERE graduated = true;
SELECT * FROM classes WHERE time < '2020-06-01';	/* For it to yield results in my database you need something like time >= '2021-01-01' */
SELECT attending_students_ids FROM classes WHERE topic = 'Javascript 1';

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
