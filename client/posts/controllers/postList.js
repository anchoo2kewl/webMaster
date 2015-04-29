angular.module("main").controller("PostsListCtrl", ['$scope', '$meteor', '$location',
    function($scope, $meteor, $location){

		$scope.page = 1;
		$scope.perPage = 3;
		$scope.sort = { title: 1 };
	    $scope.orderProperty = '1';
	    var converter = new Showdown.converter();

	    hljs.initHighlightingOnLoad();
	    
	    // $scope.h1tml = converter.makeHtml('#hello markdown!');

		$scope.posts = $meteor.collection(function() {
			var posts = Posts.find({}, {
		        sort : $scope.getReactively('sort'),
		        transform: function(post){
			      post.markdown = converter.makeHtml(post.content);;
			      return post;
			    }
			});
			return posts;
		});

		// $scope.posts.content = converter.makeHtml($scope.posts.content);

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

		$scope.edit = function(post){
			$scope.location = "/edit/"+post._id;
			// console.log($scope.location);
			$location.path( $scope.location );
		};

		$scope.new = function(){
			$scope.location = "/new";
			console.log($scope.location);
			$location.path( $scope.location );
		};

		$scope.removeAll = function(){
			$scope.posts.remove();
		};

	    $scope.pageChanged = function(newPage) {
      		$scope.page = newPage;
    	};

    	$scope.$watch('orderProperty', function(){
      		if ($scope.orderProperty)
        	$scope.sort = {title: parseInt($scope.orderProperty)};
		});
	}]
);