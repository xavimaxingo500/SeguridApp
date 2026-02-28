import React, { useState, useEffect } from 'react';
import Notification from './components/Notification';
import DatosGenerales from './components/DatosGenerales';
import Checklist, { estructura } from './components/Checklist';
import Camara from './components/Camara';
import Ubicacion from './components/Ubicacion';
import Firma from './components/Firma';
// import Reporte from './Reporte';
import Reporte from './components/Reporte';

function App() {
  const [paso, setPaso] = useState(1);
  const [datosForm, setDatosForm] = useState({ semanaReporte: "1" });
  const [checklist, setChecklist] = useState({});
  const [datos, setDatos] = useState({ imagen: null, ubicacion: null, direccion: '', hora: '', firma: null, coordenadas: null });
  const [historicoSemanas, setHistoricoSemanas] = useState({ 1: {}, 2: {}, 3: {}, 4: {} });
  const [historicoFotos, setHistoricoFotos] = useState({});
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'error') => {
    setNotification({ message, type });
  };

  const actualizarDatos = (nuevos) => setDatos(prev => ({ ...prev, ...nuevos }));
  const actualizarDatosForm = (nuevos) => setDatosForm(prev => ({ ...prev, ...nuevos }));

  useEffect(() => {
    const sem = datosForm.semanaReporte || "1";
    setChecklist(historicoSemanas[sem] || {});
  }, [datosForm.semanaReporte, historicoSemanas]);

  const handleChecklistChange = (nuevoChecklist) => {
    setChecklist(nuevoChecklist);
  };

  const siguientePaso = () => {
    if (paso === 1) {
      const camposObligatorios = ['noEco', 'area', 'periodo', 'mes', 'anio', 'kilometraje', 'nombre', 'rpe'];
      const faltan = camposObligatorios.filter(campo => !datosForm[campo] || datosForm[campo].toString().trim() === '');
      if (faltan.length > 0) {
        showNotification(`FALTAN DATOS: ${faltan.join(', ')}`, 'warning');
        return;
      }
    }
    if (paso === 2) {
      const itemsTotales = Object.values(estructura).flat();
      const faltantes = itemsTotales.filter(item => !checklist[item]);
      if (faltantes.length > 0) {
        showNotification(`Faltan por contestar: ${faltantes.join(', ')}`, 'warning');
        return;
      }
      const hayObservaciones = Object.values(checklist).some(val => val === "NO" || val === "NA");
      if (!hayObservaciones) {
        actualizarDatos({ imagen: null });
        setPaso(4);
        return;
      }
    }
    if (paso === 3 && !datos.imagen) {
      showNotification('Como reportaste fallos, debes tomar la evidencia fotográfica.', 'warning');
      return;
    }
    if (paso === 4 && !datos.ubicacion) {
      showNotification('Registra tu ubicación GPS para continuar.', 'warning');
      return;
    }
    if (paso === 5 && !datos.firma) {
      showNotification('Debes guardar tu firma para continuar.', 'warning');
      return;
    }
    if (paso < 6) setPaso(p => p + 1);
  };

  const anteriorPaso = () => {
    if (paso === 2) setPaso(1);
    else if (paso === 3) setPaso(2);
    else if (paso === 4) {
      const hayObservaciones = Object.values(checklist).some(val => val === "NO" || val === "NA");
      if (!hayObservaciones) setPaso(2);
      else setPaso(3);
    }
  };

  const historicoSemanasActualizado = { ...historicoSemanas };
  historicoSemanasActualizado[datosForm.semanaReporte] = { ...checklist, _kilometraje: datosForm.kilometraje };
  const historicoFotosActualizado = { ...historicoFotos };
  if (datos.imagen) {
    historicoFotosActualizado[datosForm.semanaReporte] = {
      imagen: datos.imagen,
      hora: datos.hora,
      direccion: datos.direccion,
      coordenadas: datos.coordenadas
    };
  }

  return (
    <div className="app">
      {notification && <Notification {...notification} onClose={() => setNotification(null)} />}
      <header>
        <h1>SeguridApp</h1>
        <p className="subtitulo">Registro de Inspección CFE</p>
        <div className="progreso-container">
          <div className="progreso">
            <div className={`paso ${paso >= 1 ? 'activo' : ''}`}>1. Datos</div>
            <div className={`paso ${paso >= 2 ? 'activo' : ''}`}>2. Lista</div>
            <div className={`paso ${paso >= 3 ? 'activo' : ''} ${paso === 4 && !datos.imagen && paso > 2 ? 'saltado' : ''}`}>3. Foto</div>
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
              let siguienteSemana = "1";
              if (Object.keys(histSem[1] || {}).length > 1) siguienteSemana = "2";
              if (Object.keys(histSem[2] || {}).length > 1) siguienteSemana = "3";
              if (Object.keys(histSem[3] || {}).length > 1) siguienteSemana = "4";
              setDatosForm({ ...(datosExtraidos.form || {}), semanaReporte: siguienteSemana, kilometraje: "" });
              setHistoricoSemanas(histSem);
              setHistoricoFotos(datosExtraidos.historicoFotos || {});
            }}
            showNotification={showNotification}
          />
        )}
        {paso === 2 && <Checklist onChange={handleChecklistChange} datosPrevios={checklist} />}
        {paso === 3 && (
          <div className="fade-in">
            <div className="alerta-foto">📸 Evidencia Obligatoria por reporte de fallos.</div>
            <Camara onCapture={(imagen, hora) => actualizarDatos({ imagen, hora })} />
          </div>
        )}
        {paso === 4 && <Ubicacion onUbicacionObtenida={(ubicacion, direccion, coordenadas) => actualizarDatos({ ubicacion, direccion, coordenadas })} showNotification={showNotification} />}
        {paso === 5 && <Firma onFirmaCompletada={(firma) => actualizarDatos({ firma })} showNotification={showNotification} />}
        {paso === 6 && (
          <Reporte
            datos={{ ...datos, form: datosForm }}
            historicoSemanas={historicoSemanasActualizado}
            historicoFotos={historicoFotosActualizado}
            showNotification={showNotification}
          />
        )}

        <div className="navegacion">
          {(paso === 2 || paso === 3 || (paso === 4 && !datos.imagen)) && (
            <button onClick={anteriorPaso} className="btn btn-secondary">← Regresar</button>
          )}
          {paso !== 2 && paso !== 3 && !(paso === 4 && !datos.imagen) && <div></div>}
          {paso < 6 && (
            <button onClick={siguientePaso} className="btn btn-primary">Siguiente →</button>
          )}
        </div>
      </main>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0f4f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .app { padding: 15px; max-width: 800px; margin: 0 auto; min-height: 100vh; }
        header { text-align: center; margin-bottom: 25px; }
        h1 { color: #1a365d; font-size: 2rem; font-weight: 700; letter-spacing: -0.5px; }
        .subtitulo { color: #4a5568; font-size: 1rem; margin-top: 5px; }
        .progreso-container { overflow-x: auto; margin-top: 15px; }
        .progreso { display: flex; gap: 6px; background: #e2e8f0; padding: 6px; border-radius: 40px; }
        .paso { flex: 1; padding: 8px 4px; text-align: center; border-radius: 30px; font-size: 0.8rem; font-weight: 600; background: white; color: #2d3748; transition: all 0.3s; white-space: nowrap; }
        .paso.activo { background: #2196F3; color: white; box-shadow: 0 4px 10px rgba(33,150,243,0.3); }
        .paso.saltado { background: #90cdf4; color: #1e3a8a; opacity: 0.8; }
        .contenido { background: white; padding: 25px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .step-transition { animation: fadeSlide 0.4s ease-out; }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
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
        .flex { display: flex; gap: 15px; }
        .flex-col { flex-direction: column; }
        .gap-4 { gap: 16px; }
        .mt-4 { margin-top: 16px; }
        .mt-6 { margin-top: 24px; }
        .mb-4 { margin-bottom: 16px; }
        .text-center { text-align: center; }
        .w-full { width: 100%; }
        .info-box { background: #f8fafc; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; }
        .info-box h3 { color: #0d47a1; margin-bottom: 10px; font-size: 1.1rem; }
        .info-box ul { padding-left: 20px; color: #2c3e50; }
        .camera-preview { border: 2px solid #e2e8f0; border-radius: 20px; overflow: hidden; background: #f1f5f9; }
        .tabs { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 10px; margin-bottom: 20px; }
        .tab { padding: 8px 16px; border: none; border-radius: 40px; background: #f1f5f9; color: #334155; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
        .tab.active { background: #2196F3; color: white; }
        .tab.complete { background: #c8e6c9; color: #2e7d32; }
        .checklist-section { background: #ffffff; border-radius: 16px; padding: 10px; }
        .checklist-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #edf2f7; }
        .checklist-item span { font-weight: 500; color: #1e293b; }
        .option-buttons { display: flex; gap: 6px; }
        .option-buttons button { padding: 8px 16px; border: none; border-radius: 30px; font-weight: 600; cursor: pointer; transition: 0.2s; min-width: 60px; }
        .navigation-buttons { display: flex; justify-content: space-between; margin-top: 25px; }
        .pdf-upload { background: #e3f2fd; padding: 20px; border-radius: 16px; text-align: center; margin-bottom: 30px; border: 2px dashed #2196F3; }
        .pdf-upload h3 { color: #1565C0; margin-bottom: 8px; }
        .file-label { cursor: pointer; display: inline-block; }
        .file-label input { display: none; }
        .semana-selector { background: #fff8e1; padding: 15px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #ffb74d; }
        .semana-selector label { font-weight: 600; color: #f57f17; display: block; margin-bottom: 5px; }
        .semana-selector select { width: 100%; padding: 10px; border: 1px solid #ffe082; border-radius: 8px; font-weight: 500; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .form-group { display: flex; flex-direction: column; }
        .form-group.full-width { grid-column: 1 / -1; }
        .form-group label { font-weight: 600; color: #2d3748; margin-bottom: 5px; font-size: 0.9rem; }
        .form-group input { padding: 10px; border: 1px solid #cbd5e0; border-radius: 10px; font-size: 1rem; transition: border 0.2s; }
        .form-group input:focus { outline: none; border-color: #2196F3; box-shadow: 0 0 0 3px rgba(33,150,243,0.1); }
        hr { margin: 25px 0; border: none; border-top: 2px solid #e2e8f0; }
        .signature-pad { border: 2px solid #e2e8f0; border-radius: 16px; padding: 8px; background: white; margin-bottom: 16px; }
        .signature-canvas { width: 100%; height: 200px; border-radius: 12px; }
        .success-message { background: #d4edda; color: #155724; padding: 12px; border-radius: 40px; margin-top: 16px; text-align: center; }
        .alerta-foto { background: #fff3cd; color: #856404; padding: 12px; border-radius: 40px; margin-bottom: 20px; border-left: 4px solid #ffeeba; font-weight: 500; }
        .navegacion { display: flex; justify-content: space-between; margin-top: 30px; gap: 15px; }
        @media (max-width: 640px) {
          .contenido { padding: 15px; }
          .form-grid { grid-template-columns: 1fr; }
          .option-buttons { flex-wrap: wrap; }
          .checklist-item { flex-direction: column; align-items: flex-start; gap: 10px; }
          .navegacion { flex-direction: column-reverse; }
          .btn { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default App;