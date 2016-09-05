(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', '$resource', datacontext]);

    function datacontext(common, $resource) {
        var $q = common.$q;

        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getCurrentUserInfo: getCurrentUserInfo
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            var people = [
                { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];
            return $q.when(people);
        }

        function getCurrentUserInfo() {
            
            //if (token == null) {
            //    return null;
            //}
            return {
                getUserInfo: $resource("http://localhost:9600/" + "api/Account/GetCurrentUserInfo", null,
                {
                    "get": {
                        headers: {'Authorization' : 'Bearer ' + common.authServ.token()}
                    }
                })
            }
        }
    }
})();