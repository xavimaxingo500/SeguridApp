import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function DatosGenerales({ datos, onChange, onCargarDatos }) {
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
        alert("✅ ¡Reporte anterior cargado!\n\nRECUERDA:\n1. Selecciona la nueva semana a evaluar.\n2. Actualiza tu kilometraje actual.");
      } else {
        alert("⚠️ Este PDF no contiene datos compatibles.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Hubo un error al leer el documento PDF.");
    }
    setCargandoPDF(false);
    e.target.value = null; 
  };

  const inputStyle = {
    width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px',
    border: '1px solid #ccc', borderRadius: '6px', fontSize: '1rem'
  };
  const labelStyle = { fontWeight: 'bold', color: '#333', fontSize: '0.9rem' };

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      
      {/* SECCIÓN DE CARGA DEL PDF ANTERIOR */}
      <div style={{ background: '#E3F2FD', padding: '15px', borderRadius: '8px', marginBottom: '25px', textAlign: 'center', border: '2px dashed #2196F3' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#1565C0' }}>¿Continuar reporte anterior?</h3>
        <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '15px' }}>
          Sube el PDF de la semana pasada para cargar la información previa.
        </p>
        <label style={{ background: '#2196F3', color: 'white', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'inline-block' }}>
          {cargandoPDF ? 'Leyendo documento...' : '📄 Subir PDF Anterior'}
          <input type="file" accept="application/pdf" onChange={handleSubirPDF} style={{ display: 'none' }} disabled={cargandoPDF} />
        </label>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1a365d' }}>Datos del Reporte</h2>

      {/* NUEVO: SELECTOR DE SEMANA */}
      <div style={{ background: '#FFF8E1', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #FFC107' }}>
        <label style={{...labelStyle, color: '#F57F17'}}>Semana a Reportar (1 al 4):</label>
        <select name="semanaReporte" value={datos.semanaReporte || '1'} onChange={handleChange} style={{...inputStyle, borderColor: '#FFC107', fontWeight: 'bold'}}>
          <option value="1">Semana 1</option>
          <option value="2">Semana 2</option>
          <option value="3">Semana 3</option>
          <option value="4">Semana 4</option>
        </select>
      </div>
      
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 45%' }}>
          <label style={labelStyle}>NO. ECO (Económico):</label>
          <input type="text" name="noEco" value={datos.noEco || ''} onChange={handleChange} style={inputStyle} placeholder="Ej. 12345" />
        </div>
        <div style={{ flex: '1 1 45%' }}>
          <label style={labelStyle}>Área o Depto:</label>
          <input type="text" name="area" value={datos.area || ''} onChange={handleChange} style={inputStyle} placeholder="Ej. Distribución" />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 100%' }}>
          <label style={labelStyle}>Periodo de Revisión:</label>
          <input type="text" name="periodo" value={datos.periodo || ''} onChange={handleChange} style={inputStyle} placeholder="Ej. Del 12 al 16 de Feb" />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 30%' }}>
          <label style={labelStyle}>Mes:</label>
          <input type="text" name="mes" value={datos.mes || ''} onChange={handleChange} style={inputStyle} placeholder="Ej. Febrero" />
        </div>
        <div style={{ flex: '1 1 30%' }}>
          <label style={labelStyle}>Año:</label>
          <input type="number" name="anio" value={datos.anio || ''} onChange={handleChange} style={inputStyle} placeholder="Ej. 2026" />
        </div>
        <div style={{ flex: '1 1 30%' }}>
          <label style={labelStyle}>Kilometraje Actual:</label>
          <input type="number" name="kilometraje" value={datos.kilometraje || ''} onChange={handleChange} style={{...inputStyle, border: '1px solid #2196F3'}} placeholder="Actualizar..." />
        </div>
      </div>

      <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #eee' }} />
      <h3 style={{ marginBottom: '15px', color: '#1a365d' }}>Datos del Trabajador</h3>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 60%' }}>
          <label style={labelStyle}>Nombre Completo:</label>
          <input type="text" name="nombre" value={datos.nombre || ''} onChange={handleChange} style={inputStyle} placeholder="Tu nombre" />
        </div>
        <div style={{ flex: '1 1 35%' }}>
          <label style={labelStyle}>RPE:</label>
          <input type="text" name="rpe" value={datos.rpe || ''} onChange={handleChange} style={inputStyle} placeholder="Tu RPE" />
        </div>
      </div>
    </div>
  );
}



// import React, { useState } from 'react';
// import { PDFDocument } from 'pdf-lib';

// export default function DatosGenerales({ datos, onChange, onCargarDatos }) {
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
//         alert("✅ ¡Reporte anterior cargado!\n\nRECUERDA:\n1. Selecciona la nueva semana a evaluar.\n2. Actualiza tu kilometraje actual.");
//       } else {
//         alert("⚠️ Este PDF no contiene datos compatibles.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("❌ Hubo un error al leer el documento PDF.");
//     }
//     setCargandoPDF(false);
//     e.target.value = null; 
//   };

