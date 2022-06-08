const { createLogger, format, transports } = require('winston');
require("winston-daily-rotate-file");
const path = require('path');

const defaultFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.align(),
    format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
);
const defaultOptions = {
    format: defaultFormat,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
};
// 操作日志和错误日志
const globalLogger = createLogger({
    format: defaultFormat,
    transports: [
        new transports.DailyRotateFile({
            filename: path.join(__dirname, '../log/error/%DATE%.log'),
            level: "error",
            ...defaultOptions
        }),
        new transports.DailyRotateFile({
            filename: path.join(__dirname, '../log/info/%DATE%.log'),
            level: "info",
            ...defaultOptions
        })
    ],
});


// 登录日志
const loginLogger = createLogger({
    transports: [
        new transports.DailyRotateFile({
            filename: path.join(__dirname, '../log/login/%DATE%.log'),
            ...defaultOptions
        }),
    ],
});

module.exports = {
    globalLogger,
    loginLogger
};
