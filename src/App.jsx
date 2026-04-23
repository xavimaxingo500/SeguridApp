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
//     if (moduloActivo === 'vehiculos') {
//       const sem = datosForm.semanaReporte || "1";
//       // Solo cargamos el checklist si ya hay datos de esa semana en el histórico
//       // (si acabamos de cargar el PDF, el checklist debe estar vacío para la nueva semana)
//       if (Object.keys(checklist).length === 0 && historicoSemanas[sem] && Object.keys(historicoSemanas[sem]).length > 0) {
//          setChecklist(historicoSemanas[sem]);
//       }
//     }
//   }, [datosForm.semanaReporte, historicoSemanas, moduloActivo, checklist]);
  
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
//         setPaso(2); return;
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

//   // --- FUNCIÓN REPARADA PARA CARGAR PDF ---
  
//   const handleCargarDatosDesdePDF = (datosPDF) => {
//     let proximaSemana = 1;
    
//     if (datosPDF.historicoSemanas) {
//       setHistoricoSemanas(datosPDF.historicoSemanas);
      
//       // Magia: Detectar automáticamente qué semana te toca llenar ahora
//       if (datosPDF.historicoSemanas[1] && Object.keys(datosPDF.historicoSemanas[1]).length > 0) proximaSemana = 2;
//       if (datosPDF.historicoSemanas[2] && Object.keys(datosPDF.historicoSemanas[2]).length > 0) proximaSemana = 3;
//       if (datosPDF.historicoSemanas[3] && Object.keys(datosPDF.historicoSemanas[3]).length > 0) proximaSemana = 4;
//     }
    
//     if (datosPDF.historicoFotos) {
//       setHistoricoFotos(datosPDF.historicoFotos);
//     }

//     setDatosForm(prev => ({
//       ...prev, // Conserva la fecha, mes y periodo que se generaron HOY
//       semanaReporte: proximaSemana.toString(), // Te avanza a la semana correcta
//       nombre: datosPDF.form?.nombre || prev.nombre,
//       rpe: datosPDF.form?.rpe || prev.rpe,
//       noEco: datosPDF.form?.noEco || prev.noEco,
//       area: datosPDF.form?.area || prev.area,
//       idDocumentoPrevio: datosPDF.idActual
//       // El kilometraje viejo NO se copia para que lo llenes nuevo.
//     }));
    
//     // Limpiamos la lista para que empieces a revisar el carro en blanco esta nueva semana
//     setChecklist({});
//   };

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
        
//         {paso === 1 && moduloActivo === 'vehiculos' && (
//           <DatosGenerales 
//             datos={datosForm} 
//             onChange={actualizarDatosForm} 
//             onCargarDatos={handleCargarDatosDesdePDF}
//             showNotification={showNotification} 
//           />
//         )}
//         {paso === 1 && moduloActivo === 'edificios' && (
//           <DatosEdificio 
//             datos={datosForm} 
//             onChange={actualizarDatosForm} 
//           />
//         )}

//         {paso === 2 && moduloActivo === 'vehiculos' && <Checklist onChange={handleChecklistChange} datosPrevios={checklist} />}
//         {paso === 2 && moduloActivo === 'edificios' && <ChecklistEdificio onChange={handleChecklistChange} datosPrevios={checklist} />}

//         {paso === 3 && (
//           <div className="fade-in">
//             <div className="alerta-foto">📸 Toma las fotos obligatorias y evidencias.</div>
//             <Camara fotosRequeridas={fotosRequeridas} onCapture={(capturas, hora) => actualizarDatos({ capturas, hora })} />
//           </div>
//         )}
//         {paso === 4 && <Ubicacion onUbicacionObtenida={(ubicacion, direccion, coordenadas) => actualizarDatos({ ubicacion, direccion, coordenadas })} showNotification={showNotification} />}
//         {paso === 5 && <Firma onFirmaCompletada={(firma) => actualizarDatos({ firma })} showNotification={showNotification} />}
        
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

