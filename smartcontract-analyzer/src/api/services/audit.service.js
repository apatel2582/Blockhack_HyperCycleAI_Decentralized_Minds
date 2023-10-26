const handleAuditContract = (code) => {
    try {
        return {
            status: true,
            message: "Audit contract"
        }
    } catch(err) {
        return { 
            status: false,
            message: err.message
        };
    }   
}

const handleCostEstimation = () => {
    try {
        return {
            status: true,
            message: "cost estimation"
        }
    } catch(err) {
        return { 
            status: false,
            message: err.message
        };
    }  
}



module.exports = { handleAuditContract, handleCostEstimation }