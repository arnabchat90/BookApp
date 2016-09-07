(function () {
    "use strict";
    angular.module("common").factory("authServ", ["userAccount", "$location", "$q", "persistanceService", "$window","$resource", authServ]);

    function authServ(userAccount, $location, $q, persistanceService, $window,$resource) {
        //var varLoggedIn = false;
        var vm = this;
        vm.varLoggedIn = false;
        //  persistanceService.setCookieData("isLoggedIn", false);
        vm.message = "";
        vm.token = "";
        //vm.userData = {
        //    userName: "",
        //    email: "",
        //    password: "",
        //    confirmPassword: ""
        //};
        var service = {
            login: login,
            register: register,
            isLoggedIn: isLoggedIn,
            message: message,
            token: token,
            loginExternal: loginExternal
        }

        return service;

        function login(userData) {
            //TODO: Call web service to authenticate user and then set varLogged in
            return $q(function (resolve, reject) {
                userData.grant_type = "password";
                userAccount.login.loginUser(userData,
                    function (data) {
                        vm.varLoggedIn = true;
                        persistanceService.setCookieData("isLoggedIn", true);
                        persistanceService.clearCookieData("message");
                        vm.message = "";
                        vm.token = data.access_token;
                        persistanceService.setCookieData("token", vm.token);
                        resolve();
                    },
                    function (response) {
                        vm.varLoggedIn = false;
                        persistanceService.setCookieData("isLoggedIn", false);
                        vm.message = response.statusText + "\r\n";
                        if (response.data.exceptionMessage)
                            vm.message += response.data.exceptionMessage;
                        if (response.data.error)
                            vm.message += response.data.error_description;

                        persistanceService.setCookieData("message", vm.message);

                        reject();
                    });
            });

        }

        function register(userData) {
            //TODO : Call userAccount service to register user via the web api
            userAccount.registration.registerUser(userData, function (data) {
                var loginPromise = login(data);
                loginPromise.then(function () {
                    $window.location.reload();
                    $location.path("/");
                }, function () {
                });
            },
                function (response) {
                    vm.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        vm.message += response.data.exceptionMessage;
                    if (response.data.error)
                        vm.message += response.data.error_description;

                    persistanceService.setCookieData("message", vm.message);
                });

        }

        function loginExternal(externalProviderUrl) {
            return {
                loginExternal: $resource(externalProviderUrl, null,
                {
                    "loginExternalUser": { method: "GET" }
                })
            }
        }

        //function setVarLoggedIn(loggingResult) {
        //    vm.varLoggedIn = loggingResult;
        //}

        function isLoggedIn() {
            var varLogin = (persistanceService.getCookieData("isLoggedIn") === "true");
            return varLogin;
        }

        function message() {
            return persistanceService.getCookieData("message");
        }

        function token() {
            return persistanceService.getCookieData("token");
        }
    }
})();