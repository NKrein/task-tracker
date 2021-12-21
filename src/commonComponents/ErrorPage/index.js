import React from 'react';

const ErrorPage = ( { text = 'Page not found' } ) => {
  return (
    <div>
      <p>404 Error:</p>
      <p>{text}</p>
      <p>Try later, or go back.</p>
    </div>
  )
}

export default ErrorPage;
