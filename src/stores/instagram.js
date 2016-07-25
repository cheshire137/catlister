import fetch from '../core/fetch';
import { clientHost } from '../config';

class Instagram {
  constructor() {
    this.url = `http://${clientHost}/instagram`;

    // See https://github.com/kriasoft/react-starter-kit/issues/619
    this.opts = { credentials: 'include' };
  }

  isAuthenticated() {
    return this.json('status');
  }

  getMedia(tag) {
    return this.json(`media?tag=${encodeURIComponent(tag)}`);
  }

  json(path) {
    return fetch(`${this.url}/${path}`, this.opts).then(res => res.json());
  }
}

export default Instagram;
