// import React, { useRef, useState, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import SignatureCanvas from 'react-signature-canvas';
// import { PDFDocument } from 'pdf-lib';
// import { jsPDF } from 'jspdf';

// // ==========================================
// // COMPONENTE: Login (NUEVO)
// // ==========================================
// const Login = ({ onLogin, showNotification }) => {
//   const [correo, setCorreo] = useState('');
//   const [verificando, setVerificando] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!correo.trim()) {
//       showNotification('Por favor ingresa tu correo institucional', 'warning');
//       return;
//     }

//     setVerificando(true);

//     try {
//       // ========================================================
//       // AQUÍ VA LA URL DE TU FLUJO DE POWER AUTOMATE PARA LOGIN
//       // ========================================================
//       const API_URL_LOGIN = "https://TU-URL-DE-POWER-AUTOMATE-LOGIN.com";

//       /* // CÓDIGO REAL PARA CUANDO TENGAS POWER AUTOMATE
//       const response = await fetch(API_URL_LOGIN, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ correo: correo })
//       });
//       const data = await response.json();
      
//       if (data.acceso === true) {
//          onLogin(correo);
//       } else {
//          showNotification('⛔ Acceso denegado. Tu correo no está en el registro.', 'error');
//          setVerificando(false);
//       }
//       */

//       // SIMULACIÓN TEMPORAL (Borra esto cuando actives lo de arriba)
//       setTimeout(() => {
//         if (correo.toLowerCase() === "javier.pool@cfe.mx" || correo.toLowerCase().includes("@cfe.mx")) {
//           onLogin(correo);
//         } else {
//           showNotification('⛔ Acceso denegado. Tu correo no está en la lista de OneDrive.', 'error');
//         }
//         setVerificando(false);
//       }, 1500);

//     } catch (error) {
//       showNotification('❌ Error de conexión al verificar', 'error');
//       setVerificando(false);
//     }
//   };

//   return (
//     <div className="card text-center" style={{ maxWidth: '400px', width: '100%', padding: '40px 20px', animation: 'fadeIn 0.5s' }}>
//       <h1 style={{ color: '#1a365d', fontSize: '2rem', marginBottom: '10px' }}>SeguridApp CFE</h1>
//       <p style={{ color: '#718096', marginBottom: '30px' }}>Acceso exclusivo para personal autorizado</p>
      
//       <form onSubmit={handleLogin}>
//         <div className="form-group" style={{ textAlign: 'left', marginBottom: '25px' }}>
//           <label style={{ color: '#4a5568', fontWeight: 'bold' }}>Correo Electrónico Institucional:</label>
//           <input 
//             type="email" 
//             value={correo} 
//             onChange={(e) => setCorreo(e.target.value)} 
//             placeholder="Correo empresarial" 
//             style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #cbd5e0', marginTop: '8px', fontSize: '1rem' }}
//           />
//         </div>
//         <button type="submit" disabled={verificando} className="btn btn-primary btn-large w-full" style={{ opacity: verificando ? 0.7 : 1 }}>
//           {verificando ? '⏳ Verificando en OneDrive...' : '🔐 Ingresar'}
//         </button>
//       </form>
//     </div>
//   );
// };

// // ==========================================
// // COMPONENTE: Camara
// // ==========================================
// const Camara = ({ onCapture, fotosRequeridas }) => {
//   const webcamRef = useRef(null);
//   const [capturas, setCapturas] = useState({});
//   const [fotoActiva, setFotoActiva] = useState(fotosRequeridas ? fotosRequeridas[0] : '');

//   useEffect(() => {
//     if (fotosRequeridas && (!fotoActiva || !fotosRequeridas.includes(fotoActiva))) {
//       const faltantes = fotosRequeridas.filter(f => !capturas[f]);
//       setFotoActiva(faltantes.length > 0 ? faltantes[0] : fotosRequeridas[0]);
//     }
//   }, [fotosRequeridas]);

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     const nuevasCapturas = { ...capturas, [fotoActiva]: imageSrc };
//     setCapturas(nuevasCapturas);
    
//     const faltantes = fotosRequeridas.filter(f => !nuevasCapturas[f]);
//     if (faltantes.length > 0) {
//       setFotoActiva(faltantes[0]);
//     }

//     const hora = new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'medium' });
//     onCapture(nuevasCapturas, hora);
//   };

//   const eliminarFoto = (nombre) => {
//     const nuevas = { ...capturas };
//     delete nuevas[nombre];
//     setCapturas(nuevas);
//     setFotoActiva(nombre);
//     onCapture(nuevas, new Date().toLocaleString('es-ES'));
//   };

//   if (!fotosRequeridas || fotosRequeridas.length === 0) return <div>Cargando cámara...</div>;
//   const progreso = Math.round((Object.keys(capturas).length / fotosRequeridas.length) * 100);

//   return (
//     <div className="card">
//       <h2 className="card-title"> 📸 Evidencia Fotográfica ({progreso}%)</h2>
      
//       <div style={{ marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
//         {fotosRequeridas.map(req => {
//           const tomada = !!capturas[req];
//           return (
//             <button key={req} onClick={() => setFotoActiva(req)}
//               style={{
//                 padding: '8px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', border: 'none',
//                 background: fotoActiva === req ? '#2196F3' : (tomada ? '#4CAF50' : '#e0e0e0'),
//                 color: fotoActiva === req || tomada ? 'white' : '#333',
//                 fontWeight: fotoActiva === req ? 'bold' : 'normal'
//               }}>
//               {tomada ? '✅ ' : '📷 '} {req}
//             </button>
//           )
//         })}
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="flex-1">
//           <div className="camera-preview" style={{ position: 'relative', background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
//             <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '5px 10px', borderRadius: '20px', zIndex: 10 }}>
//               Tomando foto de: <strong>{fotoActiva}</strong>
//             </div>

//             {capturas[fotoActiva] ? (
//               <img src={capturas[fotoActiva]} alt="Captura" className="w-full h-auto rounded-lg" style={{ display: 'block' }} />
//             ) : (
//               <Webcam
//                 audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full h-auto rounded-lg"
//                 videoConstraints={{ facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }}
//                 style={{ width: '100%', height: 'auto', display: 'block' }}
//               />
//             )}
//           </div>
          
//           <div className="mt-4 flex gap-4">
//             {!capturas[fotoActiva] ? (
//                <button onClick={capture} className="btn btn-primary flex-1">📸 Capturar {fotoActiva}</button>
//             ) : (
//                <button onClick={() => eliminarFoto(fotoActiva)} className="btn btn-secondary flex-1">🔄 Retomar Foto</button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // COMPONENTE: Checklist
// // ==========================================
// export const estructura = {
//   Luces: [ "Stop", "Reversa", "Intermitentes", "Direccionales", "Delanteras A y B" ],
//   Niveles: [ "Aceite de motor", "Líquido de frenos", "Dirección hidráulica", "Agua / anticongelante" ],
//   Llantas: [ "Presión adecuada", "Buenas condiciones", "Refacción en buen estado" ],
//   Seguridad: [ "Cinturón de seguridad", "Gato hidráulico", "Llave de cruz", "Señales reflectantes", "Espejos", "Limpia parabrisas", "Extintor vigente" ]
// };

// function Checklist({ onChange, datosPrevios }) {
//   const [respuestas, setRespuestas] = useState(datosPrevios || {});
//   const [seccionActiva, setSeccionActiva] = useState(0);
  
//   useEffect(() => { setRespuestas(datosPrevios || {}); }, [datosPrevios]);
//   const nombresSecciones = Object.keys(estructura);
//   const seccionActual = nombresSecciones[seccionActiva];
//   const itemsActuales = estructura[seccionActual];

//   const marcar = (item, valor) => {
//     const nuevo = { ...respuestas, [item]: valor };
//     setRespuestas(nuevo);
//     onChange(nuevo);
//   };

//   const manejarObservacion = (item, texto) => {
//     const observacionesActuales = respuestas._observaciones || {};
//     const nuevo = { 
//       ...respuestas, 
//       _observaciones: { ...observacionesActuales, [item]: texto } 
//     };
//     setRespuestas(nuevo);
//     onChange(nuevo);
//   };

//   const obtenerColor = (item, op) => {
//     if (respuestas[item] === op) {
//       if (op === "SI") return "#4CAF50";
//       if (op === "NO") return "#F44336"; 
//       if (op === "NA") return "#FF9800"; 
//     }
//     return "#e0e0e0"; 
//   };

//   const siguienteSeccion = () => { if (seccionActiva < nombresSecciones.length - 1) setSeccionActiva(seccionActiva + 1); };
//   const anteriorSeccion = () => { if (seccionActiva > 0) setSeccionActiva(seccionActiva - 1); };

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: 15, fontSize: '1.4rem', color: '#1a365d' }}>Revisión Vehicular</h2>
      
//       <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', marginBottom: '20px', paddingBottom: '5px' }}>
//         {nombresSecciones.map((sec, index) => {
//           const itemsDeEstaSeccion = estructura[sec];
//           const contestados = itemsDeEstaSeccion.filter(i => respuestas[i]).length;
//           const completa = contestados === itemsDeEstaSeccion.length;
//           return (
//             <button key={sec} onClick={() => setSeccionActiva(index)}
//               style={{
//                 flex: '0 0 auto', padding: '8px 12px', cursor: 'pointer', fontSize: '0.85rem', borderRadius: '20px',
//                 background: seccionActiva === index ? '#2196F3' : (completa ? '#E8F5E9' : '#f0f0f0'),
//                 color: seccionActiva === index ? 'white' : (completa ? '#2E7D32' : '#333'),
//                 border: completa && seccionActiva !== index ? '1px solid #A5D6A7' : 'none',
//                 fontWeight: seccionActiva === index ? 'bold' : 'normal'
//               }}>
//               {sec} {completa ? '✓' : ''}
//             </button>
//           );
//         })}
//       </div>

//       <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
//         <h3 style={{ margin: '0 0 15px 0', borderBottom: '2px solid #2196F3', paddingBottom: '8px', color: '#1a365d' }}>{seccionActual}</h3>
//         {itemsActuales.map(item => (
//           <div key={item} style={{ display: "flex", flexDirection: "column", marginBottom: 15, paddingBottom: 10, borderBottom: "1px solid #eee" }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span style={{ flex: 1, fontWeight: '500' }}>{item}</span>
//               <div style={{ display: "flex", gap: 5 }}>
//                 {["SI", "NO", "NA"].map(op => (
//                   <button key={op} onClick={() => marcar(item, op)}
//                     style={{
//                       padding: "8px 12px", background: obtenerColor(item, op), color: respuestas[item] === op ? "white" : "black",
//                       border: "1px solid #999", borderRadius: 4, cursor: "pointer", fontWeight: "bold", minWidth: "45px"
//                     }}>
//                     {op}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             {(respuestas[item] === "NO" || respuestas[item] === "NA") && (
//               <div style={{ marginTop: '10px', animation: 'fadeIn 0.3s' }}>
//                 <input 
//                   type="text" 
//                   placeholder={`Especificar detalle de: ${item}...`}
//                   value={(respuestas._observaciones && respuestas._observaciones[item]) || ""}
//                   onChange={(e) => manejarObservacion(item, e.target.value)}
//                   style={{ width: '100%', padding: '8px', border: '2px solid #FF9800', borderRadius: '6px', fontSize: '0.9rem' }}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//         <button onClick={anteriorSeccion} disabled={seccionActiva === 0} style={{ padding: '10px 15px', background: seccionActiva === 0 ? '#e0e0e0' : '#757575', color: 'white', border: 'none', borderRadius: '6px', cursor: seccionActiva === 0 ? 'not-allowed' : 'pointer' }}>
//           ← Anterior
//         </button>
//         {seccionActiva < nombresSecciones.length - 1 ? (
//           <button onClick={siguienteSeccion} style={{ padding: '10px 15px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
//             Siguiente Sección →
//           </button>
//         ) : (
//           <div style={{ padding: '10px 15px', color: '#4CAF50', fontWeight: 'bold' }}>Lista Terminada ✓</div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ==========================================
// // COMPONENTE: DatosGenerales
// // ==========================================
// const AREAS_CFE = [
//   "Recursos Humanos", "CAC Oriente", "CAC Poniente", "CAC Norte", "CAC Sur",
//   "CAC Centro", "CAC Progreso", "CAC Uman", "CAC Conkal", "CAC Hunucma",
//   "CAC Acanceh", "CAC Caucel", "Facturación", "Cobranza", "Notificaciones",
//   "T.I.", "Grandes Clientes"
// ];

