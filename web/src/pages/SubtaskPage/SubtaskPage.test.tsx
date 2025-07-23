import { render } from '@redwoodjs/testing/web'

import SubtaskPage from './SubtaskPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SubtaskPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SubtaskPage />)
    }).not.toThrow()
  })
})
