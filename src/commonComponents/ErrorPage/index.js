import React from 'react';

const ErrorPage = ( { text = 'No se encontró la página solicitada.' } ) => {
  return (
    <div>
      <p>404 Error:</p>
      <p>{text}</p>
      <p>Intente nuevamente más tarde, o dirigase al inicio.</p>
    </div>
  )
}

export default ErrorPage;
