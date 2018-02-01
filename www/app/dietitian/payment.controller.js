(function () {
    'use strict';

    angular
        .module('app.dietitian')
        .controller('PaymentController', PaymentController);

    PaymentController.$inject = ['$state' , 'logger' , 'dietitianFactory' , '$stateParams' , '$timeout' , '$ionicHistory', '$scope' ,'$localStorage'];
    /* @ngInject */
    function PaymentController($state, logger, dietitianFactory , $stateParams ,$timeout , $ionicHistory , $scope , $localStorage) {
        var vm = this;

        vm.showDiscount = false;

        activate();

        function activate() {
            dietitianFactory.getDietitian($stateParams.id).then(function (response) {
                if (response.status == 200) {
                    vm.dietitian = response.data.data;
                }
                else if (response.status == -1) {
                    vm.errorMessage = 'Network Error';
                    logger.error('Network Error', 'error');
                    console.error(response);
                }
                else if (response.status == 400) {
                    vm.errorMessage = response.data.error.join();
                    logger.error(response.data.message, 'error');
                    console.error(response);
                }
                else if (response.status == 401) {
                    vm.errorMessage = response.data.message;
                    logger.error('Login Again !! You have been logged out');
                    console.error(response);
                    $timeout(function () {
                        $state.go('auth.signout')
                    }, 2000);
                }
                else {
                    vm.errorMessage = 'Some problem';
                    logger.error('Some problem', 'error');
                    console.error(response);
                }
            })
        }

        vm.matchCoupon = function () {
            if(vm.coupon == vm.dietitian.couponCode){
                vm.showDiscount = true;
                logger.info('Coupon applied successfully');
            }
            else {
                vm.showDiscount = false;
                logger.error('Wrong coupon code');
            }
        }

        vm.confirm = function () {
            var temp = {};
            temp.couponApplied = vm.showDiscount;
            temp.dietitianId = vm.dietitian._id;
            dietitianFactory.addPaymentConfirmation($localStorage.__identity.user._id ,temp).then(function(response){
                console.log(response);
                $state.go('app.profile')
            })
        }

        $ionicHistory.nextViewOptions({
            disableBack: true
        });

    }
})();