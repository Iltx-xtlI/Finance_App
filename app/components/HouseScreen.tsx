'use client'

import { useState } from 'react'
import Room from './Room'
import MiniMap from './MiniMap'
import FinancialStatus from './FinancialStatus'

const rooms = ['Living Room', 'Kitchen', 'Bedroom']

export default function HouseScreen() {
  const [currentRoom, setCurrentRoom] = useState(0)
  const [income, setIncome] = useState(0)
  const [bills, setBills] = useState({ tv: 0, grocery: 0, utility: 0 })

  const handleSwipe = (direction: 'left' | 'right') => {
    setCurrentRoom((prev) => {
      if (direction === 'left') {
        return (prev - 1 + rooms.length) % rooms.length
      } else {
        return (prev + 1) % rooms.length
      }
    })
  }

  const handleBillUpdate = (type: 'tv' | 'grocery' | 'utility', amount: number) => {
    setBills((prev) => ({ ...prev, [type]: amount }))
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <MiniMap currentRoom={rooms[currentRoom]} />
      <div className="w-full h-[60vh] relative">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#D3D3D3] text-[#A9A9A9] px-2 py-4 rounded-r-lg"
          onClick={() => handleSwipe('left')}
        >
          &lt;
        </button>
        <Room
          name={rooms[currentRoom]}
          onBillUpdate={handleBillUpdate}
        />
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#D3D3D3] text-[#A9A9A9] px-2 py-4 rounded-l-lg"
          onClick={() => handleSwipe('right')}
        >
          &gt;
        </button>
      </div>
      <FinancialStatus
        income={income}
        setIncome={setIncome}
        bills={bills}
      />
    </div>
  )
}

