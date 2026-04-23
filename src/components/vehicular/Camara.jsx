// import React, { useRef, useState, useEffect } from 'react';
// import Webcam from 'react-webcam';

// const Camara = ({ onCapture, fotosRequeridas }) => {
//   const webcamRef = useRef(null);
//   const [capturas, setCapturas] = useState({});
//   const [fotoActiva, setFotoActiva] = useState('');
  
//   // Nuevos estados para la interfaz Full Screen
//   const [camaraAbierta, setCamaraAbierta] = useState(false);
//   const [esVertical, setEsVertical] = useState(false);
//   const [procesando, setProcesando] = useState(false);
//   const [exito, setExito] = useState(false);

//   // Inicializar la foto activa
//   useEffect(() => {
//     if (fotosRequeridas && fotosRequeridas.length > 0) {
//       const faltantes = fotosRequeridas.filter(f => !capturas[f]);
//       setFotoActiva(faltantes.length > 0 ? faltantes[0] : fotosRequeridas[0]);
//     }
//   }, [fotosRequeridas, capturas]);

//   // Detectar si el teléfono está en vertical
//   useEffect(() => {
//     const checarOrientacion = () => {
//       setEsVertical(window.innerHeight > window.innerWidth);
//     };
//     checarOrientacion();
//     window.addEventListener('resize', checarOrientacion);
//     return () => window.removeEventListener('resize', checarOrientacion);
//   }, []);

//   const abrirCamara = (fotoNombre) => {
//     setFotoActiva(fotoNombre);
//     setCamaraAbierta(true);
//   };

//   const capture = () => {
//     if (!webcamRef.current) return;
    
//     // 1. Inicia el estado de carga (Spinner)
//     setProcesando(true);
    
//     // Tomamos la foto
//     const imageSrc = webcamRef.current.getScreenshot();
    
//     // Simulamos un tiempo de proceso de 1.5 segundos para que el usuario lo note
//     setTimeout(() => {
//       setProcesando(false);
//       setExito(true); // 2. Mostramos palomita verde
      
//       const nuevasCapturas = { ...capturas, [fotoActiva]: imageSrc };
//       setCapturas(nuevasCapturas);
      
//       const hora = new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'medium' });
//       onCapture(nuevasCapturas, hora);

//       // 3. Después de medio segundo de éxito, pasamos a la siguiente o cerramos
//       setTimeout(() => {
//         setExito(false);
//         const faltantes = fotosRequeridas.filter(f => !nuevasCapturas[f]);
        
//         if (faltantes.length > 0) {
//           setFotoActiva(faltantes[0]); // Pasa a la siguiente foto
//         } else {
//           setCamaraAbierta(false); // Cierra la cámara si ya terminó todo
//         }
//       }, 800);

//     }, 1500); // 1.5 segundos de carga
//   };

//   const eliminarFoto = (nombre) => {
//     const nuevas = { ...capturas };
//     delete nuevas[nombre];
//     setCapturas(nuevas);
//     setFotoActiva(nombre);
//     onCapture(nuevas, new Date().toLocaleString('es-ES'));
//   };

//   if (!fotosRequeridas || fotosRequeridas.length === 0) return <div>Cargando módulo de cámara...</div>;
//   const progreso = Math.round((Object.keys(capturas).length / fotosRequeridas.length) * 100);
//   const todasTomadas = Object.keys(capturas).length === fotosRequeridas.length;

//   return (
//     <div className="card">
//       <h2 className="card-title">📸 Evidencia Fotográfica ({progreso}%)</h2>
      
//       {/* --- VISTA NORMAL (MENÚ DE FOTOS) --- */}
//       <p style={{ color: '#4a5568', marginBottom: '15px' }}>
//         Selecciona una foto pendiente o presiona el botón para abrir la cámara y tomarlas en orden.
//       </p>

//       <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
//         {fotosRequeridas.map(req => {
//           const tomada = !!capturas[req];
//           return (
//             <div key={req} style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: '1 1 45%', minWidth: '140px' }}>
//               <button 
//                 onClick={() => abrirCamara(req)}
//                 style={{
//                   padding: '12px 10px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', border: 'none',
//                   background: tomada ? '#4CAF50' : '#2196F3',
//                   color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
//                   boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
//                 }}>
//                 {tomada ? '✅ ' : '📷 '} {req}
//               </button>
//               {tomada && (
//                 <button onClick={() => eliminarFoto(req)} style={{ background: '#f44336', color: 'white', border: 'none', borderRadius: '6px', padding: '5px', fontSize: '0.75rem', cursor: 'pointer' }}>
//                   🗑️ Borrar y retomar
//                 </button>
//               )}
//             </div>
//           )
//         })}
//       </div>

