import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import modelPath from '../../public/untitled.glb';

const Model = ({ scrollPosition }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  const ref = useRef();

  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.setHex(0x3496d3);
    }
  });

  useFrame(() => {
    if (ref.current) {
      const rotationFactor = -0.005;
      ref.current.rotation.y = scrollPosition * rotationFactor;
  
      // Adjust the model's position to align it vertically in the viewport
      ref.current.position.y = -1.3; // Raise the model up
    }
  });

  return <primitive object={gltf.scene} ref={ref} />;
};

const CameraController = ({ scrollPosition }) => {
  const { camera } = useThree();

  useEffect(() => {
    // Example dynamic camera adjustment based on scroll
    const cameraPositionFactor = 0.01;
    camera.position.z = 5 + scrollPosition * cameraPositionFactor;
    camera.lookAt(0, 0, 0);
  }, [scrollPosition, camera]);

  return null;
};

const My3DComponent = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', updatePosition);

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return (
    <div style={{ height: 900, width: '100%' }}>
<Canvas camera={{ position: [0, 0, 0], fov: 4 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <spotLight position={[10, 10, 10]} angle={10} penumbra={1} />
          <directionalLight position={[-2, 5, 2]} intensity={1} />
          <Model scrollPosition={scrollPosition} />
          <CameraController scrollPosition={scrollPosition} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default My3DComponent;
