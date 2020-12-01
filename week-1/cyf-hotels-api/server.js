const express = require("express");
const app = express();
require('dotenv').config();

const { Pool } = require("pg");

const pool = new Pool({
  user: "osagie",
  host: "localhost",
  database: "cyf_hotels",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get("/hotels", function (req, res) {
  pool.query("SELECT * FROM hotels", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/hotels/:id", function (req, res) {
  const hotel_id = req.params.id;
  pool.query("SELECT * FROM hotels WHERE id = "+hotel_id, (error, result) => {
    
    res.json(result.rows);
  });
});

app.post("/hotels/add", function (req, res) {
  pool.query("INSERT INTO hotels (name, rooms, postcode) VALUES ('Sheraton Hotel', 120, 'SE179YU')", (error, result) => {
    res.json(result.rows);
  });
});

app.delete("/hotels/delete",  function (req, res) {
  pool.query(
    "DELETE FROM hotels WHERE id = 13 AND postcode = 'SE179YU'", 
    (error, result) => {
    res.json(result.rows);
  });
});

app.post("/hotels/update", function (req, res) {
  
  pool.query(
    "UPDATE hotels SET name = 'Meridian Hotel', postcode = 'BY138GE', rooms = 89 WHERE id = 14",
    (error, result) => {
      res.json(result.rows);     
    }
  );

});

app.listen(3012, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
