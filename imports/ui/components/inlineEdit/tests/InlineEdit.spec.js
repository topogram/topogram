/* eslint-env mocha */
import React from 'react'
import { shallow } from 'enzyme'
import chai  from 'chai'

const assert = chai.assert
import InlineEditField from '../InlineEditField.jsx'

describe('<InlineEditField />', () => {

  it('should store init options', () => {
    const val = 'hoho'
    const field = shallow(<InlineEditField defaultValue={val} />)
    assert(field.hasClass('editable'))
    assert.equal(field.state('text'), val)

  })

  it('should show a field after a click', () => {
    const field = shallow(<InlineEditField />)
    field.find('span').simulate('click')

    assert(field.state('editing'))
    assert.equal(field.find('TextField').length, 1)
    // assert.equal(field.find('input').length, 1)
  })

  it('should have some clickable default text when text is empty', () => {
    const field = shallow(<InlineEditField
      defaultValue=""
      placeholder="yo"
    />)
    assert(field.hasClass('emptyfield'))
    assert(field.find('span').text(), 'yo')

  })

  describe('multiline field with type set as textarea', () => {

    it('should show a textarea after click', () => {
      const field = shallow(<InlineEditField type="textarea" />)
      field.find('span').simulate('click')
      assert(field.state('editing'))
      assert.equal(field.find('TextField').length, 1)
      assert( field.find('TextField').prop('multiLine'))
    })

    it('should render Markdown', () => {
      const field = shallow(<InlineEditField type="textarea" />)
      assert(field.hasClass('markdown-body'))
      assert.equal(field.find('Remarkable').length, 1)
    })

  })


})
