'use strict';

/* Directives */

var directives = angular.module('fbm.directives', []);

directives.directive('appVersion', [ 'version', function(version)
{
    return function(scope, elm, attrs)
    {
        elm.text(version);
    };
} ]);

directives.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

directives.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                    // or all selected files:
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
}]);