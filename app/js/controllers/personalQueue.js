/**
 * Created by i.sungurov on 03.10.13.
 */

operatorShell.controller('PersonalQueueCtrl', function ($scope, $log,  $location, ticket, notifier) {

    'use strict';

    ticket.trackPersonalQueue(function (data) {
        $scope.data = data;
    });

    $scope.$on('$routeChangeStart', function () {
        ticket.notTrackPersonalQueue();
    });

    $scope.getLocalDate = function (item) {

/*        var date = new Date(item.StartTime),
            hours = date.getHours(),
            minutes = date.getMinutes();

        if (hours < 10) {
            hours = "0" + hours;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return (hours + ":" + minutes);*/
        //TODO: пока так.
        return item.StartTime.substr(item.StartTime.indexOf("T") + 1, 5);
    };

    $scope.select = function (item) {
        ticket.inviteHolded(item.Id).then(function (data) {
            $location.path("/processing");
        }, function (error) {
            notifier.errors.currentMessage = error.desc;
        });
    };

    $scope.cancel = function () {
        $location.path("/main");
    };

});