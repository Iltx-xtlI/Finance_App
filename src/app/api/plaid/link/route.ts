import { NextResponse } from 'next/server'
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
})

const plaidClient = new PlaidApi(configuration)

export async function POST() {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'user-id' },
      client_name: 'Finance App',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en'
    })

    return NextResponse.json({ link_token: response.data.link_token })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create link token' }, { status: 500 })
  }
} 