import "angular2-universal-polyfills";
import "ts-helpers";
import "./__workaround.node";
import * as fs from "fs";
import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as compression from "compression";
// Angular 2
import { enableProdMode } from "@angular/core";
// Angular 2 Universal
import { createEngine } from "angular2-express-engine";
// App
import { MainModuleNgFactory } from "../compiled/src/app/node.module.ngfactory";

// Routes
// import { routes } from './server.routes';

// enable prod for faster renders
enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));
const VIEWDIR = path.join(ROOT, 'dist/client');
const ASSETDIR = path.join(ROOT, 'dist/client/assets');

// Express View
app.engine('.html', createEngine({
    precompile: false, // this needs to be false when using ngFactory
    ngModule: MainModuleNgFactory,
    providers: [
        // use only if you have shared state between users
        // { provide: 'LRU', useFactory: () => new LRU(10) }

        // stateless providers only since it's shared
    ]
}));
app.set('port', process.env.PORT || 3000);
app.set('views', VIEWDIR);
app.set('view engine', 'html');
app.set('json spaces', 2);

app.use(bodyParser.json());
app.use(compression());

const accessLogStream = fs.createWriteStream(ROOT + '/morgan.log', { flags: 'a' });

app.use(morgan('common', {
    skip: (req, res) => res.statusCode < 400,
    stream: accessLogStream
}));

function cacheControl(req, res, next) {
    // instruct browser to revalidate in 60 seconds
    res.header('Cache-Control', 'max-age=60');
    next();
}
// Serve static files
app.use('/assets', cacheControl, express.static(ASSETDIR, { maxAge: 30 }));
app.use(cacheControl, express.static(VIEWDIR, { index: false }));

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

// Server
let server = app.listen(app.get('port'), () => {
    console.log(`Listening on: http://localhost:${server.address().port}`);
});
