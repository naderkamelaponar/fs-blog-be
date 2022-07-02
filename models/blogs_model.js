// بسم  الله الرحمن الرحيم
const mongoose = require("mongoose");
const config = require("../utils/config");
const mongoUrl = config.MONGO_URI;
mongoose.connect(mongoUrl).then(() => {
console.info("blogs connected to db");
});
const blogSchema = new mongoose.Schema({
title: { type: String, required: true },
author: String,
url: String,
likes: Number,
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
},
});
blogSchema.set("toJSON", {
transform: (document, returnedObject) => {
returnedObject.id = returnedObject._id.toString();
delete returnedObject._id;
delete returnedObject.__v;
},
});
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
