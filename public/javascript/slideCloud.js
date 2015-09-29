angular.module('slideCloud', []).controller('FilesListController', function () {
	var filesList = this;

	filesList.files = [
		{
			name: 'foo.pdf',
			id: 1
		},
		{
			name: 'bar.pdf',
			id: 2
		},
		{
			name: 'foobar.pdf',
			id: 3
		}
	];
});