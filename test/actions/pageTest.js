/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
import * as pageActions from '../../src/actions/page'
import pageReducer from '../../src/reducers/page'

describe("Page actions", ()=>{
  let oldState, newState;

  beforeEach(()=>{
    oldState = pageReducer(undefined, {});
  });

  it("should be able to open dialog", ()=>{
    newState = pageReducer(oldState, pageActions.showDialog("CAT"));
    expect(newState.dialog).to.equal("CAT");
  });

});
