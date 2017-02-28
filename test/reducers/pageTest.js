/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
import page from '../../src/reducers/page'

describe("page reducer", ()=>{
  let state, newState;

  beforeEach(()=>{
  });

  it("Can open dialog properly", ()=>{
    newState = page(undefined, {
      type: 'OPEN_DIALOG',
      dialog: 'PENCILS'
    });

    expect(newState.dialog).to.equal('PENCILS');

  });

  it("is immutable", ()=>{
    state = page(undefined, {
      type: 'OPEN_DIALOG',
      dialog: 'PENCILS'
    });

    expect(state).to.not.equal(page(state, {type: 'OPEN_DIALOG', dialog: 'CAT'}));

    expect(state).to.equal(page(state, {})); //do not mutate if nothing changed
  })

});
