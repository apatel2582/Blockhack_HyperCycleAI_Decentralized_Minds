const logger = require("../logger");
const { getPrompt } = require("../utils/generatePrompt");
const axios = require('axios');
require('dotenv').config()

const handleAuditContract = async (contractCode) => {
    try {
        console.log("contract ", contractCode);
        const promptContent = getPrompt(contractCode);
        console.log("prompt ", promptContent)

        const messages = [{ role: "user", content: promptContent }];

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

        const rawResponse = response.data.choices[0].message.content.trim();
        logger.debug(`Raw Response: ${rawResponse}`);


        return {
            status: true,
            message: JSON.parse(rawResponse)
        }
    } catch(err) {
        logger.error(`AuditContract error : ${err.message}`)
        return { 
            status: false,
            message: err.message
        };
    }   
}

const handleCostEstimation = (contractCode) => {
    try {
        const promptContent = getPrompt("");

        // Calculate the estimated cost
        const estimatedCostTokensFromFile = (contractCode.length / 100) * 0.1;
        const estimatedCostTokensFromPrompt = (promptContent.length / 100) * 0.05;
        const totalEstimatedCostTokens =
            estimatedCostTokensFromFile + estimatedCostTokensFromPrompt;

        return {
            status: true,
            message: {
                estimationCost: totalEstimatedCostTokens
            }
        }
    } catch(err) {
        return { 
            status: false,
            message: err.message
        };
    }  
}



module.exports = { handleAuditContract, handleCostEstimation }