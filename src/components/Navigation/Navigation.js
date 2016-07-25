import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.scss';
import Instagram from '../../stores/instagram';

class Navigation extends Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false };
  }

  componentDidMount() {
    const ig = new Instagram();
    ig.isAuthenticated().then(json => {
      this.setState({ isAuthenticated: json.isAuthenticated });
    });
  }

  render() {
    return (
      <div className={cx(s.root, this.props.className)} role="navigation">
        {this.state.isAuthenticated ? (
          <a className={s.link} href="/logout">Log Out</a>
        ) : (
          <a className={s.link} href="/instagram/sign-in">
            Log in with Instagram
          </a>
        )}
      </div>
    );
  }
}

Navigation.propTypes = {
  className: PropTypes.string,
};

export default withStyles(Navigation, s);
