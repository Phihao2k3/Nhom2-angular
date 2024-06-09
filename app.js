const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/app/routes");
const multer = require('multer');

const app = express();
const path = require("path");
const port = 2904;
app.use(cors());

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static("uploads"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
routes(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
