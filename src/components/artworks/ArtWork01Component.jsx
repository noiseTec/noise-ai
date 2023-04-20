import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
const VideoComponent = () => {
  const video = document.createElement("video");
  video.src = "/video.mp4";
  video.autoplay = true;
  video.loop = true;
  document.addEventListener(
    "click",
    () => {
      video.play();
    },
    { once: true }
  );
  const videoTexture = new THREE.VideoTexture(video);
  const planeGeometry = new THREE.PlaneGeometry(20, 10);
  return (
    <mesh geometry={planeGeometry}>
      <meshBasicMaterial map={videoTexture} />
    </mesh>
  );
};
export const ArtWork01Component = () => {
  return (
    <Canvas>
      <VideoComponent />
    </Canvas>
  );
};
