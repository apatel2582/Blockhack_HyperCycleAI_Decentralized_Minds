// services/contractExtractor.js
// Utility functions for extracting contract details.

const solc = require("solc");
const fs = require("fs");
const path = require("path");
const outputPath = path.join(__dirname, "extractedDetails.json");

function extractSolidityVersion(contractFileContent) {
  const solidityVersionRegex = /pragma solidity \^?(\d+\.\d+\.\d+);/;
  const matches = contractFileContent.match(solidityVersionRegex);
  return matches ? matches[1] : null;
}

function extractContractType(contractFileContent) {
  const contractTypeRegex =
    /contract\s+[a-zA-Z0-9_]+\s+is\s+([a-zA-Z0-9_,\s]+)/g;
  const match = contractTypeRegex.exec(contractFileContent);
  if (!match) return "Custom";

  const inheritanceTypes = match[1].split(",").map((s) => s.trim());

  const typesMap = {
    ERC721Enumerable: "ERC-721",
    ERC20: "ERC-20",
    ERC1155: "ERC-1155",
    ERC777: "ERC-777",
    ERC721: "ERC-721",
    // ... other types can be added as needed
  };

  for (const type of inheritanceTypes) {
    if (typesMap[type]) return typesMap[type];
  }

  return "Custom";
}

function extractStateVariables(contractFileContent) {
  function extractUntilConstruct(content) {
    // Extract the contract body
    // console.log("content - ", content);
    const contractBodyPattern =
      /contract\s+[a-zA-Z0-9_]+(?:\s+is\s+[a-zA-Z0-9_ ,]+)?\s*{([\s\S]*?)}/;

    const contractBodyMatch = content.match(contractBodyPattern);
    // console.log("contractBody Match - ", contractBodyMatch);
    if (!contractBodyMatch) return "";

    const contractBody = contractBodyMatch[1];

    // Find the first occurrence of a construct (event, function, or modifier)
    const constructs = ["function", "modifier", "event", "constructor"];
    let firstConstructIndex = contractBody.length;

    for (const construct of constructs) {
      const idx = contractBody.indexOf(construct);
      if (idx !== -1 && idx < firstConstructIndex) {
        firstConstructIndex = idx;
      }
    }
    // console.log("firstConstructIndex - ", firstConstructIndex);

    // Return the content from the start of the contract to the first construct
    return contractBody.slice(0, firstConstructIndex).trim();
  }

  const relevantContent = extractUntilConstruct(contractFileContent);
  // console.log("relevant Content - ", relevantContent);

  const stateVarPattern =
    /(mapping\([^)]+\)|[a-zA-Z0-9_<>]+)\s*((?:public|private|internal|external)?)\s*(constant)?\s*([a-zA-Z0-9_]+)(?:\s*=\s*([^;]+))?;/g;

  const matches = [...relevantContent.matchAll(stateVarPattern)];

  return matches.map((match) => {
    return {
      visibility: match[2] || "public",
      declaration: `${match[1]} ${match[3] ? match[3] + " " : ""}${match[4]}${
        match[5] ? " = " + match[5].trim() : ""
      }`,
      // ? match[3] + " " : ""}${match[4]}`,
    };
  });
}

function extractFunctions(contractFileContent) {
  const functionRegex = /function\s+([a-zA-Z0-9_]+)\s*\(/g;
  const matches = [...contractFileContent.matchAll(functionRegex)];
  return matches.map((match) => match[1]);
}

function extractEvents(contractFileContent) {
  const eventRegex = /event\s+([a-zA-Z0-9_]+)\s*\(/g;
  const matches = [...contractFileContent.matchAll(eventRegex)];
  return matches.map((match) => match[1]);
}

function extractModifiers(contractFileContent) {
  const modifierRegex = /modifier\s+([a-zA-Z0-9_]+)\s*\(/g;
  const matches = [...contractFileContent.matchAll(modifierRegex)];
  return matches.map((match) => match[1]);
}

function extractImports(contractFileContent) {
  const importRegex = /import\s+"(.*?)";/g;
  const matches = [...contractFileContent.matchAll(importRegex)];
  return matches.map((match) => match[1]);
}

function extractTokenHandling(contractFileContent) {
  const tokenFunctions = [
    "mint",
    "burn",
    "transfer",
    "approve",
    "transferFrom",
  ];
  const presentFunctions = extractFunctions(contractFileContent);
  return tokenFunctions.filter((func) => presentFunctions.includes(func));
}

function extractContractInteractions(contractFileContent) {
  // This can be refined further depending on the patterns you notice
  const callRegex = /\.\s*([a-zA-Z0-9_]+)\s*\(/g;
  const matches = [...contractFileContent.matchAll(callRegex)];
  return [...new Set(matches.map((match) => match[1]))];
}

function extractHardcodedAddresses(contractFileContent) {
  const addressRegex = /0x[a-fA-F0-9]{40}/g;
  const matches = [...contractFileContent.matchAll(addressRegex)];
  return [...new Set(matches.map((match) => match[0]))];
}

function extractAll(contractFileContent) {
  const details = {
    solidityVersion: extractSolidityVersion(contractFileContent),
    contractType: extractContractType(contractFileContent),
    stateVariables: extractStateVariables(contractFileContent),
    functions: extractFunctions(contractFileContent),
    events: extractEvents(contractFileContent),
    modifiers: extractModifiers(contractFileContent),
    imports: extractImports(contractFileContent),
    tokenHandling: extractTokenHandling(contractFileContent),
    contractInteractions: extractContractInteractions(contractFileContent),
    hardcodedAddresses: extractHardcodedAddresses(contractFileContent),
    contractCode: contractFileContent, // This line includes the entire contract code in the extracted details
  };

  // Save to a JSON file
  fs.writeFileSync(outputPath, JSON.stringify(details, null, 4));

  return details;
}

module.exports = {
  extractAll,
  extractTokenHandling,
  extractContractInteractions,
  extractHardcodedAddresses,
};
