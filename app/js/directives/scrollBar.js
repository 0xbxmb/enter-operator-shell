/**
 * Created by i.sungurov on 11.10.13.
 */

operatorShell.directive('scrollBar', function ($window) {

    "use strict";

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div class="scroll-pane" ng-transclude></div>',

        link: function (scope, element, attrs) {

            element.jScrollPane({
                autoReinitialise: true,
                autoReinitialiseDelay: 100
            });

            var api = element.data('jsp');

            scope.$watch(function () {
                return element.find('.' + attrs.scrollpane).length;
            }, function (length) {
                api.reinitialise();
            });

            angular.element($window).bind('resize', function () {
                debugger;
                scope.inputSize = element.find('input')[0].clientWidth;
                scope.$apply();
            });

        }
    };
});