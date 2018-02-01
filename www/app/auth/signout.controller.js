(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('SignoutController', SignoutController);

    SignoutController.$inject = ['$state', 'principal', '$ionicHistory' , '$localStorage' , '$window'];
    /* @ngInject */
    function SignoutController($state, principal, $ionicHistory , $localStorage , $window) {
        var vm = this;

        activate();

        function activate() {
            if(principal.signout()){
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache();
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });

                $state.go('auth.login');
            };

        }

    }
})();

