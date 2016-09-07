(function () {
    "use strict";
    var controllerId = "login";
    angular.module("app").controller(controllerId, ["common","$window","$scope", login]);

    function login(common,$window,$scope) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;
        vm.isLoggedIn = common.authServ.isLoggedIn();
        vm.message = common.authServ.message();
        vm.userData = {
            userName: "",
            email: "",
            password: ""
        };
        vm.attemptLogin = function () {
            //TODO: Call the authorization service to attempt user login
            var loginPromise = common.authServ.login(vm.userData);
            loginPromise.then(function () {
                vm.isLoggedIn = common.authServ.isLoggedIn();
                vm.message = common.authServ.message();
                log("Login Success");
                $window.location.reload();
            }, function () {
                vm.isLoggedIn = common.authServ.isLoggedIn();
                vm.message = common.authServ.message();
                log("Login Failure");
            });
        }
        vm.authExternalProvider = function (provider) {
            var redirectUri = location.protocol + '//' + location.host + '/externalregister';
            var externalProviderUrl = "http://localhost:9600/" + "api/Account/ExternalLogin/?provider=" + provider
                                                                        + "&response_type=token&client_id=" + "BookApp"
                                                                        + "&redirect_uri=" + redirectUri;

            //common.authServ.loginExternal(externalProviderUrl)
            //    .loginExternal.loginExternalUser("",h
            //        function(data) {
            //            log(data);
            //        },
            //        function(response) {
            //            log(response);
            //        });
            window.$windowScope = $scope;
            var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");

        }

    }

}
)();