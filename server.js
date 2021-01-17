const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const categories = require("./routes/categories");
const courses = require("./routes/courses");
const users = require("./routes/users");
const assignments = require('./routes/assignments');
const app = express();

app.use(bodyParser.json());

const db = require("./config/keys").MONGO_URI;

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/categories", categories);
app.use("/courses", courses);
app.use("/users", users);
app.use("/assignments", assignments);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
