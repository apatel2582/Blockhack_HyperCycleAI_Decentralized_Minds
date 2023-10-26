// files.js
// Contains routes for handling file uploads.

const express = require("express");
const multer = require("multer");
const fs = require("fs"); // Add this line to import the fs module
const path = require("path");
const { extractAll } = require("../services/contractExtractor");
const dotenv = require("dotenv");

// At the top, load environment variables from the appropriate .env file
if (process.env.NODE_ENV === "docker") {
  dotenv.config({ path: ".env.docker" });
} else {
  dotenv.config({ path: ".env.local" });
}

const router = express.Router();
// const UPLOAD_DIR = "uploads/"; // Use this for Docker
// const UPLOAD_DIR = ""; // Use this for local development
// Replace the hard-coded UPLOAD_DIR with the environment variable
const UPLOAD_DIR = process.env.UPLOAD_PATH || "";

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Only accept .sol files
  if (
    file.mimetype === "application/octet-stream" &&
    file.originalname.endsWith(".sol")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .sol files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Endpoint for file upload
// Endpoint for file upload
router.post(
  "/upload",
  upload.single("contractFile"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).send({ message: "Please upload a .sol file" });
      }

      console.log(req.file); // Log the uploaded file object

      res.status(200).send({
        message: "File uploaded successfully!",
        filePath: req.file.path, // path of the uploaded file
      });
      const tempfile = req.file.filename;
      process.env.TEMP_FILE_NAME = tempfile;
    } catch (error) {
      res.status(500).send({
        message: `Error processing file: ${error.message}`,
      });
    }
  }
);

// Endpoint for extracting contract details
router.post("/extract", async (req, res, next) => {
  try {
    let givenPath = req.body.filePath;

    // If the path doesn't contain the uploads/ directory, then prefix it
    if (!givenPath.includes(UPLOAD_DIR)) {
      givenPath = path.join(UPLOAD_DIR, givenPath);
    }

    const filePath = path.join(__dirname, "..", givenPath);

    console.log("Constructed file path:", filePath);

    // Read file content from the disk
    const contractFileContent = fs.readFileSync(filePath, "utf-8");

    const extractedDetails = extractAll(contractFileContent);
    console.log("Extracted Details - ", extractedDetails);

    // After processing, you can delete the file
    fs.unlinkSync(filePath);

    res.status(200).send({
      message: "Contract details extracted successfully!",
      extractedDetails: extractedDetails,
    });
  } catch (error) {
    res.status(500).send({
      message: `Error extracting contract details: ${error.message}`,
    });
  }
});

module.exports = router;
