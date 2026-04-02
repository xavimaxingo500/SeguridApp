// import React, { useState, useEffect } from 'react';
// import { PDFDocument } from 'pdf-lib';

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
//       {/* DISEÑO ORIGINAL DE SUBIR ARCHIVO RESTAURADO */}
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

// export default DatosGenerales;

import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';

// Lista actualizada sin "Grandes Clientes"
const AREAS_CFE = [
  "Recursos Humanos", "CAC Oriente", "CAC Poniente", "CAC Norte", "CAC Sur",
  "CAC Centro", "CAC Progreso", "CAC Uman", "CAC Conkal", "CAC Hunucma",
  "CAC Acanceh", "CAC Caucel", "Facturación", "Cobranza", "Notificaciones",
  "T.I."
];

const DatosGenerales = ({ datos, onChange, onCargarDatos, showNotification }) => {
  const [cargandoPDF, setCargandoPDF] = useState(false);
  const [mostrarOtro, setMostrarOtro] = useState(() => {
    return datos.area && !AREAS_CFE.includes(datos.area);
  });

  useEffect(() => {
    if (!datos.periodo || !datos.mes || !datos.anio) {
      const today = new Date();
      const dayOfWeek = today.getDay() || 7; 
      const monday = new Date(today);
      monday.setDate(today.getDate() - dayOfWeek + 1);
      const friday = new Date(today);
      friday.setDate(today.getDate() - dayOfWeek + 5);
      const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

      onChange({
        periodo: datos.periodo || `Del ${monday.getDate()} al ${friday.getDate()}`,
        mes: datos.mes || meses[today.getMonth()],
        anio: datos.anio || today.getFullYear().toString()
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleAreaDropdown = (e) => {
    const val = e.target.value;
    if (val === 'Otros') {
      setMostrarOtro(true);
      onChange({ area: '' });
    } else {
      setMostrarOtro(false);
      onChange({ area: val }); 
    }
  };

  const handleSubirPDF = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCargandoPDF(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const metadatosOcultos = pdfDoc.getKeywords();
      if (metadatosOcultos) {
        const datosExtraidos = JSON.parse(metadatosOcultos);
        onCargarDatos(datosExtraidos);
        showNotification('✅ Reporte anterior cargado correctamente', 'success');
      } else {
        showNotification('⚠️ Este PDF no contiene datos compatibles', 'warning');
      }
    } catch (error) {
      console.error(error);
      showNotification('❌ Error al leer el PDF', 'error');
    }
    setCargandoPDF(false);
    e.target.value = null;
  };

  return (
    <div className="card">
      <div style={{ background: '#E3F2FD', padding: '20px', borderRadius: '12px', marginBottom: '30px', textAlign: 'center', border: '2px dashed #2196F3' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#1565C0', fontSize: '1.2rem' }}>📂 ¿Continuar reporte de la semana pasada?</h3>
        <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '15px' }}>
          Sube tu PDF anterior para cargar toda la información y continuar en la semana que te toca.
        </p>
        <label style={{ background: '#2196F3', color: 'white', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'inline-block', transition: '0.2s', boxShadow: '0 4px 6px rgba(33,150,243,0.3)' }}>
          {cargandoPDF ? 'Leyendo documento...' : '📄 Subir PDF Anterior'}
          <input type="file" accept="application/pdf" onChange={handleSubirPDF} style={{ display: 'none' }} disabled={cargandoPDF} />
        </label>
      </div>

      <h2 className="card-title">📋 Datos del Reporte</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>NO. ECO (Económico):</label>
          <input type="text" name="noEco" value={datos.noEco || ''} onChange={handleChange} placeholder="Ej. 12345" />
        </div>
        
        <div className="form-group">
          <label>Área o Depto:</label>
          <select value={mostrarOtro ? 'Otros' : (datos.area || '')} onChange={handleAreaDropdown} style={{ padding: '10px', border: '1px solid #cbd5e0', borderRadius: '10px', fontSize: '1rem', backgroundColor: 'white' }}>
            <option value="" disabled>Selecciona un área...</option>
            {AREAS_CFE.map(a => <option key={a} value={a}>{a}</option>)}
            <option value="Otros" style={{ fontWeight: 'bold' }}>Otros (Especificar)</option>
          </select>
        </div>

        {mostrarOtro && (
          <div className="form-group" style={{ animation: 'fadeIn 0.3s' }}>
            <label style={{ color: '#E65100' }}>Especificar Área/Depto:</label>
            <input type="text" name="area" value={datos.area || ''} onChange={handleChange} placeholder="Escribe tu área manual..." style={{ border: '2px solid #FF9800' }} />
          </div>
        )}

        <div className="form-group full-width">
          <label>Periodo de Revisión (Auto-calculado):</label>
          <input type="text" name="periodo" value={datos.periodo || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Mes:</label>
          <input type="text" name="mes" value={datos.mes || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Año:</label>
          <input type="number" name="anio" value={datos.anio || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Kilometraje Actual:</label>
          <input type="number" name="kilometraje" value={datos.kilometraje || ''} onChange={handleChange} placeholder="Ej. 85000" />
        </div>
      </div>
      <hr />
      <h3>👤 Datos del Trabajador</h3>
      <div className="form-grid">
        <div className="form-group full-width">
          <label>Nombre Completo:</label>
          <input type="text" name="nombre" value={datos.nombre || ''} onChange={handleChange} placeholder="Tu nombre" />
        </div>
        <div className="form-group">
          <label>RPE:</label>
          <input type="text" name="rpe" value={datos.rpe || ''} onChange={handleChange} placeholder="Tu RPE" />
        </div>
      </div>
    </div>
  );
};

export default DatosGenerales;