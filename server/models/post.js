const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  // Accept title as an object
  title: {
    en: { type: String, required: true },
    es: { type: String }
  },

  excerpt: { type: String },

  // Content is required
  content: { type: String, required: true },

  // Accept author as an object
  author: {
    id: String,
    name: String,
    email: String
  },

  publishDate: { type: Date, required: true },

  // Accept categories array of objects
  categories: [
    {
      id: String,
      name: String
    }
  ],

  imageUrl: { type: String, required: true },
  videoUrl: { type: String, required: false }

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
