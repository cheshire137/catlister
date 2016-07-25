import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <span>© 2016 Sarah Vessels</span>
          <span className={s.separator}>&middot;</span>
          <a href="https://github.com/cheshire137/catlister" target="_blank">View source</a>
        </div>
      </div>
    </footer>
  );
}

export default withStyles(Footer, s);
