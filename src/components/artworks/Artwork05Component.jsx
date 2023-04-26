import { useEffect, useRef } from "react";
import p5 from "p5";
import { Hands } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import SketchAw5 from "../sketches/SketchAw5";

const ArtWork05Component = () => {
  // create a reference to the container in which the p5 instance should place the canvas
  const p5ContainerRef = useRef();

  const webCamRef = useRef(null);
  var camera = null;

  function onResults(result) {
    // console.log(result)
    if (result.multiHandLandmarks.length > 0) {
      if(localStorage.getItem("corX") !== result.multiHandLandmarks[0][8].x * window.innerWidth){
        localStorage.setItem("pCorX", localStorage.getItem("corX"))
        localStorage.setItem(
          "corX",
          result.multiHandLandmarks[0][8].x * window.innerWidth
        );
      }
    }
  }
  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });
    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);

    if (typeof webCamRef !== "undefined" && webCamRef.current !== null) {
      camera = new cam.Camera(webCamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webCamRef.current.video });
        },
        width: 400,
        height: 400,
      });
      camera.start();
    }
    // On component creation, instantiate a p5 object with the sketch and container reference
    const p5Instance = new p5(SketchAw5, p5ContainerRef.current);
    // On component destruction, delete the p5 instance
    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <>
      <Webcam
        hidden={true}
        ref={webCamRef}
        style={{
          position: "absolute",
          width: window.innerWidth,
          height: window.innerHeight,
        }}
      />
      <div
        className="Artwork5 flex items-center justify-center w-full h-full"
        ref={p5ContainerRef}
      ></div>
    </>
  );
};

export default ArtWork05Component;
