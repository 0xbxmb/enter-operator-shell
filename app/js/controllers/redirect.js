/**
 * Created by i.sungurov on 03.10.13.
 */

operatorShell.controller('RedirectCtrl', function ($rootScope, $scope, $log, $location, menu, ticket, notifier) {

    'use strict';

    $scope.selectedService = null;


    $scope.apply = function (item) {
        ticket
            .redirectOperation({ProductId: item.ProductId,
                                WorkPlaceId: null,
                                UserId: null,
                                Priority: null })

            .then(function () {
                $location.path("/main");
            }, function (error) {
                notifier.errors.currentMessage = error.desc;
            });
    };

    $scope.cancel = function () {
        $location.path("/processing");
    };
});
