const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

//router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const filemergeRouter = require('./routes/filemerge');


const { logger } = require('./utils/logConfig');
const { isTrustedError, handleError } = require('./error/ErrorHandler');


// https://medium.com/sjk5766/jwt-json-web-token-%EC%86%8C%EA%B0%9C-49e211c65b45
// https://helloinyong.tistory.com/111
const jwt = require('jsonwebtoken'); // module import
const userInfo = { id: 1, username: 'inyong', role: ['admin', 'user'] };
const secretKey = 'SeCrEtKeYfOrHaShInG';

const options = { expiresIn: '1m', issuer: 'velopert.com-발급자', subject: 'userInfo' };

const fetch = require('node-fetch');

const token = jwt.sign(userInfo, secretKey, options);


class App {
	routers() {
		this.app.use('/', indexRouter);
		this.app.use('/users', usersRouter);
		this.app.use('/filemerge', filemergeRouter);
	}

	constructor() {
	logger.info('App start..');

		this.app = express();
		// module engine setup
		this.configs();

		//ejs view
		this.routers();

		//api : TODO
		this.globalException();


		// this.PingTest();
	}

	PingTest() {
		fetch('http://localhost:3000/users', {
			method: 'GET',
			headers: {
				'content-type': 'text/json',
				'x-access-token': token
			}
		})
		.then(res => {
			console.log(res.status);
			console.log(token);
		});
	}

	// catch 404 and forward to error handler
	globalException() {

		this.app.use(function(_req, _res, next) {
			//TODO ?
			_res.status(404).send(404);
			// var err = new Error('Not Found');
			// next(err);
		  });
		  

		// 모든 에러 후 처리
		this.app.use(async (err, _req, res) => {
			//사용자 피드백 에러
			if(err.isOperational||isTrustedError(err)){
				res.json(err);
			}else{//시스템 장애
				await handleError(err);
				// process.exit(1);
				// https://pm2.keymetrics.io/docs/usage/cluster-mode/
				process.exit(err ? 1 : 0);
 
			}
			
		});

		let isDisableKeepAlive = false
		app.use(function(req, res, next) {
			if (isDisableKeepAlive) {
				res.set('Connection', 'close');
			}
			next()
		})


		process.on('SIGINT', function () {
			isDisableKeepAlive = true
			app.close(function () {
			console.log('server closed')
			process.exit(0)
		})

		// https://goldbergyoni.com/checklist-best-practices-of-node-js-error-handling/

		// get the unhandled rejection and throw it to another fallback handler we already have.
		process.on('unhandledRejection', (reason ) => {
			logger.info('unhandledRejection');
			throw reason;
		});
			

		process.on('uncaughtException', async (error) => {
			logger.info('uncaughtException');

			await handleError(error);
			if(!error.isOperational){
				process.exit(err ? 1 : 0);
			}
			
		});

	}




	configs() {
		this.app.set('views', path.join(__dirname, 'views'));
		this.app.set('view engine', 'ejs');

		
		const morganFormat = process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'; // NOTE: morgan 출력 형태

		this.app.use(morgan(morganFormat, {
			stream: {
				write: (message) => { // NOTE: morgan에서 쓰기 위해 이 형태로 fix 되야함.
					//   console.log(message);
					logger.info(`${message}`);
				}
			} 
		})); // NOTE: http request 로그 남기기

		this.app.use(express.json());
		this.app.use(express.urlencoded({extended: false}));
		this.app.use(cookieParser());
		this.app.use(express.static(path.join(__dirname, 'public')));
	}
}

module.exports = new App().app;
