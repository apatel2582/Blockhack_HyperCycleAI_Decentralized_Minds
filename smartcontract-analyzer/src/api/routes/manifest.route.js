const express = require('express');
const { handleManifestResp } = require('../controllers/manifest.controller');
const router = express.Router();

router.get("/manifest.json",handleManifestResp)

module.exports = router;