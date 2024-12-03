import { NextResponse } from 'next/server';
import { plaidClient } from '@/services/plaidService';

export async function POST(request: Request) {
  try {
    const { type } = await request.json();

    switch (type) {
      case 'create_link_token': {
        const response = await plaidClient.linkTokenCreate({
          user: { client_user_id: 'user-id' },
          client_name: 'Finance App',
          products: ['transactions'],
          country_codes: ['US'],
          language: 'en'
        });
        return NextResponse.json({ link_token: response.data.link_token });
      }

      case 'exchange_public_token': {
        const { public_token } = await request.json();
        const response = await plaidClient.itemPublicTokenExchange({
          public_token
        });
        return NextResponse.json({ access_token: response.data.access_token });
      }

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 