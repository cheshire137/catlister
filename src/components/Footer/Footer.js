import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>© 2016 Sarah Vessels</span>
      </div>
    </footer>
  );
}

export default withStyles(Footer, s);
