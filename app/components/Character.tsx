import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import { Vector3 } from 'three'

export default function Character({ setCurrentRoom }: { setCurrentRoom: (room: string) => void }) {
  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 1, 0],
    type: "Dynamic",
    fixedRotation: true,
    linearDamping: 0.95
  }))

  const velocity = useRef([0, 0, 0])
  const position = useRef([0, 1, 0])

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v))
    api.position.subscribe((p) => {
      position.current = p
      // Update current room based on position
      if (p[0] < -2) setCurrentRoom('Living Room')
      else if (p[0] > 2) setCurrentRoom('Kitchen')
      else if (p[2] > 2) setCurrentRoom('Bedroom')
    })
  }, [api.velocity, api.position, setCurrentRoom])

  const keys = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keys.current.hasOwnProperty(e.code)) {
        keys.current[e.code as keyof typeof keys.current] = true
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      if (keys.current.hasOwnProperty(e.code)) {
        keys.current[e.code as keyof typeof keys.current] = false
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(() => {
    const { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } = keys.current
    const direction = new Vector3()

    if (ArrowUp) direction.z -= 1
    if (ArrowDown) direction.z += 1
    if (ArrowLeft) direction.x -= 1
    if (ArrowRight) direction.x += 1

    direction.normalize().multiplyScalar(5)
    
    // Keep y velocity constant to prevent falling
    api.velocity.set(direction.x, 0, direction.z)

    // Update camera position
    camera.position.set(
      position.current[0],
      position.current[1] + 2,
      position.current[2] + 5
    )
    camera.lookAt(position.current[0], position.current[1], position.current[2])
  })

  return null
}

