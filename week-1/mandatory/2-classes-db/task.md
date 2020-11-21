# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql
1. There are at least a couple of ways to create the database:
      (i) createdb cyf_classes
      (ii) psql
            create database cyf_classes;

 2. create table mentors (
      id serial primary key,
      first_name varchar(30) NOT NULL,
      last_name varchar(30) NOT NULL,
      years_in_glasgow INT NOT NULL,
      address varchar(100) NOT NULL,
      fav_language varchar(30) NOT NULL);

3. insert into mentors (first_name,         last_name,years_in_glasgow,address,fav_languages) values  ('Peter','Parker',11,'120 Marvel Street','Java');
    insert into mentors (first_name,last_name,years_in_glasgow,address,
   fav_languages) values ('Bruce','Banner',30,'101 Marvel Avenue','C++');
   insert into mentors (first_name,last_name,years_in_glasgow,address,
      fav_languages) values ('Tony','Stark',5,'120 Marvel Street','Python');
   insert into mentors (first_name,last_name,years_in_glasgow,address,
   fav_languages) values ('Steven','Rodgers',1,'1201 Albert Road','Haskell';
   insert into mentors (first_name,last_name,years_in_glasgow,address,
   fav_languages) values ('Luke','Cage',1,'Stairway to Heaven Close','Javascript');

4. create table students (
      id serial primary key,
      first_name varchar(30) NOT NULL,
      last_name varchar(30) NOT NULL,
      address varchar(100) NOT NULL,
      graduated boolean NOT NULL);

5. insert into students (first_name, last_name, address, graduated)
    values ('Adam',' Ant','12 Anthill Lane',true);
   insert into students (first_name, last_name, address, graduated)
    values ('Johnny',' Rotton', '84 Belles St',false);
   insert into students (first_name, last_name, address, graduated)
    values ('Billy',' Idol','27 Knowles St',false);
   insert into students (first_name, last_name, address, graduated)
    values ('Toyah',' Wilcox','36 Ungar Street',true);
   insert into students (first_name, last_name, address, graduated)
    values ('Tom',' Jones','44 Temple Close',true);
   insert into students (first_name, last_name, address, graduated)
    values ('Peter',' Parker','24 Marvel St',true);
   insert into students (first_name, last_name, address, graduated)
    values ('Bruce',' Banner','48 Marvel St',true);
  insert into students (first_name, last_name, address, graduated)
    values ('Luke',' Cage','96 Marvel St',false);
  insert into students (first_name, last_name, address, graduated)
    values ('Tom',' Browne','3 Browne Marvel St',false);
  insert into students (first_name, last_name, address, graduated)
    values ('Steve',' Vai','777 Gem  St',true);

6. select * from mentors;
    select * from students;

7. create table classes
   ( id serial primary key,
   lt_first_name varchar(30),
   lt_last_name varchar(30),
   topic varchar(30),
   location varchar(30));

8. insert into classes (lt_first_name, lt_last_name, topic, location)
    values ('Sam',' Samuels', 'NodeJs 1', 'London'); 
    insert into classes (lt_first_name, lt_last_name, topic, location)
    values ('Tom',' Thomas', 'NodeJs 2', 'London'); 
    insert into classes (lt_first_name, lt_last_name, topic, location)
    values ('Steve',' Stevens', 'NodeJs 3', 'London'); 
    insert into classes (lt_first_name, lt_last_name, topic, location)
    values ('Joe',' Josephs', 'SQL 1', 'Scotland');
    insert into classes (lt_first_name, lt_last_name, topic, location)
    values ('Ted',' Edwards', 'Javascript Core 1', 'West Midlands'); 

9. create table student_classes(
   id serial primary key,
   student_id int references students(id),
   class_id int references classes(id));

   insert into student_classes (student_id, class_id) values (6,3);  // student(Peter Parker ), course(React, London)
   insert into student_classes (student_id, class_id) values (4,3); // student(Toyah Wilcox ), course(React, London)
   insert into student_classes (student_id, class_id) values (8,3); // student(Luke Cage ), course(React, London)
   insert into student_classes (student_id, class_id) values (1,2); // student(Adam Ant ), course(HTML/CSS, London)
   insert into student_classes (student_id, class_id) values (7,2); // student(Bruce Banner )course(HTML/CSS, London)
   insert into student_classes (student_id, class_id) values (10,5); // student(Steve Vai ), course(Javascript, W. Midlands)

   
10. select * from mentors where years_in_glasgow > 5;
      select * from mentors where fav_language = 'Javascript';
      select * from students where graduated = true;
      select * from classes where date < '2020-06-01';
      select * from student_classes where class_id = 5;
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
