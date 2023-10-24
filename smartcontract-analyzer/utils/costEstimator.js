const { get_encoding, encoding_for_model } = require("@dqbd/tiktoken");

// const encoding = get_encoding("gpt3.5-turbo");
const encoding = encoding_for_model("gpt-3.5-turbo");
// or whichever encoder corresponds to your OpenAI model

function calculatePromptCost(inputTokens, outputTokens) {
  const costPer1000InputTokens = 0.0015;
  const costPer1000OutputTokens = 0.002;

  const inputCost = (inputTokens / 1000) * costPer1000InputTokens;
  const outputCost = (outputTokens / 1000) * costPer1000OutputTokens;

  return inputCost + outputCost;
}

function countTokens(text) {
  return encoding.encode(text).length;
}

module.exports = {
  calculatePromptCost,
  countTokens,
};
