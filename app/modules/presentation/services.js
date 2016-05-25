var module = angular.module('app.modules.presentation.services', []);

module.factory('presentationService', ['$http', '$window', 'authService', '$rootScope', 'fileExtensionCheckerService', presentationService]);

function presentationService ($http, $window, authService, $rootScope, fileExtensionCheckerService) {

	var visualizedFile,
		fileUrl,
		me = this,
		pageNum = 1;

	return {
		startPresentation: startPresentation,
		savePresentationLink: savePresentationLink,
		getPresentationLink: getPresentationLink,
		deletePresentation: deletePresentation,
		visualizePresentation: visualizePresentation,
		getVisualizedFile: getVisualizedFile,
		getFileUrl: getFileUrl,
		setPageNum: setPageNum,
		getPageNum: getPageNum
	};

	function startPresentation (file) {
		return $http.post(remoteServer + file.url + '/startpresentation', {}, {
			headers: {
				'token': authService.getToken()
			}
		});
	};

	function savePresentationLink (link) {
		$window.localStorage['link'] = link;
	};

	function getPresentationLink () {
		return $window.localStorage['link'];
	};

	function deletePresentation (fileUrl) {
		return $http.delete(remoteServer + fileUrl + '/presentation', {
			headers: {
				'token': authService.getToken()
			}
		});
	};

	function visualizePresentation (file, fileUrl, presentationLink) {
		if(fileExtensionCheckerService.isPdfFile(file.name)) {
			savePresentationLink(presentationLink);
			visualizedFile = file;
			me.fileUrl = fileUrl;
			$rootScope.$broadcast('presentationStarted');
		} else {
			alertsService.insertWarningAlert('Sorry, only pdf files visualization is allowed by now.');
		}
	};

	function getVisualizedFile () {
		return visualizedFile;
	};

	function getFileUrl () {
		return me.fileUrl;
	};

	function setPageNum (pn) {
		pageNum = pn;
	};

	function getPageNum () {
		return pageNum;
	};
};