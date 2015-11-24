var mongoose = require('mongoose')
var Topic = mongoose.model('Topic')

module.exports = (function(){
	return {
		new: function(req, res){
			console.log(req.body)
			console.log("inside topics backend controller new method");
			var topic = new Topic ({
				topic_name: req.body.topic.name,
				description: req.body.topic.description,
				difficulty: req.body.topic.difficulty,
				category: req.body.topic.category,
				_user: req.body.topic.user_id,
				// user_name: req.body.topic.user_name
			})
			topic.save(function(err, result){
				if(err){
					console.log("did not save topic", {errors: err});
					res.json(err);
				}
				else{
					console.log("new topic saved");
					res.json(result);
				}
			})
		},
		all: function(req, res){
			Topic.find({}, function(err, results){
				res.json(results);
			})
		}
	}
})();