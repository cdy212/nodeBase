const { BaseError } = require('./BaseError');
const { logger } = require('../utils/logConfig');

exports.handleError = async(err) => {
    await logger.error(
        'Error message from the centralized error-handling component',
        err
    );
    // eslint-disable-next-line no-undef
    await sendMailToAdminIfCritical();
    // eslint-disable-next-line no-undef
    await sendEventsToSentry();
};

exports.isTrustedError = (error) => {
    return error instanceof BaseError ? error.isOperational : false;
};

// eslint-disable-next-line no-undef
sendMailToAdminIfCritical = () => {
    logger.info('-------mail send---------');
};

// eslint-disable-next-line no-undef
sendEventsToSentry = () => {
    logger.info('-------send event---------');
};