const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const logger = require('morgan');

// 日志
const FileStreamRotator = require('file-stream-rotator');

// token
const { expressjwt: jwt } = require("express-jwt");
const { TOKEN_SECRET_KEY } = require('./utils/constant');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// 设置允许跨域访问该服务！
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 输出请求到日志中
const accessLogStream = FileStreamRotator.getStream({
			"filename": path.join(__dirname, 'log/req/%DATE%.log'),
			"frequency": "daily",
			"verbose": false,
			"date_format": "YYYY-MM-DD"
		})
app.use(logger('combined', {stream: accessLogStream}))


// token 设置
app.use(jwt({
  secret: TOKEN_SECRET_KEY,
  algorithms: ["HS256"]
}).unless({
  // 除了这些path，其他的URL都需要验证
  path: ['/','/users','/users/login']
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  if (err.name === "UnauthorizedError") {
	res.send('出错啦')
	// res.setHeader('Content-Type', 'text/html')
	// res.render(path.join(__dirname, 'public/index.html'))
  } else {
    next(err)
  }

});

module.exports = app;
