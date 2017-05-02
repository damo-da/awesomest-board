/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import createComponent from 'helpers/shallowRenderHelper';

import { Bar } from "components/Bar";

describe('Bar', () => {
  let component;

  beforeEach(() => {
    component = createComponent(Bar);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('bar-component');
  });

});
