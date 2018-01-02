import React, { Component } from 'react';
import ImageContainer from './image-component/ImageContainer'

/* 
 * Main App Component
 * Controls the overall structure of the application.
 */
class App extends Component {

  render() {
    return (
      <div>
        <section className="hero is-info">
          <div className="hero-body">
            <div className="container-fluid">
              <h1 className="title">Flickr Image App</h1>
            </div>
          </div>
        </section>
        <section>
        <div className="container">
          <ImageContainer></ImageContainer>
        </div>
        </section>
      </div>
    );
  }
}

export default App;
