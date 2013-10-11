/**
 * Created by i.sungurov on 02.10.13.
 */

operatorShell.controller('LoginCtrl', function ($scope, $rootScope, $location, authentication) {
    'use strict';

    $scope.inRequest = false;

    $scope.login = "2";
    $scope.password = "1";

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
        $scope.inRequest = true;
        $scope.errorMessage = null;
        login($scope.login, $scope.password);
    };
});
