(function () {
    "use strict";
    var controllerId = "topnav";
    angular.module("app").controller("topnav", ["common", "datacontext", topnav]);

    function topnav(common, datacontext) {
        var vm = this;
        vm.isLoggedIn = common.authServ.isLoggedIn();
        vm.token = common.authServ.token();
        vm.firstName = "";
        vm.lastName = "";
        vm.logOut = function() {
            //TODO: Call the web api to log the current user out, need to use the token to do that
        }
    }
})();