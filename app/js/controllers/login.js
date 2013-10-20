/**
 * Created by i.sungurov on 02.10.13.
 */

operatorShell.controller('LoginCtrl', function ($scope, $rootScope, $location, authentication) {
    'use strict';

    $scope.inRequest = false;

    var login = function (name, paswd) {

        authentication.login(name, paswd).then(
            function (result) {
                $scope.inRequest = false;
            },
            function (error) {
                $scope.inRequest = false;
                $scope.errorMessage = error.desc;
            }
        );
    };

    $scope.loginButtonClick = function () {

        if (!$scope.login || !$scope.password || $scope.inRequest) {
            return;
        }

        $scope.inRequest = true;
        $scope.errorMessage = null;
        login($scope.login, $scope.password);
    };
});
