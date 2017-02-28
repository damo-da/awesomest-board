/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */

import pencil from '../../src/reducers/pencil'

describe("pencil reducer", ()=>{
  let state, newState;

  beforeEach(()=>{

  });


  it("Can change pencil size", ()=>{
    newState = pencil(undefined, {
      type: 'CHANGED_PENCIL_SIZE',
      size: 15
    });

    expect(newState.size).to.equal(15);

  });

  it("Can change pencil color", ()=>{
    newState = pencil(undefined, {
      type: 'CHANGED_PENCIL_COLOR',
      color: "#ffff00"
    });

    expect(newState.color).to.equal('#ffff00');

  });

  it("is immutable", ()=>{
    state = pencil(undefined, {});

    expect(state).to.not.equal(pencil(state, {type: 'CHANGED_PENCIL_COLOR', color: '#ffff00'}));

    expect(state).to.equal(pencil(state, {})); //do not mutate if nothing changed
  })

});
