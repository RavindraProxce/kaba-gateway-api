/*jslint node: true */
'use strict';

var xpath = require('xpath'),
    domParser = require('xmldom').DOMParser,
    xmlSerializer = require('xmldom').XMLSerializer,
    logger = require('../helpers/logger'),
    config = require('../config/' + process.env.KABA_CONFIGURATION),
    moment = require('moment');

/* PRIVATE REF */
var xPaths = {
    success: '//r2:bSuccess/text()',
    message: '//r2:ResponseMessage/text()',
    faultString: '//r2:faultstring/text()',
    faultDetails: '//r2:detailInfo/text()',
    faultBody: '//soap:Body/soap:Fault/faultstring/text()'
};

var _bookingNs = xpath.useNamespaces({
    "r2": "http://tempuri.org",
    soap: "http://schemas.xmlsoap.org/soap/envelope/",
    xsi: "http://www.w3.org/2001/XMLSchema-instance",
    xsd: "http://www.w3.org/2001/XMLSchema",
    wsa: "http://schemas.xmlsoap.org/ws/2004/08/addressing",
    wse: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd",
    wsu: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"

});

/* PRIVATE FUNCTIONS */
function getNodeValue(doc, ns, xpath) {
    var value;
    try {
        var keySelect = ns(xpath, doc);
        if (keySelect && keySelect.length > 0) {
            if (keySelect[0].data !== undefined) {
                value = keySelect[0].data;
            } else if (keySelect[0].nodeValue !== undefined) {
                value = keySelect[0].nodeValue;
            }
        }
    } catch (error) {
        logger.writeError(error);
    }
    return value;
}

function orderByDate(a, b) {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
}

function initializeResult() {
    var result = {};
    result = {
        statusCode: 400,
        response: {
            status: false,
            message: "Not Implemented"
        }
    };
    return result;
}

function setFail(doc, ns, result) {
    result.response.message = "Invalid Message";
    var faultMsg;
    if (ns(xPaths.faultDetails, doc).length > 0) {
        faultMsg = ns(xPaths.faultDetails, doc)[0].nodeValue;
    } else {
        faultMsg = ns(xpaths.faultString, doc).length > 0 ? ns(xpaths.faultString, doc)[0].nodeValue : undefined;
    }
    if (faultMsg !== undefined)
        result.response.message = faultMsg;
    return result;
}

function setSuccess(doc, ns, result, message) {
    // SUCCESS!!!!
    result.statusCode = 200;
    result.response.status = true;
    result.response.message = message;
    return result;
}

module.exports = {
    parseCreateNewBookingRS: function(messageXml) {
        var result = initializeResult();
        var ns = xpath.useNamespaces({
            "r2": "http://tempuri.org",
            soap: "http://schemas.xmlsoap.org/soap/envelope/",
        });
        //TODO:comment below 4 line code when actual response comes
        /*
        var fs = require("fs");
        var templatePath = "./documentation/messages/createNewBookingRS.xml";
        var template = fs.readFileSync(templatePath, "utf8");
        var doc = new domParser().parseFromString(template);
        */
        var doc = new domParser().parseFromString(messageXml);
        var bSuccess = getNodeValue(doc, ns, xPaths.success);
        if (bSuccess === undefined || bSuccess === false) {
            setFail(doc, ns, result);
        } else {
            setSuccess(doc, ns, result, getNodeValue(doc, ns, xPaths.message));
        }
        return result;
    },
    parseAddGuestAccessRS: function(messageXml) {
        var result = initializeResult();
        var ns = xpath.useNamespaces({
            "r2": "http://tempuri.org",
            soap: "http://schemas.xmlsoap.org/soap/envelope/",
        });
        //TODO:comment below 4 line code when actual response comes
        /*
        var fs = require("fs");
        var templatePath = "./documentation/messages/createNewBookingRS.xml";
        var template = fs.readFileSync(templatePath, "utf8");
        var doc = new domParser().parseFromString(template);
        */
        var doc = new domParser().parseFromString(messageXml);
        var bSuccess = getNodeValue(doc, ns, xPaths.success);
        if (bSuccess === undefined || bSuccess === false) {
            setFail(doc, ns, result);
        } else {
            setSuccess(doc, ns, result, getNodeValue(doc, ns, xPaths.message));
        }
        return result;
    },
};