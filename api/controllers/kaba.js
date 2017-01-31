/*jslint node: true */
'use strict';
var fs = require("fs"),
    mustache = require('mustache'),
    request = require('request'),
    config = require('../../config/' + process.env.KABA_CONFIGURATION),
    moment = require('moment'),
    logger = require('../../helpers/logger'),
    kabaParser = require('../../helpers/kaba-parser');

/* PRIVATE REF*/
var _actionParas = {
    /* PMS Service */
    createNewBookingAction: "/CreateNewBooking",
    addGuestAccessAction: "/AddGuestAccess"
};
var _parserMethods = {
    CREATE_NEW_BOOKING: "CREATE_NEW_BOOKING",
    ADD_GUEST_ACCESS: "ADD_GUEST_ACCESS",
};
/* PRIVATE */
function initializeResponse() {
    var res = {};
    res = {
        status: false,
        message: "Not Implemented"
    };
    return res;
}

function returnError(error, res, response) {
    logger.writeError(error);
    response.message = error;
    return res.status(config.status.Error).end(response);
}

function throwError(e) {
    logger.writeError(e);
    throw (e);
}

function createPromise(req, url, soapAction) {
    return new Promise(
        function(resolve, reject) {
            request.post({
                headers: {
                    'content-type': 'text/xml',
                    'SOAPAction': soapAction
                },
                url: url,
                body: req
            }, function(error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    logger.write(body);
                    resolve(body);
                }
            });

        });
}

function makeRequest(templatePath, query, res, soapAction, parserMethod) {
    var soapActionUrl = config.server.baseActionURL + soapAction;
    var template = fs.readFileSync(templatePath, config.server.encoding);
    var mock = mustache.render(template, query);
    logger.writeDebug(mock);
    createPromise(mock, config.server.baseURL, soapActionUrl)
        .then(body => {
            var result;
            switch (parserMethod) {
                case _parserMethods.CREATE_NEW_BOOKING:
                    //CREATE_NEW_BOOKING
                    result = kabaParser.parseCreateNewBookingRS(body);
                    break;
                case _parserMethods.ADD_GUEST_ACCESS:
                    //ADD_GUEST_ACCESS
                    result = kabaParser.parseAddGuestAccessRS(body);
                    break;
                default:
                    break;
            }
            return res.status(result.statusCode).send(result.response).end();
        })
        .catch(function(e) {
            throwError(e);
        }, error => {
            throwError(error);
        });
}
/* PUBLIC */
module.exports = {

    createNewBooking: function(req, res, next) {
        var response = initializeResponse();
        try {
            var query = {};
            query.header = config.header;
            query.header.address.action = config.server.baseURL + _actionParas.createNewBookingAction;

            var booking = req.swagger.params.createNewBookingRequest.value;
            if (booking !== undefined) {
                if (booking.hasOwnProperty('reservationId') && booking.reservationId !== undefined)
                    query.reservationId = booking.reservationId;
                if (booking.hasOwnProperty('siteName') && booking.siteName !== undefined)
                    query.siteName = booking.siteName;
                if (booking.hasOwnProperty('pmsTerminalId') && booking.pmsTerminalId !== undefined)
                    query.pmsTerminalId = booking.pmsTerminalId;
                if (booking.hasOwnProperty('encoderId') && booking.encoderId !== undefined)
                    query.encoderId = config.soapBody.prefix + config.soapBody.walletId + "-" + booking.encoderId;
                if (booking.hasOwnProperty('checkIn') && booking.checkIn !== undefined)
                    query.checkIn = booking.checkIn;
                if (booking.hasOwnProperty('checkOut') && booking.checkOut !== undefined)
                    query.checkOut = booking.checkOut;
                if (booking.hasOwnProperty('guestName') && booking.guestName !== undefined)
                    query.guestName = booking.guestName;
                if (booking.hasOwnProperty('mainRoomNo') && booking.mainRoomNo !== undefined)
                    query.mainRoomNo = booking.mainRoomNo;
                if (booking.hasOwnProperty('bGrantAccessPredefinedSuiteDoors') && booking.bGrantAccessPredefinedSuiteDoors !== undefined)
                    query.bGrantAccessPredefinedSuiteDoors = booking.bGrantAccessPredefinedSuiteDoors;
                else
                    query.bGrantAccessPredefinedSuiteDoors = false;
                if (booking.hasOwnProperty('variableRoomList') && booking.variableRoomList !== undefined)
                    query.variableRoomList = booking.variableRoomList;
                if (booking.hasOwnProperty('trackIIFolioNo') && booking.trackIIFolioNo !== undefined)
                    query.trackIIFolioNo = booking.trackIIFolioNo;
                if (booking.hasOwnProperty('trackIGuestNo') && booking.trackIGuestNo !== undefined)
                    query.trackIGuestNo = booking.trackIGuestNo;
                if (booking.hasOwnProperty('keyCount') && booking.keyCount !== undefined)
                    query.keyCount = booking.keyCount;
                if (booking.hasOwnProperty('keySize') && booking.keySize !== undefined)
                    query.keySize = booking.keySize;
                if (booking.hasOwnProperty('UID') && booking.UID !== undefined)
                    query.UID = booking.UID;
            }
            return makeRequest("./config/soap-templates/booking/CreateNewBookingRQ.xml",
                query,
                res,
                _actionParas.createNewBookingAction,
                _parserMethods.CREATE_NEW_BOOKING);

        } catch (error) {
            returnError(error, res, response);
        }
    },
    addGuestAccess: function(req, res, next) {
        var response = initializeResponse();
        try {
            var query = {};
            query.header = config.header;
            //always change action _actionParas
            query.header.address.action = config.server.baseURL + _actionParas.addGuestAccessAction;

            var guestAccess = req.swagger.params.addGuestAccessRequest.value;
            if (guestAccess !== undefined) {
                if (guestAccess.hasOwnProperty('reservationId') && guestAccess.reservationId !== undefined)
                    query.reservationId = guestAccess.reservationId;
                if (guestAccess.hasOwnProperty('siteName') && guestAccess.siteName !== undefined)
                    query.siteName = guestAccess.siteName;
                if (guestAccess.hasOwnProperty('pmsTerminalId') && guestAccess.pmsTerminalId !== undefined)
                    query.pmsTerminalId = guestAccess.pmsTerminalId;
                if (guestAccess.hasOwnProperty('roomList') && guestAccess.roomList !== undefined) {
                    //query.roomList = guestAccess.roomList;
                    var roomXml = "";
                    var rooms = guestAccess.roomList.split(',');
                    if (rooms !== undefined && rooms.length > 0) {
                        for (var index = 0; index < rooms.length; index++) {
                            var roomNumber = rooms[index];
                            roomXml = roomXml + "<tem:string>" + roomNumber + "</tem:string>" + "\n";
                        }
                    }
                    query.roomList = roomXml;
                }
            }
            return makeRequest("./config/soap-templates/guest/AddGuestAccessRQ.xml",
                query,
                res,
                _actionParas.addGuestAccessAction,
                _parserMethods.ADD_GUEST_ACCESS);

        } catch (error) {
            returnError(error, res, response);
        }
    },

};