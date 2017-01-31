/*jslint node: true */
'use strict';
var config = require('../config/' + process.env.KABA_CONFIGURATION);
var log4js = require("log4js");
log4js.configure("log_config.json");
var logger = log4js.getLogger("kaba");
logger.setLevel(config.server.logAt);

/* PUBLIC */
module.exports = {
    write: function(msg) {
        switch (config.server.logAt.toUpperCase()) {
            case "DEBUG":
                logger.debug(msg);
                break;
            case "ERROR":
                logger.error(msg);
                break;
            case "TRACE":
                logger.trace(msg);
                break;
            default:
                logger.log(msg);
                //logger.info(msg);
                break;
        }
        /*
        logger.log(msg);
        if (logger.isDebugEnabled) {
            logger.debug(msg);
        } else if (logger.isErrorEnabled) {
            logger.error(msg);
        }
        if (logger.isDebugEnabled) {
            logger.debug(msg);
        }
        else if (logger.isErrorEnabled) {
            logger.error(msg);
        } else if (logger.isInfoEnabled) {
            logger.info(msg);
        } else if (logger.isErrorEnabled) {
            logger.error(msg);
        } else if (logger.isWarnEnabled) {
            logger.warn(msg);
        } else if (logger.isTraceEnabled) {
            logger.trace(msg);
        }*/
    },
    writeError: function(msg) {
        logger.error(msg);
    },
    writeInfo: function(msg) {
        logger.info(msg);
    },
    writeFatal: function(msg) {
        logger.fatal(msg);
    },
    writeDebug: function(msg) {
        logger.debug(msg);
    },

    writeAll: function(msg) {
        logger.log("log " + msg);
        logger.debug("debug " + msg);
        logger.info("info " + msg);
        logger.error("error " + msg);
        logger.fatal("fatal " + msg);
        logger.trace("trace " + msg);
    }

};