const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/PostRoutes");
const cors= require("cors");  

require('dotenv').config()
const app = express();
const PORT= process.env.PORT
const MONGO_URL=  "mongodb://127.0.0.1:27017/CRUD"
//middleware

const authMiddleware =require("./config/firebase.config")


app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true }));




// You can now use the Firebase Admin SDK to interact with Firebase services

app.use("/api/post",authMiddleware, blogRouter);



//configure mongoose
mongoose.connect(
MONGO_URL,
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
