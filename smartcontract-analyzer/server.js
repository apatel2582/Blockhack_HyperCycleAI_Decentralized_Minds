// server.js
// This will be the main entry point, setting up the server and middleware.

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileRoutes = require("./routes/files");
const analysisRoutes = require("./routes/analysis");
const summaryRoutes = require("./routes/summary");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/files", fileRoutes);
app.use("/analysis", analysisRoutes);
app.use("/summary", summaryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

module.exports = app; // for potential future tests or further integrations
