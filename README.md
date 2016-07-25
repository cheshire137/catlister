# Catlister

This uses the [Instagram API](https://www.instagram.com/developer/) to display photos of cats in a React web app.

## How to Develop

[Register an Instagram client ID](https://www.instagram.com/developer/clients/register/).

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

## Thanks

- [instagram-node](https://github.com/totemstech/instagram-node)
