angular.module('fbm.router', ['ngRoute']).config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/blog', {
        templateUrl: 'blog/blog.html',
        controller: BlogController,
        resolve: {
            // I will cause a 1 second delay
            delay: function($q, $timeout) {
                var delay = $q.defer();
                $timeout(delay.resolve, 1000);
                return delay.promise;
            }
        }
    });
    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
});