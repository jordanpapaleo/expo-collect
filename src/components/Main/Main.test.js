import React from 'react'
import Main from './Main'

import renderer from 'react-test-renderer'

describe('Main', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Main />).toJSON()
    expect(rendered).toBeTruthy()
  })
})
