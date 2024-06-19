import _debounce from 'lodash/debounce';

// fungsi jepret foto
export const capturePhoto = _debounce(async (webcamRef, api) => {
  const imageSrc = webcamRef.current.getScreenshot();
  const formData = new FormData();
  formData.append("image", imageSrc);

  try{
    const response = await api.post("/Capture", formData);
    response === 200 && alert("Success");   
  }catch(err){
    console.log(err);
  }
}, 50);

// fungsi memulai rekam
export const startCapture = _debounce((webcamRef, mediaRecorderRef, setCapturing, setRecordedChunks) => {
  setCapturing(true);
  mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
    mimeType: 'video/webm',
  });
  mediaRecorderRef.current.addEventListener(
    'dataavailable',
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    }
  );
  mediaRecorderRef.current.start();
  console.log('capture');	
}, 50);

// fungsi berhenti rekam
export const stopCapture = _debounce(async (mediaRecorderRef, setCapturing, setRecordedChunks, api) => {
  mediaRecorderRef.current.stop();
  mediaRecorderRef.current.onstop = async () => {
    setCapturing(false);

    // fungsi proses selesai dan mengunggah video
    setRecordedChunks(_debounce(async (prevChunks) => {
      if (prevChunks.length) {
        const blob = new Blob(prevChunks, {
          type: 'video/webm',
        });

        const formData = new FormData();
        formData.append('video', blob);

        try {
          const resp = await api.post('/Record', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (resp.status === 200) {
            alert('Video berhasil diunggah');
          } else {
            alert('Gagal mengunggah video');
          }
        } catch (error) {
          console.error('Error uploading video:', error);
          alert('Terjadi kesalahan saat mengunggah video');
        }
        console.log(prevChunks);
      }
      return [];
    }), 50);
  };
  console.log('stop');
}, 50);