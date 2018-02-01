(function () {
    'use strict';

    angular
        .module('app.myDietitian')
        .controller('MyDeititianController', MyDeititianController);

    MyDeititianController.$inject = ['$state' , 'logger' , 'myDeititianFactory' , '$ionicHistory','$localStorage' ];
    /* @ngInject */
    function MyDeititianController($state, logger, myDeititianFactory , $ionicHistory, $localStorage ) {
        var vm = this;

        activate();

        function activate() {
            myDeititianFactory.getDietitianOfUser($localStorage.__identity.user._id).then(function (response) {
                console.log(response)
                vm.hiredDietitians = response.data.data;
                vm.dietitianList = response.data.data.hiredDietitians;

            })
        }
    }
})();