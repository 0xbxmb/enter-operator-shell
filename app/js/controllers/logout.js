/**
 * Created by i.sungurov on 03.10.13.
 */

operatorShell.controller('LogoutCtrl', function ($scope, $rootScope, $location, authentication, notifier) {

    'use strict';

    $scope.logout = function () {
        authentication.logout().then(function () {
            $location.path("/login");
        }, function (error) {
            notifier.errors.currentMessage = error.desc;
        });
    };

    $scope.cancel = function () {
        $location.path("/main");
    };
});
