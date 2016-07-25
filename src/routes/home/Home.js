import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';
import Instagram from '../../stores/instagram';
import Image from '../../components/Image';

class Home extends Component {
  constructor() {
    super();
    this.state = { images: [] };
  }

  componentDidMount() {
    const ig = new Instagram();
    ig.getMedia('nashville').then(media => {
      const images = media.filter(i => i.type === 'image');
      this.setState({ images });
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>Catlister</h1>
          <ul className={s.imagesList}>
            {this.state.images.map(image =>
              <li key={image.id}>
                <Image {...image} />
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(Home, s);
