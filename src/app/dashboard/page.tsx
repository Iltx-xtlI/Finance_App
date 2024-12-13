"use client";

import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Character from '@/components/Character';
import { useSession, signOut } from 'next-auth/react';
import SpeedInsightsComponent from '@/components/SpeedInsights';

export default function Dashboard() {
  const { data: session } = useSession();
  const [insights, setInsights] = useState(null);

  const fetchSpeedInsights = async () => {
    const response = await fetch('/api/speed-insights?url=https://yourwebsite.com');
    const data = await response.json();
    setInsights(data);
  };

  useEffect(() => {
    if (!session) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load('path/to/your/indoor/house/model.glb', (gltf: any) => {
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
  }, [session]);

  return (
    <div className="flex flex-col items-center">
      <Character />
      <h2 className="text-2xl font-semibold mt-4">Welcome to Your Financial Home</h2>
      <SpeedInsightsComponent />
      <button onClick={() => signOut()}>Sign Out</button>
      {/* Add UI elements for rooms and financial tracking */}
    </div>
  );
} 