const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

import invalidRoute from './src/api/routes/invalid.route'

const app = express();
app.use(cors());
// req input phraser
app.use(express.json());

// invalid route handler
app.use(invalidRoute);

const TOKEN_COST_USD = 0.003;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const text = "Hello, Manifest.JSON!";

const MANIFEST = {
  name: "Smart Contract Analyzer",
  short_name: "contract_analyzer",
  version: "0.1.0",
  license: "Open",
  terms_of_service: "Sorry, its in the works!",
  author: "Decentralized Minds - GBC",
  endpoints: [
    {
      uri: "/analyze-contract",
      input_query: "",
      input_headers: {},
      input_body: { sol_file: "<Solidity_File>" },
      output: "<JSON_Analysis>",
      documentation:
        "Analyzes a provided Solidity smart contract and returns a detailed JSON analysis.",
      currency: "USD",
      price_per_call: { estimated_cost: 0, min: 0, max: 0.1 },
      price_per_mb: { estimated_cost: 0, min: 0, max: 0.1 },
      example_calls: [
        {
          body: "",
          method: "POST",
          query: "",
          headers: "",
          output: { text: "Your Manifest JSON File!" },
        },
      ],
    },
  ],
  documentation_url: ";) Sorry!",
};

app.get("/manifest.json", (req, res) => {
  console.log("Manifest.JSON Requested");
  console.log(MANIFEST);
  res.json(MANIFEST);
});

app.post("/analyze-contract", upload.single("sol_file"), async (req, res) => {
  // If no file is provided, return an error
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  const contractCode = req.file.buffer.toString("utf-8");
  const promptContent = `
  Analyze the following Solidity smart contract:
  
  ${contractCode}
  
  Please answer in a structured format:
  
  [Solidity version]: 
  [Type of smart contract]: 
  [Contract details]: 
  [Function details]: 
  [Token handling]: 
  [Interaction]: 
  [Vulnerabilities]: 
  [Gas efficiency]: 
  [Hardcoded addresses]: 
  `;

  // Calculate the estimated cost
  const estimatedCostTokensFromFile = (contractCode.length / 100) * 0.1;
  const estimatedCostTokensFromPrompt = (promptContent.length / 100) * 0.05;
  const totalEstimatedCostTokens =
    estimatedCostTokensFromFile + estimatedCostTokensFromPrompt;

  // If the 'cost_only' header is present, return the computed estimated cost
  if (req.headers["cost_only"]) {
    return res.json({
      estimated_costs: {
        tokens: totalEstimatedCostTokens,
        usd: totalEstimatedCostTokens * TOKEN_COST_USD,
      },
      message:
        "This is the estimated cost. If you agree, please proceed without the 'cost_only' header.",
    });
  }

  // Check if the user has confirmed
  if (req.headers["user-confirmed"] !== "true") {
    return res.status(403).json({
      message: "User did not confirm. Analysis was not performed.",
    });
  }

  const messages = [{ role: "user", content: promptContent }];

  //   const messages = [
  //     {
  //       role: "user",
  //       content: `Analyze the following Solidity smart contract and provide a summary of its functions and their expected outputs: ${contractCode}`,
  //     },
  //   ];

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // const analysis = response.data.choices[0].message.content.trim();
    const rawResponse = response.data.choices[0].message.content.trim();
    console.log("Raw Response:", rawResponse);

    // const analysisJson = convertResponseToJson(rawResponse);

    // Write the JSON analysis to tempo.txt
    fs.writeFileSync("tempo.txt", JSON.stringify(rawResponse, null, 2));

    console.log("Analysis JSON:", rawResponse);

    return res.json({ analysis: rawResponse });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return res.status(500).json({ error: "Failed to analyze the contract" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

app.get("/env-vars", (req, res) => {
  const envData = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PORT: process.env.PORT,
  };
  res.json(envData);
});

function convertResponseToJson(responseText) {
  const lines = responseText.split("\n").filter((line) => line.trim() !== "");

  const jsonResponse = {};
  let currentKey = "";

  lines.forEach((line) => {
    if (line.startsWith("[Solidity version]:")) {
      currentKey = "solidityVersion";
      jsonResponse[currentKey] = line.replace("[Solidity version]:", "").trim();
    } else if (line.startsWith("[Type of smart contract]:")) {
      currentKey = "type";
      jsonResponse[currentKey] = line
        .replace("[Type of smart contract]:", "")
        .trim();
    } else if (line.startsWith("[Contract details]:")) {
      currentKey = "contractDetails";
      jsonResponse[currentKey] = line.replace("[Contract details]:", "").trim();
    } else if (line.startsWith("[Function details]:")) {
      currentKey = "functions";
      jsonResponse[currentKey] = [];
    } else if (line.startsWith("[Token handling]:")) {
      currentKey = "tokens";
      jsonResponse[currentKey] = line.replace("[Token handling]:", "").trim();
    } else if (line.startsWith("[Interaction]:")) {
      currentKey = "interaction";
      jsonResponse[currentKey] = line.replace("[Interaction]:", "").trim();
    } else if (line.startsWith("[Vulnerabilities]:")) {
      currentKey = "vulnerabilities";
      jsonResponse[currentKey] = [];
    } else if (line.startsWith("[Gas efficiency]:")) {
      currentKey = "gasEfficiency";
      jsonResponse[currentKey] = line.replace("[Gas efficiency]:", "").trim();
    } else if (line.startsWith("[Hardcoded addresses]:")) {
      currentKey = "hardcodedAddresses";
      jsonResponse[currentKey] = line
        .replace("[Hardcoded addresses]:", "")
        .trim();
    } else {
      if (currentKey && Array.isArray(jsonResponse[currentKey])) {
        jsonResponse[currentKey].push(line.trim());
      } else if (currentKey) {
        jsonResponse[currentKey] += " " + line.trim();
      }
    }
  });

  return jsonResponse;
}