//       {!todasTomadas && (
//         <button onClick={() => abrirCamara(fotoActiva)} className="btn btn-primary btn-large w-full" style={{ padding: '15px', fontSize: '1.1rem' }}>
//           📱 Abrir Cámara (Pantalla Completa)
//         </button>
//       )}

//       {/* --- VISTA FULL SCREEN (PANTALLA COMPLETA) --- */}
//       {camaraAbierta && (
//         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', zIndex: 99999, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
//           {/* Botón para cerrar */}
//           <button onClick={() => setCamaraAbierta(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', zIndex: 100, cursor: 'pointer' }}>
//             ✖
//           </button>

//           {/* Advertencia de Vertical */}
//           {esVertical && (
//             <div style={{ position: 'absolute', top: '20px', left: '20px', right: '70px', background: 'rgba(244, 67, 54, 0.9)', color: 'white', padding: '10px 15px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', zIndex: 100, animation: 'fadeIn 0.3s' }}>
//               ⚠️ Gira tu teléfono. La foto se guardará en formato horizontal (panorámico).
//             </div>
//           )}

//           {/* Indicador de foto actual (Esquina inferior izquierda) */}
//           <div style={{ position: 'absolute', bottom: '100px', left: '20px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '10px 15px', borderRadius: '8px', fontSize: '1rem', zIndex: 100 }}>
//             Tomando: <br/><strong style={{ color: '#4CAF50', fontSize: '1.2rem' }}>{fotoActiva}</strong>
//           </div>

//           {/* LA CÁMARA */}
//           <div style={{ position: 'relative', width: '100%', height: '70vh', overflow: 'hidden', background: '#111' }}>
//             <Webcam
//               audio={false} 
//               ref={webcamRef} 
//               screenshotFormat="image/jpeg" 
//               screenshotQuality={0.9} // 90% es el equilibrio perfecto entre calidad y no trabar el celular
//               videoConstraints={{ facingMode: 'environment' }}
//               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//             />

//             {/* OVERLAY DE PROCESAMIENTO (SPINNER Y ÉXITO) */}
//             {(procesando || exito) && (
//               <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: 200, animation: 'fadeIn 0.2s' }}>
//                 {procesando && (
//                   <>
//                     <div className="spinner" style={{ width: '50px', height: '50px', border: '5px solid #f3f3f3', borderTop: '5px solid #2196F3', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
//                     <p style={{ color: 'white', marginTop: '15px', fontWeight: 'bold' }}>Procesando foto...</p>
//                   </>
//                 )}
//                 {exito && (
//                   <div style={{ background: '#4CAF50', borderRadius: '50%', padding: '20px', animation: 'fadeIn 0.2s' }}>
//                     <span style={{ fontSize: '4rem', color: 'white' }}>✅</span>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Botón de Tomar Foto (Círculo grande abajo) */}
//           <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', zIndex: 100 }}>
//             <button 
//               onClick={capture} 
//               disabled={procesando || exito}
//               style={{
//                 width: '70px', height: '70px', borderRadius: '50%', background: 'white', border: '5px solid #ccc',
//                 cursor: (procesando || exito) ? 'not-allowed' : 'pointer',
//                 opacity: (procesando || exito) ? 0.5 : 1,
//                 boxShadow: '0 0 15px rgba(0,0,0,0.5)', transition: 'transform 0.1s'
//               }}
//               onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
//               onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
//             />
//           </div>
//         </div>
//       )}

//       {/* Animación del spinner inyectada por CSS */}
//       <style>{`
//         @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// };

// export default Camara;




