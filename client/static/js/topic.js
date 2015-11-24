myApp.factory('TopicFactory', function($http){
	var factory = {};

	factory.getTopics = function(callback){
		$http.get('/topics').success(function(output){
			callback(output);
		})
	}

	factory.newTopic = function(topic, callback){
		$http.post('/topic/new', {topic: topic}).success(function(output){
			callback();
		})
	}
	factory.destroyTopic = function (info,callback){
		$http.post('/delete')
	}
	return factory;
})


myApp.controller('TopicController', function ($scope, TopicFactory, $location, $rootScope, $routeParams){
	//save logged_in_user name from homepage. Check user in views
	$scope.logged_in_user = $rootScope.user;
	console.log("topic controller", $rootScope.user)

	TopicFactory.getTopics(function (data){
		$scope.all_topics = data;
		console.log(data)
	})

	$scope.addTopic = function(topic){
		console.log(topic)
		$scope.topic = topic;
		$scope.topic.user_id = $rootScope.user._id
		$scope.topic.user_name = $rootScope.user.name
		console.log($scope.topic)
		TopicFactory.newTopic($scope.topic, function(){
			TopicFactory.getTopics(function(data){
				$scope.all_topics = data;
				console.log($scope.all_topics)
			})
		})
	}

	$scope.topicShow = function(topic_id){
		console.log("topic id from dashboard")
		$location.path('/topic/'+topic_id).search({topic_id: topic_id})
	}
})