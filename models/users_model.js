// بسم  الله الرحمن الرحيم
const mongoose = require("mongoose");
const config = require("../utils/config");
const mongoUrl = config.MONGO_URI;

mongoose.connect(mongoUrl).then(() => {
console.info("users connected to db");
});
const userSchema = new mongoose.Schema({
username: { type: String, required: true },
name: { type: String, required: true },
password: String,
blogs: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "Blog",
},
],
});
userSchema.set("toJSON", {
transform: (document, returnedObject) => {
returnedObject.id = returnedObject._id.toString();
delete returnedObject._id;
delete returnedObject.__v;
delete returnedObject.password;
},
});
const User = mongoose.model("User", userSchema);
module.exports = User;
