const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongo_uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`DataBase connected`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
