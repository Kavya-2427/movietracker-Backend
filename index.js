const express = require("express");
const cors = require("cors");
require("dotenv").config();

const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes"); // ✅ ADD THIS

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// 👇 Add this line
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes); // ✅ VERY IMPORTANT

app.get("/", (req, res) => {
  res.send("Movie Backend Running 🚀");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
