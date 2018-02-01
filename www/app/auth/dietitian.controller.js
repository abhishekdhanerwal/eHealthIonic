(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('DietitianController', DietitianController);

    DietitianController.$inject = ['$state' ,'principal' , 'logger' , '$ionicHistory' , 'validationHelperFactory', 'USER_ROLE'];
    /* @ngInject */
    function DietitianController( $state, principal, logger , $ionicHistory , validationHelperFactory , USER_ROLE) {
        var vm = this;

        vm.dietitian = true;

        vm.signup = function () {
            if (vm.Form.$invalid) {
                validationHelperFactory.manageValidationFailed(vm.Form);
                return;
            }
            else {
                vm.user.password = vm.newPassword;
                vm.user.role = USER_ROLE.ROLE_DIETITIAN;
                console.log(vm.user)
                principal.signup(vm.user , true).then(function (response) {
                    vm.progress = false;
                    // console.log(response)
                    logger.info('Profile created', 'default');
                    $state.go('auth.redirectDietitian');

                });

            }
        };
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
    }
})();