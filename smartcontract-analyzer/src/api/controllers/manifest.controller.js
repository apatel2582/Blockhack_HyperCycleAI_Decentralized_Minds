const { getManifest } = require("../services/manifest.service");
const { handleResponse, handleUnAuthorized, handleError } = require("../utils/responseHelper");

const handleManifestResp = (req,res) => {
    try {
        const resp = getManifest();

        if(!resp.status){
            throw new TypeError(resp.message);
        }

        handleResponse({res, statusCode: 201, result: resp.message})


    } catch(err) {
        if (err instanceof TypeError) {
            handleError({ res, statusCode: 400, err: err });
        } else {// internal error
            handleError({ res, statusCode: 500, err: err });
        }
    }
}

module.exports = { handleManifestResp };