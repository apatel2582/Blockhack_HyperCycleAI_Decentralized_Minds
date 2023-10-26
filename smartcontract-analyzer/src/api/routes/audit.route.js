const express = require('express');
const multer = require("multer");
const { handleAudit } = require('../controllers/audit.controller');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/audit-contract", upload.single("sol_file"), handleAudit);

module.exports = router;