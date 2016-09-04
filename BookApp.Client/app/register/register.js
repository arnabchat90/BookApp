(function () {
    "use strict";
    var controllerId = "register";
    angular.module("app").controller(controllerId, ["common", "datacontext", register]);

    function register(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.userData = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
        vm.title = "Register";

        activate();

        function activate() {
            var promises = [];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Register View'); });
        }

        vm.registerUser = function() {
            common.authServ.register(vm.userData);
        }

    }
})();