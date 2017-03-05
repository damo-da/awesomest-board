/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import {Main} from 'components/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('MainComponent', function () {
  let component;

  it("Should not break", () => {
    expect(true).to.equal(true);
  });

  it("Should use MuiTheme Provider", () => {
    expect(component.find(MuiThemeProvider).length).to.equal(1);
  });

  beforeEach(()=>{
    component = mount(<Main />);
  })

});