// const DatosGenerales = ({ datos, onChange, onCargarDatos, showNotification }) => {
//   const [cargandoPDF, setCargandoPDF] = useState(false);
//   const [mostrarOtro, setMostrarOtro] = useState(() => {
//     return datos.area && !AREAS_CFE.includes(datos.area);
//   });

//   useEffect(() => {
//     if (!datos.periodo || !datos.mes || !datos.anio) {
//       const today = new Date();
//       const dayOfWeek = today.getDay() || 7; 
//       const monday = new Date(today);
//       monday.setDate(today.getDate() - dayOfWeek + 1);
//       const friday = new Date(today);
//       friday.setDate(today.getDate() - dayOfWeek + 5);
//       const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

//       onChange({
//         periodo: datos.periodo || `Del ${monday.getDate()} al ${friday.getDate()}`,
//         mes: datos.mes || meses[today.getMonth()],
//         anio: datos.anio || today.getFullYear().toString()
//       });
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     onChange({ [name]: value });
//   };

//   const handleAreaDropdown = (e) => {
//     const val = e.target.value;
//     if (val === 'Otros') {
//       setMostrarOtro(true);
//       onChange({ area: '' });
//     } else {
//       setMostrarOtro(false);
//       onChange({ area: val }); 
//     }
//   };

//   const handleSubirPDF = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setCargandoPDF(true);
//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       const pdfDoc = await PDFDocument.load(arrayBuffer);
//       const metadatosOcultos = pdfDoc.getKeywords();
//       if (metadatosOcultos) {
//         const datosExtraidos = JSON.parse(metadatosOcultos);
//         onCargarDatos(datosExtraidos);
//         showNotification('✅ Reporte anterior cargado correctamente', 'success');
//       } else {
//         showNotification('⚠️ Este PDF no contiene datos compatibles', 'warning');
//       }
//     } catch (error) {
//       console.error(error);
//       showNotification('❌ Error al leer el PDF', 'error');
//     }
//     setCargandoPDF(false);
//     e.target.value = null;
//   };

//   return (
//     <div className="card">
//       <div style={{ background: '#E3F2FD', padding: '20px', borderRadius: '12px', marginBottom: '30px', textAlign: 'center', border: '2px dashed #2196F3' }}>
//         <h3 style={{ margin: '0 0 10px 0', color: '#1565C0', fontSize: '1.2rem' }}>📂 ¿Continuar reporte de la semana pasada?</h3>
//         <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '15px' }}>
//           Sube tu PDF anterior para cargar toda la información y continuar en la semana que te toca.
//         </p>
//         <label style={{ background: '#2196F3', color: 'white', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'inline-block', transition: '0.2s', boxShadow: '0 4px 6px rgba(33,150,243,0.3)' }}>
//           {cargandoPDF ? 'Leyendo documento...' : '📄 Subir PDF Anterior'}
//           <input type="file" accept="application/pdf" onChange={handleSubirPDF} style={{ display: 'none' }} disabled={cargandoPDF} />
//         </label>
//       </div>

//       <h2 className="card-title">📋 Datos del Reporte</h2>

//       <div className="form-grid">
//         <div className="form-group">
//           <label>NO. ECO (Económico):</label>
//           <input type="text" name="noEco" value={datos.noEco || ''} onChange={handleChange} placeholder="Ej. 12345" />
//         </div>
        
//         <div className="form-group">
//           <label>Área o Depto:</label>
//           <select value={mostrarOtro ? 'Otros' : (datos.area || '')} onChange={handleAreaDropdown} style={{ padding: '10px', border: '1px solid #cbd5e0', borderRadius: '10px', fontSize: '1rem', backgroundColor: 'white' }}>
//             <option value="" disabled>Selecciona un área...</option>
//             {AREAS_CFE.map(a => <option key={a} value={a}>{a}</option>)}
//             <option value="Otros" style={{ fontWeight: 'bold' }}>Otros (Especificar)</option>
//           </select>
//         </div>

//         {mostrarOtro && (
//           <div className="form-group" style={{ animation: 'fadeIn 0.3s' }}>
//             <label style={{ color: '#E65100' }}>Especificar Área/Depto:</label>
//             <input type="text" name="area" value={datos.area || ''} onChange={handleChange} placeholder="Escribe tu área manual..." style={{ border: '2px solid #FF9800' }} />
//           </div>
//         )}

//         <div className="form-group full-width">
//           <label>Periodo de Revisión (Auto-calculado):</label>
//           <input type="text" name="periodo" value={datos.periodo || ''} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label>Mes:</label>
//           <input type="text" name="mes" value={datos.mes || ''} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label>Año:</label>
//           <input type="number" name="anio" value={datos.anio || ''} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label>Kilometraje Actual:</label>
//           <input type="number" name="kilometraje" value={datos.kilometraje || ''} onChange={handleChange} placeholder="Ej. 85000" />
//         </div>
//       </div>
//       <hr />
//       <h3>👤 Datos del Trabajador</h3>
//       <div className="form-grid">
//         <div className="form-group full-width">
//           <label>Nombre Completo:</label>
//           <input type="text" name="nombre" value={datos.nombre || ''} onChange={handleChange} placeholder="Tu nombre" />
//         </div>
//         <div className="form-group">
//           <label>RPE:</label>
//           <input type="text" name="rpe" value={datos.rpe || ''} onChange={handleChange} placeholder="Tu RPE" />
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // COMPONENTE: Firma
// // ==========================================
// const Firma = ({ onFirmaCompletada, showNotification }) => {
//   const firmaRef = useRef(null);
//   const [firmaData, setFirmaData] = useState(null);

//   const limpiarFirma = () => {
//     firmaRef.current.clear();
//     setFirmaData(null);
//   };

//   const guardarFirma = () => {
//     if (!firmaRef.current || firmaRef.current.isEmpty()) {
//       showNotification('Por favor, firma en el espacio proporcionado', 'warning');
//       return;
//     }
//     const firmaBase64 = firmaRef.current.getCanvas().toDataURL('image/png');
//     setFirmaData(firmaBase64);
//     onFirmaCompletada(firmaBase64);
//     showNotification('✅ Firma guardada correctamente', 'success');
//   };

//   return (
//     <div className="card">
//       <h2 className="card-title">✍️ Firma Digital de Confirmación</h2>
//       <p className="text-gray-600 mb-4">Firma en el recuadro para confirmar la veracidad de la información.</p>
//       <div className="signature-pad">
//         <SignatureCanvas
//           ref={firmaRef}
//           canvasProps={{ className: 'signature-canvas' }}
//           penColor="black"
//           backgroundColor="white"
//         />
//       </div>
//       <div className="flex gap-4">
//         <button onClick={limpiarFirma} className="btn btn-secondary flex-1">🧹 Borrar Firma</button>
//         <button onClick={guardarFirma} className="btn btn-primary flex-1">💾 Guardar Firma</button>
//       </div>
//       {firmaData && (
//         <div className="success-message">
//           <span>✅ Firma guardada correctamente</span>
//         </div>
//       )}
//       <p className="text-sm text-gray-500 mt-4"><strong>Nota:</strong> Esta firma tiene validez legal.</p>
//     </div>
//   );
// };

// // ==========================================
// // COMPONENTE: Home
// // ==========================================
// const Home = ({ onSelectModule }) => {
//   return (
//     <div className="card text-center" style={{ maxWidth: '600px', margin: '40px auto', padding: '40px 20px' }}>
//       <h1 style={{ color: '#1a365d', fontSize: '2.2rem', marginBottom: '10px' }}>SeguridApp CFE</h1>
//       <p style={{ color: '#718096', marginBottom: '40px', fontSize: '1.1rem' }}>Sistema Integral de Reportes y Revisiones</p>

//       <h2 style={{ fontSize: '1.3rem', color: '#2d3748', marginBottom: '20px' }}>Selecciona el módulo a utilizar:</h2>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
//         <button
//           onClick={() => onSelectModule('vehiculos')}
//           style={{
//             background: '#2196F3', color: 'white', padding: '20px', borderRadius: '16px',
//             fontSize: '1.1rem', fontWeight: 'bold', border: 'none', cursor: 'pointer',
//             boxShadow: '0 4px 10px rgba(33,150,243,0.3)', transition: 'transform 0.2s',
//             display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
//           }}
//           onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
//           onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//         >
//           <span style={{ fontSize: '1.5rem' }}>🚗</span> Inspección de Vehículos Oficiales
//         </button>

//         <button disabled style={btnInactivoStyle}>
//           <span style={{ fontSize: '1.5rem' }}>🧯</span> Revisión de Extintores <br/><span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(En desarrollo)</span>
//         </button>

//         <button disabled style={btnInactivoStyle}>
//           <span style={{ fontSize: '1.5rem' }}>📋</span> Módulo 3 <br/><span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(En desarrollo)</span>
//         </button>

//         <button disabled style={btnInactivoStyle}>
//           <span style={{ fontSize: '1.5rem' }}>🏗️</span> Módulo 4 <br/><span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(En desarrollo)</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// const btnInactivoStyle = {
//   background: '#f1f5f9', color: '#94a3b8', padding: '15px', borderRadius: '16px',
//   fontSize: '1.1rem', fontWeight: 'bold', border: '2px dashed #cbd5e1', cursor: 'not-allowed',
//   display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
// };

// // ==========================================
// // COMPONENTE: Notification
// // ==========================================
// const Notification = ({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 4000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bgColor = type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#4caf50';

//   return (
//     <div style={{
//       position: 'fixed',
//       top: '20px',
//       left: '50%',
//       transform: 'translateX(-50%)',
//       backgroundColor: bgColor,
//       color: 'white',
//       padding: '12px 24px',
//       borderRadius: '50px',
//       boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
//       zIndex: 1000,
//       fontSize: '1rem',
//       fontWeight: 'bold',
//       animation: 'slideDown 0.3s ease-out',
//       maxWidth: '90%',
//       textAlign: 'center'
//     }}>
//       {message}
//     </div>
//   );
// };

// // ==========================================
// // COMPONENTE: Reporte (LISTO PARA POWER AUTOMATE)
// // ==========================================
// const Reporte = ({ datos, historicoSemanas, historicoFotos, showNotification }) => {
//   const [enviando, setEnviando] = useState(false);

