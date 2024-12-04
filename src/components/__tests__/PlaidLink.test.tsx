import { render, screen, fireEvent } from '@testing-library/react'
import PlaidLink from '../PlaidLink'

describe('PlaidLink Component', () => {
  it('renders connect bank button', () => {
    render(<PlaidLink />)
    expect(screen.getByText('Connect Your Bank')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles button click', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    render(<PlaidLink />)
    const button = screen.getByText('Connect Account')
    fireEvent.click(button)
    // Add assertions based on your click handler implementation
  })
}) 