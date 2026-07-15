import React, { useState, useEffect } from 'react';

// IMPORTACIONES
import DatosBotiquin from './DatosBotiquin';
import ChecklistBotiquin from './ChecklistBotiquin';
import Camara from '../vehicular/Camara'; 
import Firma from '../vehicular/Firma'; 
import ReporteBotiquin from './ReporteBotiquin';

export default function BotiquinesApp({ onVolver }) {
  const [paso, setPaso] = useState(1);
  const [datosForm, setDatosForm] = useState({});
  const [checklist, setChecklist] = useState({});
  const [capturas, setCapturas] = useState({});
  const [fotosRequeridas, setFotosRequeridas] = useState([]);
  const [firma, setFirma] = useState(null);
  const [notification, setNotification] = useState(null);
  const [confirmarSalir, setConfirmarSalir] = useState(false);
  
  // NUEVO ESTADO: Guardará el GPS silenciosamente
  const [coordenadasGPS, setCoordenadasGPS] = useState(null);

  const showNotification = (msg, type = 'error') => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Función para jalar el GPS en segundo plano
  const obtenerGPSOculto = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordenadasGPS({
            lat: position.coords.latitude.toFixed(6),
            lng: position.coords.longitude.toFixed(6)
          });
        },
        (error) => console.warn("GPS denegado o inactivo:", error),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  };

  const calcularFotosRequeridas = () => {
    let req = ["Foto Exterior Botiquín", "Foto Interior (Inventario)"];
    Object.keys(checklist).forEach(item => {
      if (checklist[item].verificacion === "NO" || checklist[item].verificacion === "N/A") {
        req.push(`Evidencia: ${item}`);
      }
    });
    setFotosRequeridas(req);
  };

  const siguientePaso = () => {
    if (paso === 1) { 
      if (!datosForm.botiquinNum || !datosForm.responsable) { 
        showNotification('Faltan campos obligatorios', 'warning'); 
        return; 
      }
      // Al pasar al paso 2, disparamos el GPS en segundo plano
      obtenerGPSOculto();
      setPaso(2); return; 
    }
    if (paso === 2) { 
      calcularFotosRequeridas(); 
      setPaso(3); return; 
    }
    if (paso === 3) { 
      const tomadas = Object.keys(capturas || {}).length; 
      if (tomadas < fotosRequeridas.length) { 
        showNotification(`Faltan fotos (${tomadas}/${fotosRequeridas.length})`, 'warning'); 
        return; 
      } 
      setPaso(4); return; 
    }
    if (paso === 4) { 
      if (!firma) { showNotification('Guarda tu firma', 'warning'); return; } 
      setPaso(5); return; 
    }
  };

  return (
    <div className="app">
      {notification && <div className={`notificacion-centro notif-${notification.type}`}>{notification.message}</div>}
      
      <header style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px 0', marginBottom: '25px' }}>
        <button 
          onClick={() => setConfirmarSalir(true)} 
          style={{ 
            position: 'absolute', left: '0', 
            background: '#e2e8f0', border: 'none', borderRadius: '50%', 
            width: '45px', height: '45px', fontSize: '1.2rem', cursor: 'pointer', 
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
          }}
          title="Volver al Menú Principal"
        >
          🏠
        </button>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#1a365d', fontSize: '1.6rem', margin: 0 }}>SeguridApp</h1>
          <p className="subtitulo" style={{ margin: 0 }}>Inspección de Botiquines</p>
        </div>
      </header>

      <div className="progreso-container" style={{ marginBottom: '20px' }}>
        <div className="progreso">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`paso ${paso >= i ? 'activo' : ''}`} style={{ background: paso >= i ? '#d32f2f' : 'white' }}>
              {i}. {i===1?'Datos':i===2?'Lista':i===3?'Foto':i===4?'Firma':'Fin'}
            </div>
          ))}
        </div>
      </div>
      
      <main className="contenido">
        {paso === 1 && <DatosBotiquin datos={datosForm} onChange={(n) => setDatosForm(p => ({...p, ...n}))} />}
        {paso === 2 && <ChecklistBotiquin datosPrevios={checklist} onChange={setChecklist} />}
        {paso === 3 && (
          <div className="fade-in">
            <div className="alerta-foto" style={{ background: '#ffebee', color: '#c62828', borderLeft: '4px solid #d32f2f' }}>
              📸 Toma las fotos obligatorias del botiquín y las evidencias de fallas.
            </div>
            <Camara fotosRequeridas={fotosRequeridas} onCapture={(caps) => setCapturas(caps)} />
          </div>
        )}
        {paso === 4 && <Firma onFirmaCompletada={setFirma} showNotification={showNotification} />}
        {/* Mandamos también las coordenadasGPS al reporte final */}
        {paso === 5 && <ReporteBotiquin datosForm={datosForm} checklist={checklist} capturas={capturas} firma={firma} coordenadasGPS={coordenadasGPS} showNotification={showNotification} />}

        <div className="navegacion" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {paso > 1 && paso < 5 && <button onClick={() => setPaso(p => p - 1)} className="btn btn-secondary">← Regresar</button>}
          {paso < 5 && <button onClick={siguientePaso} className="btn btn-primary" style={{ background: '#d32f2f' }}>Siguiente →</button>}
        </div>
      </main>

      {confirmarSalir && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ color: '#d32f2f' }}>⚠️ ¿Salir al menú?</h3>
            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              <button onClick={() => setConfirmarSalir(false)} className="btn btn-secondary">Cancelar</button>
              <button onClick={onVolver} className="btn btn-primary" style={{ background: '#d32f2f' }}>Sí, salir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}