const manifest = require("../utils/manifest.json")

const getManifest = () => {
    try {
        return {
            status: true,
            message: manifest
        }
    } catch(err) {
        return { 
            status: false,
            message: err.message
        };
    }
}

module.exports = { getManifest }