-- Task 2 & 3
CREATE TABLE mentors (
  id                              SERIAL PRIMARY KEY,
  name                            VARCHAR(30) NOT NULL,
  years_in_glasgow                INT,
  address                         VARCHAR(120),
  fav_programming_lang            VARCHAR(120) NOT NULL
);

-- Task 4 & 5
CREATE TABLE students (
  id                              SERIAL PRIMARY KEY,
  name                            VARCHAR(30) NOT NULL,
  address                         VARCHAR(120),
  cyf_graduate                    BOOLEAN NOT NULL
);

-- Task 7 & 8
CREATE TABLE classes (
  id               SERIAL PRIMARY KEY,
  leading_mentor   INT REFERENCES mentors(id) NOT NULL,
  topic            VARCHAR(120) NOT NULL,
  class_date             DATE NOT NULL,
  class_location         VARCHAR(120)
);

-- Task 9
CREATE TABLE attendance (
    id               SERIAL PRIMARY KEY,
    class_id         INT REFERENCES classes(id) NOT NULL,
    student_id       INT REFERENCES students(id) NOT NULL,
    topic            VARCHAR(120) NOT NULL
);

INSERT INTO mentors (name, years_in_glasgow, address, fav_programming_lang) VALUES ('Loic', 3, 'Buchanan St', 'C#');
INSERT INTO mentors (name, years_in_glasgow, address, fav_programming_lang) VALUES ('Nada', 7, 'Shields Road', 'Python');
INSERT INTO mentors (name, years_in_glasgow, address, fav_programming_lang) VALUES ('Astrid', 8, 'Kinning Park', 'Kotlin');
INSERT INTO mentors (name, years_in_glasgow, address, fav_programming_lang) VALUES ('Dale', 10, 'Charing Cross', 'Java');
INSERT INTO mentors (name, years_in_glasgow, address, fav_programming_lang) VALUES ('Luke', 9, 'Partick', 'Pascal');

INSERT INTO students (name, address, cyf_graduate) VALUES ('Meriem', '6th Ave', 'yes');
INSERT INTO students (name, address, cyf_graduate) VALUES ('Etzali', '31 High St', 'yes');
INSERT INTO students (name, address, cyf_graduate) VALUES ('Hacer', '3 Napier Place', 'no');
INSERT INTO students (name, address, cyf_graduate) VALUES ('Andrei', '88 Skirving St', 'no');
INSERT INTO students (name, address, cyf_graduate) VALUES ('Nab', '12 Paisley Rd', 'yes');
INSERT INTO students (name, address, cyf_graduate) VALUES ('Mawaddah', '2 Rose St', 'no');
INSERT INTO students (name, address, cyf_graduate) VALUES ('Natalia', '65 Junction Ave', 'no');
INSERT INTO students (name, address, cyf_graduate) VALUES ('Mohamed', 'Ashton Rd', 'yes');
INSERT INTO students (name, address, cyf_graduate) VALUES ('Roxana', '7 Burleigh Place', 'yes');
INSERT INTO students (name, address, cyf_graduate) VALUES ('Sharlu', '201 Elder St', 'no');

INSERT INTO classes (leading_mentor, topic, class_date, class_location) VALUES (2, 'Javascript', '2020-07-15', 'Glasgow');
INSERT INTO classes (leading_mentor, topic, class_date, class_location) VALUES (1, 'NodeJS', '2020-03-15', 'Glasgow');
INSERT INTO classes (leading_mentor, topic, class_date, class_location) VALUES (3, 'NodeJS', '2020-04-25', 'Glasgow');
INSERT INTO classes (leading_mentor, topic, class_date, class_location) VALUES (1, 'Javascript', '2020-07-15', 'Glasgow');
INSERT INTO classes (leading_mentor, topic, class_date, class_location) VALUES (4, 'NodeJS', '2020-02-17', 'Glasgow');
INSERT INTO classes (leading_mentor, topic, class_date, class_location) VALUES (5, 'Javascript', '2020-09-02', 'Glasgow');

INSERT INTO attendance (class_id, student_id, topic) VALUES (1, 10, 'Javascript');
INSERT INTO attendance (class_id, student_id, topic) VALUES (2, 3, 'NodeJS');
INSERT INTO attendance (class_id, student_id, topic) VALUES (3, 5, 'NodeJS');
INSERT INTO attendance (class_id, student_id, topic) VALUES (4, 8, 'Javascript');

-- Task 10
SELECT * FROM mentors WHERE years_in_glasgow > 5;
SELECT * FROM mentors WHERE fav_programming_lang = 'Java';
SELECT * FROM students WHERE cyf_graduate = 'true';
SELECT * FROM classes WHERE class_date < '2020-06-01';
SELECT * FROM attendance WHERE topic = 'NodeJS';
SELECT * FROM classes WHERE topic = 'Javascript';