/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
import * as pencilActions from '../../src/actions/pencil'
import pencilReducer from '../../src/reducers/pencil'

describe("Pencil actions", ()=>{
  let oldState, newState;

  beforeEach(()=>{
    oldState = pencilReducer(undefined, {});
  });

  it("should be able to change color", ()=>{
    newState = pencilReducer(oldState, pencilActions.changedColor("#fff000"));

    expect(newState.color).to.equal("#fff000")
  });


  it("should be able to change pencil size", ()=>{
    newState = pencilReducer(oldState, pencilActions.changedSize(20));

    expect(newState.size).to.equal(20)
  });

});
