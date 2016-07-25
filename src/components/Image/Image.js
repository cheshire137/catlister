import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Image.scss';

function Image({ link, images }) {
  const image = images.thumbnail;
  return (
    <a href={link} target="_blank" className={s.image}>
      <img src={image.url} width={image.width} height={image.height} />
    </a>
  );
}

Image.propTypes = {
  attribution: PropTypes.string,
  tags: PropTypes.array,
  type: PropTypes.string,
  location: PropTypes.object,
  comments: PropTypes.object,
  filter: PropTypes.string,
  created_time: PropTypes.string,
  link: PropTypes.string,
  likes: PropTypes.object,
  images: PropTypes.object,
  users_in_photo: PropTypes.array,
  caption: PropTypes.object,
  user_has_liked: PropTypes.bool,
  id: PropTypes.string,
  user: PropTypes.object,
};

export default withStyles(Image, s);
