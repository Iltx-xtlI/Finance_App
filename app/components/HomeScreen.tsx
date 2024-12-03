'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import House from './House'
import CreditCardLink from './CreditCardLink'

export default function HomeScreen({ onEnterHome }: { onEnterHome: () => void }) {
  const [rotation, setRotation] = useState(0)
  const [rotationComplete, setRotationComplete] = useState(false)

  useEffect(() => {
    const startTime = Date.now()
    const duration = 5000 // 5 seconds for full rotation
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      if (elapsed < duration) {
        setRotation((Math.PI * 2 * elapsed) / duration)
        requestAnimationFrame(animate)
      } else {
        setRotationComplete(true)
      }
    }
    
    animate()
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <h1 className="text-3xl font-bold text-[#D3D3D3] mb-8">Welcome to the Finance App</h1>
      <div className="w-full h-[60vh]">
        <Canvas camera={{ position: [0, 2, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <House rotation={[0, rotation, 0]} />
          <OrbitControls enabled={rotationComplete} />
        </Canvas>
      </div>
      {rotationComplete && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <CreditCardLink onSuccess={() => {}} />
          <button
            className="px-6 py-3 bg-[#D3D3D3] text-[#A9A9A9] rounded-lg font-semibold"
            onClick={onEnterHome}
          >
            Enter Home
          </button>
        </div>
      )}
    </div>
  )
}