// ⚠️ NOTA: Quita las diagonales "//" cuando tengas tus carpetas creadas
// import DatosEdificio from './components/edificacion/DatosEdificio';
// import ChecklistEdificio, { itemsEdificio } from './components/edificacion/ChecklistEdificio';
// import ReporteEdificio from './components/edificacion/ReporteEdificio';
// import DatosBotiquin from './components/botiquines/DatosBotiquin';
// import ChecklistBotiquin, { estructuraBotiquin } from './components/botiquines/ChecklistBotiquin';
// import ReporteBotiquin from './components/botiquines/ReporteBotiquin';

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
  const [fotosRequeridas, setFotosRequeridas] = useState([]);
  const [confirmarSalir, setConfirmarSalir] = useState(false);

  const [verificaciones, setVerificaciones] = useState({ poliza: null, tarjeta: null, licencia: null, fechaLicencia: '' });
  
  // NUEVO ESTADO: Controla la ventana elegante de las alertas
  const [alertaVerificaciones, setAlertaVerificaciones] = useState(null);

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
      setChecklist(historicoSemanas[sem] || {});
    }
  }, [datosForm.semanaReporte, historicoSemanas, moduloActivo]);
  
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
    } else if (moduloActivo === 'botiquines') {
      requeridas = ["Foto Exterior (Ubicación)", "Foto Interior (Inventario)"];
    }
    setFotosRequeridas(requeridas);
  };

  const siguientePaso = () => {
    if (paso === 1) {
      if (moduloActivo === 'vehiculos') {
        const faltan = ['noEco', 'area', 'periodo', 'mes', 'anio', 'kilometraje', 'nombre', 'rpe'].filter(c => !datosForm[c] || datosForm[c].toString().trim() === '');
        if (faltan.length > 0) { showNotification(`Faltan campos: ${faltan.join(', ')}`, 'warning'); return; }
        setMostrarModal(true); return; 
      }
      setPaso(2); return;
    }
    
    if (paso === 2) {
      if (moduloActivo === 'vehiculos') {
        const itemsTotales = Object.values(estructura).flat();
        const faltantes = itemsTotales.filter(item => !checklist[item]);
        if (faltantes.length > 0) { showNotification(`Faltan puntos por contestar en la lista`, 'warning'); return; }
        
        const nuevoChecklist = { ...checklist };
        if (datosForm.obsVerificaciones && datosForm.obsVerificaciones.length > 0) {
          if (!nuevoChecklist._observaciones) nuevoChecklist._observaciones = {};
          nuevoChecklist._observaciones["Documentación"] = datosForm.obsVerificaciones.join(" | ");
          handleChecklistChange(nuevoChecklist);
        }
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

  const setVerif = (campo, valor) => setVerificaciones(prev => ({ ...prev, [campo]: valor }));

  const confirmarVerificaciones = () => {
    if (verificaciones.poliza === null || verificaciones.tarjeta === null || verificaciones.licencia === null) {
      showNotification('Responde todas las preguntas con SI o NO.', 'warning'); return;
    }
    if (verificaciones.licencia === 'SI' && !verificaciones.fechaLicencia) {
      showNotification('Ingresa la fecha de vencimiento de la licencia.', 'warning'); return;
    }

    let obsVerificaciones = [];
    let mensajesAlerta = [];
    let bloquearPaso = false; // Variable mágica que decide si pasan o no

    // NO TIENE TARJETA
    if (verificaciones.tarjeta === 'NO') {
      obsVerificaciones.push("Sin Tarjeta de Combustible");
    }

    // NO TIENE PÓLIZA (Bloquea)
    if (verificaciones.poliza === 'NO') {
      obsVerificaciones.push("Sin Póliza Vigente");
      bloquearPaso = true;
    }

    // LÓGICA DE LICENCIA (Bloquea si no tiene o está vencida)
    if (verificaciones.licencia === 'NO') {
      obsVerificaciones.push("Conductor sin Licencia");
      bloquearPaso = true;
    } else {
      const hoy = new Date(); hoy.setHours(0, 0, 0, 0); 
      const [year, month, day] = verificaciones.fechaLicencia.split('-');
      const fechaLic = new Date(year, month - 1, day);
      const diffDays = Math.ceil((fechaLic - hoy) / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) { 
        obsVerificaciones.push(`Licencia Vencida (Venció hace ${Math.abs(diffDays)} días)`);
        mensajesAlerta.push(`❌ ATENCIÓN: LA LICENCIA ESTÁ VENCIDA.`);
        bloquearPaso = true; // Licencia vencida = BLOQUEADO
      } else if (diffDays <= 7) {
        obsVerificaciones.push(`Licencia próxima a vencer (en ${diffDays} días)`);
        mensajesAlerta.push(`⚠️ ATENCIÓN: Licencia próxima a vencer en ${diffDays} días.`);
      }
    }

    // EL MENSAJE DEL JEFE
    if (bloquearPaso) {
      mensajesAlerta.unshift("🛑 FAVOR DE PRESENTARSE EN LAS OFICINAS DE DIRECCIÓN VEHICULAR.\n(Es obligatorio contar con Póliza y Licencia vigente)");
    }

    setDatosForm(prev => ({ ...prev, obsVerificaciones, ...verificaciones }));
    setMostrarModal(false); 

    // SI HAY ALERTAS, MOSTRAMOS LA VENTANA BONITA, SI NO, PASAN AL PASO 2 DIRECTO
    if (mensajesAlerta.length > 0) {
      setAlertaVerificaciones({
        mensajes: mensajesAlerta,
        bloqueado: bloquearPaso
      });
    } else {
      setPaso(2);
    }
  };

  // FUNCIÓN PARA CERRAR LA VENTANA ELEGANTE DE ALERTAS
  const cerrarAlertaVerificaciones = () => {
    const estabaBloqueado = alertaVerificaciones.bloqueado;
    setAlertaVerificaciones(null);
    
    // Si NO estaban bloqueados (solo era un aviso de "te quedan 5 días"), los dejamos pasar
    if (!estabaBloqueado) {
      setPaso(2);
    }
    // Si ESTABAN bloqueados, se quedan en el Paso 1. No avanzan.
  };
  
  const anteriorPaso = () => { if (paso > 1) setPaso(paso - 1); };

  const historicoSemanasActualizado = { ...historicoSemanas };
  if (moduloActivo === 'vehiculos') {
    historicoSemanasActualizado[datosForm.semanaReporte] = { ...checklist, _kilometraje: datosForm.kilometraje };
  }
  
  const historicoFotosActualizado = { ...historicoFotos };
  if (Object.keys(datos.capturas || {}).length > 0) {
    historicoFotosActualizado[datosForm.semanaReporte || 1] = {
      capturas: datos.capturas, hora: datos.hora, direccion: datos.direccion, coordenadas: datos.coordenadas
    };
  }

  const intentarSalir = () => setConfirmarSalir(true);

  const confirmarSalida = () => {
    setConfirmarSalir(false); setModuloActivo(null); setPaso(1);
    setDatosForm({ semanaReporte: "1" }); setChecklist({});
    setDatos({ capturas: {}, ubicacion: null, direccion: '', hora: '', firma: null, coordenadas: null });
    setHistoricoSemanas({ 1: {}, 2: {}, 3: {}, 4: {} }); setHistoricoFotos({});
    setVerificaciones({ poliza: null, tarjeta: null, licencia: null, fechaLicencia: '' });
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

      {/* VENTANA EMERGENTE: FORMULARIO DE VERIFICACIONES */}
      {mostrarModal && moduloActivo === 'vehiculos' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '16px', maxWidth: '500px', width: '100%', animation: 'fadeIn 0.3s' }}>
            <h3 style={{ marginBottom: '20px', color: '#1a365d' }}>⚠️ Verificaciones Obligatorias</h3>
            
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>Póliza vigente:</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setVerif('poliza', 'SI')} style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', background: verificaciones.poliza === 'SI' ? '#4CAF50' : '#e0e0e0', color: verificaciones.poliza === 'SI' ? 'white' : 'black', fontWeight: 'bold', cursor: 'pointer' }}>SI</button>
                <button onClick={() => setVerif('poliza', 'NO')} style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', background: verificaciones.poliza === 'NO' ? '#F44336' : '#e0e0e0', color: verificaciones.poliza === 'NO' ? 'white' : 'black', fontWeight: 'bold', cursor: 'pointer' }}>NO</button>
              </div>
            </div>

            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>Tarjeta combustible:</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setVerif('tarjeta', 'SI')} style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', background: verificaciones.tarjeta === 'SI' ? '#4CAF50' : '#e0e0e0', color: verificaciones.tarjeta === 'SI' ? 'white' : 'black', fontWeight: 'bold', cursor: 'pointer' }}>SI</button>
                <button onClick={() => setVerif('tarjeta', 'NO')} style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', background: verificaciones.tarjeta === 'NO' ? '#F44336' : '#e0e0e0', color: verificaciones.tarjeta === 'NO' ? 'white' : 'black', fontWeight: 'bold', cursor: 'pointer' }}>NO</button>
              </div>
            </div>

            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>Licencia vigente:</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setVerif('licencia', 'SI')} style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', background: verificaciones.licencia === 'SI' ? '#4CAF50' : '#e0e0e0', color: verificaciones.licencia === 'SI' ? 'white' : 'black', fontWeight: 'bold', cursor: 'pointer' }}>SI</button>
                <button onClick={() => setVerif('licencia', 'NO')} style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', background: verificaciones.licencia === 'NO' ? '#F44336' : '#e0e0e0', color: verificaciones.licencia === 'NO' ? 'white' : 'black', fontWeight: 'bold', cursor: 'pointer' }}>NO</button>
              </div>
            </div>
            
            {verificaciones.licencia === 'SI' && (
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '2px dashed #cbd5e0', marginTop: '10px', animation: 'fadeIn 0.3s' }}>
                <label style={{ fontWeight: 'bold', color: '#1a365d', display: 'block', marginBottom: '8px' }}>📅 Ingresa la fecha de vencimiento de la licencia:</label>
                <input type="date" value={verificaciones.fechaLicencia} onChange={(e) => setVerif('fechaLicencia', e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '1rem', background: 'white' }} />
              </div>
            )}
            <br/><button onClick={confirmarVerificaciones} className="btn btn-success w-full" style={{ padding: '15px', fontSize: '1.1rem' }}>Confirmar</button>
          </div>
        </div>
      )}

      {/* NUEVA VENTANA EMERGENTE CON ESTILO PARA ALERTAS (REEMPLAZA AL FEÍSIMO "alert()" DEL NAVEGADOR) */}
      {alertaVerificaciones && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050, padding: '20px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '16px', maxWidth: '450px', width: '100%', textAlign: 'center', animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>{alertaVerificaciones.bloqueado ? '🛑' : '⚠️'}</div>
            <h3 style={{ color: alertaVerificaciones.bloqueado ? '#d32f2f' : '#FF9800', marginBottom: '20px', fontSize: '1.4rem' }}>
              {alertaVerificaciones.bloqueado ? 'Acceso Denegado' : 'Aviso Importante'}
            </h3>
            
            <div style={{ textAlign: 'left', background: alertaVerificaciones.bloqueado ? '#ffebee' : '#fff8e1', padding: '15px', borderRadius: '8px', marginBottom: '25px', borderLeft: `5px solid ${alertaVerificaciones.bloqueado ? '#f44336' : '#ff9800'}` }}>
              {alertaVerificaciones.mensajes.map((msg, idx) => (
                <p key={idx} style={{ marginBottom: '10px', color: '#333', fontWeight: idx === 0 && alertaVerificaciones.bloqueado ? 'bold' : 'normal', whiteSpace: 'pre-line' }}>
                  {msg}
                </p>
              ))}
            </div>

            <button onClick={cerrarAlertaVerificaciones} className="btn w-full" style={{ background: alertaVerificaciones.bloqueado ? '#d32f2f' : '#2196F3', color: 'white', padding: '15px', fontSize: '1.1rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              {alertaVerificaciones.bloqueado ? 'Entendido (No puedes avanzar)' : 'Continuar Inspección'}
            </button>
          </div>
        </div>
      )}

      <header>
        <button onClick={intentarSalir} style={{ position: 'absolute', top: '0px', left: '0px', background: '#e2e8f0', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} title="Volver al Menú Principal"> 🏠 </button>
        <h1>SeguridApp</h1>
        <p className="subtitulo">
          {moduloActivo === 'vehiculos' ? 'Registro de Inspección Vehicular' : 'Registro de Inspección'}
        </p>
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
        
        {/* EL ONCARGARDATOS (LA LECTURA DEL PDF) ESTÁ INTACTO Y A SALVO AQUÍ ABAJO */}
        {paso === 1 && moduloActivo === 'vehiculos' && (
          <DatosGenerales 
            datos={datosForm} 
            onChange={actualizarDatosForm} 
            showNotification={showNotification} 
            onCargarDatos={(datosExtraidos) => {
              const histSem = datosExtraidos.historicoSemanas || { 1: {}, 2: {}, 3: {}, 4: {} };
              let semanaAnterior = "1";
              let siguienteSemana = "1";
              
              if (Object.keys(histSem[1] || {}).length > 1) { semanaAnterior = "1"; siguienteSemana = "2"; }
              if (Object.keys(histSem[2] || {}).length > 1) { semanaAnterior = "2"; siguienteSemana = "3"; }
              if (Object.keys(histSem[3] || {}).length > 1) { semanaAnterior = "3"; siguienteSemana = "4"; }
              if (Object.keys(histSem[4] || {}).length > 1) { 
                showNotification('Este reporte ya tiene las 4 semanas completas.', 'warning');
                siguienteSemana = "4"; 
              }
              
              const fallasArrastradas = {};
              const obsArrastradas = {};
              
              if (siguienteSemana !== "1" && histSem[semanaAnterior]) {
                Object.keys(histSem[semanaAnterior]).forEach(item => {
                  if (item !== "_observaciones" && item !== "_kilometraje") {
                    const valor = histSem[semanaAnterior][item];
                    if (valor === "NO" || valor === "NA") {
                      fallasArrastradas[item] = valor;
                      if (histSem[semanaAnterior]._observaciones && histSem[semanaAnterior]._observaciones[item]) {
                        obsArrastradas[item] = histSem[semanaAnterior]._observaciones[item];
                      }
                    }
                  }
                });
                if (Object.keys(fallasArrastradas).length > 0) {
                  fallasArrastradas._observaciones = obsArrastradas;
                  histSem[siguienteSemana] = fallasArrastradas;
                }
              }

              setDatosForm(prev => ({ 
                ...prev, 
                ...(datosExtraidos.form || {}), 
                semanaReporte: siguienteSemana, 
                kilometraje: "", 
                idDocumentoPrevio: datosExtraidos.idActual || "" 
              }));
              setHistoricoSemanas(histSem);
              setHistoricoFotos(datosExtraidos.historicoFotos || {});
            }} 
          />
        )}

        {paso === 2 && moduloActivo === 'vehiculos' && <Checklist onChange={handleChecklistChange} datosPrevios={checklist} />}
        
        {paso === 3 && (
          <div className="fade-in">
            <div className="alerta-foto">📸 Toma las fotos obligatorias y evidencias.</div>
            <Camara fotosRequeridas={fotosRequeridas} onCapture={(capturas, hora) => actualizarDatos({ capturas, hora })} />
          </div>
        )}
        {paso === 4 && <Ubicacion onUbicacionObtenida={(ubicacion, direccion, coordenadas) => actualizarDatos({ ubicacion, direccion, coordenadas })} showNotification={showNotification} />}
        {paso === 5 && <Firma onFirmaCompletada={(firma) => actualizarDatos({ firma })} showNotification={showNotification} />}
        
        {paso === 6 && moduloActivo === 'vehiculos' && <Reporte datos={{ ...datos, form: datosForm }} historicoSemanas={historicoSemanasActualizado} historicoFotos={historicoFotosActualizado} showNotification={showNotification} />}
        
        <div className="navegacion">
          {(paso > 1 && paso < 6) && <button onClick={anteriorPaso} className="btn btn-secondary">← Regresar</button>}
          {paso < 6 && <button onClick={siguientePaso} className="btn btn-primary">Siguiente →</button>}
        </div>
      </main>
    </div>
  );
}

export default App;