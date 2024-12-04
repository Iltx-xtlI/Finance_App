import { GET, POST } from '../route'
import { NextResponse } from 'next/server'

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data) => new Response(JSON.stringify(data)))
  }
}))

describe('Plaid API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('returns correct status', async () => {
      const response = await GET()
      expect(response).toBeInstanceOf(Response)
      const data = await response.json()
      expect(data).toEqual({ status: 'ok' })
    })
  })

  describe('POST', () => {
    it('echoes received data', async () => {
      const testData = { test: 'data' }
      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(testData)
      })

      const response = await POST(request)
      expect(response).toBeInstanceOf(Response)
      const data = await response.json()
      expect(data).toEqual({ received: testData })
    })
  })
}) 