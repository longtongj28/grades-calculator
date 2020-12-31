const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const courses = require("./routes/courses");
const users = require("./routes/users");
const app = express();

app.use(bodyParser.json());

const db = require("./config/keys").MONGO_URI;

mongoose
  .connect(db, { useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/courses", courses);
app.use("/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
