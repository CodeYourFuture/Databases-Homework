CREATE TABLE mentors (
id SERIAL PRIMARY KEY,
name VARCHAR(30) NOT NULL,
address VARCHAR(120),
years_in_Glascow INT NOT NULL,
fav_prog_language VARCHAR(30));



CREATE TABLE classes(
  id SERIAL PRIMARY KEY, 
  mentor_name VARCHAR(30), 
  module VARCHAR(30),
  course_date DATE NOT NULL, 
  course_location VARCHAR(30));


CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  address VARCHAR(120),
  CYF_graduate VARCHAR(30),
  classes_id INT REFERENCES classes (id));



INSERT INTO mentors (name, address, years_in_Glascow,fav_prog_language) VALUES ('James Brown', '125 Barker St, MK112AA',6,'Python');
INSERT INTO mentors (name, address, years_in_Glascow,fav_prog_language) VALUES ('Billi Jean', '5 George St,B12UF',11,'Javascript');
INSERT INTO mentors (name, address, years_in_Glascow,fav_prog_language) VALUES ('Sara Major', '13 Prince Rd,DL62GH',2,'Java');
INSERT INTO mentors (name, address, years_in_Glascow,fav_prog_language) VALUES ('Mark Twain', '133 Elzabeth Rd,GL11BD',23,'C++');
INSERT INTO mentors (name, address, years_in_Glascow,fav_prog_language) VALUES ('Mel Gibson', '12 Gibson St,GL23FK',13,'HTML');


INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('kanye west','56 Rood End Rood, B665FG ','Yes');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('kim Lee','56 Moat Road, B562Gl ','Yes');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Brian McNight','20 Cross Street, WS110BZ ','No');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Sam Cook','29 Briage Street, WS110DQ ','yes');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Herman Cooper','97 Loxley Road, CV359JY ','yes');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('North Hampton','1 Crispin Street, NN12JH','No');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Barton Smith','87 Finchfiels Road, WV39LQ','Yes');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Simone Malanga','56 Ashworth Road, WS115DS','Yes');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Bobby Brown','51 Overdale Road, TF34BX','No');
INSERT INTO STUDENTS (name,address,CYF_graduate) VALUES ('Mathew Perry','10 Mathew Street, L34AA','Yes');


 INSERT INTO classes(mentor_name , module ,course_date , course_location ) VALUES ('Rody Kirwan','React', '2019-10-01','West Midland');
 INSERT INTO classes(mentor_name , module ,course_date , course_location ) VALUES ('Jason Sancho','Javascript', '2019-11-05','West Midland');
 INSERT INTO classes(mentor_name , module ,course_date , course_location ) VALUES ('Andrew Jackson','Node', '2019-07-02','London');
 INSERT INTO classes(mentor_name , module ,course_date , course_location ) VALUES ('Stella Markov','HTML', '2019-02-07','Manchester');
 INSERT INTO classes(mentor_name , module ,course_date , course_location ) VALUES ('Sandeep Singh','CSS', '2019-03-09','Glascow');

