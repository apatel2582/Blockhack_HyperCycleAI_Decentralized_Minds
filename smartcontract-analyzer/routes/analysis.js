// analysis.js
// for detailed analysis requests

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const {
  getGeneralizedSummary,
  analyzeSolidityVersion,
  analyzeContractType,
  analyzeContractDetails,
  analyzeFunctionDetails,
  analyzeTokenHandling,
  analyzeInteraction,
  analyzeVulnerabilities,
  analyzeGasEfficiency,
  analyzeHardcodedAddresses,
  generateGeneralizedPrompt,
  generateSolidityVersionPrompt,
  generateContractTypePrompt,
  generateContractDetailsPrompt,
  generateFunctionDetailsPrompt,
  generateTokenHandlingPrompt,
  generateInteractionPrompt,
  generateVulnerabilitiesPrompt,
  generateGasEfficiencyPrompt,
  generateHardcodedAddressesPrompt,
} = require("../services/openaiService");
const { countTokens, calculatePromptCost } = require("../utils/costEstimator");

function getContractDetails() {
  // Path to the extractedDetails.json file
  const contractDetailsFilePath = path.join(
    __dirname,
    "..",
    "services",
    "extractedDetails.json"
  );

  // Check if the file exists
  if (!fs.existsSync(contractDetailsFilePath)) {
    throw new Error(
      "Contract details not found. Please extract details first."
    );
  }

  // Read the contract details from the file
  return JSON.parse(fs.readFileSync(contractDetailsFilePath, "utf8"));
}

function getEstimatedCostAndTokens(inputTokens) {
  const totalCost = calculatePromptCost(inputTokens, 1500); // using a constant 1500 for output tokens estimate

  console.log("Total Cost - ", totalCost.toFixed(5));
  console.log("Input Tokens - ", inputTokens);
  console.log("Output Tokens Estimate - ", 1500);

  return {
    inputTokensCount: inputTokens,
    estimatedCost: `$${totalCost.toFixed(5)}`,
  };
}

router.post("/general", async (req, res) => {
  try {
    const result = await getGeneralizedSummary();
    const { inputTokensCount, estimatedCost } = getEstimatedCostAndTokens(
      result.inputTokens
    );
    res.json({
      inputTokensCount,
      estimatedCost,
      summary: result.analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/solidity-version", async (req, res) => {
  try {
    const result = await analyzeSolidityVersion();
    const { inputTokensCount, estimatedCost } = getEstimatedCostAndTokens(
      result.inputTokens
    );
    res.json({
      inputTokensCount,
      estimatedCost,
      analysis: result.analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/contract-type", async (req, res) => {
  try {
    const result = await analyzeContractType();
    const { inputTokensCount, estimatedCost } = getEstimatedCostAndTokens(
      result.inputTokens
    );
    res.json({
      inputTokensCount,
      estimatedCost,
      analysis: result.analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/contract-details", async (req, res) => {
  try {
    const result = await analyzeContractDetails();
    const { inputTokensCount, estimatedCost } = getEstimatedCostAndTokens(
      result.inputTokens
    );
    res.json({
      inputTokensCount,
      estimatedCost,
      analysis: result.analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/function-details", async (req, res) => {
  try {
    const result = await analyzeFunctionDetails();
    const { inputTokensCount, estimatedCost } = getEstimatedCostAndTokens(
      result.inputTokens
    );
    res.json({
      inputTokensCount,
      estimatedCost,
      analysis: result.analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/token-handling", async (req, res) => {
  try {
    const result = await analyzeTokenHandling();
    const { inputTokensCount, estimatedCost } = getEstimatedCostAndTokens(
      result.inputTokens
    );
    res.json({
      inputTokensCount,
      estimatedCost,
      analysis: result.analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/interactions", async (req, res) => {
  try {
    const result = await analyzeInteraction();
    const { inputTokensCount, estimatedCost } = getEstimatedCostAndTokens(
      result.inputTokens
    );
    res.json({
      inputTokensCount,
      estimatedCost,
      analysis: result.analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/vulnerabilities", async (req, res) => {
  try {
    const result = await analyzeVulnerabilities();
    const { inputTokensCount, estimatedCost } = getEstimatedCostAndTokens(
      result.inputTokens
    );
    res.json({
      inputTokensCount,
      estimatedCost,
      analysis: result.analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/gas-efficiency", async (req, res) => {
  try {
    const result = await analyzeGasEfficiency();
    const { inputTokensCount, estimatedCost } = getEstimatedCostAndTokens(
      result.inputTokens
    );
    res.json({
      inputTokensCount,
      estimatedCost,
      analysis: result.analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/hardcoded-addresses", async (req, res) => {
  try {
    const result = await analyzeHardcodedAddresses();
    const { inputTokensCount, estimatedCost } = getEstimatedCostAndTokens(
      result.inputTokens
    );
    res.json({
      inputTokensCount,
      estimatedCost,
      analysis: result.analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/estimate-cost", (req, res) => {
  try {
    const { type } = req.body; // extract the type from the request body

    // Path to the extractedDetails.json file
    const contractDetailsFilePath = path.join(
      __dirname,
      "..", // this goes up one level to the project root directory
      "services",
      "extractedDetails.json"
    );

    // Check if the file exists
    if (!fs.existsSync(contractDetailsFilePath)) {
      return res.status(400).json({
        error: "Contract details not found. Please extract details first.",
      });
    }

    const contractDetails = JSON.parse(
      fs.readFileSync(contractDetailsFilePath, "utf8")
    );

    // Map type to the corresponding prompt generator function
    const promptGenerators = {
      "solidity-version": generateSolidityVersionPrompt,
      "contract-type": generateContractTypePrompt,
      "contract-details": generateContractDetailsPrompt,
      "function-details": generateFunctionDetailsPrompt,
      "token-handling": generateTokenHandlingPrompt,
      interactions: generateInteractionPrompt,
      vulnerabilities: generateVulnerabilitiesPrompt,
      "gas-efficiency": generateGasEfficiencyPrompt,
      "hardcoded-addresses": generateHardcodedAddressesPrompt,
    };

    if (!promptGenerators[type]) {
      return res.status(400).json({ error: "Invalid analysis type provided." });
    }

    // Formulate the prompt without actually sending it to OpenAI
    const prompt = promptGenerators[type](contractDetails);
    const inputTokens = countTokens(prompt);

    const costEstimation = getEstimatedCostAndTokens(inputTokens);
    res.json(costEstimation);
  } catch (error) {
    console.error("Error - ", error);
    res
      .status(500)
      .json({ error: "Failed to estimate the cost. Please try again." });
  }
});

module.exports = router;
