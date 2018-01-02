import React, { Component } from 'react';
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
      tag: 'dogs',
      error: ''
     };
  }

  /* 
   * Fetches data from Flickr async and updates state acordingly.
   * parameter: page (number)
   * return: void 
  */
  async loadData(page) {
    try {
      const res = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=df75d7dabfb57c5689ec44e3e2f33993&tags=${this.state.tag}&per_page=12&page=${page}&format=json&nojsoncallback=1`);
      const data = await res.json();
      this.setState({ images: data.photos.photo })
    } catch (error) {
      console.log('The API key is probably outdated', error);
    }    
  }

  render() {
    return (
      <div> 
        <ImageList images={this.state.images} />
        <PageControl handler={this.handlePageChange.bind(this)} page={this.state.page} />
      </div>
    );
  }

  /*
   * Changes the current page and loads new data async.
   * parameter: direction (number)
   * return: void
   */
  async handlePageChange(direction) {
    let newPage = this.state.page + direction;
    if (newPage > 0) {
      this.setState({ page: newPage }, await this.loadData(newPage))    
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

// functional components (could exist in their own files)

/* 
 * ImageList Component 
 * Hold images and shows them as a list
 * props: images[] (image array passed from state of parent)
 * maps the image array to JSX.
 */
const ImageList = (props) => {
  const images = props.images;
  const imgElements = images.map((img) =>
    (
      <div key={img.id} className="img" style={{backgroundImage: `url(https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg)`}}>
      </div>
    )
  );
  return imgElements;
}

/* 
 * PageControl Component
 * Used to control paging
 * props: handler function (the onClick event handler is passed from the parent, as the current page is stored in the state of the parent)
 */
const PageControl = (props) => {
  return (
    <div className="box has-text-centered">
      <button className="button is-primary is-large" onClick={props.handler.bind(this, -1)}>
        <span className="icon">
          <i className="fa fa-arrow-left"></i>
        </span>
      </button>
      &nbsp;
      <button className="button is-primary is-large" onClick={props.handler.bind(this, 1)}>
        <span className="icon">
          <i className="fa fa-arrow-right"></i>
        </span>
      </button>
      <p>Page: {props.page}</p>
    </div>
  )
}

export default ImageContainer;
