const mongoose = require('mongoose');
const Post = require('./models/Post');

mongoose.connect("mongodb+srv://sardormongoDB:sardormongoDB@cluster0.t1zrzyt.mongodb.net/node-blog");

// Post.find({}, (err, posts) => console.log(posts));
// Post.find({title: 'My second blog'}, (err, res) => console.log(res));
// Post.findById('63e32c1f99d2e3a11de9424d', (err, res) => console.log(res));
// Post.findByIdAndUpdate('63e32c1f99d2e3a11de9424d', {
//     description: 'it is beatufull description'
// }, (err, res) => console.log(res));

// Post.create({
//     title: 'My second blog',
//     description: 'My second description',
//     content: 'Lorem ipsum second content'
// }, (err, post) => console.log(err, post));
