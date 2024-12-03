import { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

interface CreditCardLinkProps {
  onSuccess: (transactions: any[]) => void;
}

export default function CreditCardLink({ onSuccess }: CreditCardLinkProps) {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  const createLinkToken = useCallback(async () => {
    const response = await fetch('/api/plaid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'create_link_token' })
    });
    const { link_token } = await response.json();
    setLinkToken(link_token);
  }, []);

  const onPlaidSuccess = useCallback(async (public_token: string) => {
    const response = await fetch('/api/plaid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        type: 'exchange_public_token', 
        public_token 
      })
    });
    const data = await response.json();
    // Here you would typically store the access_token securely
    // and use it to fetch transactions
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: onPlaidSuccess
  });

  useEffect(() => {
    createLinkToken();
  }, [createLinkToken]);

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Link Credit Card
    </button>
  );
} 