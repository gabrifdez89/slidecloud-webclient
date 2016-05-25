var app = angular.module('app', [
		'app.modules.dashboard',
		'app.modules.login',
		'app.modules.presentationViewer',
		'ngRoute'
	]),
	remoteServer = 'http://slidecloudapi.herokuapp.com/';

app.config(['$routeProvider', '$sceDelegateProvider',
	function ($routeProvider, $sceDelegateProvider) {
		$routeProvider.
			when('/login', {
				templateUrl: 'app/modules/login/login.html'
			}).
			when('/dashboard', {
				templateUrl: 'app/modules/dashboard/dashboard.html'
			}).
			when('/presentation', {
				templateUrl: 'app/modules/presentationViewer/presentationViewer.html'
			}).
			otherwise({
				redirectTo: '/login'
			});

		$sceDelegateProvider.
			resourceUrlWhitelist([
    			// Allow same origin resource loads.
    			'self',
    			// Allow loading from our assets domain.  Notice the difference between * and **.
    			remoteServer + '**'
  		]);
}]);