/* eslint-disable max-len */
/* jscs:disable maximumLineLength */

import JsonConfig from './config.json';

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const clientPort = process.env.PORT || 3001;
export const clientHost = process.env.WEBSITE_HOSTNAME ||
    `localhost:${clientPort}`;

export const databaseUrl = process.env.DATABASE_URL ||
    `postgresql://${process.env.USER}@localhost:5432/catlister_development`;

export const analytics = {
  google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' },
};

export const auth = {
  instagram: {
    id: process.env.INSTAGRAM_CLIENT_ID || JsonConfig.instagram.id,
    secret: process.env.INSTAGRAM_CLIENT_SECRET || JsonConfig.instagram.secret,
    url: 'https://api.instagram.com',
  },
};

export const sessionSecret = process.env.SESSION_SECRET ||
    JsonConfig.sessionSecret;
