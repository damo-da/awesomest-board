/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import {Main} from 'components/Main';

describe('MainComponent', function () {
  it("Should not break", () => {
    expect(true).to.equal(true);
  })

});
