(function () {
    'use strict';

    angular
        .module('app.dietitian')
        .controller('DietitianListController', DietitianListController);

    DietitianListController.$inject = ['$state' , 'logger' , 'dietitianFactory' , '$ionicHistory' , '$timeout' , '$ionicPopup', '$scope' ,'$localStorage'];
    /* @ngInject */
    function DietitianListController($state, logger, dietitianFactory , $ionicHistory ,$timeout , $ionicPopup , $scope , $localStorage) {
        var vm = this;

        activate();

        function activate() {
            dietitianFactory.getList($localStorage.__identity.user._id).then(function (response) {
                if (response.status == 200) {
                    vm.dietitianList = response.data.data;

                    for(var index=0 ; index<vm.dietitianList.length; index++){
                        if(vm.dietitianList[index].profilePic != undefined){
                            vm.dietitianList[index].profilePic = __env.dataServerUrl + '/dietitian/' + vm.dietitianList[index].profilePic;
                        }
                    }

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

        vm.hireDietitian = function (dietitianId) {
           console.log(dietitianId)
            // Custom popup
            var myPopup = $ionicPopup.show({
                template: 'Are you sure you want to hire this dietitian?',
                title: 'Alert',
                // subTitle: 'Subtitle',
                scope: $scope,

                buttons: [
                    { text: 'No',
                        type: 'button-assertive',
                    }, {
                        text: 'Yes',
                        type: 'button-balanced',
                        onTap: function(e) {
                            var dietitanToAdd = {};
                            dietitanToAdd.dietitianId = dietitianId;
                            dietitanToAdd.active = false;
                            dietitanToAdd.couponApplied = false;
                            dietitianFactory.addDietitanDetailToConsumer($localStorage.__identity.user._id , dietitanToAdd).then(function (response) {
                                console.log(response);
                                gotoNextPage(dietitianId);

                            })
                        }
                    }
                ]
            });

            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };

        function gotoNextPage(id) {
            $state.go('app.payment', {id:id});
        }
        // $ionicHistory.nextViewOptions({
        //     disableBack: true
        // });

    }
})();