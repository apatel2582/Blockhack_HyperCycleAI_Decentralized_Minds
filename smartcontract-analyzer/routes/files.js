// files.js
// Contains routes for handling file uploads.

const express = require("express");
const multer = require("multer");
const fs = require("fs"); // Add this line to import the fs module
const { extractAll } = require("../services/contractExtractor");

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
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
    const filePath = req.body.filePath;
    if (!filePath) {
      return res.status(400).send({ message: "Please provide a file path" });
    }

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
