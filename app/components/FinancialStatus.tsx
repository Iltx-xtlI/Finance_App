import { useEffect, useState } from 'react'
import CreditCardLink from './CreditCardLink'

interface Transaction {
  amount: number
  date: string
  description: string
}

interface FinancialStatusProps {
  income: number
  setIncome: (income: number) => void
  bills: {
    tv: number
    grocery: number
    utility: number
  }
}

export default function FinancialStatus({ income, setIncome, bills }: FinancialStatusProps) {
  const [color, setColor] = useState('bg-gray-500')
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const handleTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions)
  }

  useEffect(() => {
    const totalBills = bills.tv + bills.grocery + bills.utility + 
      transactions.reduce((sum, t) => sum + t.amount, 0)
    
    setColor(income > totalBills ? 'bg-green-500' : 'bg-red-500')
  }, [income, bills, transactions])

  return (
    <div className="mt-8 w-full max-w-md">
      <h2 className="text-xl mb-4 text-center">Financial Status</h2>
      <CreditCardLink onSuccess={handleTransactions} />
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="font-bold">Income</h3>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="p-2 bg-[#A9A9A9] text-[#2C2C2C] rounded"
          />
        </div>
        <div>
          <h3 className="font-bold">Total Bills</h3>
          <p>{bills.tv + bills.grocery + bills.utility}</p>
        </div>
      </div>
      <div className={`w-full h-4 ${color} rounded`} />
    </div>
  )
}

