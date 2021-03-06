var mongoose = require('mongoose');
var User = mongoose.model('User')
var Topic = mongoose.model('Topic')


module.exports = (function(){
	return {
		new: function(req, res){
			console.log("inside user backend controller new method");
			//Check if user exists. If user does, then we just redirect
			User.find({name: req.body.user.name},function (err,result){
				if(result.length < 1){
					console.log("User is not in DB. Creating new user now")
					var user = new User ({
						name: req.body.user.name
					})
					user.save(function(err, result){
						if(err){
							console.log("did not save user", {errors: err});
							res.json(err);
						}
						else{
							console.log("new user saved");
							res.json(result);
						}
					})


				}else{
					console.log(result)
					res.json(result)
				}
			})

		},

		getProgress : function(req,res){
			console.log(req.params);
			// //preparing output array
			var output = [{category: "Strings", completed:[]},{category:"Arrays", completed:[]},{category:"Search", completed:[]},{category:"Lists", completed:[]},{category:"Recursion", completed:[]}];

			User.find({_id: req.params.id},function (err, result){
				if(err){
					console.log("Could not find progress of user")
					res.json(err)
				}else{
					console.log("User progress found", result)
	
					//repackage results for front-end in the following format:
					for(var i = 0;i<result[0].algorithms.length;i++){
						switch (results[0].algorithms[i].category){
							case "strings":
								output[0].completed.push(results[0].algorithms[i]);
								break;
							case "arrays":
								output[1].completed.push(results[0].algorithms[i]);
								break;	
							case "search":
								output[2].completed.push(results[0].algorithms[i]);
								break;
							case "lists":
								output[3].completed.push(results[0].algorithms[i]);
								break;
							case "recursion":
								output[4].completed.push(results[0].algorithms[i]);
								break;
							default:
								break;
						}	
					}

					res.json(output)
				}
			})
		},
		arrayTopic: function(req, res){
			Topic.find({category: "Arrays"}, function(err, result){
				if(err){
					console.log("couldnt find arrays")
				}
				else{
					console.log("topics for Arrays:", result)
					res.json(result);
				}
			})
		},
		stringTopic: function(req, res){
			Topic.find({category: "Strings"}, function(err, result){
				if(err){
					console.log("couldnt find strings")
				}
				else{
					console.log("topics for Strings:", result)
					res.json(result);
				}
			})
		},
		data_structuresTopic: function(req, res){
			Topic.find({category: "Data Structures"}, function(err, result){
				if(err){
					console.log("couldnt find data structures")
				}
				else{
					console.log("topics for data structures:", result)
					res.json(result);
				}
			})
		},
		sortsTopic: function(req, res){
			Topic.find({category: "Sorts"}, function(err, result){
				if(err){
					console.log("couldnt find sorts")
				}
				else{
					console.log("topics for sorts:", result)
					res.json(result);
				}
			})
		},
	}

})();

















