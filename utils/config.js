// بسم الله الرحمن الرحيم
require("dotenv").config();

const PORT =
   process.env.NODE_ENV === "test" ? process.env.PORT : 3001;
const MONGO_URI =
   process.env.NODE_ENV === "test"
      ? process.env.MONGODB_URI_TEST
      : process.env.MONGODB_URI;

module.exports = {
   MONGO_URI,
   PORT,
};
