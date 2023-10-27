
const logger = require("../logger");
const { handleAuditContract, handleCostEstimation } = require("../services/audit.service");
const { handleResponse, handleError } = require("../utils/responseHelper");

const handleAudit = async (req,res) => {
    try {
        // console.log(req.file);
        // console.log(req.contract)
        console.log(req.body.contract)
        // const contractCode = req.file.buffer.toString("utf-8");
        const contractCode = req.body.contract;

        if(!contractCode || contractCode.length == 0){
            throw new TypeError("smart contract needed to be passed");
        }
    
        if(req.headers["cost_only"]){
            const resp = handleCostEstimation(contractCode);
            logger.debug(`costEstimation:-  status = ${resp.status}, message(cost estimate) = ${resp.message.estimationCost}`)

            if(!resp.status){
                throw new TypeError("Cost estimation failed");
            }

            handleResponse({res, statusCode: 201, result: resp.message})
            return;
        } 
        
        if(req.headers["user-confirmed"] !== "true"){
            throw new TypeError("Need user confirmation")
        } 

        const resp = await handleAuditContract(contractCode)

        console.log("resp audit ", resp)

        if(!resp.status){
            throw new TypeError("Auditing smart contract failed")
        }

        handleResponse({ res, statusCode: 201, result: resp.message})

    } catch(err) {
        logger.error(`handleAudit error : ${err.message}`)
        if (err instanceof TypeError) {
            handleError({ res, statusCode: 400, err: err.message });
        } else {// internal error
            handleError({ res, statusCode: 500, err: err.message });
        }
    }
}

module.exports = { handleAudit }