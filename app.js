const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/app/routes");
const app = express();
const path = require("path");
const port = 3500;

app.use(express.static("uploads"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

