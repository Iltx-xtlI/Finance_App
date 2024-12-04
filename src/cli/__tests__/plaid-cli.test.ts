import { createLinkToken, exchangePublicToken, getAccounts, getBalance } from '../plaid-cli';

// Mock the PlaidApi
jest.mock('plaid', () => ({
  Configuration: jest.fn(),
  PlaidApi: jest.fn(() => ({
    linkTokenCreate: jest.fn().mockResolvedValue({
      data: { link_token: 'test-link-token' }
    }),
    itemPublicTokenExchange: jest.fn().mockResolvedValue({
      data: { access_token: 'test-access-token' }
    }),
    accountsGet: jest.fn().mockResolvedValue({
      data: {
        accounts: [
          {
            account_id: 'test-account',
            balances: {
              available: 100,
              current: 110,
              iso_currency_code: 'USD'
            },
            name: 'Test Account',
            type: 'depository'
          }
        ]
      }
    }),
    accountsBalanceGet: jest.fn().mockResolvedValue({
      data: {
        accounts: [
          {
            account_id: 'test-account',
            balances: {
              available: 100,
              current: 110,
              iso_currency_code: 'USD'
            }
          }
        ]
      }
    })
  })),
  PlaidEnvironments: {
    sandbox: 'https://sandbox.plaid.com'
  },
  Products: {
    Auth: 'auth',
    Transactions: 'transactions'
  },
  CountryCode: {
    Us: 'US'
  }
}));

describe('Plaid CLI Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createLinkToken', () => {
    it('should create a link token successfully', async () => {
      const token = await createLinkToken();
      expect(token).toBe('test-link-token');
    });
  });

  describe('exchangePublicToken', () => {
    it('should exchange public token for access token', async () => {
      const token = await exchangePublicToken('test-public-token');
      expect(token).toBe('test-access-token');
    });
  });

  describe('getAccounts', () => {
    it('should retrieve accounts successfully', async () => {
      const accounts = await getAccounts('test-access-token');
      expect(accounts).toHaveLength(1);
      expect(accounts[0].account_id).toBe('test-account');
    });
  });

  describe('getBalance', () => {
    it('should retrieve balance successfully', async () => {
      const balances = await getBalance('test-access-token');
      expect(balances).toHaveLength(1);
      expect(balances[0].balances.available).toBe(100);
    });
  });
}); 