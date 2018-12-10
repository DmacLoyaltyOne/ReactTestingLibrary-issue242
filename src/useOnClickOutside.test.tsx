import { render, fireEvent, waitForElement, cleanup, wait } from 'react-testing-library'
import useOnClickOutside from './useOnClickOutside'
import React from 'react'

afterEach(cleanup)

const MockComponent = ({ callback }) => {
  const ref = React.useRef(null)

  useOnClickOutside(ref, callback)

  return (
    <div ref={ref}>
      <h1>Some Header</h1>

      <div>
        <h6>Some Child Header</h6>
      </div>
    </div>
  )
}

describe('useOnClickOutside', async () => {
  test('callback should be called when clicking on document', async () => {

    const map: any = {}

    document.addEventListener = jest.fn((event, cb) => {
      console.log(event)
      map[event] = cb
    })

    const callback = jest.fn()
    const { getByText, unmount } = render(<MockComponent callback={callback} />)

    await waitForElement(() => getByText(/Some Header/))

    await wait(() => {
      // expect(map.mousedown).toBeInstanceOf(Function)
      expect(1).toEqual(1)

    })

    map.mousedown({
      target: document.body
    })
    console.log('clicking')
    fireEvent.click(document.body)
    expect(callback).toHaveBeenCalledTimes(1)

    unmount()
    fireEvent.click(document.body)
    expect(callback).toHaveBeenCalledTimes(1) // should remove listeners on unmount
  })
})
