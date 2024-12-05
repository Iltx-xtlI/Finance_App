import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Character from '@/components/Character';

export default function Dashboard() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load('path/to/your/indoor/house/model.glb', (gltf) => {
      scene.add(gltf.scene);
    });

    camera.position.set(0, 1.6, 5); // Adjust camera height

    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Character />
      <h2 className="text-2xl font-semibold mt-4">Welcome to Your Financial Home</h2>
      {/* Add UI elements for rooms and financial tracking */}
    </div>
  );
} 