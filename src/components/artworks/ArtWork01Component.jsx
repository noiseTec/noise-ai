import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
const VideoComponent = () => {
  const video = document.createElement("video");
  video.src = "/video.mp4";
  video.autoplay = true;
  video.loop = true;
  video.play();
  const videoTexture = new THREE.VideoTexture(video);
  return (
    <mesh>
      <planeGeometry />
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
