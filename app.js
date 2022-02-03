const createError = require('http-errors');
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

const PORT = 3000;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile')
const loginRouter = require('./routes/loginAndReg')




// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', loginRouter)
app.use('/users', usersRouter);
app.use('/profile', profileRouter)


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

app.listen(PORT)
