import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const Camara = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    const hora = new Date().toLocaleString('es-ES', {
      dateStyle: 'full',
      timeStyle: 'medium'
    });
    onCapture(imageSrc, hora);
  };

  return (
    <div className="card">
      <h2 className="card-title">📸 Capturar Evidencia Fotográfica</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="camera-preview">
            {imgSrc ? (
              <img src={imgSrc} alt="Captura" className="w-full h-auto rounded-lg" />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-auto rounded-lg"
                videoConstraints={{
                  facingMode: 'environment',
                  width: { ideal: 1280 },
                  height: { ideal: 720 }
                }}
              />
            )}
          </div>
          <div className="mt-4 flex gap-4">
            <button onClick={capture} className="btn btn-primary flex-1">
              {imgSrc ? '📸 Tomar Otra Foto' : '📸 Capturar Foto'}
            </button>
            {imgSrc && (
              <button onClick={() => setImgSrc(null)} className="btn btn-secondary flex-1">
                🔄 Reintentar
              </button>
            )}
          </div>
        </div>
        <div className="info-box flex-1">
          <h3 className="font-bold mb-2">Instrucciones:</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Asegúrese de que el vehículo y la falla estén completamente visibles.</li>
            <li>Capture la placa del vehículo si es posible.</li>
            <li>Procure buena iluminación para mejor calidad.</li>
            <li>Mantenga el dispositivo estable.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Camara;