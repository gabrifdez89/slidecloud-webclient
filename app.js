var app = angular.module('app', [
		'app.modules.dashboard',
		'app.modules.login',
		'ngRoute'
	]),
	remoteServer = 'http://localhost:3000/';

app.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
			when('/login', {
				templateUrl: 'app/modules/login/login.html'
			}).
			when('/dashboard', {
				templateUrl: 'app/modules/dashboard/dashboard.html'
			}).
			otherwise({
				redirectTo: '/login'
			});
}]);