import { WebCamComponent } from "../webCam/WebcamComponent";
import { MashComponent } from "../webCam/MashComponent";
import { MediaPineHandDetect } from "../mediaPipe/MediaPineHandDetect";
const DetectorComponent = () => {
  const [webcamRef, canvasRef] = MediaPineHandDetect();
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
