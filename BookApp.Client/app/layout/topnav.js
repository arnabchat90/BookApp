(function () {
    "use strict";
    var controllerId = "topnav";
    angular.module("app").controller(controllerId, ["common", "datacontext","$window", topnav]);

    function topnav(common,datacontext,$window) {
        var vm = this;
        vm.isLoggedIn = common.authServ.isLoggedIn();
        vm.token = common.authServ.token();
        vm.firstName = "";
        vm.lastName = "";
        vm.message = "";
        vm.messageCount = null;
        vm.logOut = function() {
            //TODO: Call the web api to log the current user out, need to use the token to do that
        }
        getMessageCount();
        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }
        function getUserInfo() {
            datacontext.getCurrentUserInfo().getUserInfo.get(function (data) {
                vm.firstName = data.FirstName;
                vm.lastName = data.LastName;
            }, function(response) {
                vm.message = response.statusText + "\r\n";
                if (response.data.exceptionMessage)
                    vm.message += response.data.exceptionMessage;
                if (response.data.error)
                    vm.message += response.data.error_description;
                
            });
        }
        getUserInfo();

        vm.logOut = function() {
            common.persistanceService.setCookieData("isLoggedIn", false);
            common.persistanceService.setCookieData("message", "");
            common.persistanceService.setCookieData("token", "");
            $window.location.reload();
        }
    }
})();