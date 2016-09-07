(function () {
    "use strict";
    var controllerId = "externalRegister";
    angular.module("app").controller(controllerId, ["common", "datacontext", externalRegister]);

    function externalRegister(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        //vm.userData = {
        //    username: '',
        //    firstName: '',
        //    lastName: '',
        //    email: '',
        //    password: '',
        //    confirmPassword: ''
        //};
        vm.title = "Exteral Registration Rerouting";

        activate();

        function activate() {
            var promises = [];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated External Register View'); });
        }

        //vm.registerUser = function () {
        //    common.authServ.register(vm.userData);
        //}

    }
})();