// openaiService.js
// handles all OpenAI API interactions

require("dotenv").config();
const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const { countTokens } = require("../utils/costEstimator");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getSavedContractDetails() {
  const filePath = path.join(__dirname, "extractedDetails.json");
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  }
  return null;
}

const contractDetails = getSavedContractDetails();

function generateGeneralizedPrompt(contractDetails) {
  const prompt = `Given the contract details:
  ${JSON.stringify(contractDetails, null, 2)}
  Along with the contract code:
  "${JSON.stringify(contractDetails.contractCode)}"
  Provide a comprehensive analysis, detailing its structure, possible use cases, any significant characteristics, and how the code supports these conclusions.`;
  return prompt;
}

function generateSolidityVersionPrompt(contractDetails) {
  const prompt = `Considering the provided Solidity version ${contractDetails.solidityVersion} and the contract code:
  "${contractDetails.contractCode}"
  Analyze the implications, compatibility, and any specific features or limitations associated with this version of Solidity.`;
  return prompt;
}

function generateContractTypePrompt(contractDetails) {
  const prompt = `Given a ${contractDetails.contractType} type smart contract and the actual contract code:
  "${contractDetails.contractCode}"
  Provide a detailed analysis, explaining the typical features of this contract type, and how the provided code adheres or differs from the typical structure.`;
  return prompt;
}

function generateContractDetailsPrompt(contractDetails) {
  const prompt = `Given the contract structure that includes state variables, functions, events, modifiers, and imports,
  State Variables: ${contractDetails.stateVariables.length}
  Functions: ${contractDetails.functions.length}
  Events: ${contractDetails.events.length}
  Modifiers: ${contractDetails.modifiers.length}
  Imports: ${contractDetails.imports.length}
  Along with the contract code:
  "${contractDetails.contractCode}"
  Provide a detailed examination, highlighting any unique patterns, best practices, or deviations present in the code.`;
  return prompt;
}

function generateFunctionDetailsPrompt(contractDetails) {
  const prompt = `Analyze the following functions present in the contract: ${contractDetails.functions.join(
    ", "
  )}.
  Consider the contract code:
  "${contractDetails.contractCode}"
  Describe the role of each function, its potential impact, and any dependencies or interactions with other parts of the code.`;
  return prompt;
}

function generateTokenHandlingPrompt(contractDetails) {
  const prompt = `Evaluate the token handling mechanisms in the contract, specifically: ${contractDetails.tokenHandling.join(
    ", "
  )}.
  Take into account the contract code:
  "${contractDetails.contractCode}"
  Offer insights on their implications, potential pitfalls, and how they are implemented within the code.`;
  return prompt;
}

function generateInteractionPrompt(contractDetails) {
  const prompt = `Analyze the interactions in the contract, including: ${contractDetails.contractInteractions.join(
    ", "
  )}.
  Given the contract code:
  "${contractDetails.contractCode}"
  Explain how these interactions are implemented, any dependencies or preconditions, and their potential impact on contract execution.`;
  return prompt;
}

function generateVulnerabilitiesPrompt(contractDetails) {
  const prompt = `Analyze the provided contract for potential vulnerabilities and security risks.
  Using the contract details:
  ${JSON.stringify(contractDetails, null, 2)}
  And the contract code:
  "${contractDetails.contractCode}"
  Identify any areas that may be susceptible to attacks, and suggest measures to mitigate these vulnerabilities.`;
  return prompt;
}

function generateGasEfficiencyPrompt(contractDetails) {
  const prompt = `Evaluate the gas efficiency of the provided contract.
  Using the contract details:
  ${JSON.stringify(contractDetails, null, 2)}
  And the contract code:
  "${contractDetails.contractCode}"
  Highlight any operations or patterns that might lead to higher gas costs and suggest potential optimizations to improve gas efficiency.`;
  return prompt;
}

function generateHardcodedAddressesPrompt(contractDetails) {
  const prompt = `Evaluate the usage and security implications of hardcoded addresses: ${contractDetails.hardcodedAddresses.join(
    ", "
  )}.
  Consider the contract code:
  "${contractDetails.contractCode}"
  Explain the role of these addresses within the code, potential risks associated with hardcoding, and any best practices related to address management.`;
  return prompt;
}

async function getGeneralizedSummary() {
  const prompt = generateGeneralizedPrompt(contractDetails);
  console.log("Prompt Token Count:", countTokens(prompt));

  const inputTokens = countTokens(prompt);

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return {
    analysis: chatCompletion.choices[0].message.content.trim(),
    inputTokens,
  };
}

async function analyzeSolidityVersion() {
  const prompt = generateSolidityVersionPrompt(contractDetails);
  console.log("Prompt Token Count:", countTokens(prompt));

  const inputTokens = countTokens(prompt);

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return { analysis: response.choices[0]?.message.content, inputTokens };
}

async function analyzeContractType() {
  const prompt = generateContractTypePrompt(contractDetails);
  console.log("Prompt Token Count:", countTokens(prompt));

  const inputTokens = countTokens(prompt);

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return { analysis: response.choices[0]?.message.content, inputTokens };
}

async function analyzeContractDetails() {
  const prompt = generateContractDetailsPrompt(contractDetails);
  console.log("Prompt Token Count:", countTokens(prompt));

  const inputTokens = countTokens(prompt);

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return { analysis: response.choices[0]?.message.content, inputTokens };
}

async function analyzeFunctionDetails() {
  const prompt = generateFunctionDetailsPrompt(contractDetails);
  console.log("Prompt Token Count:", countTokens(prompt));

  const inputTokens = countTokens(prompt);

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return { analysis: response.choices[0]?.message.content, inputTokens };
}

async function analyzeTokenHandling() {
  const prompt = generateTokenHandlingPrompt(contractDetails);
  console.log("Prompt Token Count:", countTokens(prompt));

  const inputTokens = countTokens(prompt);

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return { analysis: response.choices[0]?.message.content, inputTokens };
}

async function analyzeInteraction() {
  const prompt = generateInteractionPrompt(contractDetails);
  console.log("Prompt Token Count:", countTokens(prompt));

  const inputTokens = countTokens(prompt);

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return { analysis: response.choices[0]?.message.content, inputTokens };
}

async function analyzeVulnerabilities() {
  const prompt = generateVulnerabilitiesPrompt(contractDetails);
  console.log("Prompt Token Count:", countTokens(prompt));

  const inputTokens = countTokens(prompt);

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return { analysis: response.choices[0]?.message.content, inputTokens };
}

async function analyzeGasEfficiency() {
  const prompt = generateGasEfficiencyPrompt(contractDetails);
  console.log("Prompt Token Count:", countTokens(prompt));

  const inputTokens = countTokens(prompt);

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return { analysis: response.choices[0]?.message.content, inputTokens };
}

async function analyzeHardcodedAddresses() {
  const prompt = generateHardcodedAddressesPrompt(contractDetails);
  console.log("Prompt Token Count:", countTokens(prompt));

  const inputTokens = countTokens(prompt);

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return { analysis: response.choices[0]?.message.content, inputTokens };
}

module.exports = {
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
};