//   const generarID = () => {
//     const t = (datos.form.direccion || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//     let codigo = "SW000";
//     if (t.includes("montejo") || t.includes("alvarado") || t.includes("divisionales")) codigo = "SW000";
//     else if (t.includes("merida")) codigo = "SW010";
//     else if (t.includes("motul")) codigo = "SW020";
//     else if (t.includes("ticul")) codigo = "SW030"; 
//     else if (t.includes("campeche")) codigo = "SW040";
//     else if (t.includes("carmen")) codigo = "SW050"; 
//     else if (t.includes("chetumal")) codigo = "SW060";
//     else if (t.includes("tizimin")) codigo = "SW070";
//     else if (t.includes("cancun")) codigo = "SW120";
//     else if (t.includes("riviera") || t.includes("maya")) codigo = "SW200";
    
//     const now = new Date();
//     return `${codigo}${String(now.getDate()).padStart(2,'0')}${String(now.getMonth()+1).padStart(2,'0')}${now.getFullYear()}${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
//   };

//   const generarPDF = async () => {
//     try {
//       setEnviando(true);
//       const ID_GENERADO = generarID();
//       const doc = new jsPDF('l', 'mm', 'a4'); 
//       const pageWidth = doc.internal.pageSize.getWidth();
//       const pageHeight = doc.internal.pageSize.getHeight();
      
//       const margin = 10;
//       let yPos = 10;
//       const hFila = 4.8; 

//       const f = datos.form || {};
//       const semanaActual = parseInt(f.semanaReporte || 1);
//       if (historicoFotos[semanaActual]) {
//         historicoFotos[semanaActual].idDocumento = `Reporte_${ID_GENERADO}`;
//       }

//       const fotosLigeras = JSON.parse(JSON.stringify(historicoFotos));
//       Object.keys(fotosLigeras).forEach(sem => {
//         if (fotosLigeras[sem].capturas) delete fotosLigeras[sem].capturas; 
//       });

//       const estadoParaGuardar = JSON.stringify({ form: f, historicoSemanas, historicoFotos: fotosLigeras, idActual: ID_GENERADO });
//       doc.setProperties({ title: `Reporte_${ID_GENERADO}`, keywords: estadoParaGuardar });

//       doc.setFontSize(7);
//       doc.text("Forma SH-209", pageWidth - margin, yPos, { align: 'right' });
//       yPos += 5;
      
//       doc.setFillColor(230, 230, 230);
//       doc.rect(margin, yPos, 15, 15, 'F'); doc.rect(pageWidth - margin - 15, yPos, 15, 15, 'F');
//       doc.setFontSize(6);
//       doc.text("SUTERM", margin + 7.5, yPos + 8, { align: 'center' });
//       doc.text("CFE", pageWidth - margin - 7.5, yPos + 8, { align: 'center' });

//       doc.setFontSize(14); doc.setFont('helvetica', 'bold');
//       doc.text("COMISION FEDERAL DE ELECTRICIDAD", pageWidth / 2, yPos + 4, { align: 'center' });
//       doc.setFontSize(11);
//       doc.text("DIVISION DE DISTRIBUCION PENINSULAR", pageWidth / 2, yPos + 9, { align: 'center' });
//       doc.setFontSize(9);
//       doc.text("VERIFICACION SEMANAL DE VEHÍCULO DE TRABAJO, PERSONAL OFICINA", pageWidth / 2, yPos + 14, { align: 'center' });
//       yPos += 20;

//       doc.setFontSize(8);
//       doc.setFont('helvetica', 'bold');
//       doc.text(`NO. ECO:`, margin, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.noEco || ''}`, margin + 18, yPos);
//       doc.line(margin + 17, yPos + 1, margin + 50, yPos + 1); 
      
//       doc.setFont('helvetica', 'bold'); doc.text(`KILOMETRAJE INICIAL:`, margin + 60, yPos);
//       doc.setFont('helvetica', 'normal'); doc.text(`${historicoSemanas[1]?._kilometraje || f.kilometraje || ''}`, margin + 98, yPos);
//       doc.line(margin + 97, yPos + 1, margin + 130, yPos + 1);
      
//       doc.setFont('helvetica', 'bold');
//       doc.text(`ÁREA O DEPTO:`, margin + 140, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.area || ''}`, margin + 165, yPos);
//       doc.line(margin + 164, yPos + 1, margin + 230, yPos + 1);

//       yPos += 6;
//       doc.setFont('helvetica', 'bold');
//       doc.text(`PERIODO DE REVISIÓN:`, margin, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.periodo || ''}`, margin + 38, yPos);
//       doc.line(margin + 37, yPos + 1, margin + 100, yPos + 1);
      
//       doc.setFont('helvetica', 'bold'); doc.text(`MES:`, margin + 110, yPos);
//       doc.setFont('helvetica', 'normal'); doc.text(`${f.mes || ''}`, margin + 120, yPos);
//       doc.line(margin + 119, yPos + 1, margin + 160, yPos + 1);
      
//       doc.setFont('helvetica', 'bold'); doc.text(`AÑO:`, margin + 170, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.anio || ''}`, margin + 180, yPos);
//       doc.line(margin + 179, yPos + 1, margin + 210, yPos + 1);

//       yPos += 6;
//       if (f.idDocumentoPrevio) {
//           doc.setFont('helvetica', 'bold'); doc.text(`REF. DOC. ANTERIOR:`, margin, yPos);
//           doc.setFont('helvetica', 'normal'); doc.text(`Reporte_${f.idDocumentoPrevio}`, margin + 38, yPos);
//           yPos += 5;
//       } else {
//           yPos += 2;
//       }

//       const anchoTotal = pageWidth - (margin * 2);
//       const wActividad = 55; 
//       const wSemana = 36;
//       const wOpcion = wSemana / 3;
//       const wComentarios = anchoTotal - wActividad - (wSemana * 4);
//       const xActividad = margin;

//       doc.setFillColor(220, 220, 220);
//       doc.rect(xActividad, yPos, wActividad, hFila * 2, 'FD');
//       doc.setFont('helvetica', 'bold'); 
//       doc.text("ACTIVIDAD", xActividad + (wActividad/2), yPos + 6, { align: 'center' });
//       [1, 2, 3, 4].forEach((semanaNum, i) => { 
//         const xSem = xActividad + wActividad + (i * wSemana);
//         doc.setFillColor(220,220,220); 
//         doc.rect(xSem, yPos, wSemana, hFila, 'FD');
//         doc.text(`SEMANA ${semanaNum}`, xSem + (wSemana/2), yPos + 3.5, { align: 'center' });
        
//         const ySub = yPos + hFila;
//         doc.setFillColor(235, 235, 235);
//         doc.rect(xSem, ySub, wOpcion, hFila, 'FD'); 
//         doc.rect(xSem + wOpcion, ySub, wOpcion, hFila, 'FD'); 
//         doc.rect(xSem + (wOpcion*2), ySub, wOpcion, hFila, 'FD');
        
//         doc.setFontSize(7); doc.setTextColor(0,0,0);
//         doc.text("SI", xSem + (wOpcion/2), ySub + 3.5, { align: 'center' }); 
//         doc.text("NO", xSem + wOpcion + (wOpcion/2), ySub + 3.5, { align: 'center' }); 
//         doc.text("N/A", xSem + (wOpcion*2) + (wOpcion/2), ySub + 3.5, { align: 'center' });
//         doc.setFontSize(8);
//       });
//       const xComentarios = xActividad + wActividad + (wSemana * 4);
//       doc.setFillColor(220, 220, 220);
//       doc.rect(xComentarios, yPos, wComentarios, hFila * 2, 'FD');
//       doc.text("COMENTARIOS", xComentarios + (wComentarios/2), yPos + 6, { align: 'center' });
      
//       yPos += (hFila * 2);
//       Object.entries(estructura).forEach(([nombreSeccion, itemsSeccion]) => {
//         doc.setFillColor(200,200,200); doc.setFont('helvetica','bold');
//         doc.rect(xActividad, yPos, anchoTotal, hFila, 'FD'); 
//         doc.text(nombreSeccion.toUpperCase(), xActividad + 2, yPos + 3.5); 
//         yPos += hFila;
        
//         doc.setFont('helvetica','normal'); doc.setFontSize(7.5);
        
//         itemsSeccion.forEach((item) => {
//           doc.rect(xActividad, yPos, wActividad, hFila);
//           doc.text(item, xActividad + 2, yPos + 3.5);
          
//           let comentariosFila = [];
//           [1, 2, 3, 4].forEach((semanaNum, i) => {
//             const xSem = xActividad + wActividad + (i * wSemana);
//             doc.rect(xSem, yPos, wOpcion, hFila);
//             doc.rect(xSem + wOpcion, yPos, wOpcion, hFila); 
//             doc.rect(xSem + (wOpcion*2), yPos, wOpcion, hFila);
//             const respuestaSemana = historicoSemanas[semanaNum]?.[item];
//             const obsSemana = historicoSemanas[semanaNum]?._observaciones?.[item];

//             if (obsSemana) {
//               comentariosFila.push(`S${semanaNum}: ${obsSemana}`);
//             }
//             if (respuestaSemana) {
//               let xMark = xSem;
//               let color = [200,200,200]; let texto = respuestaSemana;
//               if (respuestaSemana === "SI") color = [76,175,80];
//               else if (respuestaSemana === "NO") { xMark += wOpcion; color = [244,67,54]; }
//               else if (respuestaSemana === "NA") { xMark += (wOpcion*2); color = [255,152,0]; texto = "N/A"; }
              
//               doc.setFillColor(...color);
//               doc.rect(xMark + 0.5, yPos + 0.5, wOpcion - 1, hFila - 1, 'F');
//               doc.setTextColor(255,255,255); doc.setFont('helvetica','bold');
//               doc.text(texto, xMark + (wOpcion/2), yPos + 3.5, { align: 'center' });
//               doc.setTextColor(0,0,0); doc.setFont('helvetica','normal');
//             }
//           });

//           doc.rect(xComentarios, yPos, wComentarios, hFila);
//           if (comentariosFila.length > 0) {
//             let textoObs = comentariosFila.join(" | ");
//             if (textoObs.length > 55) textoObs = textoObs.substring(0, 52) + "...";
//             doc.setFontSize(6);
//             doc.setTextColor(200, 50, 0);
//             doc.text(textoObs, xComentarios + 2, yPos + 3.2);
//             doc.setTextColor(0,0,0); doc.setFontSize(7.5);
//           }
//           yPos += hFila;
//         });
//       });

//       doc.setFillColor(230,230,230); doc.rect(xActividad, yPos, wActividad, hFila, 'FD');
//       doc.setFont('helvetica','bold'); doc.setFontSize(8);
//       doc.text("KILOMETRAJE REGISTRADO", xActividad + 2, yPos + 3.5);
//       [1, 2, 3, 4].forEach((semanaNum, i) => {
//         const xSem = xActividad + wActividad + (i * wSemana);
//         doc.rect(xSem, yPos, wSemana, hFila);
//         const km = historicoSemanas[semanaNum]?._kilometraje;
//         if (km) doc.text(`${km} km`, xSem + (wSemana/2), yPos + 3.5, { align: 'center' });
//       });
//       doc.rect(xComentarios, yPos, wComentarios, hFila);
//       yPos += (hFila + 4);

