import React, { useState, useEffect } from 'react';
import DatosGenerales from './components/DatosGenerales';
import Checklist, { estructura } from './components/Checklist';
import Camara from './components/Camara';
import Ubicacion from './components/Ubicacion';
import Firma from './components/Firma';
import Reporte from './components/Reporte';

function App() {
  const [paso, setPaso] = useState(1); 
  
  const [datosForm, setDatosForm] = useState({ semanaReporte: "1" }); 
  const [checklist, setChecklist] = useState({});
  const [datos, setDatos] = useState({ imagen: null, ubicacion: null, direccion: '', hora: '', firma: null, coordenadas: null });

  // Memoria histórica para Semanas y Fotos
  const [historicoSemanas, setHistoricoSemanas] = useState({ 1: {}, 2: {}, 3: {}, 4: {} });
  const [historicoFotos, setHistoricoFotos] = useState({});

  const actualizarDatos = (nuevos) => setDatos(prev => ({ ...prev, ...nuevos }));
  const actualizarDatosForm = (nuevos) => setDatosForm(prev => ({ ...prev, ...nuevos }));

  // Cargar las respuestas de la semana activa
  useEffect(() => {
    const sem = datosForm.semanaReporte || "1";
    setChecklist(historicoSemanas[sem] || {});
  }, [datosForm.semanaReporte, historicoSemanas]);

  const handleChecklistChange = (nuevoChecklist) => {
    setChecklist(nuevoChecklist);
  };

  const siguientePaso = () => {
    // 1. VALIDACIÓN DATOS GENERALES
    if (paso === 1) {
      const camposObligatorios = ['noEco', 'area', 'periodo', 'mes', 'anio', 'kilometraje', 'nombre', 'rpe'];
      const faltan = camposObligatorios.filter(campo => !datosForm[campo] || datosForm[campo].toString().trim() === '');
      if (faltan.length > 0) {
        alert(`⚠️ FALTAN DATOS.\nPor favor llena todos los campos del formulario.`);
        return;
      }
    }

    // 2. VALIDACIÓN CHECKLIST
    if (paso === 2) {
      const itemsTotales = Object.values(estructura).flat();
      const faltantes = itemsTotales.filter(item => !checklist[item]);
      if (faltantes.length > 0) {
        alert(`⚠️ INCOMPLETO.\nFaltan por contestar:\n- ${faltantes.join("\n- ")}`);
        return; 
      }
      const hayObservaciones = Object.values(checklist).some(val => val === "NO" || val === "NA");
      if (!hayObservaciones) {
        actualizarDatos({ imagen: null }); 
        setPaso(4); 
        return;
      }
    }

    // 3. FOTO
    if (paso === 3 && !datos.imagen) {
      alert("⚠️ FOTO OBLIGATORIA.\nComo reportaste fallos, debes tomar la evidencia fotográfica.");
      return;
    }

    // 4. UBICACIÓN
    if (paso === 4 && !datos.ubicacion) {
      alert("⚠️ UBICACIÓN REQUERIDA.\nRegistra tu ubicación GPS para continuar.");
      return;
    }

    // 5. FIRMA
    if (paso === 5 && !datos.firma) {
      alert("⚠️ FIRMA FALTANTE.\nDebes guardar tu firma para continuar.");
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

  // Preparar los datos históricos actualizados antes de pasarlos a Reporte
  const historicoSemanasActualizado = { ...historicoSemanas };
  historicoSemanasActualizado[datosForm.semanaReporte] = {
    ...checklist,
    _kilometraje: datosForm.kilometraje // Guardamos el kilometraje específico de esta semana
  };

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

      <main className="contenido">
        {paso === 1 && (
          <DatosGenerales 
            datos={datosForm} 
            onChange={actualizarDatosForm} 
            onCargarDatos={(datosExtraidos) => {
              const histSem = datosExtraidos.historicoSemanas || { 1: {}, 2: {}, 3: {}, 4: {} };
              
              // ¡MAGIA! Detección automática de la semana
              let siguienteSemana = "1";
              if (Object.keys(histSem[1] || {}).length > 1) siguienteSemana = "2";
              if (Object.keys(histSem[2] || {}).length > 1) siguienteSemana = "3";
              if (Object.keys(histSem[3] || {}).length > 1) siguienteSemana = "4";

              setDatosForm({ ...(datosExtraidos.form || {}), semanaReporte: siguienteSemana, kilometraje: "" });
              setHistoricoSemanas(histSem);
              setHistoricoFotos(datosExtraidos.historicoFotos || {});
            }}
          />
        )}
        
        {paso === 2 && <Checklist onChange={handleChecklistChange} datosPrevios={checklist} />}
        
        {paso === 3 && (
          <div className="fade-in">
            <div className="alerta-foto">📸 Evidencia Obligatoria por reporte de fallos.</div>
            <Camara onCapture={(imagen, hora) => { actualizarDatos({ imagen, hora }); }} />
          </div>
        )}
        
        {paso === 4 && <Ubicacion onUbicacionObtenida={(ubicacion, direccion, coordenadas) => actualizarDatos({ ubicacion, direccion, coordenadas })} />}
        {paso === 5 && <Firma onFirmaCompletada={(firma) => actualizarDatos({ firma })} />}
        
        {paso === 6 && (
          <Reporte 
            datos={{ ...datos, form: datosForm }} 
            historicoSemanas={historicoSemanasActualizado}
            historicoFotos={historicoFotosActualizado}
          />
        )}

        <div className="navegacion">
          {(paso === 2 || paso === 3 || (paso === 4 && !datos.imagen)) && (
            <button onClick={anteriorPaso} className="btn btn-secundario">← Regresar</button>
          )}
          {paso !== 2 && paso !== 3 && !(paso === 4 && !datos.imagen) && <div></div>}
          {paso < 6 && (
            <button onClick={siguientePaso} className="btn btn-principal">Siguiente →</button>
          )}
        </div>
      </main>

      <style>{`
        * { box-sizing: border-box; }
        .app { padding: 15px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #f5f7fa; min-height: 100vh;}
        header { text-align: center; margin-bottom: 20px; }
        h1 { margin: 0; color: #1a365d; font-size: 1.8rem; }
        .subtitulo { margin: 5px 0 15px 0; color: #718096; font-size: 0.9rem; }
        .progreso-container { overflow-x: auto; }
        .progreso { display: flex; gap: 4px; background: #e2e8f0; padding: 4px; border-radius: 8px; }
        .paso { flex: 1; padding: 6px 2px; text-align: center; border-radius: 6px; font-size: 0.7rem; color: #718096; background: white; white-space: nowrap; }
        .paso.activo { background: #2196F3; color: white; font-weight: bold; }
        .paso.saltado { background: #90CDF4; color: white; opacity: 0.6; }
        .contenido { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px; }
        .alerta-foto { background: #fff3cd; color: #856404; padding: 10px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #ffeeba; }
        .navegacion { display: flex; justify-content: space-between; gap: 15px; margin-top: 25px; }
        .btn { padding: 12px 15px; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600; flex: 1; transition: 0.2s;}
        .btn-principal { background: #2196F3; color: white; }
        .btn-secundario { background: #CBD5E0; color: #4A5568; }
        .fade-in { animation: fadeIn 0.4s ease-in; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 600px) { .navegacion { flex-direction: column-reverse; } .btn { width: 100%; } }
      `}</style>
    </div>
  );
}
export default App;