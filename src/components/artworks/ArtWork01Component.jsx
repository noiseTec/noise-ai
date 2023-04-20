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
    <div className="video-wrapper aspect-video flex items-center justify-center h-full">
      <video
        id="artwork-song"
        className="w-full"
        src="/video.mp4"
        autoPlay
        loop
      ></video>
    </div>
    // <Canvas>
    //   <VideoComponent />
    // </Canvas>
  );
};
