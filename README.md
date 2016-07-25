# Catlister

This uses the [Instagram API](https://www.instagram.com/developer/) to display photos of cats in a React web app.

## How to Develop

[Register an Instagram client ID](https://www.instagram.com/developer/clients/register/). For the redirect URI, use `http://localhost:3000/instagram`.

    # Install dependencies:
    npm install

Modify src/config.json to supply your development Instagram client ID and secret, as well as a session secret. You can get a random key from [randomkeygen.com](http://randomkeygen.com/) to use as your session secret.

You need PostgreSQL installed.

    # Create PostgreSQL database:
    createdb -Eutf8 catlister_development

    # Initialize the database:
    npm run setup-db

    # Start the app:
    npm start

Your browser should open to [localhost:3001](http://localhost:3001/).

## How to Deploy to Heroku

Create your Heroku app.

Update your Instagram client and add a redirect URI for your Heroku app, e.g., `https://your-heroku-app-name.herokuapp.com/instagram`.

In the catlister/ directory:

    heroku git:remote -a YOUR_HEROKU_APP_NAME
    git push heroku master
    heroku config:set INSTAGRAM_CLIENT_ID="your Instagram client ID"
    heroku config:set INSTAGRAM_CLIENT_SECRET="your Instagram client secret"
    heroku config:set SESSION_SECRET="a random session key"
    heroku config:set WEBSITE_HOSTNAME="your-heroku-app-name.herokuapp.com:443"
    heroku config:set PORT=443

Add Heroku Postgres as an addon on Heroku, this should set your `DATABASE_URL` environment variable on Heroku.

    ./deploy.sh

## Thanks

- [instagram-node](https://github.com/totemstech/instagram-node)
