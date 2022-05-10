const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
// Middleware for testing api endpoints, getting api call responses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// App Routes
app.use(require("./routes/user"));
app.use(require("./routes/island"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
