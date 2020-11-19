# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)

```
createdb cyf_classes
psql cyf_classes

```
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.

```
CREATE TABLE mentors(
  name                        VARCHAR(30),
  Years_lived_in_Glasgow      INT,
  address   VARCHAR(120),
  Favourite_programming_lang   VARCHAR(30)
);

```
3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).

```
INSERT INTO mentors (name, Years_lived_in_Glasgow, address, Favourite_programming_lang) VALUES
 ('Emile', 10, 'CM194JS','Java'),
('Wahab', 3, 'CM384JM','C++'),
('Claire', 6, 'CV194JS','HTML'),
('Nick', 12, 'B194FH','Python'),
('Atanas', 8, 'LN194JS','SQL');

```

4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.

```
CREATE TABLE students(
  name           VARCHAR(30),
  address        VARCHAR(120),
  CYF_Graduate   BIT
);
```
5. Insert 10 students in the `students` table.

```
INSERT INTO students (name, address, CYF_Graduate) VALUES
 ('Emile', 'CM194JS', '1'),
('Joe', 'CF194JS', '1'),
('Hassan', 'CV164JS', '0'),
('Sarah', 'B194HS', '1'),
('Ahamed', 'B164JS', '0'),
 ('Nick', 'CF192YS', '0'),
('Dan', 'MS17JS', '1'),
('Sam', 'B24JK', '0'),
('Fatima', 'CV94HS', '1'),
('Murad', 'WS14HS', '1');

```

6. Verify that the data you created for mentors and students are correctly stored 
in their respective tables (hint: use a `select` SQL statement).

````
select * from students;
select * from mentors;

````

7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

```
  CREATE TABLE classes(
  Class_id           INT,
  Leading_mentor     VARCHAR(30),
  Topic              VARCHAR(30),
  Location          VARCHAR(120),
  Date              Date NOT NULL

);
```

8. Insert a few classes in the `classes` table

```
   INSERT INTO classes(Class_id , Leading_mentor , Topic, Location, Date) VALUES
 (1, 'Emile', 'SQL', 'CF194JS', '2020-11-01'),
 (2, 'Nick', 'NodeJS', 'B16JH', '2020-11-08'),
(3, 'Wahab', 'Javascript', 'MS64HS', '2020-11-16'),
(4, 'Andy', 'CSS', 'B168HZ', '2020-11-24');

```
9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.

```
ALTER TABLE students
ADD class_id_attended  INT;

```
10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
    ```
    select name  from mentors where years_lived_in_glasgow > 5;

    ```
    - Retrieve all the mentors whose favourite language is Javascript
    ```
    select name  from mentors where favourite_programming_lang = 'Javascript';
    ```
    - Retrieve all the students who are CYF graduates
    ```
    select name from students where cyf_graduate = '1';
    ```
    - Retrieve all the classes taught before June this year
    ```
    select class_id from classes where date < '2020-06-01';
    ```
    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).
    ```
    select name from students where class_id_attended = 3;
    ```
