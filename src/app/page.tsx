import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Home() {
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load('path/to/your/house/model.glb', (gltf) => {
      const house = gltf.scene;
      scene.add(house);
      house.rotation.y = Math.PI; // Start with the house facing the camera

      const animate = function () {
        requestAnimationFrame(animate);
        house.rotation.y += 0.01; // Rotate the house
        renderer.render(scene, camera);
      };

      animate();
    });

    camera.position.z = 5;

    return () => {
      renderer.dispose();
    };
  }, []);

  const handleEnterHome = () => {
    setIsEntering(true);
    // Logic to transition to the interactive 3D indoor floor plan
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Finance App</h1>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleEnterHome}>
        Enter Home
      </button>
    </main>
  );
}
