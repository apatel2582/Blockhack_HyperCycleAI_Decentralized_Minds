// summary.js
// for general summary requests

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { getGeneralizedSummary } = require("../services/openaiService");
const { countTokens, calculatePromptCost } = require("../utils/costEstimator");

// Endpoint to generate a general summary for the provided contract
router.post("/", async (req, res) => {
  try {
    // Path to the extractedDetails.json file
    const contractDetailsFilePath = path.join(
      __dirname,
      "..", // this goes up one level to the project root directory
      "services",
      "extractedDetails.json"
    );
    console.log("Contract Details files path - ", contractDetailsFilePath);

    // Check if the file exists
    if (!fs.existsSync(contractDetailsFilePath)) {
      return res.status(400).json({
        error: "Contract details not found. Please extract details first.",
      });
    }

    // Read the contract details from the file
    const contractDetails = JSON.parse(
      fs.readFileSync(contractDetailsFilePath, "utf8")
    );

    // Count tokens of the contract details
    const inputTokens = countTokens(JSON.stringify(contractDetails));

    // For this example, let's assume an average of 1500 tokens for the OpenAI output.
    // You may adjust this based on your typical use case.
    const outputTokensEstimate = 1500;

    const totalCost = calculatePromptCost(inputTokens, outputTokensEstimate);

    // Generate a summary for the extracted contract
    const rawSummary = await getGeneralizedSummary(contractDetails);
    console.log("Raw Summary - ", rawSummary.analysis);

    console.log("Total Cost - ", totalCost.toFixed(5));
    console.log("Input Tokens - ", inputTokens);
    console.log("Output Tokens Estimate - ", outputTokensEstimate);

    // Respond with the cost (up to 5 decimal places), number of input tokens, and the summary
    res.json({
      inputTokensCount: inputTokens,
      estimatedCost: `$${totalCost.toFixed(5)}`, // Display up to 5 decimal places
      summary: rawSummary,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to generate the summary. Please try again." });
  }
});

module.exports = router;
