(function () {
    'use strict';

    angular
        .module('app.dietitian')
        .factory('dietitianFactory',dietitianFactory);

    dietitianFactory.$inject = ['$http' , '__env'];

    function dietitianFactory($http , __env) {
        var service = {};

        service.getList = function(id){
            var promise = $http.get(__env.dataServerUrl + '/user/dietitian/list/'+id+'?status=true')
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        service.addDietitanDetailToConsumer = function(userId, dietitianDetail){

            var promise = $http.put(__env.dataServerUrl + '/user/addDietitian/'+userId , dietitianDetail)
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };
        service.addPaymentConfirmation = function(userId, dietitianDetail){

            var promise = $http.put(__env.dataServerUrl + '/user/dietitianPayment/'+userId , dietitianDetail)
                .then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        return response;
                    });
            return promise;
        };

        service.getDietitian = function (id) {
            var promise = $http.get(__env.dataServerUrl + '/dietitian/'+id)
                .then(
                    function (data) {
                        return data;
                    },
                    function (errors) {
                        return errors;
                    });
            return promise;
        };

        return service;
    };
}());
