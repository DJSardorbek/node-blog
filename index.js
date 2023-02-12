const path = require("path");
const express = require("express");
const app = express();
const { config, engine } = require('express-edge');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');
const connectFlash = require('connect-flash');

const MongoUrl = "mongodb+srv://sardormongoDB:sardormongoDB@cluster0.t1zrzyt.mongodb.net/node-blog";
const validatePostMiddleware = require('./middlewares/validationPost');
const authMiddleware = require('./middlewares/auth');
const redirectIfNotAuth = require('./middlewares/redirect');

const homePageController = require('./controllers/homePage');
const getPostsController = require('./controllers/getPosts');
const postsNewController = require('./controllers/postsNew');
const createPostController = require('./controllers/createPost');
const createUserController = require('./controllers/createUser');
const userStoreController = require('./controllers/userStore');
const loginController = require('./controllers/login');
const loginStoreController = require('./controllers/loginStore');
const logOutController = require('./controllers/logout');

config({ cache: process.env.NODE_ENV === 'production' });
app.use(fileUpload());
app.use(express.static("public"));
// Configure Edge if need to
app.use(engine);
mongoose.connect(MongoUrl);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressSession({
    secret: 'Serdar',
    store: mongoStore.create({mongoUrl : MongoUrl})
}));
app.use(connectFlash());
app.use((req, res, next) => {
    app.locals.auth = req.session.userId;
    next();
})

app.set("views", `${__dirname}/views`);

app.get("/", homePageController);
app.get("/post/:id", getPostsController);
app.get("/posts/new", authMiddleware, postsNewController);
app.post("/posts/create", authMiddleware, validatePostMiddleware, createPostController);
app.get("/reg", redirectIfNotAuth, createUserController);
app.post("/auth/reg", userStoreController);
app.get('/login', redirectIfNotAuth, loginController);
app.post('/auth/log', loginStoreController);
app.get('/logout', logOutController);
app.use((req, res) => res.render('notFound'));

app.listen(5000, () => console.log("Server has been started on port 5000..."));