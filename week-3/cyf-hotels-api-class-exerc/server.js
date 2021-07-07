const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded());

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
  pool.query("SELECT * FROM hotels WHERE id = " + hotel_id, (error, result) => {
    res.json(result.rows);
  });
});

app.post("/hotels/add", function (req, res) {
  pool.query(
    "INSERT INTO hotels (name, rooms, postcode) VALUES ('Sheraton Hotel', 120, 'SE179YU')",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.delete("/hotels/delete", function (req, res) {
  pool.query(
    "DELETE FROM hotels WHERE id = 13 AND postcode = 'SE179YU'",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.post("/hotels/update", function (req, res) {
  pool.query(
    "UPDATE hotels SET name = 'Meridian Hotel', postcode = 'BY138GE', rooms = 89 WHERE id = 14",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

// ##### Week 3 Exercise 1
app.post("/hotels", function (req, res) {
  const newHotelName = req.body.name;
  const newHotelRooms = req.body.rooms;
  const newHotelPostcode = req.body.postcode;

  const query =
    "INSERT INTO hotels (name, rooms, postcode) VALUES ($1, $2, $3)";

  if (!Number.isInteger(newHotelRooms) || newHotelRooms < 4) {
    return res.status(400).send("All our hotels has at least 4 rooms");
  }
  if (typeof newHotelName !== "string") {
    return res.status(400).send("Hotel name must be words or alphabets");
  }

  pool
    .query(query, [newHotelName, newHotelRooms, newHotelPostcode])
    .then(() => res.send("Hotel created!"))
    .catch((e) => console.error(e));
});

app.get("/hotels/:hotelId", function (req, res) {
  const hotelId = req.params.hotelId;

  pool
    .query("SELECT * FROM hotels WHERE id=$1", [hotelId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.get("/customers", function (req, res) {
  pool
    .query("SELECT * FROM customers ORDER BY name")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// Retrieves a customer based on the customerId as a variable
app.get("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;

  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// Alternative method to above to retrieve customer details based on customerId
app.get("/customers/:customerId/bookings", function (req, res) {
   const customerId = req.params.customerId;
  queryCode =
    "SELECT bookings.checkin_date, bookings.nights, hotels.postcode FROM customers INNER JOIN bookings ON customers.id = bookings.customer_id INNER JOIN hotels ON bookings.hotel_id = hotels.id WHERE customers.id =" +customerId;
  pool
    .query(queryCode)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});


// Add a new GET endpoint /customers/:customerId/bookings to load
// all the bookings of a specific customer. Returns the following
// information: check in date, number of nights, hotel name, hotel postcode.
app.get("/customers/:customerId/bookings", function (req, res) {
  const customerId = req.params.customerId;
  pool
    .query(
      "SELECT bookings.checkin_date, bookings.nights, hotels.name, hotels.postcode FROM customers INNER JOIN bookings ON customers.id = bookings.customer_id INNER JOIN hotels ON hotels.id = bookings.hotel_id WHERE customers.id = $1",
      [customerId]
    )
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.put("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;
  const customerAddress = req.body.address;
  const customerCity = req.body.city;
  const customerPostcode = req.body.postcode;
  const customerCountry = req.body.country;
  pool
    .query(
      "UPDATE customers SET address=$1 , city=$2, postcode=$3 , country =$4 WHERE id=$5",
      [
        customerAddress,
        customerCity,
        customerPostcode,
        customerCountry,
        customerId,
      ]
    )
    .then(() => res.send(`Customer ${customerId} updated!`))
    .catch((e) => console.error(e));
});

app.get("/customers/:customerId/bookings", function (req, res) {
  const customerId = req.params.customerId;
  pool
    .query(
      "SELECT checkin_date, nights,booking.name , hotel.name * FROM hotels WHERE name=$1",
      [newCustomerName]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("A customer with the same name already exists!");
      } else {
        const query =
          "INSERT INTO customers (name,email,address,city, postcode,country) VALUES ($1, $2, $3,$4, $5, $6)";
        pool
          .query(query, [
            newCustomerName,
            newCustomerEmail,
            newCustomerAddress,
            newCustomerCity,
            newCustomerPostcode,
            newCustomerCountry,
          ])
          .then(() => res.send("new Customer created!"))
          .catch((e) => console.error(e));
      }
    });
});

app.delete("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;

  pool
    .query("DELETE FROM bookings WHERE customer_id=$1", [customerId])
    .then(() => {
      pool
        .query("DELETE FROM customers WHERE id=$1", [customerId])
        .then(() => res.send(`Customer ${customerId} deleted!`))
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
});

app.delete("/hotels/:hotelId", function (req, res) {
  const hotelId = req.params.hotelId;

  pool.query(
    "SELECT * FROM bookings WHERE hotel_id=$1", [hotelId])
    .then((result) => {
    if ((result.rows.length = 0)) {
      return res
        .status(400)
        .send("An hotel with the same name already exists!");
    }
    pool
      .query("DELETE FROM customers WHERE id=$1", [customerId])
      .then(() => res.send(`Customer ${customerId} deleted!`))
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));
});

app.listen(3012, function () {
  console.log("Server is listening on port 3012. Ready to accept requests!");
});
