import React from 'react';
import {Provider} from 'react-redux';
import Routes from './src/navigation/Route';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
export default App;