//   const inputStyle = {
//     width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px',
//     border: '1px solid #ccc', borderRadius: '6px', fontSize: '1rem'
//   };
//   const labelStyle = { fontWeight: 'bold', color: '#333', fontSize: '0.9rem' };

//   return (
//     <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      
//       {/* =========================================================
//           CÓDIGO OCULTO TEMPORALMENTE: CARGA DEL PDF ANTERIOR
//           Para habilitarlo en el futuro, borra los símbolos {/* y *}
//           ========================================================= */}
//       {/* <div style={{ background: '#E3F2FD', padding: '15px', borderRadius: '8px', marginBottom: '25px', textAlign: 'center', border: '2px dashed #2196F3' }}>
//         <h3 style={{ margin: '0 0 10px 0', color: '#1565C0' }}>¿Continuar reporte anterior?</h3>
//         <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '15px' }}>
//           Sube el PDF de la semana pasada para cargar la información previa.
//         </p>
//         <label style={{ background: '#2196F3', color: 'white', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'inline-block' }}>
//           {cargandoPDF ? 'Leyendo documento...' : '📄 Subir PDF Anterior'}
//           <input type="file" accept="application/pdf" onChange={handleSubirPDF} style={{ display: 'none' }} disabled={cargandoPDF} />
//         </label>
//       </div>
//       */}

//       <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1a365d' }}>Datos del Reporte</h2>

//       {/* =========================================================
//           CÓDIGO OCULTO TEMPORALMENTE: SELECTOR DE SEMANA
//           ========================================================= */}
//       {/* <div style={{ background: '#FFF8E1', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #FFC107' }}>
//         <label style={{...labelStyle, color: '#F57F17'}}>Semana a Reportar (1 al 4):</label>
//         <select name="semanaReporte" value={datos.semanaReporte || '1'} onChange={handleChange} style={{...inputStyle, borderColor: '#FFC107', fontWeight: 'bold'}}>
//           <option value="1">Semana 1</option>
//           <option value="2">Semana 2</option>
//           <option value="3">Semana 3</option>
//           <option value="4">Semana 4</option>
//         </select>
//       </div>
//       */}
      
//       <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
//         <div style={{ flex: '1 1 45%' }}>
//           <label style={labelStyle}>NO. ECO (Económico):</label>
//           <input type="text" name="noEco" value={datos.noEco || ''} onChange={handleChange} style={inputStyle} placeholder="Ej. 12345" />
//         </div>
//         <div style={{ flex: '1 1 45%' }}>
//           <label style={labelStyle}>Área o Depto:</label>
//           <input type="text" name="area" value={datos.area || ''} onChange={handleChange} style={inputStyle} placeholder="Ej. Distribución" />
//         </div>
//       </div>

//       <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
//         <div style={{ flex: '1 1 100%' }}>
//           <label style={labelStyle}>Periodo de Revisión:</label>
//           <input type="text" name="periodo" value={datos.periodo || ''} onChange={handleChange} style={inputStyle} placeholder="Ej. Del 12 al 16 de Feb" />
//         </div>
//       </div>

//       <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
//         <div style={{ flex: '1 1 30%' }}>
//           <label style={labelStyle}>Mes:</label>
//           <input type="text" name="mes" value={datos.mes || ''} onChange={handleChange} style={inputStyle} placeholder="Ej. Febrero" />
//         </div>
//         <div style={{ flex: '1 1 30%' }}>
//           <label style={labelStyle}>Año:</label>
//           <input type="number" name="anio" value={datos.anio || ''} onChange={handleChange} style={inputStyle} placeholder="Ej. 2026" />
//         </div>
//         <div style={{ flex: '1 1 30%' }}>
//           <label style={labelStyle}>Kilometraje Actual:</label>
//           <input type="number" name="kilometraje" value={datos.kilometraje || ''} onChange={handleChange} style={{...inputStyle, border: '1px solid #2196F3'}} placeholder="Actualizar..." />
//         </div>
//       </div>

//       <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #eee' }} />
//       <h3 style={{ marginBottom: '15px', color: '#1a365d' }}>Datos del Trabajador</h3>

//       <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
//         <div style={{ flex: '1 1 60%' }}>
//           <label style={labelStyle}>Nombre Completo:</label>
//           <input type="text" name="nombre" value={datos.nombre || ''} onChange={handleChange} style={inputStyle} placeholder="Tu nombre" />
//         </div>
//         <div style={{ flex: '1 1 35%' }}>
//           <label style={labelStyle}>RPE:</label>
//           <input type="text" name="rpe" value={datos.rpe || ''} onChange={handleChange} style={inputStyle} placeholder="Tu RPE" />
//         </div>
//       </div>
//     </div>
//   );
// }