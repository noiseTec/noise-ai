import { WebCamComponent } from "../webCam/WebcamComponent";
import { MashComponent } from "../webCam/MashComponent";
import { MediaPineHandDetect } from "../mediaPipe/MediaPineHandDetect";
import { useEffect } from "react";
const DetectorComponent = () => {
  const [webcamRef, canvasRef] = MediaPineHandDetect();
  useEffect(() => {
    console.log(webcamRef);
  })
  return (
    <div>
      <center>
        <div>
          <WebCamComponent webcamRef={webcamRef} />
          <MashComponent canvasRef={canvasRef} />
        </div>
      </center>
    </div>
  );
};
export default DetectorComponent;
