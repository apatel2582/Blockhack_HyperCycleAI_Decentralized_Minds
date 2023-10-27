const express = require("express");
const cors = require("cors");

require("dotenv").config();

const invalidRoute = require("./src/api/routes/invalid.route");
const manifestRoute = require("./src/api/routes/manifest.route");
const auditRoute = require("./src/api/routes/audit.route");

const app = express();

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
    res.send('Hey');
});

app.use(manifestRoute);
app.use(auditRoute);
app.use(invalidRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});