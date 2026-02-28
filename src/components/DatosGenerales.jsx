// import React, { useState } from 'react';
// import { PDFDocument } from 'pdf-lib';

// const DatosGenerales = ({ datos, onChange, onCargarDatos, showNotification }) => {
//   const [cargandoPDF, setCargandoPDF] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     onChange({ [name]: value });
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
//       <div className="pdf-upload">
//         <h3>📂 ¿Continuar reporte anterior?</h3>
//         <p>Sube el PDF de la semana pasada para cargar la información previa.</p>
//         <label className="btn btn-primary file-label">
//           {cargandoPDF ? 'Leyendo...' : '📄 Subir PDF Anterior'}
//           <input type="file" accept="application/pdf" onChange={handleSubirPDF} disabled={cargandoPDF} />
//         </label>
//       </div>

//       <h2 className="card-title">📋 Datos del Reporte</h2>

//       <div className="semana-selector">
//         <label>Semana a Reportar (1 al 4):</label>
//         <select name="semanaReporte" value={datos.semanaReporte || '1'} onChange={handleChange}>
//           <option value="1">Semana 1</option>
//           <option value="2">Semana 2</option>
//           <option value="3">Semana 3</option>
//           <option value="4">Semana 4</option>
//         </select>
//       </div>

//       <div className="form-grid">
//         <div className="form-group">
//           <label>NO. ECO (Económico):</label>
//           <input type="text" name="noEco" value={datos.noEco || ''} onChange={handleChange} placeholder="Ej. 12345" />
//         </div>
//         <div className="form-group">
//           <label>Área o Depto:</label>
//           <input type="text" name="area" value={datos.area || ''} onChange={handleChange} placeholder="Ej. Distribución" />
//         </div>
//         <div className="form-group full-width">
//           <label>Periodo de Revisión:</label>
//           <input type="text" name="periodo" value={datos.periodo || ''} onChange={handleChange} placeholder="Ej. Del 12 al 16 de Feb" />
//         </div>
//         <div className="form-group">
//           <label>Mes:</label>
//           <input type="text" name="mes" value={datos.mes || ''} onChange={handleChange} placeholder="Ej. Febrero" />
//         </div>
//         <div className="form-group">
//           <label>Año:</label>
//           <input type="number" name="anio" value={datos.anio || ''} onChange={handleChange} placeholder="Ej. 2026" />
//         </div>
//         <div className="form-group">
//           <label>Kilometraje Actual:</label>
//           <input type="number" name="kilometraje" value={datos.kilometraje || ''} onChange={handleChange} placeholder="Actualizar..." />
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




import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const DatosGenerales = ({ datos, onChange, onCargarDatos, showNotification }) => {
  const [cargandoPDF, setCargandoPDF] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
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
      
      {/* =========================================================
          CÓDIGO OCULTO TEMPORALMENTE: CARGA DEL PDF ANTERIOR
          Para habilitarlo en el futuro, borra los símbolos {/* y *}
          ========================================================= */}
      {/* <div className="pdf-upload">
        <h3>📂 ¿Continuar reporte anterior?</h3>
        <p>Sube el PDF de la semana pasada para cargar la información previa.</p>
        <label className="btn btn-primary file-label">
          {cargandoPDF ? 'Leyendo...' : '📄 Subir PDF Anterior'}
          <input type="file" accept="application/pdf" onChange={handleSubirPDF} disabled={cargandoPDF} />
        </label>
      </div>
      */}

      <h2 className="card-title">📋 Datos del Reporte</h2>

      {/* =========================================================
          CÓDIGO OCULTO TEMPORALMENTE: SELECTOR DE SEMANA
          ========================================================= */}
      {/*
      <div className="semana-selector">
        <label>Semana a Reportar (1 al 4):</label>
        <select name="semanaReporte" value={datos.semanaReporte || '1'} onChange={handleChange}>
          <option value="1">Semana 1</option>
          <option value="2">Semana 2</option>
          <option value="3">Semana 3</option>
          <option value="4">Semana 4</option>
        </select>
      </div>
      */}

      <div className="form-grid">
        <div className="form-group">
          <label>NO. ECO (Económico):</label>
          <input type="text" name="noEco" value={datos.noEco || ''} onChange={handleChange} placeholder="Ej. 12345" />
        </div>
        <div className="form-group">
          <label>Área o Depto:</label>
          <input type="text" name="area" value={datos.area || ''} onChange={handleChange} placeholder="Ej. Distribución" />
        </div>
        <div className="form-group full-width">
          <label>Periodo de Revisión:</label>
          <input type="text" name="periodo" value={datos.periodo || ''} onChange={handleChange} placeholder="Ej. Del 12 al 16 de Feb" />
        </div>
        <div className="form-group">
          <label>Mes:</label>
          <input type="text" name="mes" value={datos.mes || ''} onChange={handleChange} placeholder="Ej. Febrero" />
        </div>
        <div className="form-group">
          <label>Año:</label>
          <input type="number" name="anio" value={datos.anio || ''} onChange={handleChange} placeholder="Ej. 2026" />
        </div>
        <div className="form-group">
          <label>Kilometraje Actual:</label>
          <input type="number" name="kilometraje" value={datos.kilometraje || ''} onChange={handleChange} placeholder="Actualizar..." />
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