(base) aaenesek@AAENESEKs-MBP ~ % createdb cyf_classes;
(base) aaenesek@AAENESEKs-MBP ~ % psql cyf_classes;
psql (13.1)
Type "help" for help.

cyf_classes=# CREATE TABLE mentors (
cyf_classes(#    id                   SERIAL PRIMARY KEY,
cyf_classes(#    name                 VARCHAR(30) NOT NULL,
cyf_classes(#    liveInGlasgow        INT,
cyf_classes(#    address              VARCHAR(80) NOT NULL,
cyf_classes(#    favouriteLanguage    VARCHAR(40)
cyf_classes(# );
CREATE TABLE
cyf_classes=# \dt
          List of relations
 Schema |  Name   | Type  |  Owner   
--------+---------+-------+----------
 public | mentors | table | aaenesek
(1 row)

cyf_classes=# INSERT INTO mentors (name, liveInGlasgow, address, favouriteLanguage) VALUES('Nick', 5, '10 York Close', 'Java'); 
INSERT 0 1
cyf_classes=# INSERT INTO mentors (name, liveInGlasgow, address, favouriteLanguage) VALUES('Ben', 7, '40 Berring Close', 'Python');
INSERT 0 1
cyf_classes=# INSERT INTO mentors (name, liveInGlasgow, address, favouriteLanguage) VALUES('Wahab', 3, 'Primrose Close', 'JavaScript');
INSERT 0 1
cyf_classes=# INSERT INTO mentors (name, liveInGlasgow, address, favouriteLanguage) VALUES('Denis', 10, 'Betton Crick', 'PHP');
INSERT 0 1
cyf_classes=# INSERT INTO mentors (name, liveInGlasgow, address, favouriteLanguage) VALUES('tOM', 1, 'Cessinghton Close', 'SQL');
INSERT 0 1
cyf_classes=# SELECT * FROM mentors;
 id | name  | liveinglasgow |      address      | favouritelanguage 
----+-------+---------------+-------------------+-------------------
  1 | Nick  |             5 | 10 York Close     | Java
  2 | Ben   |             7 | 40 Berring Close  | Python
  3 | Wahab |             3 | Primrose Close    | JavaScript
  4 | Denis |            10 | Betton Crick      | PHP
  5 | tOM   |             1 | Cessinghton Close | SQL
(5 rows)

cyf_classes=# CREATE TABLE students (
cyf_classes(#    id                   SERIAL PRIMARY KEY,
cyf_classes(#    name                 VARCHAR(30) NOT NULL,
cyf_classes(#    address              VARCHAR(80) NOT NULL,
cyf_classes(#    graduated            BOOLEAN NOT NULL
cyf_classes(# );
CREATE TABLE
cyf_classes=# INSERT INTO students (name, address, graduated) VALUES('Ben', ' Gringe Close', true);
INSERT 0 1
cyf_classes=# INSERT INTO students (name, address, graduated) VALUES('Adam', 'Badminghton Click', true);
INSERT 0 1
cyf_classes=# INSERT INTO students (name, address, graduated) VALUES('Patrick', 'Zumer Strasse', false);
INSERT 0 1
cyf_classes=# INSERT INTO students (name, address, graduated) VALUES('Deny', 'Paradise Street', true);
INSERT 0 1
cyf_classes=# INSERT INTO students (name, address, graduated) VALUES('Cem', 'Quinn Street', true);
INSERT 0 1
cyf_classes=# INSERT INTO students (name, address, graduated) VALUES('Clark', '126 Adams Close', false);
INSERT 0 1
cyf_classes=# INSERT INTO students (name, address, graduated) VALUES('Brand', 'Bacheleors Drive', true);
INSERT 0 1
cyf_classes=# INSERT INTO students (name, address, graduated) VALUES('Indie', '20 Gloomy Drive', true);
INSERT 0 1
cyf_classes=# INSERT INTO students (name, address, graduated) VALUES('Inka', 'Dreamers Close', false);
INSERT 0 1
cyf_classes=# INSERT INTO students (name, address, graduated) VALUES('Dune', 'Brandon Close', true);
INSERT 0 1
cyf_classes=# SELECT * FROM students;
 id |  name   |      address      | graduated 
----+---------+-------------------+-----------
  1 | Ben     |  Gringe Close     | t
  2 | Adam    | Badminghton Click | t
  3 | Patrick | Zumer Strasse     | f
  4 | Deny    | Paradise Street   | t
  5 | Cem     | Quinn Street      | t
  6 | Clark   | 126 Adams Close   | f
  7 | Brand   | Bacheleors Drive  | t
  8 | Indie   | 20 Gloomy Drive   | t
  9 | Inka    | Dreamers Close    | f
 10 | Dune    | Brandon Close     | t
(10 rows)

cyf_classes=# CREATE TABLE classes (
cyf_classes(#     id          SERIAL PRIMARY KEY,
cyf_classes(#     mentor_id   INT REFERENCES mentors(id),
cyf_classes(#     topic       VARCHAR(40) NOT NULL,
cyf_classes(#     class_date  DATE NOT NULL,
cyf_classes(#     location    VARCHAR(40)       
cyf_classes(# );
CREATE TABLE
cyf_classes=# INSERT INTO classes (mentor_id, topic, class_date, location) VALUES(2, 'Node.js','2020-11-20', 'Birmingham');
INSERT 0 1
cyf_classes=# INSERT INTO classes (mentor_id, topic, class_date, location) VALUES(1, 'JavaScipt','2020-11-22', 'Virtual');
INSERT 0 1
cyf_classes=# INSERT INTO classes (mentor_id, topic, class_date, location) VALUES(4, 'HTML5','2020-05-26', 'Bristol');
INSERT 0 1
cyf_classes=# SELECT * FROM classes;
 id | mentor_id |   topic   | class_date |  location  
----+-----------+-----------+------------+------------
  1 |         2 | Node.js   | 2020-11-20 | Birmingham
  2 |         1 | JavaScipt | 2020-11-22 | Virtual
  3 |         4 | HTML5     | 2020-05-26 | Bristol
(3 rows)

cyf_classes=# CREATE TABLE attendence (
cyf_classes(#     id          SERIAL PRIMARY KEY,
cyf_classes(#     class_name  INT REFERENCES classes(id),
cyf_classes(#     student_id  INT REFERENCES students(id)
cyf_classes(# )
cyf_classes-# ;
CREATE TABLE
cyf_classes=# \dt
           List of relations
 Schema |    Name    | Type  |  Owner   
--------+------------+-------+----------
 public | attendence | table | aaenesek
 public | classes    | table | aaenesek
 public | mentors    | table | aaenesek
 public | students   | table | aaenesek
(4 rows)

cyf_classes=# INSERT INTO attendence(class_name, student_id) VALUES(1, 4);
INSERT 0 1
cyf_classes=# INSERT INTO attendence(class_name, student_id) VALUES(2, 7);
INSERT 0 1
cyf_classes=# SELECT * FROM attendence;
 id | class_name | student_id 
----+------------+------------
  1 |          1 |          4
  2 |          2 |          7
(2 rows)

cyf_classes=# SELECT * FROM mentors WHERE liveInGlasgow > 5;
 id | name  | liveinglasgow |     address      | favouritelanguage 
----+-------+---------------+------------------+-------------------
  2 | Ben   |             7 | 40 Berring Close | Python
  4 | Denis |            10 | Betton Crick     | PHP
(2 rows)

cyf_classes=# SELECT * FROM mentors WHERE favouriteLanguage = 'JavaScript';
 id | name  | liveinglasgow |    address     | favouritelanguage 
----+-------+---------------+----------------+-------------------
  3 | Wahab |             3 | Primrose Close | JavaScript
(1 row)

cyf_classes=# SELECT * FROM students WHERE graduated  = true;
 id | name  |      address      | graduated 
----+-------+-------------------+-----------
  1 | Ben   |  Gringe Close     | t
  2 | Adam  | Badminghton Click | t
  4 | Deny  | Paradise Street   | t
  5 | Cem   | Quinn Street      | t
  7 | Brand | Bacheleors Drive  | t
  8 | Indie | 20 Gloomy Drive   | t
 10 | Dune  | Brandon Close     | t
(7 rows)

cyf_classes=# SELECT * FROM classess WHERE class_date < '2020-06-01';
ERROR:  relation "classess" does not exist
LINE 1: SELECT * FROM classess WHERE class_date < '2020-06-01';
                      ^
cyf_classes=# SELECT * FROM classes WHERE class_date < '2020-06-01';
 id | mentor_id | topic | class_date | location 
----+-----------+-------+------------+----------
  3 |         4 | HTML5 | 2020-05-26 | Bristol
(1 row)

cyf_classes=# SELECT * FROM attendence WHERE class_name = 2;
 id | class_name | student_id 
----+------------+------------
  2 |          2 |          7
(1 row)

cyf_classes=# 
