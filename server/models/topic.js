var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TopicSchema = new mongoose.Schema({
	topic_name: String,
  	description: String,
 	category: String,
 	difficulty: String,
 	// user_id: String,
 	// user_name: String,
 	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
 	_user: {type: Schema.Types.ObjectId, ref: 'User'}

});
var Topic = mongoose.model('Topic', TopicSchema);

// UserSchema.path("name").required(true, "name can not be blank");