'use client'

import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import Character from './Character'
import Interior from './Interior'
import MiniMap from './MiniMap'
import FinancialStatus from './FinancialStatus'
import { useState } from 'react'

interface InteriorScreenProps {
  income: number
  setIncome: (income: number) => void
  expenses: { tv: number; groceries: number; utilities: number }
  updateExpense: (type: 'tv' | 'groceries' | 'utilities', amount: number) => void
}

export default function InteriorScreen({ income, setIncome, expenses, updateExpense }: InteriorScreenProps) {
  const [currentRoom, setCurrentRoom] = useState('Living Room')

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow relative">
        <Canvas camera={{ position: [0, 5, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Physics>
            <Character setCurrentRoom={setCurrentRoom} />
            <Interior expenses={expenses} updateExpense={updateExpense} />
          </Physics>
        </Canvas>
        <MiniMap currentRoom={currentRoom} />
      </div>
      <FinancialStatus
        income={income}
        setIncome={setIncome}
        expenses={expenses}
      />
    </div>
  )
}

