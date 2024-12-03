'use client'

import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import HouseScreen from './components/HouseScreen'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'house'>('home')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#2C2C2C] text-[#A9A9A9]">
      {currentScreen === 'home' ? (
        <HomeScreen onEnterHome={() => setCurrentScreen('house')} />
      ) : (
        <HouseScreen />
      )}
    </main>
  )
}

