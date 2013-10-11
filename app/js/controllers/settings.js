/**
 * Created by i.sungurov on 04.10.13.
 */

operatorShell.controller('SettingsCtrl', function ($scope, $log, $location, settings) {

    'use strict';

    $scope.isNotLogged = true;
    $scope.loginErrorMessage = null;

    $scope.login = "admin";
    $scope.password = "1";

    $scope.logon = function () {

        $scope.loginErrorMessage = null;

        if ($scope.login ===  settings.login &&
            $scope.password === settings.password) {

            $scope.isNotLogged = false;

            $scope.workPlaceId = settings.settings.clientId;
            $scope.serverAddress = settings.settings.wampServerUrl;

        } else {
            $scope.loginErrorMessage = "Неверный пароль или пользователя";
        }
    };


    $scope.apply = function () {
        settings.applyNewSettings({
            workPlaceId : $scope.workPlaceId,
            serverAddress: $scope.serverAddress
        });
        location.reload();
    };

    $scope.cancel = function () {
        $location.path("/main");
    };
});
