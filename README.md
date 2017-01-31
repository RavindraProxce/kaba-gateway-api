A restful API for interacting with KABA.

Using swagger to define the input/output of each endpoint.

See below tutorial on how this project has been configured:

https://scotch.io/tutorials/speed-up-your-restful-api-development-in-node-js-with-swagger

# To start the server
swagger project start

# To run the swagger editor
swagger project edit


# Test APIs

Run:
npm test

Output:
on console of node 

# To Generate HTML Report for Test Case please run below code
 
Run:
mocha -R good-mocha-html-reporter -p reports/unitTestCaseReport.html -m Compact test/api/controllers/reservation.js

Output:
Report will be generated with name unitTestCaseReport.html in report folder.
