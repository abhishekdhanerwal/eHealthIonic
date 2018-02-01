(function() {
    'use strict';

    angular
        .module('app.dietitian')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.dietitian',
                config: {
                    url: '/dietitian',
                    templateUrl: 'app/dietitian/dietitian.html',
                    controller: 'DietitianListController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'app.payment',
                config: {
                    url: '/payment/:id',
                    templateUrl: 'app/dietitian/payment.html',
                    controller: 'PaymentController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