//       doc.setFontSize(6);
//       doc.setFont('helvetica','bold');
//       const notaAviso = "NOTA: SI CUMPLISTE CON TODOS LOS REQUERIMIENTOS, MANEJA EL VEHÍCULO CON SEGURIDAD. SI ALGUNA DE TUS RESPUESTAS FUE NO, CORRÍGELO EN COORDINACION CON TU JEFE INMEDIATO Y CON LA OFICINA DE SERVICIOS GENERALES";
//       doc.text(notaAviso, margin, yPos); 
//       yPos += 8;
      
//       doc.setFontSize(8);
//       let centerX1 = margin + 40;
//       let centerX2 = pageWidth - margin - 40;
      
//       doc.text("RESPONSABLE DE LA REVISIÓN", centerX1, yPos, { align: 'center' });
//       doc.text("JEFE INMEDIATO", centerX2, yPos, { align: 'center' });
      
//       yPos += 2;
//       if (datos.firma) doc.addImage(datos.firma, 'PNG', centerX1 - 20, yPos, 40, 15);
//       yPos += 15;
//       doc.line(centerX1 - 35, yPos, centerX1 + 35, yPos);
//       doc.line(centerX2 - 35, yPos, centerX2 + 35, yPos);
      
//       yPos += 4;
//       doc.setFont('helvetica','normal');
//       doc.setFontSize(7);
//       doc.text(`Nombre: ${f.nombre || ''}`, centerX1 - 35, yPos);
//       doc.text(`RPE: ${f.rpe || ''}`, centerX1 - 35, yPos + 4);

//       let currentYTextOnly = 20;
//       let paginaHistoricoAgregada = false;

//       [1, 2, 3, 4].forEach((semanaNum) => {
//         const fotoData = historicoFotos[semanaNum];
//         if (fotoData && (fotoData.hora || fotoData.capturas)) {
          
//           const tieneImagenes = fotoData.capturas && Object.keys(fotoData.capturas).length > 0;

//           if (tieneImagenes) {
//             doc.addPage();
//             doc.setFontSize(14); doc.setFont('helvetica','bold');
//             doc.text(`ANEXO: EVIDENCIA FOTOGRÁFICA - SEMANA ${semanaNum}`, margin, 20);
            
//             doc.setFontSize(9); doc.setFont('helvetica','normal');
//             doc.text(`Fecha captura: ${fotoData.hora || 'No registrada'}`, margin, 28);
//             doc.text(`Ubicación GPS: ${fotoData.direccion || 'No registrada'}`, margin, 34);
            
//             if (fotoData.coordenadas) {
//               doc.text(`Coordenadas: Lat ${fotoData.coordenadas.lat}, Lon ${fotoData.coordenadas.lng}`, margin, 40);
//             }
            
//             const idDoc = fotoData.idDocumento || (semanaNum === semanaActual ? `Reporte_${ID_GENERADO}` : 'Desconocido');
//             doc.setFont('helvetica','bold');
//             doc.text(`ID del Documento: ${idDoc}`, margin, 46);
            
//             let currentY = 56;
//             const nombresFotos = Object.keys(fotoData.capturas);
//             nombresFotos.forEach((nombre, index) => {
//               if (index > 0 && index % 4 === 0) { doc.addPage(); currentY = 20; }
              
//               const isRightColumn = index % 2 !== 0; 
//               const xPos = isRightColumn ? 155 : margin;
//               const rowOnPage = Math.floor((index % 4) / 2); 
//               const yPosF = currentY + (rowOnPage * 75); 
              
//               doc.setFontSize(10); doc.setFont('helvetica','bold');
//               doc.text(`Evidencia: ${nombre}`, xPos, yPosF);
              
//               const imgData = fotoData.capturas[nombre];
//               doc.addImage(imgData, 'JPEG', xPos, yPosF + 3, 125, 65);
//             });
//           } else {
//             if (!paginaHistoricoAgregada) {
//               doc.addPage();
//               doc.setFontSize(14); doc.setFont('helvetica','bold');
//               doc.text(`REGISTRO HISTÓRICO DE EVIDENCIAS`, margin, currentYTextOnly);
//               currentYTextOnly += 12;
//               paginaHistoricoAgregada = true;
//             }

//             if (currentYTextOnly > pageHeight - 40) {
//               doc.addPage();
//               currentYTextOnly = 20;
//             }

//             doc.setFontSize(11); doc.setFont('helvetica','bold');
//             doc.text(`DATOS DE LA SEMANA ${semanaNum}`, margin, currentYTextOnly);
//             currentYTextOnly += 6;

//             doc.setFontSize(9); doc.setFont('helvetica','normal');
//             doc.text(`Fecha captura: ${fotoData.hora || 'No registrada'}`, margin, currentYTextOnly);
//             currentYTextOnly += 5;
//             doc.text(`Ubicación GPS: ${fotoData.direccion || 'No registrada'}`, margin, currentYTextOnly); currentYTextOnly += 5;
//             if (fotoData.coordenadas) {
//               doc.text(`Coordenadas: Lat ${fotoData.coordenadas.lat}, Lon ${fotoData.coordenadas.lng}`, margin, currentYTextOnly);
//               currentYTextOnly += 5;
//             }
            
//             const idDoc = fotoData.idDocumento || 'Desconocido';
//             doc.setFont('helvetica','bold');
//             doc.text(`ID del Documento: ${idDoc}`, margin, currentYTextOnly); currentYTextOnly += 6;

//             doc.setFontSize(9); doc.setFont('helvetica','italic'); doc.setTextColor(100);
//             doc.text(`* Las fotografías de esta revisión se encuentran en el archivo original: ${idDoc}.pdf`, margin, currentYTextOnly);
//             doc.setTextColor(0); 

//             currentYTextOnly += 12;
//           }
//         }
//       });
//       const totalPages = doc.internal.getNumberOfPages();
//       for (let i = 1; i <= totalPages; i++) {
//         doc.setPage(i);
//         doc.setFontSize(8); doc.setTextColor(128);
//         doc.text('Documento generado automáticamente por SeguridApp', pageWidth / 2, pageHeight - 8, { align: 'center' });
//         doc.text(`ID: ${ID_GENERADO} - Pág ${i}/${totalPages}`, pageWidth / 2, pageHeight - 4, { align: 'center' });
//       }

//       // 1. DESCARGAR EL ARCHIVO LOCALMENTE
//       doc.save(`Reporte_${ID_GENERADO}.pdf`);
//       showNotification(' ✅  PDF generado correctamente', 'success');

//       // 2. ENVIAR A POWER AUTOMATE (Base64)
//       const pdfBase64 = doc.output('datauristring').split(',')[1];
//       const payload = {
//         nombreArchivo: `Reporte_${ID_GENERADO}.pdf`,
//         archivoBase64: pdfBase64,
//         noEco: f.noEco,
//         area: f.area,
//         periodo: f.periodo,
//         trabajador: f.nombre,
//         rpe: f.rpe
//       };

//       const API_URL = "https://TU-URL-DE-POWER-AUTOMATE-AQUI.com";
//       console.log("Paquete listo para Power Automate: ", payload);

//       /*
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         showNotification('☁️ Reporte guardado en OneDrive exitosamente', 'success');
//       } else {
//         showNotification('⚠️ Error al subir el reporte a la nube', 'warning');
//       }
//       */

//     } catch (error) { 
//       console.error(error);
//       showNotification(' ❌  Error en el proceso', 'error'); 
//     } finally {
//       setEnviando(false);
//     }
//   };

//   return (
//     <div className="card text-center">
//       <h2> 🎉  Inspección Finalizada</h2>
//       <p className="text-gray-600 mb-6">El documento de revisión con las semanas llenadas, observaciones y evidencias fotográficas recientes está listo.</p>
      
//       <button 
//         onClick={generarPDF} 
//         disabled={enviando}
//         className="btn btn-success btn-large"
//         style={{ opacity: enviando ? 0.7 : 1, cursor: enviando ? 'not-allowed' : 'pointer' }}
//       >
//          {enviando ? '⏳ Procesando y enviando...' : '📄 Descargar y Enviar Reporte'}
//       </button>

//     </div>
//   );
// };

// // ==========================================
// // COMPONENTE: Ubicacion
// // ==========================================
// const Ubicacion = ({ onUbicacionObtenida, showNotification }) => {
//   const [cargando, setCargando] = useState(false);

//   const obtenerUbicacion = () => {
//     setCargando(true);
//     if (!navigator.geolocation) {
//       showNotification('Geolocalización no soportada por el navegador', 'error');
//       setCargando(false);
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         const coordenadas = { lat: latitude, lng: longitude };
//         try {
//           const response = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
//             { headers: { 'Accept-Language': 'es', 'User-Agent': 'SeguriApp/1.0' } }
//           );
//           const data = await response.json();
//           const direccion = data.display_name || 'Dirección no disponible';
//           onUbicacionObtenida(`Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`, direccion, coordenadas);
//           showNotification('📍 Ubicación obtenida correctamente', 'success');
//         } catch (err) {
//           console.error(err);
//           onUbicacionObtenida(`Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`, 'Error al obtener dirección', coordenadas);
//           showNotification('⚠️ Error al obtener dirección detallada', 'warning');
//         }
//         setCargando(false);
//       },
//       (err) => {
//         console.error(err);
//         showNotification('No se pudo obtener la ubicación. Verifica los permisos.', 'error');
//         setCargando(false);
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   };

//   return (
//     <div className="card">
//       <h2 className="card-title">📍 Registrar Ubicación</h2>
//       <p className="text-gray-600 mb-4">Para registrar la ubicación exacta del incidente, necesitamos tu permiso de GPS.</p>
//       <button onClick={obtenerUbicacion} disabled={cargando} className="btn btn-success btn-large w-full">
//         {cargando ? '⏳ Obteniendo ubicación...' : '📍 Obtener Ubicación Actual'}
//       </button>
//       <div className="info-box mt-6">
//         <h3>¿Por qué necesitamos tu ubicación?</h3>
//         <ul>
//           <li>Registro exacto del lugar del reporte.</li>
//           <li>Cumplimiento de requisitos del formato oficial.</li>
//           <li>Evidencia georreferenciada de las revisiones.</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // COMPONENTE: App (Principal)
// // ==========================================
// function App() {
//   // ESTADO NUEVO PARA CONTROLAR EL LOGIN
//   const [usuarioLogueado, setUsuarioLogueado] = useState(null);

//   const [moduloActivo, setModuloActivo] = useState(null);
//   const [paso, setPaso] = useState(1);
//   const [datosForm, setDatosForm] = useState({ semanaReporte: "1" }); 
//   const [checklist, setChecklist] = useState({});
//   const [datos, setDatos] = useState({ capturas: {}, ubicacion: null, direccion: '', hora: '', firma: null, coordenadas: null });
//   const [historicoSemanas, setHistoricoSemanas] = useState({ 1: {}, 2: {}, 3: {}, 4: {} });
//   const [historicoFotos, setHistoricoFotos] = useState({});
//   const [notification, setNotification] = useState(null);
//   const [mostrarModal, setMostrarModal] = useState(false);
//   const [verificaciones, setVerificaciones] = useState({ seguroVigente: false, tarjetaCombustible: false, licenciaVigente: false, fechaLicencia: '' });
//   const [fotosRequeridas, setFotosRequeridas] = useState([]);
//   const [confirmarSalir, setConfirmarSalir] = useState(false);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [paso]);

