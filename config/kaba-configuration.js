/*jslint node: true */
'use strict';
var host = "http://";
var hostIP = "54.175.245.55";
var versionPath = "/LensPMSWebService";
var servicePath = "/MessengerPMSService.asmx";
var server = {
    baseURL: host + hostIP + versionPath + servicePath,
    baseActionURL: "http://tempuri.org",
    logAt: "DEBUG",
    timeOut: 20,
    encoding: "utf8"
};

var header = {};

header.address = {};
header.address.action = "";
header.address.from = "urn:KABA";
header.address.messageId = "eccfdb89-84bd-4bf6-b905-0faea3c234bc";
header.address.to = server.baseURL;

header.timeStamp = {};
header.timeStamp.created = "2016-10-10T00:00:00";
header.timeStamp.expires = "2016-10-10T00:00:00";
header.timeStamp.Id = "a893ce8d-7873-4648-ac07-7bed61b313eb";

header.oas = {};
header.oas.Id = "f1fa612d-3640-4c2b-822c-b33960afc118";
header.oas.userName = "DummyUser";
header.oas.password = "DummyPwd";
header.oas.created = "2016-10-10T00:00:00";

var soapBody = {};
soapBody.prefix = "999Tcustom#";
soapBody.walletId = "35364793";

var status = {
    Ok: 200, //- The request was successful. 
    Created: 201, //- The request has been fulfilled and resulted in a new resource being created. 
    BadRequest: 400, //  - The request cannot be fulfilled due to bad syntax. 
    Unauthorized: 401, //  - The client has either not logged in, has logged in with bad credentials,or the session has expired.
    Forbidden: 403, //  - The client has logged in correctly but has not permission to carry out this type of request.
    NotFound: 404, // - The requested resource could not be found.405 MethodNotAllowed - The request was made using a method not supported by that resource.
    UnsupportedMediaType: 415, // - The request did not have content type of application / json.
    Error: 500, //Internal server error.
};

/* PUBLIC */
module.exports = {
    "soapBody": soapBody,
    "header": header,
    "server": server,
    "status": status
};