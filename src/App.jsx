import { useEffect, useState } from 'react'
import { Route, Routes, matchPath, useLocation, useNavigate } from 'react-router-dom'
import Capture from './Pages/Capture'
import Record from './Pages/Record'

function App() {

  const Location = useLocation();
  const navTo = useNavigate();

  useEffect(() => {
    const { pathname } = Location;
    if (matchPath('/FaceCapture/', pathname)) 
      {navTo('/FaceCapture/Record', {replace: true})
    };

  },[location, navTo]);

  return (
    <>
      <Routes>
        <Route path="/Capture" element={<Capture />} />
        <Route path="/Record" element={<Record />} />
      </Routes>
    </>
  )
}

export default App
