const createError = require('http-errors');
const express = require('express');

const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = 3000;

const FileStore = require('session-file-store')(session);

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/loginAndReg');
const cardRouter = require('./routes/card');
const mainInfoRouter = require('./routes/main');

app.use(session({
  store: new FileStore(),
  secret: 'qwe',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  name: 'auth',
}));
app.use((req, res, next) => {
  next();
});

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.username = req.session?.username;
  res.locals.userId = req.session?.userId;
  res.locals.userCity = req.session?.userCity;
  res.locals.useremail = req.session?.useremail;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/main', mainInfoRouter);
app.use('/', indexRouter);
app.use('/user', loginRouter);
app.use('/card', cardRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT);
