import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.scss';

function Footer() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <span className={s.text}>© 2016 Sarah Vessels</span>
      </div>
    </div>
  );
}

export default withStyles(Footer, s);
