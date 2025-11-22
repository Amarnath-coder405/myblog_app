// app.js
const express = require("express");
const cors = require("cors");
const postsRouter = require("./routers/posts");

const app = express();

app.use(express.json());

// --- Enable CORS ---
app.use(cors({
  origin: "http://localhost:3000",   // frontend origin
  methods: "GET,POST,PUT,PATCH,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// Base route → http://localhost:3001/posts
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("Blog API is running...");
});

module.exports = app;
