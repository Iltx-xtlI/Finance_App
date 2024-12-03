import { useState } from 'react'

interface RoomProps {
  name: string
  onBillUpdate: (type: 'tv' | 'grocery' | 'utility', amount: number) => void
}

export default function Room({ name, onBillUpdate }: RoomProps) {
  const [showBill, setShowBill] = useState(false)
  const [billAmount, setBillAmount] = useState(0)

  const handleClick = () => {
    setShowBill(true)
  }

  const handleBillSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onBillUpdate(getBillType(), billAmount)
    setShowBill(false)
  }

  const getBillType = (): 'tv' | 'grocery' | 'utility' => {
    switch (name) {
      case 'Living Room':
        return 'tv'
      case 'Kitchen':
        return 'grocery'
      case 'Bedroom':
        return 'utility'
      default:
        return 'tv'
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#2C2C2C] text-[#D3D3D3]">
      <h2 className="text-2xl mb-4">{name}</h2>
      {showBill ? (
        <form onSubmit={handleBillSubmit} className="flex flex-col items-center">
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(Number(e.target.value))}
            className="mb-2 p-2 bg-[#A9A9A9] text-[#2C2C2C] rounded"
          />
          <button type="submit" className="bg-[#D3D3D3] text-[#2C2C2C] px-4 py-2 rounded">
            Submit Bill
          </button>
        </form>
      ) : (
        <button onClick={handleClick} className="bg-[#D3D3D3] text-[#2C2C2C] px-4 py-2 rounded">
          {name === 'Living Room' && 'View TV Bill'}
          {name === 'Kitchen' && 'View Grocery Bill'}
          {name === 'Bedroom' && 'View Utility Bill'}
        </button>
      )}
    </div>
  )
}

