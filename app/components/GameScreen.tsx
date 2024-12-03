'use client'

import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import Character from './Character'
import House from './House'
import MiniMap from './MiniMap'
import FinancialStatus from './FinancialStatus'
import { useState } from 'react'

interface GameScreenProps {
  income: number
  setIncome: (income: number) => void
  expenses: { tv: number; grocery: number; utility: number }
  updateExpense: (type: 'tv' | 'grocery' | 'utility', amount: number) => void
}

export default function GameScreen({ income, setIncome, expenses, updateExpense }: GameScreenProps) {
  const [currentRoom, setCurrentRoom] = useState('Living Room')

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow relative">
        <Canvas camera={{ position: [0, 5, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Physics>
            <Character setCurrentRoom={setCurrentRoom} />
            <House expenses={expenses} updateExpense={updateExpense} />
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

