/**
 * Created by i.sungurov on 02.10.13.
 */

operatorShell.controller('MainCtrl', function ($rootScope, $scope, $log, $location, ticket, notifier) {

    'use strict';

    if ($rootScope.ticketProduct) {
        $location.path("/processing");
    }

    ticket.trackActiveTicketProductCount(function (data) {
        $scope.activeTicketProductCount = data;
    }, function (error) {
        notifier.errors.currentMessage = error.desc;
    });

    ticket.trackPersonalQueue(function (data) {
        $scope.personalQueueCount = data.Items.length;
    }, function (error) {
        notifier.errors.currentMessage = error.desc;
    });

    $scope.$on('$routeChangeStart', function () {
        ticket.notTrackActiveTicketProductCount();
        ticket.notTrackPersonalQueue();
    }, function (error) {
        notifier.errors.currentMessage = error.desc;
    });

    $scope.inviteNew = function () {
        ticket.inviteNew().then(function (data) {
            $location.path("/processing");
        }, function (error) {
            notifier.errors.currentMessage = error.desc;
        });
    };

    $scope.getTicketFromPersonalQueue = function () {
        $location.path("/personalQueue");
    };
});