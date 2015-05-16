angular.module('main',['angular-meteor', 'ui.router', 'angularUtils.directives.dirPagination','ngSanitize'])
.directive("mathjaxBind", function() {
	return {
	    restrict: "A",
	    controller: ["$scope", "$element", "$attrs",
	            function($scope, $element, $attrs) {
	        $scope.$watch($attrs.mathjaxBind, function(texExpression) {
	            var texScript = angular.element("<script type='math/tex'>")
	                .html(texExpression ? texExpression :  "");
	            $element.html("");
	            $element.append(texScript);
	            MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);
	        });
	    }]
	};
})
.factory('myService', function() {
        return {
            splitMath: function(content) {
                splitMarkdown = content.split('[mathjax]');
              var md = {}
              for (i = 0; i < splitMarkdown.length; i++) { 
                md[i] = [];
                md[i].content = splitMarkdown[i];
                if( md[i].content.charAt(0) == '\\')
                    md[i].type = "Math";
                else
                    md[i].type = "NonMath"
               }
               console.log(md);
               return md;
            }
        };
    });
;

function onReady() {
	angular.bootstrap(document, ['main']);
}