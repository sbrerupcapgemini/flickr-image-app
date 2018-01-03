import React, { Component } from 'react';
import PageControl from './../page-control/PageControl'
import './ImageContainer.css'

/* 
 * The main component that wraps two functional components (ImageList and PageControl)
 * Controls state (images, page and tag)
 * Renders a list of images that is fetched from Flickr and a simple Page Control.
 */
class ImageContainer extends Component {
  constructor() {
    super();
    /*
     * Set initial state.
     * Images[] contains the data fetched from flickr
     * page is the current page
     * tag is the tag used for seearch
     */
    this.state = {
      images: [],
      page: 1,
      tag: 'dogs'
    };
  }

  /* 
   * Fetches data from Flickr async and updates state acordingly.
   * parameter: page (number)
   * return: void 
  */
  loadData = async (page) => { 
    try {
      const res = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=dc99f3fadadc7ff3f7914ebaf554a30d&tags=${this.state.tag}&per_page=12&page=${page}&format=json&nojsoncallback=1`);
      const data = await res.json();
      this.setState({ images: data.photos.photo })
    } catch (error) {
      console.log('The API key is probably outdated', error);
    }
  }


  render() {
    return (
      <div>
        <div className="columns is-multiline">
          <ImageList images={this.state.images} lastPage={this.state.lastPage} />
        </div>
        <PageControl handler={this.handlePageChange} page={this.state.page} />
      </div>
    );
  }

  /*
   * Changes the current page and loads new data async.
   * parameter: direction (number)
   * return: void
   */
  handlePageChange = async (page) => {
    if (page > 0) {
      this.setState({ page: page }, await this.loadData(page))
    }
  }

  /*
   * LifeCycle method
   * Calls loadData after the component did mount
   */
  componentDidMount() {
    this.loadData(this.state.page);
  }
}

/* 
 * ImageList Component 
 * Hold images and shows them as a list
 * props: images[] (image array passed from state of parent)
 * maps the image array to JSX.
 */
const ImageList = (props) => {
  const images = props.images;
  const imgElements = images.map((img) => (
      <div className="column is-one-third" key={img.id}>
        <div className="card img" style={{ backgroundImage: `url(https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg)` }}>
        </div>
      </div>
    )
  );
  return imgElements;
}


export default ImageContainer;
