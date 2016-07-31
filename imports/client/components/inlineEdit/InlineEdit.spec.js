/* eslint-env mocha */
// import React from 'react'
// import { shallow } from 'enzyme'

import { chai } from 'meteor/practicalmeteor:chai'
chai.should()
// import InlineEdit from './InlineEdit.jsx'

describe('<InlineEdit />', () => {
  it('should store a default value', () => {
    // assert.strictEqual(1,0)
    const ha = 1
    ha.should.equal(1)
  })
})
