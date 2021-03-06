﻿(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());
    
    // Configure the routes and route resolvers
    app.config(['$routeProvider','$locationProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, $locationProvider, routes) {
        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode({
                enabled: true
                //requireBase: false
            });
        }
        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
        
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            },
            {
                url: '/register',
                config: {
                    title: 'register',
                    templateUrl: 'app/register/register.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-sign-in"></i> Sign Up'
                    }
                }
            //}
            },
            {
                url: '/externalregister',
                config: {
                    title: 'externalregister',
                    templateUrl: 'app/register/externalregister.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-sign-in"></i> External Registration'
                    }
                }
            }
        ];
    }
})();