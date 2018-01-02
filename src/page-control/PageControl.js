import React from 'react';

/* 
 * PageControl Component
 * Used to control paging
 * props: page (current page number) and a handler function to change page (from ImageContainer's state).
 */
const PageControl = (props) => {
  return (
    <div className="columns">
      <div className="column">
        <nav className="pagination" aria-label="pagination">
          <PreviousButton page={props.page} handler={props.handler} />
          <a className="pagination-next" onClick={props.handler.bind(this, props.page + 1)}>Next page</a>
          <PageList page={props.page} handler={props.handler} />
        </nav>
      </div>
    </div>
  )
}

/* 
 * PreviousButton Component
 * Used to go to previous page, is disabled if page is 1
 * props: page (current page number) and a handler function to change page (from ImageContainer's state).
 */
const PreviousButton = (props) => {
  if (props.page === 1) {
    return (<a className="pagination-previous" disabled onClick={props.handler.bind(this, props.page-1)}>Previous</a>)
  }
  else {
    return (<a className="pagination-previous" onClick={props.handler.bind(this, props.page-1)}>Previous</a>)
  }
}

/* 
 * PageList Component
 * Renders the list of pages differently based on the current page.
 * The reason is that it should always be possible to go to page 1 no matter where on the list the user is.
 * props: page (current page number) and a handler function to change page (from ImageContainer's state).
 */
const PageList = (props) => {
  if(props.page < 3) {
    return (
      <ul className="pagination-list">
      <li>
        { props.page === 1 ? <a className="pagination-link is-current" aria-label="Goto page 1" onClick={props.handler.bind(this, 1)}>1</a> : <a className="pagination-link" aria-label="Goto page 1" onClick={props.handler.bind(this, 1)}>1</a> }
      </li>
      <li>
        { props.page === 2 ? <a className="pagination-link is-current" onClick={props.handler.bind(this, 2)} aria-label={`Page 2`}>2</a> : <a className="pagination-link" onClick={props.handler.bind(this, 2)} aria-label={`Page 2`}>2</a> }
      </li>
      <li>
        <a className="pagination-link" onClick={props.handler.bind(this, 3)} aria-label={`Page 3`}>3</a>
      </li>
    </ul>
    )
  }
  else {
    return (
      <ul className="pagination-list">
      <li>
        <a className="pagination-link" aria-label="Goto page 1" onClick={props.handler.bind(this, 1)}>1</a>
      </li>
      <li>
        <span className="pagination-ellipsis">&hellip;</span>
      </li>
      <li>
        <a className="pagination-link" onClick={props.handler.bind(this, props.page-1)} aria-label={`Page ${props.page-1}`}>{props.page-1}</a>
      </li>
      <li>
        <a className="pagination-link is-current" aria-label={`Page ${props.page}`} aria-current="page">{props.page}</a>
      </li>
      <li>
        <a className="pagination-link" onClick={props.handler.bind(this, props.page+1)} aria-label={`Page ${props.page+1}`}>{props.page+1}</a>
      </li>
    </ul>
    )
  }
}

export default PageControl;