const dotenv = require('dotenv');

const buildProdLogger = require('./prodLogger.js');
const buildDevLogger = require('./devLogger.js');

dotenv.config();
let logger = null;
if (process.env.NODE_ENV == 'dev') {
    // development mode
    logger = buildDevLogger();
} else {
    // production mode
    logger = buildProdLogger();
}

export default logger;