const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	snippet: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	}
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);
//first arg in ^^^ is collection name in singular form, second arg is schema
//model is used to create, delete, and update documents inside collections

module.exports = Blog;