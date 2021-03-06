const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
//express

const app = express();

//connect to mongodb

const dbURI = 'mongodb+srv://anirudhv:Shivani1@nodejstutorial.7anug.mongodb.net/nodejs-tutorial?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
	.then((result) => app.listen(3000))
	.catch((err) => console.error(err));

//register view engine

app.set('view engine', 'ejs');
// app.set('views', 'myviews'); - if folder of html code is not called views

//middleware and static files

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//sandbox routes
/*app.get('/add-blog', (req, res) => {
	const blog = new Blog({
		title: 'new blog 2',
		snippet: 'about my new blog',
		body: 'more about my new blog'
	});
	blog.save()
		.then((result) => {
			res.send(result);
		}) 
		.catch((err) => {
			console.log(err);
		});
});

app.get('/all-blogs', (req, res) => {
	Blog.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/single-blog', (req, res) => {
	Blog.findById('60a24876df68624938e72776')
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
}); */

app.get('/', (req, res) => {
	/*const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
  ]; */
	//res.send('<p>home page</p>');
	//res.sendFile('./views/index.html', {root: __dirname});
	//res.render('index', {title: 'Home', blogs});
	res.redirect('/blogs');
});

app.get('/about', (req, res) => {
	//res.send('<p>about page</p>');
	//res.sendFile('./views/about.html', {root: __dirname});
	res.render('about', {title: 'About'});
});

//redirects

/*app.get('/about-us', (req, res) => {
	res.redirect('/about');
}); */

//blog routes

app.get('/blogs', (req, res) => {
	Blog.find().sort({createdAt: -1})
		.then((result) => {
			res.render('index', {title: 'All Blogs', blogs: result} )
		})
		.catch((err) => {
			console.log(err);
		});
});

app.post('/blogs', (req, res) => {
	const blog = new Blog(req.body);
	blog.save() //saves to db
		.then((result) => {
			res.redirect('/blogs')
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/blogs/:id', (req, res) => {
	const id = req.params.id;
	console.log(id);
	Blog.findById(id)
		.then((result) => {
			res.render('details', {blog: result, title: 'Blog Details'});
		})
		.catch((err) => {
			console.log(err);
		});
});

app.delete('/blogs/:id', (req, res) => {
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
		.then((result) => {
			res.json({redirect: '/blogs'})
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/blogs/create', (req, res) => {
	res.render('create', {title: 'Create a new Blog'});
});

//404 page

app.use((req, res) => {
	//res.status(404).sendFile('./views/404.html', {root: __dirname});
	res.status('404').render('404', {title: '404'});
});

//all gets run from top to bottom. if one match is found, rest is not run. 
//use is not scoped to specific url like get so put it in the bottom.