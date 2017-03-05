require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Bar from './Bar';
import Page from './pages.default';
import Login from './Login'

import {Provider} from 'react-redux';
import store from '../stores';
import {connect} from 'react-redux';

export class Main extends React.Component {

  getPageComponent(){
    if(this.props.page == "LOGIN"){
      return <Login/>
    }else{
      return <Page />
    }
  }

  getBar(){
    if(this.props.page == "LOGIN"){
        return null;
    }else{
      return <Bar />
    }
  }
  render() {
    return (
      <div className="index">
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)} className="mui-theme">
          <Provider store={store}>
            <div>
              {this.getPageComponent()}
              {this.getBar()}
            </div>
          </Provider>
        </MuiThemeProvider>
      </div>

    );
  }
}

const mapStateToProps = (state) => state.info;

export default connect(mapStateToProps)(Main);

