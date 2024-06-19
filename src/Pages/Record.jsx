import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import api from '../Function/api';
import { startCapture, stopCapture } from '../Function/startCamera';

const Record = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {

    // fungsi untuk mengurut eksekusi rekam
    const startRecording = async () => {
      startCapture(webcamRef, mediaRecorderRef, setCapturing, setRecordedChunks);
        setTimeout(() => {
          stopCapture(mediaRecorderRef, setCapturing, setRecordedChunks, api);
        }, 5000);
    }

    // eksekusi rekam
    setTimeout(() => {
      startRecording();
    }, 1500);

  }, []);

  return (
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <div style={{ textAlign: 'center', margin: '0 auto', fontFamily: 'sans-serif', fontSize: '24px', marginBottom: '20px' }}>Record</div>

      <Webcam 
      audio={false} 
      ref={webcamRef} 
      style={{ visibility: 'hidden' }}
      />

    </div>
  )
}

export default Record