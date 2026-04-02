import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const Camara = ({ onCapture, fotosRequeridas }) => {
  const webcamRef = useRef(null);
  const [capturas, setCapturas] = useState({});
  const [fotoActiva, setFotoActiva] = useState(fotosRequeridas ? fotosRequeridas[0] : '');

  useEffect(() => {
    if (fotosRequeridas && (!fotoActiva || !fotosRequeridas.includes(fotoActiva))) {
      const faltantes = fotosRequeridas.filter(f => !capturas[f]);
      setFotoActiva(faltantes.length > 0 ? faltantes[0] : fotosRequeridas[0]);
    }
  }, [fotosRequeridas]);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const nuevasCapturas = { ...capturas, [fotoActiva]: imageSrc };
    setCapturas(nuevasCapturas);
    
    const faltantes = fotosRequeridas.filter(f => !nuevasCapturas[f]);
    if (faltantes.length > 0) {
      setFotoActiva(faltantes[0]);
    }

    const hora = new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'medium' });
    onCapture(nuevasCapturas, hora);
  };

  const eliminarFoto = (nombre) => {
    const nuevas = { ...capturas };
    delete nuevas[nombre];
    setCapturas(nuevas);
    setFotoActiva(nombre);
    onCapture(nuevas, new Date().toLocaleString('es-ES'));
  };

  if (!fotosRequeridas || fotosRequeridas.length === 0) return <div>Cargando cámara...</div>;

  const progreso = Math.round((Object.keys(capturas).length / fotosRequeridas.length) * 100);

  return (
    <div className="card">
      <h2 className="card-title"> 📸 Evidencia Fotográfica ({progreso}%)</h2>
      
      <div style={{ marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {fotosRequeridas.map(req => {
          const tomada = !!capturas[req];
          return (
            <button key={req} onClick={() => setFotoActiva(req)}
              style={{
                padding: '8px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', border: 'none',
                background: fotoActiva === req ? '#2196F3' : (tomada ? '#4CAF50' : '#e0e0e0'),
                color: fotoActiva === req || tomada ? 'white' : '#333',
                fontWeight: fotoActiva === req ? 'bold' : 'normal'
              }}>
              {tomada ? '✅ ' : '📷 '} {req}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="camera-preview" style={{ position: 'relative', background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '5px 10px', borderRadius: '20px', zIndex: 10 }}>
              Tomando foto de: <strong>{fotoActiva}</strong>
            </div>

            {capturas[fotoActiva] ? (
              <img src={capturas[fotoActiva]} alt="Captura" className="w-full h-auto rounded-lg" style={{ display: 'block' }} />
            ) : (
              <Webcam
                audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full h-auto rounded-lg"
                videoConstraints={{ facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            )}
          </div>
          
          <div className="mt-4 flex gap-4">
            {!capturas[fotoActiva] ? (
               <button onClick={capture} className="btn btn-primary flex-1">📸 Capturar {fotoActiva}</button>
            ) : (
               <button onClick={() => eliminarFoto(fotoActiva)} className="btn btn-secondary flex-1">🔄 Retomar Foto</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camara;
