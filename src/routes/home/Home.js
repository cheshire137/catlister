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
    const rows = [];
    while (this.state.images.length > 0) {
      rows.push(this.state.images.splice(0, 4));
    }
    return (
      <div className="container">
        {rows.map((images, index) =>
          <div key={index} className="columns">
            {images.map(image =>
              <div className="column is-one-quarter" key={image.id}>
                <Image {...image} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(Home, s);
