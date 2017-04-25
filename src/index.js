import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import {Provider} from 'react-redux';
import store from './stores';
import injectTapEventPlugin from 'react-tap-event-plugin';


export const load = () => {
  injectTapEventPlugin();

// Render the main component into the dom

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('app'));
};


if (typeof process == 'undefined' && !process.versions['electron']) {
  load();
}
