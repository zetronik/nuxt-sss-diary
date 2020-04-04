const express = require('express')
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const authRouter = require('./routes/auth.routes');
const settingsRouter = require('./routes/settings.routes');
const diaryRouter = require('./routes/diary.routes')

const keys = require('./keys');

mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => console.log('MongoDB connected...'))
	.catch(error => console.error(error));

const store = new MongoStore({
	collection: 'sessions',
	uri: keys.MONGO_URI
})

const app = express()
app.use(helmet());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())

const expiryDate = new Date( Date.now() + 60 * 60 * 1000 )
app.use(session({
	secret: keys.SESSION_KEY,
	resave: false,
	saveUninitialized: false,
	name: 'sessionId',
	store,
	// cookie: {
	// 	httpOnly: true,
	// 	domain: process.env.BASE_URL || 'http://localhost:3000',
	// 	expires: expiryDate
	// }
}))


app.use('/api/auth', authRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/diary', diaryRouter)






module.exports = app;
