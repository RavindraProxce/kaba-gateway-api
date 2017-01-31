var should = require('should');
var assert = require('assert');
var request = require('supertest');
var server = require('../../../app');

/* Node command to execute to generate fresh test case html Report
mocha -R good-mocha-html-reporter -p reports/unitTestCaseReport.html -m Compact test/api/controllers/reservation.js
Note : after generating report please remove/replace body style from unitTestCaseReport.html file to reduce size then can check-in
body { background: lightgrey; min-width: 1000px;}
*/

//REF : TEST VALUES
var test = {
    timeOut: "10000",
};


describe('controllers', function() {


});