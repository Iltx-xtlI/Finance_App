'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    keyboardState: { [key: string]: boolean }
  }
}

export default function KeyboardControls() {
  useEffect(() => {
    window.keyboardState = {}

    const handleKeyDown = (e: KeyboardEvent) => {
      window.keyboardState[e.code] = true
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      window.keyboardState[e.code] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return null
}

