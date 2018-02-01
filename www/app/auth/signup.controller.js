(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', '$state' ,'principal' , 'logger' , '$localStorage', '$ionicHistory' , 'validationHelperFactory', 'USER_ROLE'];
    /* @ngInject */
    function SignupController($scope, $state, principal, logger , $localStorage , $ionicHistory , validationHelperFactory , USER_ROLE) {
        var vm = this;

        vm.dietitian = false;

        vm.signup = function () {
            if (vm.Form.$invalid) {
                validationHelperFactory.manageValidationFailed(vm.Form);
                return;
            }
            else {
                vm.user.password = vm.newPassword;
                vm.user.role = USER_ROLE.ROLE_CONSUMER;
                console.log(vm.user)
                principal.signup(vm.user , false).then(function (response) {
                    // vm.progress = false;
                    console.log(response)
                    $state.go('app.basicInfo');
                    logger.info('Profile created', 'default');

                });

            }
        };
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
    }
})();