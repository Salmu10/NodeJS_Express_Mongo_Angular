module.exports = {
    url: "mongodb://localhost:27017/wallapop_salva"
  };
  
  const mongoose = require('mongoose');
  
  const connect_db = async function (mongo_url = process.env.MONGO_URI) {
      try {
          await mongoose.connect(mongo_url);
          console.log('DB connected');
      } catch (error) {
          console.error(error);
          process.exit(1);
      }
  }
  
  module.exports = connect_db;