import React from 'react';

function PageLoading ({ error, pastDelay, retry }) {
  switch (true) {
    case !!error:
      return <div>Error! <button onClick={ retry }>Retry</button></div>;
    case !!pastDelay:
      return (<div>Loading...</div>);
    default: return null;
  }
}

export default PageLoading;