(function() {
    "use strict";
    var controllerId = "login";
    angular.module("app").controller(controllerId, ["common", "datacontext", login]);

        function login(common, datacontext) {
            var getLogFn = common.logger.getLogFn;
            var log = getLogFn(controllerId);
            var vm = this;
            vm.isLoggedIn = common.authServ.isLoggedIn();
            vm.message = common.authServ.message();
            vm.userData = {
                userName: "",
                email:"",
                password: ""
            };
            vm.attemptLogin = function() {
                //TODO: Call the authorization service to attempt user login
                var loginPromise = common.authServ.login(vm.userData);
                loginPromise.then(function() {
                    vm.isLoggedIn = common.authServ.isLoggedIn();
                    vm.message = common.authServ.message();
                    log("Login Success");
                }, function() {
                    vm.isLoggedIn = common.authServ.isLoggedIn();
                    vm.message = common.authServ.message();
                    log("Login Failure");
                });
            }
            
        }

    }
)();