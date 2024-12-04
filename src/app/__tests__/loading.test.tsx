import { render } from '@testing-library/react'
import Loading from '../loading'

describe('Loading Component', () => {
  it('renders loading spinner', () => {
    const { container } = render(<Loading />)
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })
}) 