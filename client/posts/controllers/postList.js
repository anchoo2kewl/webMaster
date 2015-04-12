angular.module("main").controller("PostsListCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

		$scope.page = 1;
		$scope.perPage = 3;
		$scope.sort = { name: 1 };
	    $scope.orderProperty = '1';

		$scope.posts = $meteor.collection(function() {
			return Posts.find({}, {
		        sort : $scope.getReactively('sort')
			});
		});

		$meteor.autorun($scope, function() {
			$meteor.subscribe('posts', {
				limit: parseInt($scope.getReactively('perPage')),
				skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
				sort: $scope.getReactively('sort')
				}, $scope.getReactively('search')).then(function() {
				$scope.postsCount = $meteor.object(Counts ,'numberOfPosts', false);
			});
		});

		$scope.remove = function(post){
			$scope.posts.remove(post);
		};

		$scope.removeAll = function(){
			$scope.posts.remove();
		};

	    $scope.pageChanged = function(newPage) {
      		$scope.page = newPage;
    	};

    	$scope.$watch('orderProperty', function(){
      		if ($scope.orderProperty)
        	$scope.sort = {name: parseInt($scope.orderProperty)};
		});
	}]
);