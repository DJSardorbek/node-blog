const Post = require('../models/Post');

module.exports = async (req, res) => {
    const posts = await Post.find().populate('author', 'username');
    console.log(posts);
    res.render("index", {posts});
}