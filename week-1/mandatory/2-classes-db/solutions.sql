-- 1
-- createdb cyf_classes;

-- 2
CREATE TABLE mentors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  years INT NOT NULL,
  address VARCHAR(100) NOT NULL,
  favourite_language VARCHAR(30)
);

-- 3
INSERT INTO mentors (name, years, address, favourite_language)
  VALUES
    ('Jane Doe', 32, '123 New Street', 'Javascript'),
    ('Donald Trump', 72, '123 White House', 'LieScript'),
    ('Tom Tommy', 54, '123 Old Street', 'Python'),
    ('Shukri', 22, '123 Moor Street', 'Java'),
    ('Atanas', 27, '123 Creative Street', 'Javascript');

-- 4
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  address VARCHAR(100) NOT NULL,
  graduated BOOLEAN DEFAULT false
);

-- 5
INSERT INTO students (name, address, graduated)
  VALUES
    ('Student 1', '1 New Street', false),
    ('Student 2', '2 New Street', false),
    ('Student 3', '3 New Street', true),
    ('Student 4', '4 New Street', false),
    ('Student 5', '5 New Street', false),
    ('Student 6', '6 New Street', true),
    ('Student 7', '7 New Street', true),
    ('Student 8', '8 New Street', false),
    ('Student 9', '9 New Street', true),
    ('Student 10', '10 New Street', false);

-- 6
SELECT * FROM students;

-- 7
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  mentor INT REFERENCES mentors(id),
  topic VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(100) NOT NULL
);

-- 8
INSERT INTO classes (mentor, topic, date, location)
  VALUES
    (1, 'Javascript', '2020-11-17', 'London'),
    (2, 'Javascript', '2020-12-17', 'Birmingham'),
    (3, 'Python', '2020-11-27', 'Manchester'),
    (1, 'Javascript', '2020-05-21', 'London'),
    (4, 'Java', '2020-12-03', 'Glasgow'),
    (5, 'Javascript', '2020-12-25', 'Bristol');

-- 9
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  classes_id INT REFERENCES classes(id)
);

INSERT INTO lessons (student_id, classes_id)
  VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 1),
    (2, 5),
    (4, 3),
    (9, 2),
    (8, 2),
    (10, 4),
    (7, 2),
    (7, 1),
    (7, 5);

-- 10
SELECT * FROM mentors WHERE years > 5;
SELECT * FROM mentors WHERE favourite_language = 'Javascript';
SELECT * FROM students WHERE graduated = true;
SELECT * FROM classes WHERE date < '2020-06-01';
SELECT s.id, name, address, graduated, topic, date
  FROM students s
  JOIN lessons l
  ON s.id = l.student_id
  JOIN classes c
  ON c.id = l.classes_id
  WHERE c.topic = 'Javascript';