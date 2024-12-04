'use client'

interface PlaidLinkProps {
  // Add your props here
}

export default function PlaidLink(props: PlaidLinkProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Connect Your Bank</h2>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => {
          // Add Plaid Link logic here
        }}
      >
        Connect Account
      </button>
    </div>
  )
} 