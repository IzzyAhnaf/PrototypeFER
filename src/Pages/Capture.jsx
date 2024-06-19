import React,{ useEffect, useRef } from "react"
import Webcam from "react-webcam";
import api from "../Function/api";
import { capturePhoto } from "../Function/startCamera";

const Capture = () => {

    const webcamRef = useRef(null);

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    useEffect(() => {
        setTimeout(() => {
            capturePhoto(webcamRef, api);
        }, 1500);

    },[]);

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <div style={{ textAlign: 'center', margin: '0 auto', fontFamily: 'sans-serif', fontSize: '24px', marginBottom: '20px' }}>Capture</div>

            <Webcam
                audio={false}
                height={640}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={360}
                style={{visibility: 'hidden'}}
                videoConstraints={videoConstraints}
            />
        </div>
    )
}
export default Capture