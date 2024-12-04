import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

if (!PLAID_CLIENT_ID || !PLAID_SECRET) {
  throw new Error('Missing required environment variables PLAID_CLIENT_ID or PLAID_SECRET');
}

// Initialize the Plaid client
const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(configuration);

export async function createLinkToken(): Promise<string> {
  try {
    const response = await client.linkTokenCreate({
      user: { client_user_id: 'user-id' },
      client_name: 'Finance App',
      products: [Products.Auth, Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en',
    });
    return response.data.link_token;
  } catch (error) {
    console.error('Error creating link token:', error);
    throw error;
  }
}

export async function exchangePublicToken(publicToken: string): Promise<string> {
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error exchanging public token:', error);
    throw error;
  }
}

export async function getAccounts(accessToken: string) {
  try {
    const response = await client.accountsGet({
      access_token: accessToken,
    });
    return response.data.accounts;
  } catch (error) {
    console.error('Error getting accounts:', error);
    throw error;
  }
}

export async function getTransactions(accessToken: string, startDate: string, endDate: string) {
  try {
    const response = await client.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
    });
    return response.data.transactions;
  } catch (error) {
    console.error('Error getting transactions:', error);
    throw error;
  }
}

export async function getBalance(accessToken: string) {
  try {
    const response = await client.accountsBalanceGet({
      access_token: accessToken,
    });
    return response.data.accounts;
  } catch (error) {
    console.error('Error getting balance:', error);
    throw error;
  }
}

export async function getItem(accessToken: string) {
  try {
    const response = await client.itemGet({
      access_token: accessToken,
    });
    return response.data.item;
  } catch (error) {
    console.error('Error getting item:', error);
    throw error;
  }
}

export async function getInstitution(institutionId: string) {
  try {
    const response = await client.institutionsGetById({
      institution_id: institutionId,
      country_codes: [CountryCode.Us],
    });
    return response.data.institution;
  } catch (error) {
    console.error('Error getting institution:', error);
    throw error;
  }
}

// Add more Plaid-related functions as needed 