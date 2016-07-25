import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import Router from './routes';
import assets from './assets';
import pg from 'pg';
import connectPgSimple from 'connect-pg-simple';
import { port, analytics, auth, host, databaseUrl, sessionSecret, clientHost } from './config';
import { instagram } from 'instagram-node';

const server = global.server = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const PgSession = connectPgSimple(session);
server.use(session({
  secret: sessionSecret,
  cookie: {
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
  resave: false,
  saveUninitialized: false,
  store: new PgSession({
    pg,
    conString: databaseUrl,
    tableName: 'session',
  }),
}));

const instagramRedirectUri = `http://${host}/instagram`;

server.all('*', (req, res, next) => {
  const origin = `${req.protocol}://${clientHost}`;
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

server.get('/logout', async (req, res) => {
  const sess = req.session;
  sess.token = null;
  res.redirect(`http://${clientHost}`);
});

server.get('/instagram/status', async (req, res) => {
  if (req.session.token) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

server.get('/instagram/media', async (req, res) => {
  if (req.session.token) {
    const api = instagram({});
    api.use({ access_token: req.session.token });
    const handler = (err, medias, pagination, remaining, limit) => {
      if (err) {
        res.status(400);
      }
      res.json(medias);
    };
    api.tag_media_recent(req.query.tag, handler);
  } else {
    res.json([]);
  }
});

server.get('/instagram/sign-in', async (req, res) => {
  const api = instagram({});
  api.use({
    client_id: auth.instagram.id,
    client_secret: auth.instagram.secret,
  });
  const options = { scope: ['basic', 'public_content'] };
  res.redirect(api.get_authorization_url(instagramRedirectUri, options));
});

server.get('/instagram', async (req, res) => {
  const api = instagram({});
  api.use({
    client_id: auth.instagram.id,
    client_secret: auth.instagram.secret,
  });
  api.authorize_user(req.query.code, instagramRedirectUri, (err, result) => {
    if (err) {
      res.status(400);
      res.json(err);
    } else {
      const sess = req.session;
      sess.token = result.access_token;
      res.redirect(`http://${clientHost}`);
    }
  });
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const template = require('./views/index.jade');
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };

    if (process.env.NODE_ENV === 'production') {
      data.trackingId = analytics.google.trackingId;
    }

    const css = [];
    const context = {
      insertCss: styles => css.push(styles._getCss()),
      onSetTitle: value => (data.title = value),
      onSetMeta: (key, value) => (data[key] = value),
      onPageNotFound: () => (statusCode = 404),
    };

    await Router.dispatch({ path: req.path, query: req.query, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    res.status(statusCode);
    res.send(template(data));
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const template = require('./views/error.jade');
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(template({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  }));
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
