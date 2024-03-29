var module = angular.module('app.modules.alerts.services', []);

module.factory('alertsService', [alertsService]);

function alertsService () {

	return {
		insertDangerAlert: insertDangerAlert,
		insertWarningAlert: insertWarningAlert,
		insertAlert: insertAlert
	};

	function insertDangerAlert  (msg) {
		this.insertAlert(msg, 'danger');
	};
	
	function insertWarningAlert (msg) {
		this.insertAlert(msg, 'warning');
	};

	function insertAlert(msg, type) {
		if($('#alertsArea').children().length >= 3) {
			$('#alertsArea').children().last().remove();
		}
		$('#alertsArea').prepend(
			'<div class="alert alert-' + type + ' fade in">' +
				'<button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true">×</button>' +
				msg +
			'</div>'
		);

		setTimeout(function () {
			$('#alertsArea').children().last().fadeOut(1000, function () {
				$(this).remove();
			});
		}, 5000);
	};
};