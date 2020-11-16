drop table if exists mentors;
drop table if exists students;
drop table if exists customers;

CREATE TABLE mentors (
  name     VARCHAR(30) NOT NULL,
  years_in_glascow INT NOT NULL,
  address  VARCHAR(120),
  city     VARCHAR(30),
  postcode VARCHAR(30),
  fav_prog_language  VARCHAR(20)
);