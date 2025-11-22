// index.js
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

// Force port to 3001
const PORT = 3001;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("DB connection error:", err));
