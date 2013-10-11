/**
 * Created by i.sungurov on 02.10.13.
 */

operatorShell.controller('ProcessingCtrl', function ($scope, $log,  $location, $timeout, ticket, notifier) {

    'use strict';

    var MAX_TEXT_LENGTH = 95;

    $scope.isProcessing = false;
    $scope.maxLength = MAX_TEXT_LENGTH;

    $scope.$parent.$watch("ticketProduct", function (data) {
        if (data) {
            $scope.isProcessing = (data.State === 5);
        }
    });

    $scope.startProcessing = function () {
        ticket.startOperation().then(function (data) {
            $scope.isProcessing = true;
        }, function (error) {
            notifier.errors.currentMessage = error.desc;
        });
    };

    $scope.isTextLong = function (text) {
        if (!text) {
            return false;
        }
        return (text.length > MAX_TEXT_LENGTH);
    };

    $scope.cutLongText = function (text) {
        if ($scope.isTextLong(text)) {
            return text.substr(0, MAX_TEXT_LENGTH) + "...";
        }
        return text;
    };

    $scope.showDetails = function (ticketProduct) {
        notifier.details.currentMessage = ticketProduct.Name;
    };


    $scope.inviteAgain = function ($event) {

        var ENABLING_DELAY = 3000;
        $($event.currentTarget).attr("disabled", true);

        ticket.inviteAgain();

        $timeout(function () {
            $($event.currentTarget).removeAttr("disabled");
        }, ENABLING_DELAY);
    };

    $scope.cancelOperation = function () {
        ticket.cancelOperation().then(function (data) {
            $location.path("/main");
        }, function (error) {
            notifier.errors.currentMessage = error.desc;
        });
    };

    $scope.completeOperation = function () {
        ticket.completeOperation().then(function (data) {
            $location.path("/main");
        }, function (error) {
            notifier.errors.currentMessage = error.desc;
        });
    };


    $scope.redirectTicket = function () {
        $location.path("/redirect");
    };

    $scope.holdCurrent = function () {
        ticket.holdCurrent().then(function (data) {
            $location.path("/main");
        });
    };

});