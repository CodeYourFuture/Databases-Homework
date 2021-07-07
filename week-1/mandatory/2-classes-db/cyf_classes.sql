createdb cyf_classes;

CREATE TABLE mentors (
   id                   SERIAL PRIMARY KEY,
   name                 VARCHAR(30) NOT NULL,
   liveInGlasgow        INT,
   address              VARCHAR(80) NOT NULL,
   favouriteLanguage    VARCHAR(40)
);

INSERT INTO mentors (name, liveInGlasgow, address, favouriteLanguage) VALUES('Nick', 5, '10 York Close', 'Java'); 
INSERT INTO mentors (name, liveInGlasgow, address, favouriteLanguage) VALUES('Ben', 7, '40 Berring Close', 'Python');
INSERT INTO mentors (name, liveInGlasgow, address, favouriteLanguage) VALUES('Wahab', 3, 'Primrose Close', 'JavaScript');
INSERT INTO mentors (name, liveInGlasgow, address, favouriteLanguage) VALUES('Denis', 10, 'Betton Crick', 'PHP');
INSERT INTO mentors (name, liveInGlasgow, address, favouriteLanguage) VALUES('tOM', 1, 'Cessinghton Close', 'SQL');

CREATE TABLE students (
   id                   SERIAL PRIMARY KEY,
   name                 VARCHAR(30) NOT NULL,
   address              VARCHAR(80) NOT NULL,
   graduated            BOOLEAN NOT NULL
);

INSERT INTO students (name, address, graduated) VALUES('Ben', ' Gringe Close', true);
INSERT INTO students (name, address, graduated) VALUES('Adam', 'Badminghton Click', true);
INSERT INTO students (name, address, graduated) VALUES('Patrick', 'Zumer Strasse', false);
INSERT INTO students (name, address, graduated) VALUES('Deny', 'Paradise Street', true);
INSERT INTO students (name, address, graduated) VALUES('Cem', 'Quinn Street', true);
INSERT INTO students (name, address, graduated) VALUES('Clark', '126 Adams Close', false);
INSERT INTO students (name, address, graduated) VALUES('Brand', 'Bacheleors Drive', true);
INSERT INTO students (name, address, graduated) VALUES('Indie', '20 Gloomy Drive', true);
INSERT INTO students (name, address, graduated) VALUES('Inka', 'Dreamers Close', false);
INSERT INTO students (name, address, graduated) VALUES('Dune', 'Brandon Close', true);

SELECT * FROM mentors;

SELECT * FROM students;

CREATE TABLE classes (
    id          SERIAL PRIMARY KEY,
    mentor_id   INT REFERENCES mentors(id),
    topic       VARCHAR(40) NOT NULL,
    class_date  DATE NOT NULL,
    location    VARCHAR(40)       
);

INSERT INTO classes (mentor_id, topic, class_date, location) VALUES(2, 'Node.js','2020-11-20', 'Birmingham');
INSERT INTO classes (mentor_id, topic, class_date, location) VALUES(1, 'JavaScipt','2020-11-22', 'Virtual');
INSERT INTO classes (mentor_id, topic, class_date, location) VALUES(4, 'HTML5','2020-05-26', 'Bristol');


CREATE TABLE attendence (
    id          SERIAL PRIMARY KEY,
    class_name  INT REFERENCES classes(id),
    student_id  INT REFERENCES students(id)
)

INSERT INTO attendence(class_name, student_id) VALUES(1, 4);
INSERT INTO attendence(class_name, student_id) VALUES(2, 7);


SELECT * FROM mentors WHERE liveInGlasgow > 5;
SELECT * FROM mentors WHERE favouriteLanguage = 'JavaScript';
SELECT * FROM students WHERE graduated  = true;
SELECT * FROM classes WHERE class_date < '2020-06-01';
SELECT * FROM attendence WHERE class_name = 2;
