const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/PostRoutes");


require('dotenv').config()
const app = express();
const PORT= process.env.PORT
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/post", blogRouter);

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/CRUD",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
