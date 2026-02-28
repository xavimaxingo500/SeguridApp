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
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4" style={{ color: '#1a365d' }}>3. Capturar Evidencia Fotográfica</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            {imgSrc ? (
              <img src={imgSrc} alt="Captura" className="w-full h-auto" />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-auto"
                videoConstraints={{
                  facingMode: 'environment',
                  width: { ideal: 1280 },
                  height: { ideal: 720 }
                }}
              />
            )}
          </div>
          
          <div className="mt-4 flex gap-4">
            <button
              onClick={capture}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
              style={{ background: '#2196F3', color: 'white', padding: '12px', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%' }}
            >
              {imgSrc ? 'Tomar Otra Foto' : 'Capturar Foto'}
            </button>
            
            {imgSrc && (
              <button
                onClick={() => setImgSrc(null)}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
                style={{ background: '#757575', color: 'white', padding: '12px', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%', marginTop: '10px' }}
              >
                Reintentar
              </button>
            )}
          </div>
        </div>
        
        <div className="flex-1 bg-gray-50 p-4 rounded-lg mt-4" style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
          <h3 className="font-bold mb-2">Instrucciones:</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm" style={{ paddingLeft: '20px' }}>
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