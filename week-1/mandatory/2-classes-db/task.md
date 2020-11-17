# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql
1. create database cyf_classes;

2.  create table mentors(name varchar(200),years_in_Glas int,address varchar(200), fav_prog_lang varchar(200));

3.
insert into mentors values('Kady',2,'Holly lane','c++'),('Dal',16,'Mono road','Java'),('Laila',4,'Hoston street','C#'),('Ali',22,'Green lane','JavaScript'),('Amani',55,'Villa road','Python');

4.  create table students(name varchar(200), address varchar(200), CYF_graduate boolean);

5.
    insert into students values
   ('Nada','Stephenson street',true),
   ('John','Hagley road',true),
   ('Jim','Hollywood street',false),
   ('Mary','Mango street',false),
   ('Sally','New street',true),
   ('Meeral','Stephenson street',true),
   ('Katy','Hagley road',true),
   ('Rony','Hollywood street',false),
   ('Menna','Mango street',false),
   ('Ahmed','New street',true);

6.  select \*from students;

    name | address | cyf_graduate
    --------+-------------------+--------------
    Nada | Stephenson street | t
    John | Hagley road | t
    Jim | Hollywood street | f
    Mary | Mango street | f
    Sally | New street | t
    Meeral | Stephenson street | t
    Katy | Hagley road | t
    Rony | Hollywood street | f
    Menna | Mango street | f
    Ahmed | New street | t
    (10 rows)

7.
create table classes(leading_ment varchar(200),topic varchar(200) primary key,class_date date,class_location varchar(200));

8.
insert into classes values('Sally','JavaScript','12-01-2021','building2'),('Asim','C++','13-01-2021','building1'),('Demi','Java','14-01-2021','building2'),('Rania','C#','15-01-2021','building1');

9.

create table std_classes(id int references students(id) reference students(name), subject varchar(200) references classes(topic));

insert into std_classes values(1,'C++'),(1,'JavaScript'),(1,'C#'),(2,'C++'),(2,'JavaScript'),(4,'C++');

cyf_classes=# select \*from std_classes;

id | subject
----+------------
1 | C++
1 | JavaScript
1 | C#
2 | C++
2 | JavaScript
4 | C++
(6 rows)

10.
1. select name from mentors where years_in_glas > 5;
 name
-------
 Dal
 Ali
 Amani
(3 rows)

2.
 select name from mentors where fav_prog_lang = 'JavaScript' ;

 3.
 select name from students where  cyf_graduate= true;
name
--------
 Nada
 John
 Sally
 Meeral
 Katy
 Ahmed
(6 rows)

4.
select *from classes where class_date<'2020-06-01';
leading_ment | topic | class_date | class_location
--------------+-------+------------+----------------
(0 rows)

5.
select id from std_classes where subject = 'JavaScript';

 id
----
  1
  2
(2 rows)

```

select id from std_classes where subject ='C++';

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

```

```

```

```
