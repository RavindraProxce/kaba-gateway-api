/*jslint node: true */
'use strict;';
var app = require('express')();
var SwaggerExpress = require('swagger-express-mw');
var dotenv = require('dotenv');

dotenv.load();

// Swagger for documentation
var config = {
    appRoot: __dirname // required config
};
SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) {
        throw err;
    }
    // install middleware
    swaggerExpress.register(app);
    var port = process.env.PORT || 10014;
    app.listen(port);
    console.log('App listening on port : ' + port);
});

//for swagger documentation ui
/*
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./api/swagger/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = app;
*/