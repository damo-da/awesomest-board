/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
import user from '../../src/reducers/user'

describe("user reducer", ()=>{
  let state, newState;
  let member = {'name':'Commando', admin: false, id: 1000219301923};

  beforeEach(()=>{
  });

  it("can add new member", ()=>{
    state = user(undefined, {});

    state = user(undefined, {
      type: 'ADD_MEMBER',
      member
    });

    expect(JSON.stringify(state.members.slice(-1)[0])).to.equal(JSON.stringify(member));

  });

  it("is immutable", ()=>{
    state = user(undefined, {});

    expect(state).to.not.equal(user(state, {type: 'ADD_MEMBER', member}));

    expect(state).to.equal(user(state, {})); //do not mutate if nothing changed
  })

});
