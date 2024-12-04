#!/usr/bin/env node
import { createLinkToken, exchangePublicToken, getAccounts, getTransactions, getBalance, getItem, getInstitution } from './plaid-cli';
import { Logger } from './utils/logger';
import { validateAccessToken, validatePublicToken, validateDate, validateInstitutionId, ValidationError } from './utils/validators';

const HELP_TEXT = `
Available commands:
  create-link         - Create a new link token
  exchange-token     - Exchange a public token for an access token
  get-accounts      - Get accounts for an access token
  get-transactions  - Get transactions for an access token
  get-balance       - Get balance for an access token
  get-item          - Get item information for an access token
  get-institution   - Get institution information by ID

Environment variables:
  DEBUG             - Set to 'true' for debug logging
`;

async function main() {
  const command = process.argv[2];
  const args = process.argv.slice(3);

  try {
    switch (command) {
      case 'create-link':
        Logger.info('Creating link token...');
        const linkToken = await createLinkToken();
        Logger.success('Link token created successfully');
        Logger.debug('Link token details:', linkToken);
        console.log(linkToken);
        break;

      case 'exchange-token':
        if (!args[0] || !validatePublicToken(args[0])) {
          throw new ValidationError('Please provide a valid public token');
        }
        Logger.info('Exchanging public token...');
        const accessToken = await exchangePublicToken(args[0]);
        Logger.success('Access token received successfully');
        Logger.debug('Access token details:', accessToken);
        console.log(accessToken);
        break;

      case 'get-accounts':
        if (!args[0] || !validateAccessToken(args[0])) {
          throw new ValidationError('Please provide a valid access token');
        }
        Logger.info('Fetching accounts...');
        const accounts = await getAccounts(args[0]);
        Logger.success(`Found ${accounts.length} accounts`);
        console.log(JSON.stringify(accounts, null, 2));
        break;

      case 'get-transactions':
        if (args.length < 3) {
          throw new ValidationError('Please provide: access_token start_date end_date\nExample: get-transactions access-token 2024-01-01 2024-03-14');
        }
        if (!validateAccessToken(args[0])) {
          throw new ValidationError('Invalid access token');
        }
        if (!validateDate(args[1]) || !validateDate(args[2])) {
          throw new ValidationError('Invalid date format. Use YYYY-MM-DD');
        }
        Logger.info('Fetching transactions...');
        const transactions = await getTransactions(args[0], args[1], args[2]);
        Logger.success(`Found ${transactions.length} transactions`);
        console.log(JSON.stringify(transactions, null, 2));
        break;

      case 'get-balance':
        if (!args[0] || !validateAccessToken(args[0])) {
          throw new ValidationError('Please provide a valid access token');
        }
        Logger.info('Fetching balances...');
        const balances = await getBalance(args[0]);
        Logger.success(`Found balances for ${balances.length} accounts`);
        console.log(JSON.stringify(balances, null, 2));
        break;

      case 'get-item':
        if (!args[0] || !validateAccessToken(args[0])) {
          throw new ValidationError('Please provide a valid access token');
        }
        Logger.info('Fetching item information...');
        const item = await getItem(args[0]);
        Logger.success('Item information retrieved');
        console.log(JSON.stringify(item, null, 2));
        break;

      case 'get-institution':
        if (!args[0] || !validateInstitutionId(args[0])) {
          throw new ValidationError('Please provide a valid institution ID');
        }
        Logger.info('Fetching institution information...');
        const institution = await getInstitution(args[0]);
        Logger.success('Institution information retrieved');
        console.log(JSON.stringify(institution, null, 2));
        break;

      default:
        Logger.info(HELP_TEXT);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      Logger.error(error.message);
    } else {
      Logger.error('An error occurred:', error);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  Logger.error('Unhandled error:', error);
  process.exit(1);
}); 