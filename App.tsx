import React from 'react'
import {Provider} from 'react-redux';
import Router from './src/navigation';
import {store} from './src/store';
import ErrorBoundary from './src/components/ErrorBoundary';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
