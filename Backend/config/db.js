const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  console.log("process : ", process.env.MONGO_URI);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected:${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error:${error.message}`.red.underline.bold);
    process.exit();
  }
};

module.exports = connectDb;
