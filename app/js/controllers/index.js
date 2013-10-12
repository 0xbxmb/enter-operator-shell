/**
 * Created by i.sungurov on 02.10.13.
 */


operatorShell.controller('IndexCtrl', function ($rootScope, $scope, $location,  $log,
                                                wamp, authentication, ticket, menu, notifier) {

    'use strict';

    $rootScope.$on("wampDisconnected", function (rejectObject) {
        notifier.connection.isConnected = false;
        $rootScope.user = null;
        $rootScope.data = null;
        $rootScope.ticketProduct = null;
    });

    $rootScope.$on("wampConnected", function (session) {
        notifier.connection.isConnected = true;
    });

    $scope.$on('$routeChangeStart', function (event, next, current) {
        if (next.$$route.controller === "SettingsCtrl") {
            return;
        }
        if (!authentication.isLoggedIn()) {
            $location.path("/login");
        }
    });

    ticket.trackWorkPlaceClient(function (data) {

        $rootScope.data = data;

        if (data && data.User) {
            $rootScope.user = data.User;
        } else {
            if (data.User !== undefined) {
                $rootScope.user = data.User;
            }
        }

        if (data && data.TicketProduct) {
            $rootScope.ticketProduct = data.TicketProduct;
        } else {
            if (data.TicketProduct !== undefined) {
                $rootScope.ticketProduct = data.TicketProduct;
            }
        }

        if ($location.path() === "/settings") {
            return;
        }

        if (data.User) {
            authentication.setLogged();
            $location.path("/main");
        }

        if (data.User === null) {
            authentication.logout();
            $location.path("/login");
        }

        if (data.TicketProduct) {
            $location.path("/processing");
        }

        if (data.TicketProduct === null) {
            $location.path("/main");
        }

    }, function (error) {
        notifier.errors.currentMessage = error.desc;
    });

    menu.trackMenu(function (data) {
        $scope.menu = data;
    });

    $scope.logout = function () {
        $location.path("/logout");
    };
});