// the polyfills must be one of the first things imported in node.js.
// The only modules to be imported higher - node modules with es6-promise 3.x or other Promise polyfill dependency
// (rule of thumb: do it if you have zone.js exception that it has been overwritten)
// if you are including modules that modify Promise, such as NewRelic,, you must include them before polyfills
import 'angular2-universal-polyfills';
import 'ts-helpers';
import './__workaround.node'; // temporary until 2.1.1 things are patched in Core

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as compression from 'compression';

// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';

// App
import { MainModule } from './node.module';

// enable prod for faster renders
enableProdMode();
//
const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

// Express View
app.engine('.html', createEngine({
  ngModule: MainModule,
  providers: [
    // use only if you have shared state between users
    // { provide: 'LRU', useFactory: () => new LRU(10) }

    // stateless providers only since it's shared
  ]
}));
app.set('port', 3000);
app.set('views', __dirname);
app.set('view engine', 'html');
app.set('json spaces', 2);

app.use(cookieParser('Angular 2 Universal'));
app.use(bodyParser.json());
app.use(compression());

app.use(morgan('dev'));

function cacheControl(req, res, next) {
  // instruct browser to revalidate in 60 seconds
  res.header('Cache-Control', 'max-age=60');
  next();
}
// Serve static files
app.use('/assets', cacheControl, express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
app.use(cacheControl, express.static(path.join(ROOT, 'dist/client'), {index: false}));

function ngApp(req, res) {
  res.render('index', {
    req,
    res,
    // time: true, // use this to determine what part of your app is slow only in development
    preboot: false,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: `http://localhost:${ app.get('port') }`
  });
}

/**
 * use universal for specific routes
 */
app.get('*', ngApp);

// // Server
let server = app.listen('3000', () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});
