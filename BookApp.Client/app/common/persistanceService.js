(function() {
    "use strict";
    angular.module("common").factory("persistanceService", ["$cookies", persistanceService]);

    function persistanceService($cookies) {
        var service = {
            getCookieData: getCookieData,
            setCookieData: setCookieData,
            clearCookieData: clearCookieData
        };

        return service;

        function getCookieData(key) {
            var value = $cookies.get(key);
            return value;
        }

        function setCookieData(key,value) {
            $cookies.put(key, value);
        }

        function clearCookieData(key) {
            $cookies.remove(key);
        }
    }
})();