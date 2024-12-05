import { useState } from 'react';

export default function FinancialHealth() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const calculateHealth = () => {
    const balance = income - expenses;
    if (balance > 0) return 'bg-green-500';
    if (balance === 0) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className={`health-indicator ${calculateHealth()} p-4 rounded`}>
      <h3 className="text-lg font-bold">Financial Health</h3>
      <input
        type="number"
        placeholder="Enter Income"
        className="border p-2 rounded mb-2"
        onChange={(e) => setIncome(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Enter Expenses"
        className="border p-2 rounded mb-2"
        onChange={(e) => setExpenses(Number(e.target.value))}
      />
      <div className="mt-2">Current Status: {calculateHealth()}</div>
    </div>
  );
} 