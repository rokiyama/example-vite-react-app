import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  const user = userEvent.setup()
  it('renders the button with the provided children', () => {
    render(<Button onClick={() => {}}>click me</Button>)
    expect(screen.getByText('click me')).toBeInTheDocument()
  })

  it('calls the onClick function when the button is clicked', async () => {
    const onClickMock = vi.fn()
    render(<Button onClick={onClickMock}>Click me</Button>)
    await user.click(screen.getByText('Click me'))
    expect(onClickMock).toHaveBeenCalled()
  })
})
