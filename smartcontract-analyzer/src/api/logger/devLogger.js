const { createLogger, format, transports } = require('winston');

const buildDevLogger = () => {
    const logFormat = format.printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    return createLogger({
        format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.errors({ stck: true }),
            logFormat
        ),
        transports: [
            new transports.Console({ level: 'debug' }),
            new transports.File({ filename: 'appError.log', level: 'error' }),
        ],
    });
};

module.exports = buildDevLogger;