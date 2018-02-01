(function () {
    'use strict';

    angular
        .module('app.myDietitian')
        .factory('myDeititianFactory',myDeititianFactory);

    myDeititianFactory.$inject = ['$http' , '__env'];

    function myDeititianFactory($http , __env) {
        var service = {};

        service.getDietitianOfUser = function(id){
            var promise = $http.get(__env.dataServerUrl + '/user/hiredDietitian/'+ id)
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        return service;
    };
}());
