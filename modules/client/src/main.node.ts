import "./__workaround.node";
// Fix Universal Style
import { NodeDomRootRenderer, NodeDomRenderer } from "angular2-universal/node";
// End Fix Universal Style
import * as path from "path";
import * as express from "express";
// Angular 2 Universal
import { createEngine } from "angular2-express-engine";
// App
import { MainModule } from "./app/node.module";
function renderComponentFix(componentProto: any) {
    return new NodeDomRenderer(this, componentProto, this._animationDriver);
}
NodeDomRootRenderer.prototype.renderComponent = renderComponentFix;


console.log('STARTING APP');
const app = express();
//const ROOT = path.join(path.resolve('.'), 'dist');
const ROOT = path.join(path.resolve(__dirname, '..'));
const VIEWDIR = path.join(ROOT, 'client');
const ASSETDIR = path.join(ROOT, 'client/assets');

// Express View
app.engine('.html', createEngine({
    precompile: true,
    ngModule: MainModule,
    providers: [
        // use only if you have shared state between users
        // { provide: 'LRU', useFactory: () => new LRU(10) }

        // stateless providers only since it's shared
    ]
}));
app.set('port', process.env.PORT || 3000);
app.set('views', VIEWDIR);
app.set('view engine', 'html');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function ngApp(req, res) {
    res.render('index', {
        req,
        res,
        preboot: false,
        baseUrl: '/',
        requestUrl: req.originalUrl,
        originUrl: 'http://localhost:3000'
    });
}

app.use('/assets', express.static(ASSETDIR, { maxAge: 30 }));
app.use(express.static(VIEWDIR, { index: false }));

console.log(__dirname, ROOT, ASSETDIR);

// Routes with html5pushstate
app.use('/', ngApp);

// Server
let server = app.listen(app.get('port'), () => {
    console.log(`Listening on: http://localhost:${server.address().port}`);
});
