const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/app/routes");
const app = express();
const path = require("path");
const port = 4203;
app.use(express.static("uploads"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
