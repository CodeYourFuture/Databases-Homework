--1--
createdb cyf_classes;

--2--
CREATE TABLE mentors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  years INT NOT NULL,
  address VARCHAR(120) NOT NULL,
  favourite_language VARCHAR(30)
);

--3--
INSERT INTO mentors (name, years, address, favourite_language)
  VALUES
    ('Wahab Rahman', 22, '123 New Street, Birmingham', 'React'),
    ('Emile Pawfard', 22, '123 White House', 'TypeScript'),
    ('Nick Todsman ', 54, 'Capgemini, Telford', 'Python'),
    ('Shukri', 22, '123 Moor Street', 'Java'),
    ('Atanas', 27, '123 Creative Street', 'Javascript');

--4--
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  address VARCHAR(120) NOT NULL,
  graduated BOOLEAN DEFAULT false
);

--5 --

INSERT INTO students (name, address, graduated)
  VALUES
    ('Mursel Aysan', '37 New Buery Road,Birmingham', false),
    ('Ekip Kalir', '34 Abbey Road ,Leeds', false),
    ('Deniz Ari', '97 Fallen Road , Manchaster', true),
    ('Hadiyah Lawal', '89 oldbury Road , Sandwell', false),
    ('Adebola ', '78 newcastle Road , Newcastle', false),
    ('Nouri Hachemi', '45 hungery Road , Cambridge', true),
    ('Hiba Mohammed', '57 justeat Road , solihull', true);

--6--

SELECT * FROM students;

--7--

CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  mentor INT REFERENCES mentors(id),
  topic VARCHAR(60) NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(120) NOT NULL
);

--8--

INSERT INTO classes (mentor, topic, date, location)
  VALUES
    (1, 'React', '2020-11-17', 'London'),
    (2, 'Javascript', '2020-12-17', 'Birmingham'),
    (3, 'Python', '2020-11-27', 'Manchester'),
    (1, 'HTML', '2020-05-21', 'London'),
    (4, 'Java', '2020-12-03', 'Glasgow'),
    (5, 'CSS', '2020-12-25', 'Roma');

--9--
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  classes_id INT REFERENCES classes(id)
);
