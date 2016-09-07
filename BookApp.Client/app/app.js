(function () {
    'use strict';
    //Test Check in
    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute',          // routing
        'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)
        'ngResource',
        // Custom modules 
        'common',           // common functions, logger, spinner
        'common.bootstrap', // bootstrap dialog wrapper functions

        // 3rd Party Modules
        'ui.bootstrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
    ]);
    var serviceBase = 'http://localhost:9600/';
    //app.constant('ngAuthSettings', {
    //    apiServiceBaseUri: serviceBase,
    //    clientId: 'BookApp'
    //});

    // Handle routing errors and success events
    app.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);
})();