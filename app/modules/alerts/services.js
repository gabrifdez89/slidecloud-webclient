var module = angular.module('app.modules.alerts.services', []);

module.factory('alertsService', [function () {

	return {
		insertDangerAlert: function (msg) {
			this.insertAlert(msg, 'danger');
		},
		insertWarningAlert: function (msg) {
			this.insertAlert(msg, 'warning');
		},
		insertAlert: function (msg, type) {
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
		}
	};
	
}]);