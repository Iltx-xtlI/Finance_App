#!/usr/bin/env node
import { createLinkToken, exchangePublicToken } from './plaid-cli';

async function main() {
  const command = process.argv[2];

  switch (command) {
    case 'create-link':
      try {
        const linkToken = await createLinkToken();
        console.log('Link token created:', linkToken);
      } catch (error) {
        console.error('Failed to create link token:', error);
      }
      break;

    case 'exchange-token':
      const publicToken = process.argv[3];
      if (!publicToken) {
        console.error('Please provide a public token');
        process.exit(1);
      }
      try {
        const accessToken = await exchangePublicToken(publicToken);
        console.log('Access token received:', accessToken);
      } catch (error) {
        console.error('Failed to exchange public token:', error);
      }
      break;

    default:
      console.log(`
Available commands:
  create-link         - Create a new link token
  exchange-token     - Exchange a public token for an access token
      `);
  }
}

main().catch(console.error); 