import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const Camara = ({ onCapture, fotosRequeridas }) => {
  const webcamRef = useRef(null);
  const [capturas, setCapturas] = useState({});
  const [fotoActiva, setFotoActiva] = useState('');
  
  const [camaraAbierta, setCamaraAbierta] = useState(false);
  const [esVertical, setEsVertical] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    if (fotosRequeridas && fotosRequeridas.length > 0) {
      const faltantes = fotosRequeridas.filter(f => !capturas[f]);
      setFotoActiva(faltantes.length > 0 ? faltantes[0] : fotosRequeridas[0]);
    }
  }, [fotosRequeridas, capturas]);

  useEffect(() => {
    const checarOrientacion = () => {
      setEsVertical(window.innerHeight > window.innerWidth);
    };
    checarOrientacion();
    window.addEventListener('resize', checarOrientacion);
    return () => window.removeEventListener('resize', checarOrientacion);
  }, []);

  const abrirCamara = (fotoNombre) => {
    setFotoActiva(fotoNombre);
    setCamaraAbierta(true);
  };

  const capture = () => {
    if (!webcamRef.current) return;
    
    setProcesando(true);
    const imageSrc = webcamRef.current.getScreenshot();
    
    setTimeout(() => {
      setProcesando(false);
      setExito(true); 
      
      const nuevasCapturas = { ...capturas, [fotoActiva]: imageSrc };
      setCapturas(nuevasCapturas);
      
      const hora = new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'medium' });
      onCapture(nuevasCapturas, hora);

      setTimeout(() => {
        setExito(false);
        const faltantes = fotosRequeridas.filter(f => !nuevasCapturas[f]);
        
        if (faltantes.length > 0) {
          setFotoActiva(faltantes[0]); 
        } else {
          setCamaraAbierta(false); 
        }
      }, 800);

    }, 1500); 
  };

  const eliminarFoto = (nombre) => {
    const nuevas = { ...capturas };
    delete nuevas[nombre];
    setCapturas(nuevas);
    setFotoActiva(nombre);
    onCapture(nuevas, new Date().toLocaleString('es-ES'));
  };

  if (!fotosRequeridas || fotosRequeridas.length === 0) return <div>Cargando módulo de cámara...</div>;
  const progreso = Math.round((Object.keys(capturas).length / fotosRequeridas.length) * 100);
  const todasTomadas = Object.keys(capturas).length === fotosRequeridas.length;

  return (
    <div className="card">
      <h2 className="card-title">📸 Evidencia Fotográfica ({progreso}%)</h2>
      
      <p style={{ color: '#4a5568', marginBottom: '15px' }}>
        Selecciona una foto pendiente o presiona el botón para abrir la cámara y tomarlas en orden.
      </p>

      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {fotosRequeridas.map(req => {
          const tomada = !!capturas[req];
          return (
            <div key={req} style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: '1 1 45%', minWidth: '140px' }}>
              <button 
                onClick={() => abrirCamara(req)}
                style={{
                  padding: '12px 10px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', border: 'none',
                  background: tomada ? '#4CAF50' : '#2196F3',
                  color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}>
                {tomada ? '✅ ' : '📷 '} {req}
              </button>
              {tomada && (
                <button onClick={() => eliminarFoto(req)} style={{ background: '#f44336', color: 'white', border: 'none', borderRadius: '6px', padding: '5px', fontSize: '0.75rem', cursor: 'pointer' }}>
                  🗑️ Borrar y retomar
                </button>
              )}
            </div>
          )
        })}
      </div>

      {!todasTomadas && (
        <button onClick={() => abrirCamara(fotoActiva)} className="btn btn-primary btn-large w-full" style={{ padding: '15px', fontSize: '1.1rem' }}>
          📱 Abrir Cámara (Pantalla Completa)
        </button>
      )}

      {/* --- VISTA FULL SCREEN --- */}
      {camaraAbierta && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', zIndex: 99999, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <button onClick={() => setCamaraAbierta(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', zIndex: 100, cursor: 'pointer' }}>
            ✖
          </button>

          {esVertical && (
            <div style={{ position: 'absolute', top: '20px', left: '20px', right: '70px', background: 'rgba(244, 67, 54, 0.9)', color: 'white', padding: '10px 15px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', zIndex: 100, animation: 'fadeIn 0.3s' }}>
              ⚠️ Gira tu teléfono. La foto se guardará en formato panorámico sin recortes.
            </div>
          )}

          <div style={{ position: 'absolute', bottom: '100px', left: '20px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '10px 15px', borderRadius: '8px', fontSize: '1rem', zIndex: 100 }}>
            Tomando: <br/><strong style={{ color: '#4CAF50', fontSize: '1.2rem' }}>{fotoActiva}</strong>
          </div>

          {/* CÁMARA CORREGIDA: objectFit: 'contain' centra la imagen y la muestra completa sin recortes */}
          <div style={{ position: 'relative', width: '100%', height: '70vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Webcam
              audio={false} 
              ref={webcamRef} 
              screenshotFormat="image/jpeg" 
              screenshotQuality={0.9} 
              videoConstraints={{ facingMode: 'environment' }}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />

            {(procesando || exito) && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: 200, animation: 'fadeIn 0.2s' }}>
                {procesando && (
                  <>
                    <div className="spinner" style={{ width: '50px', height: '50px', border: '5px solid #f3f3f3', borderTop: '5px solid #2196F3', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <p style={{ color: 'white', marginTop: '15px', fontWeight: 'bold' }}>Procesando foto...</p>
                  </>
                )}
                {exito && (
                  <div style={{ background: '#4CAF50', borderRadius: '50%', padding: '20px', animation: 'fadeIn 0.2s' }}>
                    <span style={{ fontSize: '4rem', color: 'white' }}>✅</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', zIndex: 100 }}>
            <button 
              onClick={capture} 
              disabled={procesando || exito}
              style={{
                width: '70px', height: '70px', borderRadius: '50%', background: 'white', border: '5px solid #ccc',
                cursor: (procesando || exito) ? 'not-allowed' : 'pointer',
                opacity: (procesando || exito) ? 0.5 : 1,
                boxShadow: '0 0 15px rgba(0,0,0,0.5)', transition: 'transform 0.1s'
              }}
              onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
              onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Camara;