import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { TextureLoader } from 'three'
import * as THREE from 'three'

export default function House(props: any) {
  // Load the OBJ model
  const obj = useLoader(
    OBJLoader, 
    'https://raw.githubusercontent.com/Iltx-xtlI/3D-Assets-for-Finance-App/8a61d23e28cc284e3763c6d7086dad1cb16f69b5/All_gray_house_Front_1126201843_refine.obj'
  )
  
  // Load the texture
  const texture = useLoader(TextureLoader, '/path-to-your-texture.jpg') // You'll need to host this texture
  
  // Apply materials and textures
  obj.traverse((child: any) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        map: texture,
        color: 0xcccccc, // Light gray color
        roughness: 0.5,
        metalness: 0.1
      })
    }
  })

  return (
    <Suspense fallback={<LoadingFallback />}>
      <primitive
        object={obj}
        scale={[0.02, 0.02, 0.02]} // Adjust scale as needed
        position={[0, 0, 0]} // Adjust position as needed
        {...props}
      />
    </Suspense>
  )
}

