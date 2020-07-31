/*
콘솔창에 로그를 남긴다.
콘솔창의 로그는 컬러로 찍힌다.
로그 파일을 남긴다.
콘솔창은 info 레벨부터 로그를 남기고, 로그 파일에는 debug 레벨부터 로그를 남긴다.
로그 파일은 매일 하나씩 남긴다.
log 폴더에 로그 파일을 쌓는다.
로그 파일은 최대 20Mbyte다.
로그 파일은 14일간 보관한다.
로그 파일은 압축한다.
개발 환경에서는 debug 레벨부터 로그를 찍고, 운영 환경에서는 info 레벨부터 로그를 찍는다.
*/

const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

 
const logger = createLogger({
    level: env === 'development' ? 'debug' : 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json()
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.colorize(),
                format.printf(
                    info => `${info.timestamp} ${info.level}: ${info.message}`
                )
            )
        }),
        new transports.DailyRotateFile({
            level: 'info',
            filename: `${logDir}/%DATE%-info-log.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        }),
 
    ]
});


module.exports = { logger: logger };