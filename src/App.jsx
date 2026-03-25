import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import DatosGenerales from './components/DatosGenerales';
import Checklist, { estructura } from './components/Checklist';
import Camara from './components/Camara';
import Ubicacion from './components/Ubicacion';
import Firma from './components/Firma';
import Reporte from './components/Reporte';

function App() {
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

  const showNotification = (message, type = 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const actualizarDatos = (nuevos) => setDatos(prev => ({ ...prev, ...nuevos }));
  const actualizarDatosForm = (nuevos) => setDatosForm(prev => ({ ...prev, ...nuevos }));

  useEffect(() => {
    const sem = datosForm.semanaReporte || "1";
    setChecklist(historicoSemanas[sem] || {});
  }, [datosForm.semanaReporte, historicoSemanas]);

  const handleChecklistChange = (nuevoChecklist) => setChecklist(nuevoChecklist);

  const calcularFotosRequeridas = () => {
    let requeridas = ["Frente del vehículo", "Parte Trasera", "Lado Izquierdo", "Lado Derecho"];
    Object.keys(checklist).forEach(item => {
      if (item !== "_observaciones" && item !== "_kilometraje" && (checklist[item] === "NO" || checklist[item] === "NA")) {
        requeridas.push(`Falla: ${item}`);
      }
    });
    setFotosRequeridas(requeridas);
  };

  const siguientePaso = () => {
    if (paso === 1) {
      const camposObligatorios = ['noEco', 'area', 'periodo', 'mes', 'anio', 'kilometraje', 'nombre', 'rpe'];
      const faltan = camposObligatorios.filter(campo => !datosForm[campo] || datosForm[campo].toString().trim() === '');
      if (faltan.length > 0) { showNotification(`Faltan campos: ${faltan.join(', ')}`, 'warning'); return; }
      setMostrarModal(true); return;
    }
    
    if (paso === 2) {
      const itemsTotales = Object.values(estructura).flat();
      const faltantes = itemsTotales.filter(item => !checklist[item]);
      if (faltantes.length > 0) { showNotification(`Faltan por contestar: ${faltantes.length} items`, 'warning'); return; }
      
      calcularFotosRequeridas(); 
      setPaso(3); return;
    }
    
    if (paso === 3) {
       const fotosTomadas = Object.keys(datos.capturas || {}).length;
       if (fotosTomadas < fotosRequeridas.length) {
         showNotification(`Faltan fotos por tomar (${fotosTomadas}/${fotosRequeridas.length})`, 'warning');
         return;
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
  historicoSemanasActualizado[datosForm.semanaReporte] = { ...checklist, _kilometraje: datosForm.kilometraje };
  
  const historicoFotosActualizado = { ...historicoFotos };
  if (Object.keys(datos.capturas || {}).length > 0) {
    historicoFotosActualizado[datosForm.semanaReporte] = {
      capturas: datos.capturas, hora: datos.hora, direccion: datos.direccion, coordenadas: datos.coordenadas
    };
  }

  const salirAlMenu = () => {
    if(window.confirm("¿Seguro que quieres salir al menú principal? Los datos no guardados se perderán.")) {
      setModuloActivo(null); 
      setPaso(1); 
      setDatosForm({ semanaReporte: "1" }); 
      setChecklist({});
      setDatos({ capturas: {}, ubicacion: null, direccion: '', hora: '', firma: null, coordenadas: null });
      setHistoricoSemanas({ 1: {}, 2: {}, 3: {}, 4: {} });
      setHistoricoFotos({});
      setVerificaciones({ seguroVigente: false, tarjetaCombustible: false, licenciaVigente: false, fechaLicencia: '' });
    }
  };

  if (!moduloActivo) {
    return ( <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Home onSelectModule={setModuloActivo} />
      </div>
    );
  }

  return (
    <div className="app">
      {notification && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, background: notification.type === 'error' ? '#f44336' : notification.type === 'warning' ? '#ff9800' : '#4CAF50', color: 'white', padding: '15px 25px', borderRadius: '8px', fontWeight: 'bold' }}>
          {notification.message}
        </div>
      )}

      {mostrarModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '16px', maxWidth: '500px' }}>
            <h3>⚠️ Verificaciones Obligatorias</h3>
            <label><input type="checkbox" name="seguroVigente" checked={verificaciones.seguroVigente} onChange={handleCheckModal}/> Póliza vigente</label><br/><br/>
            <label><input type="checkbox" name="tarjetaCombustible" checked={verificaciones.tarjetaCombustible} onChange={handleCheckModal}/> Tarjeta combustible</label><br/><br/>
            <label><input type="checkbox" name="licenciaVigente" checked={verificaciones.licenciaVigente} onChange={handleCheckModal}/> Licencia vigente</label><br/><br/>
            {verificaciones.licenciaVigente && <input type="date" name="fechaLicencia" value={verificaciones.fechaLicencia} onChange={handleCheckModal} style={{width:'100%', padding:'10px'}}/>}
            <br/><br/><button onClick={confirmarVerificaciones} className="btn btn-success w-full">Confirmar</button>
          </div>
        </div>
      )}

      <header>
        <button onClick={salirAlMenu} style={{ position: 'absolute', top: '0px', left: '0px', background: '#e2e8f0', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} title="Volver al Menú Principal"> 🏠 </button>
        <h1>SeguridApp</h1>
        <p className="subtitulo">Registro de Inspección CFE</p>
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
        {paso === 1 && (
          <DatosGenerales 
            datos={datosForm} 
            onChange={actualizarDatosForm} 
            onCargarDatos={(datosExtraidos) => {
              const histSem = datosExtraidos.historicoSemanas || { 1: {}, 2: {}, 3: {}, 4: {} };
              let semanaAnterior = "1";
              let siguienteSemana = "1";
              if (Object.keys(histSem[1] || {}).length > 1) { semanaAnterior = "1"; siguienteSemana = "2"; }
              if (Object.keys(histSem[2] || {}).length > 1) { semanaAnterior = "2"; siguienteSemana = "3"; }
              if (Object.keys(histSem[3] || {}).length > 1) { semanaAnterior = "3"; siguienteSemana = "4"; }
              
              // LA MAGIA: Arrastramos los NO y NA con sus comentarios a la nueva semana
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
                  histSem[siguienteSemana] = fallasArrastradas; // Las cargamos directo en la nueva semana
                }
              }

              setDatosForm(prev => ({ 
                ...prev, 
                ...(datosExtraidos.form || {}), 
                semanaReporte: siguienteSemana, 
                kilometraje: "",
                idDocumentoPrevio: datosExtraidos.idActual || "" // Rescatamos el código anterior
              }));
              setHistoricoSemanas(histSem);
              setHistoricoFotos(datosExtraidos.historicoFotos || {});
            }} 
            showNotification={showNotification} 
          />
        )}
        
        {paso === 2 && <Checklist onChange={handleChecklistChange} datosPrevios={checklist} />}
        
        {paso === 3 && (
          <div className="fade-in">
            <div className="alerta-foto">📸 Toma las 4 fotos obligatorias del vehículo y las evidencias de fallas marcadas.</div>
            <Camara fotosRequeridas={fotosRequeridas} onCapture={(capturas, hora) => actualizarDatos({ capturas, hora })} />
          </div>
        )}
        
        {paso === 4 && <Ubicacion onUbicacionObtenida={(ubicacion, direccion, coordenadas) => actualizarDatos({ ubicacion, direccion, coordenadas })} showNotification={showNotification} />}
        
        {paso === 5 && <Firma onFirmaCompletada={(firma) => actualizarDatos({ firma })} showNotification={showNotification} />}
        
        {paso === 6 && (
          <Reporte datos={{ ...datos, form: datosForm }} historicoSemanas={historicoSemanasActualizado} historicoFotos={historicoFotosActualizado} showNotification={showNotification} />
        )}

        <div className="navegacion">
          {(paso > 1 && paso < 6) && <button onClick={anteriorPaso} className="btn btn-secondary">← Regresar</button>}
          {paso < 6 && <button onClick={siguientePaso} className="btn btn-primary">Siguiente →</button>}
        </div>
      </main>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0f4f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .app { padding: 15px; max-width: 800px; margin: 0 auto; min-height: 100vh; position: relative; }
        header { text-align: center; margin-bottom: 25px; position: relative; }
        h1 { color: #1a365d; font-size: 2rem; font-weight: 700; letter-spacing: -0.5px; margin-top: 10px; }
        .subtitulo { color: #4a5568; font-size: 1rem; margin-top: 5px; }
        .progreso-container { overflow-x: auto; margin-top: 15px; }
        .progreso { display: flex; gap: 6px; background: #e2e8f0; padding: 6px; border-radius: 40px; }
        .paso { flex: 1; padding: 8px 4px; text-align: center; border-radius: 30px; font-size: 0.8rem; font-weight: 600; background: white; color: #2d3748; transition: all 0.3s; white-space: nowrap; }
        .paso.activo { background: #2196F3; color: white; box-shadow: 0 4px 10px rgba(33,150,243,0.3); }
        .contenido { background: white; padding: 25px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .step-transition { animation: fadeSlide 0.4s ease-out; }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .card { background: white; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .card-title { font-size: 1.4rem; font-weight: 600; color: #1a365d; margin-bottom: 20px; border-left: 5px solid #2196F3; padding-left: 15px; }
        .btn { padding: 12px 20px; border: none; border-radius: 40px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 0.95rem; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-primary { background: #2196F3; color: white; box-shadow: 0 4px 10px rgba(33,150,243,0.3); }
        .btn-primary:hover { background: #1976D2; transform: translateY(-2px); }
        .btn-secondary { background: #e2e8f0; color: #2d3748; }
        .btn-secondary:hover { background: #cbd5e0; }
        .btn-success { background: #4CAF50; color: white; box-shadow: 0 4px 10px rgba(76,175,80,0.3); }
        .btn-success:hover { background: #43a047; transform: translateY(-2px); }
        .btn-large { padding: 15px 30px; font-size: 1.1rem; width: 100%; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .form-group { display: flex; flex-direction: column; }
        .form-group.full-width { grid-column: 1 / -1; }
        .form-group label { font-weight: 600; color: #2d3748; margin-bottom: 5px; font-size: 0.9rem; }
        .form-group input, .form-group select { padding: 10px; border: 1px solid #cbd5e0; border-radius: 10px; font-size: 1rem; transition: border 0.2s; }
        .form-group input:focus, .form-group select:focus { outline: none; border-color: #2196F3; box-shadow: 0 0 0 3px rgba(33,150,243,0.1); }
        hr { margin: 25px 0; border: none; border-top: 2px solid #e2e8f0; }
        .alerta-foto { background: #fff3cd; color: #856404; padding: 12px; border-radius: 40px; margin-bottom: 20px; border-left: 4px solid #ffeeba; font-weight: 500; }
        .navegacion { display: flex; justify-content: space-between; margin-top: 30px; gap: 15px; }
        @media (max-width: 640px) { .contenido { padding: 15px; } .form-grid { grid-template-columns: 1fr; } .navegacion { flex-direction: column-reverse; } .btn { width: 100%; } }
      `}</style>
    </div>
  );
}
export default App;