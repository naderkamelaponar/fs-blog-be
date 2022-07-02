// بسم الله الرحمن الرحيم
require("dotenv").config();

const PORT = process.env.NODE_ENV === "test" ? 3003 : process.env.PORT;
const MONGO_URI =
process.env.NODE_ENV === "test"
? process.env.MONGODB_URI_TEST
: process.env.MONGODB_URI;
const saltRounds = process.env.SALT_ROUNDS;
const secretWord = process.env.SECRET_WORD;
module.exports = {
MONGO_URI,
PORT,
saltRounds,
secretWord,
};
