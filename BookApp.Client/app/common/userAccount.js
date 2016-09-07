(function() {
    "use strict";
    angular.module("common").factory("userAccount", ["$resource", userAccount]);

    function userAccount($resource) {
        return{ 
            registration : $resource("http://localhost:9600/" + "api/Account/Register", null,
        {
            "registerUser": {method : "POST"}
        }),
            login: $resource("http://localhost:9600/" + "/Token", null,
        {
            "loginUser": {
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest : function(data, headersGetter) {
                    var str = [];
                    for (var d in data) 
                        str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));

                    return str.join("&");

                }
            }
        })
            

        }
    }
})();