//   const showNotification = (message, type = 'error') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 4000);
//   };

//   const actualizarDatos = (nuevos) => setDatos(prev => ({ ...prev, ...nuevos }));
//   const actualizarDatosForm = (nuevos) => setDatosForm(prev => ({ ...prev, ...nuevos }));
  
//   useEffect(() => {
//     const sem = datosForm.semanaReporte || "1";
//     setChecklist(historicoSemanas[sem] || {});
//   }, [datosForm.semanaReporte, historicoSemanas]);
  
//   const handleChecklistChange = (nuevoChecklist) => setChecklist(nuevoChecklist);

//   const calcularFotosRequeridas = () => {
//     let requeridas = ["Frente del vehículo", "Parte Trasera", "Lado Izquierdo", "Lado Derecho"];
//     Object.keys(checklist).forEach(item => {
//       if (item !== "_observaciones" && item !== "_kilometraje" && (checklist[item] === "NO" || checklist[item] === "NA")) {
//         requeridas.push(`Falla: ${item}`);
//       }
//     });
//     setFotosRequeridas(requeridas);
//   };

//   const siguientePaso = () => {
//     if (paso === 1) {
//       const camposObligatorios = ['noEco', 'area', 'periodo', 'mes', 'anio', 'kilometraje', 'nombre', 'rpe'];
//       const faltan = camposObligatorios.filter(campo => !datosForm[campo] || datosForm[campo].toString().trim() === '');
//       if (faltan.length > 0) { showNotification(`Faltan campos: ${faltan.join(', ')}`, 'warning');
//       return; }
//       setMostrarModal(true); return;
//     }
    
//     if (paso === 2) {
//       const itemsTotales = Object.values(estructura).flat();
//       const faltantes = itemsTotales.filter(item => !checklist[item]);
//       if (faltantes.length > 0) { showNotification(`Faltan por contestar: ${faltantes.length} items`, 'warning'); return;
//       }
      
//       calcularFotosRequeridas(); 
//       setPaso(3); return;
//     }
    
//     if (paso === 3) {
//        const fotosTomadas = Object.keys(datos.capturas || {}).length;
//        if (fotosTomadas < fotosRequeridas.length) {
//          showNotification(`Faltan fotos por tomar (${fotosTomadas}/${fotosRequeridas.length})`, 'warning');
//          return;
//        }
//     }
    
//     if (paso === 4 && !datos.ubicacion) { showNotification('Registra tu ubicación GPS.', 'warning');
//     return; }
//     if (paso === 5 && !datos.firma) { showNotification('Debes guardar tu firma.', 'warning'); return;
//     }
//     if (paso < 6) setPaso(p => p + 1);
//   };

//   const handleCheckModal = (e) => {
//     const { name, value, type, checked } = e.target;
//     setVerificaciones(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//   };

//   const confirmarVerificaciones = () => {
//     if (!verificaciones.seguroVigente || !verificaciones.tarjetaCombustible || !verificaciones.licenciaVigente || !verificaciones.fechaLicencia) {
//       showNotification('Confirma todos los datos y fecha de licencia.', 'warning');
//       return;
//     }
//     const hoy = new Date(); hoy.setHours(0, 0, 0, 0); 
//     const [year, month, day] = verificaciones.fechaLicencia.split('-');
//     const fechaLic = new Date(year, month - 1, day);
//     const diffDays = Math.ceil((fechaLic - hoy) / (1000 * 60 * 60 * 24));
//     if (diffDays < 0) { showNotification(' ❌ LICENCIA VENCIDA.', 'error'); return;
//     } 
//     setDatosForm(prev => ({ ...prev, ...verificaciones }));
//     setMostrarModal(false); setPaso(2);
//   };
  
//   const anteriorPaso = () => { if (paso > 1) setPaso(paso - 1); };

//   const historicoSemanasActualizado = { ...historicoSemanas };
//   historicoSemanasActualizado[datosForm.semanaReporte] = { ...checklist, _kilometraje: datosForm.kilometraje };
  
//   const historicoFotosActualizado = { ...historicoFotos };
//   if (Object.keys(datos.capturas || {}).length > 0) {
//     historicoFotosActualizado[datosForm.semanaReporte] = {
//       capturas: datos.capturas, hora: datos.hora, direccion: datos.direccion, coordenadas: datos.coordenadas
//     };
//   }

//   const intentarSalir = () => {
//     setConfirmarSalir(true);
//   };

//   const confirmarSalida = () => {
//     setConfirmarSalir(false);
//     setModuloActivo(null);
//     setPaso(1);
//     setDatosForm({ semanaReporte: "1" });
//     setChecklist({});
//     setDatos({ capturas: {}, ubicacion: null, direccion: '', hora: '', firma: null, coordenadas: null });
//     setHistoricoSemanas({ 1: {}, 2: {}, 3: {}, 4: {} });
//     setHistoricoFotos({});
//     setVerificaciones({ seguroVigente: false, tarjetaCombustible: false, licenciaVigente: false, fechaLicencia: '' });
//   };


//   // =================================================================
//   // LÓGICA DE RENDERIZADO: Si no está logueado, muestra solo el Login
//   // =================================================================
//   if (!usuarioLogueado) {
//     return (
//       <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
//         {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
//         <Login onLogin={(correo) => setUsuarioLogueado(correo)} showNotification={showNotification} />
//       </div>
//     );
//   }

//   if (!moduloActivo) {
//     return ( 
//       <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
//         {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
//         <Home onSelectModule={setModuloActivo} />
//       </div>
//     );
//   }

//   return (
//     <div className="app">
//       {notification && (
//         <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, background: notification.type === 'error' ? '#f44336' : notification.type === 'warning' ? '#ff9800' : '#4CAF50', color: 'white', padding: '15px 25px', borderRadius: '8px', fontWeight: 'bold' }}>
//           {notification.message}
//         </div>
//       )}

//       {confirmarSalir && (
//         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
//           <div style={{ background: 'white', padding: '30px', borderRadius: '16px', maxWidth: '400px', textAlign: 'center', animation: 'fadeIn 0.3s' }}>
//             <h3 style={{ color: '#d32f2f', marginBottom: '15px', fontSize: '1.4rem' }}>⚠️ ¿Salir al menú?</h3>
//             <p style={{ marginBottom: '25px', color: '#555' }}>Los datos no guardados de esta inspección se perderán.</p>
//             <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
//               <button onClick={() => setConfirmarSalir(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancelar</button>
//               <button onClick={confirmarSalida} className="btn" style={{ flex: 1, background: '#d32f2f', color: 'white' }}>Sí, salir</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {mostrarModal && (
//         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
//           <div style={{ background: 'white', padding: '30px', borderRadius: '16px', maxWidth: '500px' }}>
//             <h3>⚠️ Verificaciones Obligatorias</h3>
//             <label><input type="checkbox" name="seguroVigente" checked={verificaciones.seguroVigente} onChange={handleCheckModal}/> Póliza vigente</label><br/><br/>
//             <label><input type="checkbox" name="tarjetaCombustible" checked={verificaciones.tarjetaCombustible} onChange={handleCheckModal}/> Tarjeta combustible</label><br/><br/>
//             <label><input type="checkbox" name="licenciaVigente" checked={verificaciones.licenciaVigente} onChange={handleCheckModal}/> Licencia vigente</label><br/><br/>
            
//             {verificaciones.licenciaVigente && 
//               <input 
//                 type="date" 
//                 name="fechaLicencia" 
//                 value={verificaciones.fechaLicencia} 
//                 onChange={handleCheckModal} 
//                 style={{
//                   width: '100%', 
//                   padding: '12px', 
//                   borderRadius: '8px', 
//                   border: '1px solid #cbd5e0', 
//                   fontSize: '1rem', 
//                   fontFamily: 'inherit', 
//                   background: 'white',
//                   marginTop: '10px'
//                 }}
//               />
//             }
//             <br/><br/><button onClick={confirmarVerificaciones} className="btn btn-success w-full">Confirmar</button>
//           </div>
//         </div>
//       )}

//       <header>
//         <button onClick={intentarSalir} style={{ position: 'absolute', top: '0px', left: '0px', background: '#e2e8f0', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} title="Volver al Menú Principal"> 🏠 </button>
//         <h1>SeguridApp</h1>
//         <p className="subtitulo">Registro de Inspección CFE</p>
//         <div className="progreso-container">
//           <div className="progreso">
//             <div className={`paso ${paso >= 1 ? 'activo' : ''}`}>1. Datos</div>
//             <div className={`paso ${paso >= 2 ? 'activo' : ''}`}>2. Lista</div>
//             <div className={`paso ${paso >= 3 ? 'activo' : ''}`}>3. Foto</div>
//             <div className={`paso ${paso >= 4 ? 'activo' : ''}`}>4. Ubic.</div>
//             <div className={`paso ${paso >= 5 ? 'activo' : ''}`}>5. Firma</div>
//             <div className={`paso ${paso >= 6 ? 'activo' : ''}`}>6. Fin</div>
//           </div>
//         </div>
//       </header>
      
//       <main className="contenido step-transition">
//         {paso === 1 && (
//           <DatosGenerales 
//             datos={datosForm} 
//             onChange={actualizarDatosForm} 
//             onCargarDatos={(datosExtraidos) => {
//               const histSem = datosExtraidos.historicoSemanas || { 1: {}, 2: {}, 3: {}, 4: {} };
//               let semanaAnterior = "1";
//               let siguienteSemana = "1";
//               if (Object.keys(histSem[1] || {}).length > 1) { semanaAnterior = "1"; siguienteSemana = "2"; }
//               if (Object.keys(histSem[2] || {}).length > 1) { semanaAnterior = "2"; siguienteSemana = "3"; }
//               if (Object.keys(histSem[3] || {}).length > 1) { semanaAnterior = "3"; siguienteSemana = "4"; }
              
//               const fallasArrastradas = {};
//               const obsArrastradas = {};
//               if (siguienteSemana !== "1" && histSem[semanaAnterior]) {
//                 Object.keys(histSem[semanaAnterior]).forEach(item => {
//                   if (item !== "_observaciones" && item !== "_kilometraje") {
//                     const valor = histSem[semanaAnterior][item];
//                     if (valor === "NO" || valor === "NA") {
//                       fallasArrastradas[item] = valor;
//                       if (histSem[semanaAnterior]._observaciones && histSem[semanaAnterior]._observaciones[item]) {
//                         obsArrastradas[item] = histSem[semanaAnterior]._observaciones[item];
//                       }
//                     }
//                   }
//                 });
//                 if (Object.keys(fallasArrastradas).length > 0) {
//                   fallasArrastradas._observaciones = obsArrastradas;
//                   histSem[siguienteSemana] = fallasArrastradas;
//                 }
//               }

//               setDatosForm(prev => ({ 
//                 ...prev, 
//                 ...(datosExtraidos.form || {}), 
//                 semanaReporte: siguienteSemana, 
//                 kilometraje: "",
//                 idDocumentoPrevio: datosExtraidos.idActual || "" 
//               }));
//               setHistoricoSemanas(histSem);
//               setHistoricoFotos(datosExtraidos.historicoFotos || {});
//             }} 
//             showNotification={showNotification} 
//           />
//         )}
        
//         {paso === 2 && <Checklist onChange={handleChecklistChange} datosPrevios={checklist} />}
        
