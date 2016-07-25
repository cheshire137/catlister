import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import Link from '../Link';
import Navigation from '../Navigation';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="nav-left">
            <Link className="nav-item" to="/">
              <span>Catlister</span>
            </Link>
          </div>
          <div className="nav-right">
            <Navigation />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default withStyles(Header, s);
