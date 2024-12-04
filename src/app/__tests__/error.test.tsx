import { render, screen, fireEvent } from '@testing-library/react'
import Error from '../error'

describe('Error Component', () => {
  const mockReset = jest.fn()
  const mockError = {
    name: 'Error',
    message: 'Test error',
    digest: 'test-digest'
  } as Error & { digest?: string }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders error message', () => {
    render(<Error error={mockError} reset={mockReset} />)
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
  })

  it('calls reset function when try again button is clicked', () => {
    render(<Error error={mockError} reset={mockReset} />)
    const button = screen.getByText('Try again')
    fireEvent.click(button)
    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it('should render error component', () => {
    const mockProps = {
      error: {
        name: 'Error',
        message: 'Test error',
        digest: 'test-digest'
      } as Error & { digest?: string },
      reset: () => {}
    }

    const { container } = render(<Error {...mockProps} />)
    // ... rest of test
  })
}) 