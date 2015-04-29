angular.module('main',['angular-meteor', 'ui.router', 'angularUtils.directives.dirPagination','ngSanitize']);

function onReady() {
	angular.bootstrap(document, ['main']);

}