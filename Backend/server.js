const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/api', require("./routes/user"));
app.use('/api', require("./routes/island"));
app.get('/', function (req, res) {
  res.send('Hello World');
});
//allow OPTIONS on all resources
app.options('*', cors());
// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});
