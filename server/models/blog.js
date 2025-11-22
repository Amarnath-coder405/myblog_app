// models/blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogName: { type: String, required: true },
  owner: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
});

module.exports = mongoose.model("Blog", blogSchema);