//         {paso === 3 && (
//           <div className="fade-in">
//             <div className="alerta-foto">📸 Toma las 4 fotos obligatorias del vehículo y las evidencias de fallas marcadas.</div>
//             <Camara fotosRequeridas={fotosRequeridas} onCapture={(capturas, hora) => actualizarDatos({ capturas, hora })} />
//           </div>
//         )}
        
//         {paso === 4 && <Ubicacion onUbicacionObtenida={(ubicacion, direccion, coordenadas) => actualizarDatos({ ubicacion, direccion, coordenadas })} showNotification={showNotification} />}
        
//         {paso === 5 && <Firma onFirmaCompletada={(firma) => actualizarDatos({ firma })} showNotification={showNotification} />}
        
//         {paso === 6 && (
//           <Reporte datos={{ ...datos, form: datosForm }} historicoSemanas={historicoSemanasActualizado} historicoFotos={historicoFotosActualizado} showNotification={showNotification} />
//         )}

//         <div className="navegacion">
//           {(paso > 1 && paso < 6) && <button onClick={anteriorPaso} className="btn btn-secondary">← Regresar</button>}
//           {paso < 6 && <button onClick={siguientePaso} className="btn btn-primary">Siguiente →</button>}
//         </div>
//       </main>

//       <style>{`
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         body { background: #f0f4f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
//         .app { padding: 15px; max-width: 800px; margin: 0 auto; min-height: 100vh; position: relative; }
//         header { text-align: center; margin-bottom: 25px; position: relative; }
//         h1 { color: #1a365d; font-size: 2rem; font-weight: 700; letter-spacing: -0.5px; margin-top: 10px; }
//         .subtitulo { color: #4a5568; font-size: 1rem; margin-top: 5px; }
//         .progreso-container { overflow-x: auto; margin-top: 15px; }
//         .progreso { display: flex; gap: 6px; background: #e2e8f0; padding: 6px; border-radius: 40px; }
//         .paso { flex: 1; padding: 8px 4px; text-align: center; border-radius: 30px; font-size: 0.8rem; font-weight: 600; background: white; color: #2d3748; transition: all 0.3s; white-space: nowrap; }
//         .paso.activo { background: #2196F3; color: white; box-shadow: 0 4px 10px rgba(33,150,243,0.3); }
//         .contenido { background: white; padding: 25px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 20px; }
//         .step-transition { animation: fadeSlide 0.4s ease-out; }
//         @keyframes fadeSlide { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         .card { background: white; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
//         .card-title { font-size: 1.4rem; font-weight: 600; color: #1a365d; margin-bottom: 20px; border-left: 5px solid #2196F3; padding-left: 15px; }
//         .btn { padding: 12px 20px; border: none; border-radius: 40px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 0.95rem; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
//         .btn-primary { background: #2196F3; color: white; box-shadow: 0 4px 10px rgba(33,150,243,0.3); }
//         .btn-primary:hover { background: #1976D2; transform: translateY(-2px); }
//         .btn-secondary { background: #e2e8f0; color: #2d3748; }
//         .btn-secondary:hover { background: #cbd5e0; }
//         .btn-success { background: #4CAF50; color: white; box-shadow: 0 4px 10px rgba(76,175,80,0.3); }
//         .btn-success:hover { background: #43a047; transform: translateY(-2px); }
//         .btn-large { padding: 15px 30px; font-size: 1.1rem; width: 100%; }
//         .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
//         .form-group { display: flex; flex-direction: column; }
//         .form-group.full-width { grid-column: 1 / -1; }
//         .form-group label { font-weight: 600; color: #2d3748; margin-bottom: 5px; font-size: 0.9rem; }
//         .form-group input, .form-group select { padding: 10px; border: 1px solid #cbd5e0; border-radius: 10px; font-size: 1rem; transition: border 0.2s; }
//         .form-group input:focus, .form-group select:focus { outline: none; border-color: #2196F3; box-shadow: 0 0 0 3px rgba(33,150,243,0.1); }
//         hr { margin: 25px 0; border: none; border-top: 2px solid #e2e8f0; }
//         .alerta-foto { background: #fff3cd; color: #856404; padding: 12px; border-radius: 40px; margin-bottom: 20px; border-left: 4px solid #ffeeba; font-weight: 500; }
//         .navegacion { display: flex; justify-content: space-between; margin-top: 30px; gap: 15px; }
//         .signature-pad { border: 2px dashed #cbd5e0; border-radius: 12px; background: #f8fafc; margin-bottom: 15px; overflow: hidden; touch-action: none; }
//         .signature-canvas { width: 100%; height: 250px; display: block; }
//         @media (max-width: 640px) { .contenido { padding: 15px; } .form-grid { grid-template-columns: 1fr; } .navegacion { flex-direction: column-reverse; } .btn { width: 100%; } }
//       `}</style>
//     </div>
//   );
// }

// export default App;














// import React, { useState, useEffect } from 'react';
// import './App.css'; 

// // --- IMPORTACIONES VEHICULAR ---
// import Login from './components/vehicular/Login';
// import Home from './components/vehicular/Home';
// import DatosGenerales from './components/vehicular/DatosGenerales';
// import Checklist, { estructura } from './components/vehicular/Checklist';
// import Camara from './components/vehicular/Camara';
// import Ubicacion from './components/vehicular/Ubicacion';
// import Firma from './components/vehicular/Firma';
// import Reporte from './components/vehicular/Reporte';
// import Notification from './components/vehicular/Notification';

// // --- IMPORTACIONES EDIFICACIÓN ---
// import DatosEdificio from './components/edificacion/DatosEdificio';
// import ChecklistEdificio, { itemsEdificio } from './components/edificacion/ChecklistEdificio';
// import ReporteEdificio from './components/edificacion/ReporteEdificio';

// function App() {
//   const [usuarioLogueado, setUsuarioLogueado] = useState(null);
//   const [moduloActivo, setModuloActivo] = useState(null);
//   const [paso, setPaso] = useState(1);
  
//   const [datosForm, setDatosForm] = useState({ semanaReporte: "1" }); 
//   const [checklist, setChecklist] = useState({});
//   const [datos, setDatos] = useState({ capturas: {}, ubicacion: null, direccion: '', hora: '', firma: null, coordenadas: null });
//   const [historicoSemanas, setHistoricoSemanas] = useState({ 1: {}, 2: {}, 3: {}, 4: {} });
//   const [historicoFotos, setHistoricoFotos] = useState({});
//   const [notification, setNotification] = useState(null);
//   const [mostrarModal, setMostrarModal] = useState(false);
//   const [verificaciones, setVerificaciones] = useState({ seguroVigente: false, tarjetaCombustible: false, licenciaVigente: false, fechaLicencia: '' });
//   const [fotosRequeridas, setFotosRequeridas] = useState([]);
//   const [confirmarSalir, setConfirmarSalir] = useState(false);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [paso]);

//   const showNotification = (message, type = 'error') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 4000);
//   };

//   const actualizarDatos = (nuevos) => setDatos(prev => ({ ...prev, ...nuevos }));
//   const actualizarDatosForm = (nuevos) => setDatosForm(prev => ({ ...prev, ...nuevos }));
  
//   useEffect(() => {
//     // Solo cargamos el histórico si estamos en vehículos
//     if (moduloActivo === 'vehiculos') {
//       const sem = datosForm.semanaReporte || "1";
//       setChecklist(historicoSemanas[sem] || {});
//     }
//   }, [datosForm.semanaReporte, historicoSemanas, moduloActivo]);
  
//   const handleChecklistChange = (nuevoChecklist) => setChecklist(nuevoChecklist);

//   const calcularFotosRequeridas = () => {
//     let requeridas = [];
//     if (moduloActivo === 'vehiculos') {
//       requeridas = ["Frente del vehículo", "Parte Trasera", "Lado Izquierdo", "Lado Derecho"];
//       Object.keys(checklist).forEach(item => {
//         if (item !== "_observaciones" && item !== "_kilometraje" && (checklist[item] === "NO" || checklist[item] === "NA")) {
//           requeridas.push(`Falla: ${item}`);
//         }
//       });
//     } else if (moduloActivo === 'edificios') {
//       // En edificios pedimos una foto general de fachada y las evidencias de fallas
//       requeridas = ["Fachada del Edificio"]; 
//       Object.keys(checklist).forEach(item => {
//         if (checklist[item]?.estado === "NO" || checklist[item]?.estado === "MPC") {
//           requeridas.push(`Evidencia: ${item}`);
//         }
//       });
//     }
//     setFotosRequeridas(requeridas);
//   };

//   const siguientePaso = () => {
//     if (paso === 1) {
//       if (moduloActivo === 'vehiculos') {
//         const faltan = ['noEco', 'area', 'periodo', 'mes', 'anio', 'kilometraje', 'nombre', 'rpe'].filter(c => !datosForm[c] || datosForm[c].toString().trim() === '');
//         if (faltan.length > 0) { showNotification(`Faltan campos: ${faltan.join(', ')}`, 'warning'); return; }
//         setMostrarModal(true); return; 
//       } else if (moduloActivo === 'edificios') {
//         const faltan = ['area', 'direccion', 'mes', 'tipoInspeccion', 'fecha1'].filter(c => !datosForm[c] || datosForm[c].toString().trim() === '');
//         if (faltan.length > 0) { showNotification(`Faltan campos: ${faltan.join(', ')}`, 'warning'); return; }
//         setPaso(2); return; // Pasa directo al checklist porque no hay modal de licencia en edificios
//       }
//     }
    
//     if (paso === 2) {
//       if (moduloActivo === 'vehiculos') {
//         const itemsTotales = Object.values(estructura).flat();
//         const faltantes = itemsTotales.filter(item => !checklist[item]);
//         if (faltantes.length > 0) { showNotification(`Faltan puntos por contestar en la lista`, 'warning'); return; }
//       } else if (moduloActivo === 'edificios') {
//         const faltantes = itemsEdificio.filter(item => !checklist[item] || !checklist[item].estado);
//         if (faltantes.length > 0) { showNotification(`Faltan puntos por contestar en la lista`, 'warning'); return; }
//       }
//       calcularFotosRequeridas(); 
//       setPaso(3); return;
//     }
    
//     if (paso === 3) {
//        const fotosTomadas = Object.keys(datos.capturas || {}).length;
//        if (fotosTomadas < fotosRequeridas.length) {
//          showNotification(`Faltan fotos por tomar (${fotosTomadas}/${fotosRequeridas.length})`, 'warning'); return;
//        }
//     }
    
//     if (paso === 4 && !datos.ubicacion) { showNotification('Registra tu ubicación GPS.', 'warning'); return; }
//     if (paso === 5 && !datos.firma) { showNotification('Debes guardar tu firma.', 'warning'); return; }
//     if (paso < 6) setPaso(p => p + 1);
//   };

//   const handleCheckModal = (e) => {
//     const { name, value, type, checked } = e.target;
//     setVerificaciones(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//   };

//   const confirmarVerificaciones = () => {
//     if (!verificaciones.seguroVigente || !verificaciones.tarjetaCombustible || !verificaciones.licenciaVigente || !verificaciones.fechaLicencia) {
//       showNotification('Confirma todos los datos y fecha de licencia.', 'warning'); return;
//     }
//     const hoy = new Date(); hoy.setHours(0, 0, 0, 0); 
//     const [year, month, day] = verificaciones.fechaLicencia.split('-');
//     const fechaLic = new Date(year, month - 1, day);
//     const diffDays = Math.ceil((fechaLic - hoy) / (1000 * 60 * 60 * 24));
//     if (diffDays < 0) { showNotification(' ❌ LICENCIA VENCIDA.', 'error'); return; } 
//     setDatosForm(prev => ({ ...prev, ...verificaciones }));
//     setMostrarModal(false); setPaso(2);
//   };
  
//   const anteriorPaso = () => { if (paso > 1) setPaso(paso - 1); };

//   const historicoSemanasActualizado = { ...historicoSemanas };
//   if (moduloActivo === 'vehiculos') {
//     historicoSemanasActualizado[datosForm.semanaReporte] = { ...checklist, _kilometraje: datosForm.kilometraje };
//   }
  
//   const historicoFotosActualizado = { ...historicoFotos };
//   if (Object.keys(datos.capturas || {}).length > 0 && moduloActivo === 'vehiculos') {
//     historicoFotosActualizado[datosForm.semanaReporte] = {
//       capturas: datos.capturas, hora: datos.hora, direccion: datos.direccion, coordenadas: datos.coordenadas
//     };
//   }

//   const intentarSalir = () => setConfirmarSalir(true);

//   const confirmarSalida = () => {
//     setConfirmarSalir(false); setModuloActivo(null); setPaso(1);
//     setDatosForm({ semanaReporte: "1" }); setChecklist({});
//     setDatos({ capturas: {}, ubicacion: null, direccion: '', hora: '', firma: null, coordenadas: null });
//     setHistoricoSemanas({ 1: {}, 2: {}, 3: {}, 4: {} }); setHistoricoFotos({});
//     setVerificaciones({ seguroVigente: false, tarjetaCombustible: false, licenciaVigente: false, fechaLicencia: '' });
//   };

//   if (!usuarioLogueado) {
//     return (
//       <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
//         {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
//         <Login onLogin={(correo) => setUsuarioLogueado(correo)} showNotification={showNotification} />
//       </div>
//     );
//   }

//   if (!moduloActivo) {
//     return ( 
//       <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
//         {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
//         <Home onSelectModule={setModuloActivo} />
//       </div>
//     );
//   }

//   return (
//     <div className="app">
//       {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

//       {confirmarSalir && (
//         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
//           <div style={{ background: 'white', padding: '30px', borderRadius: '16px', maxWidth: '400px', textAlign: 'center', animation: 'fadeIn 0.3s' }}>
//             <h3 style={{ color: '#d32f2f', marginBottom: '15px', fontSize: '1.4rem' }}>⚠️ ¿Salir al menú?</h3>
//             <p style={{ marginBottom: '25px', color: '#555' }}>Los datos no guardados de esta inspección se perderán.</p>
//             <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
//               <button onClick={() => setConfirmarSalir(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancelar</button>
//               <button onClick={confirmarSalida} className="btn" style={{ flex: 1, background: '#d32f2f', color: 'white' }}>Sí, salir</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* MODAL DE VEHICULOS */}
//       {mostrarModal && moduloActivo === 'vehiculos' && (
//         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
//           <div style={{ background: 'white', padding: '30px', borderRadius: '16px', maxWidth: '500px' }}>
//             <h3>⚠️ Verificaciones Obligatorias</h3>
//             <label><input type="checkbox" name="seguroVigente" checked={verificaciones.seguroVigente} onChange={handleCheckModal}/> Póliza vigente</label><br/><br/>
//             <label><input type="checkbox" name="tarjetaCombustible" checked={verificaciones.tarjetaCombustible} onChange={handleCheckModal}/> Tarjeta combustible</label><br/><br/>
//             <label><input type="checkbox" name="licenciaVigente" checked={verificaciones.licenciaVigente} onChange={handleCheckModal}/> Licencia vigente</label><br/><br/>
            
//             {verificaciones.licenciaVigente && (
//               <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '2px dashed #cbd5e0', marginTop: '10px' }}>
//                 <label style={{ fontWeight: 'bold', color: '#1a365d', display: 'block', marginBottom: '8px' }}>📅 Ingresa la fecha de vencimiento de la licencia:</label>
//                 <input type="date" name="fechaLicencia" value={verificaciones.fechaLicencia} onChange={handleCheckModal} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '1rem', background: 'white' }} />
//               </div>
//             )}
//             <br/><br/><button onClick={confirmarVerificaciones} className="btn btn-success w-full">Confirmar</button>
//           </div>
//         </div>
//       )}

//       <header>
//         <button onClick={intentarSalir} style={{ position: 'absolute', top: '0px', left: '0px', background: '#e2e8f0', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} title="Volver al Menú Principal"> 🏠 </button>
//         <h1>SeguridApp</h1>
//         <p className="subtitulo">{moduloActivo === 'vehiculos' ? 'Registro de Inspección Vehicular' : 'Registro de Inspección Edificios'}</p>
//         <div className="progreso-container">
//           <div className="progreso">
//             <div className={`paso ${paso >= 1 ? 'activo' : ''}`}>1. Datos</div>
//             <div className={`paso ${paso >= 2 ? 'activo' : ''}`}>2. Lista</div>
//             <div className={`paso ${paso >= 3 ? 'activo' : ''}`}>3. Foto</div>
//             <div className={`paso ${paso >= 4 ? 'activo' : ''}`}>4. Ubic.</div>
//             <div className={`paso ${paso >= 5 ? 'activo' : ''}`}>5. Firma</div>
//             <div className={`paso ${paso >= 6 ? 'activo' : ''}`}>6. Fin</div>
//           </div>
//         </div>
//       </header>
      
//       <main className="contenido step-transition">
//         {/* === RENDERIZADO CONDICIONAL POR MÓDULOS === */}
        
//         {paso === 1 && moduloActivo === 'vehiculos' && <DatosGenerales datos={datosForm} onChange={actualizarDatosForm} onCargarDatos={() => {}} showNotification={showNotification} />}
//         {paso === 1 && moduloActivo === 'edificios' && <DatosEdificio datos={datosForm} onChange={actualizarDatosForm} />}

//         {paso === 2 && moduloActivo === 'vehiculos' && <Checklist onChange={handleChecklistChange} datosPrevios={checklist} />}
//         {paso === 2 && moduloActivo === 'edificios' && <ChecklistEdificio onChange={handleChecklistChange} datosPrevios={checklist} />}

//         {/* PASOS 3 AL 5 SON IGUALES PARA AMBOS MÓDULOS */}
//         {paso === 3 && (
//           <div className="fade-in">
//             <div className="alerta-foto">📸 Toma las fotos obligatorias y evidencias.</div>
//             <Camara fotosRequeridas={fotosRequeridas} onCapture={(capturas, hora) => actualizarDatos({ capturas, hora })} />
//           </div>
//         )}
//         {paso === 4 && <Ubicacion onUbicacionObtenida={(ubicacion, direccion, coordenadas) => actualizarDatos({ ubicacion, direccion, coordenadas })} showNotification={showNotification} />}
//         {paso === 5 && <Firma onFirmaCompletada={(firma) => actualizarDatos({ firma })} showNotification={showNotification} />}
        
//         {/* PASO 6 SE DIVIDE OTRA VEZ */}
//         {paso === 6 && moduloActivo === 'vehiculos' && <Reporte datos={{ ...datos, form: datosForm }} historicoSemanas={historicoSemanasActualizado} historicoFotos={historicoFotosActualizado} showNotification={showNotification} />}
//         {paso === 6 && moduloActivo === 'edificios' && <ReporteEdificio datosForm={datosForm} checklist={checklist} firma={datos.firma} showNotification={showNotification} />}

//         <div className="navegacion">
//           {(paso > 1 && paso < 6) && <button onClick={anteriorPaso} className="btn btn-secondary">← Regresar</button>}
//           {paso < 6 && <button onClick={siguientePaso} className="btn btn-primary">Siguiente →</button>}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;








import React, { useState, useEffect } from 'react';
import './App.css'; 

// --- IMPORTACIONES VEHICULAR ---
import Login from './components/vehicular/Login';
import Home from './components/vehicular/Home';
import DatosGenerales from './components/vehicular/DatosGenerales';
import Checklist, { estructura } from './components/vehicular/Checklist';
import Camara from './components/vehicular/Camara';
import Ubicacion from './components/vehicular/Ubicacion';
import Firma from './components/vehicular/Firma';
import Reporte from './components/vehicular/Reporte';
import Notification from './components/vehicular/Notification';

// --- IMPORTACIONES EDIFICACIÓN ---
import DatosEdificio from './components/edificacion/DatosEdificio';
import ChecklistEdificio, { itemsEdificio } from './components/edificacion/ChecklistEdificio';
import ReporteEdificio from './components/edificacion/ReporteEdificio';

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [moduloActivo, setModuloActivo] = useState(null);
  const [paso, setPaso] = useState(1);
  
  const [datosForm, setDatosForm] = useState({ semanaReporte: "1" }); 
  const [checklist, setChecklist] = useState({});
  const [datos, setDatos] = useState({ capturas: {}, ubicacion: null, direccion: '', hora: '', firma: null, coordenadas: null });
  const [historicoSemanas, setHistoricoSemanas] = useState({ 1: {}, 2: {}, 3: {}, 4: {} });
  const [historicoFotos, setHistoricoFotos] = useState({});
  const [notification, setNotification] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [verificaciones, setVerificaciones] = useState({ seguroVigente: false, tarjetaCombustible: false, licenciaVigente: false, fechaLicencia: '' });
  const [fotosRequeridas, setFotosRequeridas] = useState([]);
  const [confirmarSalir, setConfirmarSalir] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [paso]);

  const showNotification = (message, type = 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const actualizarDatos = (nuevos) => setDatos(prev => ({ ...prev, ...nuevos }));
  const actualizarDatosForm = (nuevos) => setDatosForm(prev => ({ ...prev, ...nuevos }));
  
  useEffect(() => {
    if (moduloActivo === 'vehiculos') {
      const sem = datosForm.semanaReporte || "1";
      // Solo cargamos el checklist si ya hay datos de esa semana en el histórico
      // (si acabamos de cargar el PDF, el checklist debe estar vacío para la nueva semana)
      if (Object.keys(checklist).length === 0 && historicoSemanas[sem] && Object.keys(historicoSemanas[sem]).length > 0) {
         setChecklist(historicoSemanas[sem]);
      }
    }
  }, [datosForm.semanaReporte, historicoSemanas, moduloActivo, checklist]);
  
  const handleChecklistChange = (nuevoChecklist) => setChecklist(nuevoChecklist);

  const calcularFotosRequeridas = () => {
    let requeridas = [];
    if (moduloActivo === 'vehiculos') {
      requeridas = ["Frente del vehículo", "Parte Trasera", "Lado Izquierdo", "Lado Derecho"];
      Object.keys(checklist).forEach(item => {
        if (item !== "_observaciones" && item !== "_kilometraje" && (checklist[item] === "NO" || checklist[item] === "NA")) {
          requeridas.push(`Falla: ${item}`);
        }
      });
    } else if (moduloActivo === 'edificios') {
      requeridas = ["Fachada del Edificio"]; 
      Object.keys(checklist).forEach(item => {
        if (checklist[item]?.estado === "NO" || checklist[item]?.estado === "MPC") {
          requeridas.push(`Evidencia: ${item}`);
        }
      });
    }
    setFotosRequeridas(requeridas);
  };

  const siguientePaso = () => {
    if (paso === 1) {
      if (moduloActivo === 'vehiculos') {
        const faltan = ['noEco', 'area', 'periodo', 'mes', 'anio', 'kilometraje', 'nombre', 'rpe'].filter(c => !datosForm[c] || datosForm[c].toString().trim() === '');
        if (faltan.length > 0) { showNotification(`Faltan campos: ${faltan.join(', ')}`, 'warning'); return; }
        setMostrarModal(true); return; 
      } else if (moduloActivo === 'edificios') {
        const faltan = ['area', 'direccion', 'mes', 'tipoInspeccion', 'fecha1'].filter(c => !datosForm[c] || datosForm[c].toString().trim() === '');
        if (faltan.length > 0) { showNotification(`Faltan campos: ${faltan.join(', ')}`, 'warning'); return; }
        setPaso(2); return;
      }
    }
    
    if (paso === 2) {
      if (moduloActivo === 'vehiculos') {
        const itemsTotales = Object.values(estructura).flat();
        const faltantes = itemsTotales.filter(item => !checklist[item]);
        if (faltantes.length > 0) { showNotification(`Faltan puntos por contestar en la lista`, 'warning'); return; }
      } else if (moduloActivo === 'edificios') {
        const faltantes = itemsEdificio.filter(item => !checklist[item] || !checklist[item].estado);
        if (faltantes.length > 0) { showNotification(`Faltan puntos por contestar en la lista`, 'warning'); return; }
      }
      calcularFotosRequeridas(); 
      setPaso(3); return;
    }
    
    if (paso === 3) {
       const fotosTomadas = Object.keys(datos.capturas || {}).length;
       if (fotosTomadas < fotosRequeridas.length) {
         showNotification(`Faltan fotos por tomar (${fotosTomadas}/${fotosRequeridas.length})`, 'warning'); return;
       }
    }
    
    if (paso === 4 && !datos.ubicacion) { showNotification('Registra tu ubicación GPS.', 'warning'); return; }
    if (paso === 5 && !datos.firma) { showNotification('Debes guardar tu firma.', 'warning'); return; }
    if (paso < 6) setPaso(p => p + 1);
  };

  const handleCheckModal = (e) => {
    const { name, value, type, checked } = e.target;
    setVerificaciones(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const confirmarVerificaciones = () => {
    if (!verificaciones.seguroVigente || !verificaciones.tarjetaCombustible || !verificaciones.licenciaVigente || !verificaciones.fechaLicencia) {
      showNotification('Confirma todos los datos y fecha de licencia.', 'warning'); return;
    }
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0); 
    const [year, month, day] = verificaciones.fechaLicencia.split('-');
    const fechaLic = new Date(year, month - 1, day);
    const diffDays = Math.ceil((fechaLic - hoy) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) { showNotification(' ❌ LICENCIA VENCIDA.', 'error'); return; } 
    setDatosForm(prev => ({ ...prev, ...verificaciones }));
    setMostrarModal(false); setPaso(2);
  };
  
  const anteriorPaso = () => { if (paso > 1) setPaso(paso - 1); };

  const historicoSemanasActualizado = { ...historicoSemanas };
  if (moduloActivo === 'vehiculos') {
    historicoSemanasActualizado[datosForm.semanaReporte] = { ...checklist, _kilometraje: datosForm.kilometraje };
  }
  
  const historicoFotosActualizado = { ...historicoFotos };
  if (Object.keys(datos.capturas || {}).length > 0 && moduloActivo === 'vehiculos') {
    historicoFotosActualizado[datosForm.semanaReporte] = {
      capturas: datos.capturas, hora: datos.hora, direccion: datos.direccion, coordenadas: datos.coordenadas
    };
  }

  // --- FUNCIÓN REPARADA PARA CARGAR PDF ---
  const handleCargarDatosDesdePDF = (datosPDF) => {
    let proximaSemana = 1;
    
    if (datosPDF.historicoSemanas) {
      setHistoricoSemanas(datosPDF.historicoSemanas);
      
      // Magia: Detectar automáticamente qué semana te toca llenar ahora
      if (datosPDF.historicoSemanas[1] && Object.keys(datosPDF.historicoSemanas[1]).length > 0) proximaSemana = 2;
      if (datosPDF.historicoSemanas[2] && Object.keys(datosPDF.historicoSemanas[2]).length > 0) proximaSemana = 3;
      if (datosPDF.historicoSemanas[3] && Object.keys(datosPDF.historicoSemanas[3]).length > 0) proximaSemana = 4;
    }
    
    if (datosPDF.historicoFotos) {
      setHistoricoFotos(datosPDF.historicoFotos);
    }

    setDatosForm(prev => ({
      ...prev, // Conserva la fecha, mes y periodo que se generaron HOY
      semanaReporte: proximaSemana.toString(), // Te avanza a la semana correcta
      nombre: datosPDF.form?.nombre || prev.nombre,
      rpe: datosPDF.form?.rpe || prev.rpe,
      noEco: datosPDF.form?.noEco || prev.noEco,
      area: datosPDF.form?.area || prev.area,
      idDocumentoPrevio: datosPDF.idActual
      // El kilometraje viejo NO se copia para que lo llenes nuevo.
    }));
    
    // Limpiamos la lista para que empieces a revisar el carro en blanco esta nueva semana
    setChecklist({});
  };

  const intentarSalir = () => setConfirmarSalir(true);

  const confirmarSalida = () => {
    setConfirmarSalir(false); setModuloActivo(null); setPaso(1);
    setDatosForm({ semanaReporte: "1" }); setChecklist({});
    setDatos({ capturas: {}, ubicacion: null, direccion: '', hora: '', firma: null, coordenadas: null });
    setHistoricoSemanas({ 1: {}, 2: {}, 3: {}, 4: {} }); setHistoricoFotos({});
    setVerificaciones({ seguroVigente: false, tarjetaCombustible: false, licenciaVigente: false, fechaLicencia: '' });
  };

  if (!usuarioLogueado) {
    return (
      <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        <Login onLogin={(correo) => setUsuarioLogueado(correo)} showNotification={showNotification} />
      </div>
    );
  }

  if (!moduloActivo) {
    return ( 
      <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        <Home onSelectModule={setModuloActivo} />
      </div>
    );
  }

  return (
    <div className="app">
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

      {confirmarSalir && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '16px', maxWidth: '400px', textAlign: 'center', animation: 'fadeIn 0.3s' }}>
            <h3 style={{ color: '#d32f2f', marginBottom: '15px', fontSize: '1.4rem' }}>⚠️ ¿Salir al menú?</h3>
            <p style={{ marginBottom: '25px', color: '#555' }}>Los datos no guardados de esta inspección se perderán.</p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button onClick={() => setConfirmarSalir(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancelar</button>
              <button onClick={confirmarSalida} className="btn" style={{ flex: 1, background: '#d32f2f', color: 'white' }}>Sí, salir</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE VEHICULOS */}
      {mostrarModal && moduloActivo === 'vehiculos' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '16px', maxWidth: '500px' }}>
            <h3>⚠️ Verificaciones Obligatorias</h3>
            <label><input type="checkbox" name="seguroVigente" checked={verificaciones.seguroVigente} onChange={handleCheckModal}/> Póliza vigente</label><br/><br/>
            <label><input type="checkbox" name="tarjetaCombustible" checked={verificaciones.tarjetaCombustible} onChange={handleCheckModal}/> Tarjeta combustible</label><br/><br/>
            <label><input type="checkbox" name="licenciaVigente" checked={verificaciones.licenciaVigente} onChange={handleCheckModal}/> Licencia vigente</label><br/><br/>
            
            {verificaciones.licenciaVigente && (
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '2px dashed #cbd5e0', marginTop: '10px' }}>
                <label style={{ fontWeight: 'bold', color: '#1a365d', display: 'block', marginBottom: '8px' }}>📅 Ingresa la fecha de vencimiento de la licencia:</label>
                <input type="date" name="fechaLicencia" value={verificaciones.fechaLicencia} onChange={handleCheckModal} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '1rem', background: 'white' }} />
              </div>
            )}
            <br/><br/><button onClick={confirmarVerificaciones} className="btn btn-success w-full">Confirmar</button>
          </div>
        </div>
      )}

      <header>
        <button onClick={intentarSalir} style={{ position: 'absolute', top: '0px', left: '0px', background: '#e2e8f0', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} title="Volver al Menú Principal"> 🏠 </button>
        <h1>SeguridApp</h1>
        <p className="subtitulo">{moduloActivo === 'vehiculos' ? 'Registro de Inspección Vehicular' : 'Registro de Inspección Edificios'}</p>
        <div className="progreso-container">
          <div className="progreso">
            <div className={`paso ${paso >= 1 ? 'activo' : ''}`}>1. Datos</div>
            <div className={`paso ${paso >= 2 ? 'activo' : ''}`}>2. Lista</div>
            <div className={`paso ${paso >= 3 ? 'activo' : ''}`}>3. Foto</div>
            <div className={`paso ${paso >= 4 ? 'activo' : ''}`}>4. Ubic.</div>
            <div className={`paso ${paso >= 5 ? 'activo' : ''}`}>5. Firma</div>
            <div className={`paso ${paso >= 6 ? 'activo' : ''}`}>6. Fin</div>
          </div>
        </div>
      </header>
      
      <main className="contenido step-transition">
        
        {paso === 1 && moduloActivo === 'vehiculos' && (
          <DatosGenerales 
            datos={datosForm} 
            onChange={actualizarDatosForm} 
            onCargarDatos={handleCargarDatosDesdePDF}
            showNotification={showNotification} 
          />
        )}
        {paso === 1 && moduloActivo === 'edificios' && (
          <DatosEdificio 
            datos={datosForm} 
            onChange={actualizarDatosForm} 
          />
        )}

        {paso === 2 && moduloActivo === 'vehiculos' && <Checklist onChange={handleChecklistChange} datosPrevios={checklist} />}
        {paso === 2 && moduloActivo === 'edificios' && <ChecklistEdificio onChange={handleChecklistChange} datosPrevios={checklist} />}

        {paso === 3 && (
          <div className="fade-in">
            <div className="alerta-foto">📸 Toma las fotos obligatorias y evidencias.</div>
            <Camara fotosRequeridas={fotosRequeridas} onCapture={(capturas, hora) => actualizarDatos({ capturas, hora })} />
          </div>
        )}
        {paso === 4 && <Ubicacion onUbicacionObtenida={(ubicacion, direccion, coordenadas) => actualizarDatos({ ubicacion, direccion, coordenadas })} showNotification={showNotification} />}
        {paso === 5 && <Firma onFirmaCompletada={(firma) => actualizarDatos({ firma })} showNotification={showNotification} />}
        
        {paso === 6 && moduloActivo === 'vehiculos' && <Reporte datos={{ ...datos, form: datosForm }} historicoSemanas={historicoSemanasActualizado} historicoFotos={historicoFotosActualizado} showNotification={showNotification} />}
        {paso === 6 && moduloActivo === 'edificios' && <ReporteEdificio datosForm={datosForm} checklist={checklist} firma={datos.firma} showNotification={showNotification} />}

        <div className="navegacion">
          {(paso > 1 && paso < 6) && <button onClick={anteriorPaso} className="btn btn-secondary">← Regresar</button>}
          {paso < 6 && <button onClick={siguientePaso} className="btn btn-primary">Siguiente →</button>}
        </div>
      </main>
    </div>
  );
}

export default App;