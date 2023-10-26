const { handleAuditContract, handleCostEstimation } = require("../services/audit.service");
const { handleResponse, handleError } = require("../utils/responseHelper");

const handleAudit = (req,res) => {
    try {
        console.log(req)
        console.log(req.file);

        res.json(req);
        return;

    
        if(req.headers["cost_only"]){
            const resp = handleCostEstimation();

            if(!resp.status){
                throw new TypeError("Cost estimation failed");
            }

            handleResponse({res, statusCode: 201, result: resp.message})
        } 
        
        if(req.headers["user-confirmed"] !== "true"){
            throw new TypeError("Need user confirmation")
        } 

        const resp = handleAuditContract(req.file)

        if(!resp.status){
            throw new TypeError("Auditing smart contract failed")
        }

        handleResponse({ res, statusCode: 201, result: resp.message})

    } catch(err) {
        console.log("error")
        if (err instanceof TypeError) {
            handleError({ res, statusCode: 400, err: err.message });
        } else {// internal error
            handleError({ res, statusCode: 500, err: err.message });
        }
    }
}

module.exports = { handleAudit }