require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Bar from './Bar';
import Page from './pages.default';

import {Provider} from 'react-redux';
import store from '../stores';

export class Main extends React.Component {
  render() {
    return (
      <div className="index">
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <Provider store={store}>
            <div>
              <Bar />
              <Page />
            </div>
          </Provider>
        </MuiThemeProvider>
      </div>

    );
  }
}

export default Main;
