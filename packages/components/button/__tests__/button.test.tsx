import React from 'react'
import { mount } from 'enzyme'
import Button from '../lib/button'

describe('Button', () => {
  it('needs tests', () => {
    const wrapper = mount(<Button />)
    expect(() => {
      wrapper.setProps({})
      wrapper.unmount()
    }).not.toThrow()
  })
})
