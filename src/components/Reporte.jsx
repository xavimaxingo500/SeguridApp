// import React from 'react';
// import { jsPDF } from 'jspdf';
// import { estructura } from './Checklist';

// const Reporte = ({ datos, historicoSemanas, historicoFotos, showNotification }) => {
//   const generarID = () => {
//     const textoUbicacion = (datos.direccion || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//     let codigo = "SW000";
//     if (textoUbicacion.includes("montejo") || textoUbicacion.includes("alvarado") || textoUbicacion.includes("divisionales")) codigo = "SW000";
//     else if (textoUbicacion.includes("merida")) codigo = "SW010";
//     else if (textoUbicacion.includes("motul")) codigo = "SW020";
//     else if (textoUbicacion.includes("ticul")) codigo = "SW030";
//     else if (textoUbicacion.includes("campeche")) codigo = "SW040";
//     else if (textoUbicacion.includes("carmen")) codigo = "SW050";
//     else if (textoUbicacion.includes("chetumal")) codigo = "SW060";
//     else if (textoUbicacion.includes("tizimin")) codigo = "SW070";
//     else if (textoUbicacion.includes("cancun")) codigo = "SW120";
//     else if (textoUbicacion.includes("riviera") || textoUbicacion.includes("maya")) codigo = "SW200";

//     const now = new Date();
//     const dia = String(now.getDate()).padStart(2, '0');
//     const mes = String(now.getMonth() + 1).padStart(2, '0');
//     const anio = now.getFullYear();
//     const hora = String(now.getHours()).padStart(2, '0');
//     const min = String(now.getMinutes()).padStart(2, '0');
//     const seg = String(now.getSeconds()).padStart(2, '0');
//     return `${codigo}${dia}${mes}${anio}${hora}${min}${seg}`;
//   };

//   const generarPDF = async () => {
//     try {
//       const ID_GENERADO = generarID();
//       const doc = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = doc.internal.pageSize.getWidth();
//       const pageHeight = doc.internal.pageSize.getHeight();
//       const margin = 15;
//       let yPos = 15;
//       const f = datos.form || {};

//       const estadoParaGuardar = JSON.stringify({
//         form: f,
//         historicoSemanas,
//         historicoFotos
//       });

//       doc.setProperties({
//         title: `Reporte_${ID_GENERADO}`,
//         subject: 'Inspeccion Vehicular CFE',
//         author: f.nombre || 'Trabajador CFE',
//         keywords: estadoParaGuardar,
//         creator: 'SeguridApp'
//       });

//       // Cabecera
//       doc.setFontSize(8);
//       doc.text("Forma SH-209", pageWidth - margin, yPos, { align: 'right' });
//       yPos += 8;

//       doc.setFillColor(230, 230, 230);
//       doc.rect(margin, yPos, 20, 20, 'F');
//       doc.rect(pageWidth - margin - 20, yPos, 20, 20, 'F');
//       doc.setFontSize(6);
//       doc.text("SUTERM", margin + 10, yPos + 10, { align: 'center' });
//       doc.text("CFE", pageWidth - margin - 10, yPos + 10, { align: 'center' });
//       doc.setFontSize(14);
//       doc.setFont('helvetica', 'bold');
//       doc.text("COMISION FEDERAL DE ELECTRICIDAD", pageWidth / 2, yPos + 4, { align: 'center' });
//       doc.setFontSize(12);
//       doc.text("DIVISION DE DISTRIBUCION PENINSULAR", pageWidth / 2, yPos + 11, { align: 'center' });
//       doc.setFontSize(10);
//       doc.text("VERIFICACION SEMANAL DE VEHÍCULO DE TRABAJO, PERSONAL OFICINA", pageWidth / 2, yPos + 18, { align: 'center' });
//       yPos += 30;

//       // Datos generales
//       doc.setFontSize(9);
//       doc.setFont('helvetica', 'bold');
//       doc.text(`NO. ECO:`, margin, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.noEco || '______'}`, margin + 20, yPos);
//       doc.setFont('helvetica', 'bold'); doc.text(`ÁREA O DEPTO:`, margin + 70, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.area || '______'}`, margin + 100, yPos);
//       doc.setFont('helvetica', 'bold'); doc.text(`KILOMETRAJE INICIAL:`, margin + 180, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${historicoSemanas[1]?._kilometraje || f.kilometraje || '______'}`, margin + 225, yPos);
//       yPos += 8;
//       doc.setFont('helvetica', 'bold'); doc.text(`PERIODO DE REVISIÓN:`, margin, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.periodo || '______'}`, margin + 45, yPos);
//       doc.setFont('helvetica', 'bold'); doc.text(`MES:`, margin + 140, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.mes || '___'}`, margin + 150, yPos);
//       doc.setFont('helvetica', 'bold'); doc.text(`AÑO:`, margin + 190, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.anio || '___'}`, margin + 200, yPos);
//       yPos += 12;

//       // Tabla de 4 semanas
//       const wActividad = 70;
//       const wSemana = 48;
//       const wOpcion = wSemana / 3;
//       const hFila = 6.5;
//       const xActividad = margin;

//       // Encabezado
//       doc.setFillColor(220, 220, 220);
//       doc.rect(xActividad, yPos, wActividad, hFila * 2, 'FD');
//       doc.setFont('helvetica', 'bold'); doc.text("ACTIVIDAD", xActividad + (wActividad/2), yPos + 8, { align: 'center' });
//       [1,2,3,4].forEach((semanaNum, i) => {
//         const xSem = xActividad + wActividad + (i * wSemana);
//         doc.setFillColor(220,220,220); doc.rect(xSem, yPos, wSemana, hFila, 'FD');
//         doc.text(`SEMANA ${semanaNum}`, xSem + (wSemana/2), yPos + 4.5, { align: 'center' });
//         const ySub = yPos + hFila;
//         doc.rect(xSem, ySub, wOpcion, hFila, 'FD');
//         doc.rect(xSem + wOpcion, ySub, wOpcion, hFila, 'FD');
//         doc.rect(xSem + (wOpcion*2), ySub, wOpcion, hFila, 'FD');
//         doc.setFontSize(8);
//         doc.text("SI", xSem + (wOpcion/2), ySub + 4.5, { align: 'center' });
//         doc.text("NO", xSem + wOpcion + (wOpcion/2), ySub + 4.5, { align: 'center' });
//         doc.text("N/A", xSem + (wOpcion*2) + (wOpcion/2), ySub + 4.5, { align: 'center' });
//         doc.setFontSize(9);
//       });
//       yPos += (hFila * 2);

//       // Cuerpo
//       Object.entries(estructura).forEach(([nombreSeccion, itemsSeccion]) => {
//         if (yPos > pageHeight - 30) { doc.addPage(); yPos = 20; }
//         doc.setFillColor(200,200,200); doc.setFont('helvetica','bold');
//         doc.rect(xActividad, yPos, wActividad + (wSemana*4), hFila, 'FD');
//         doc.text(nombreSeccion.toUpperCase(), xActividad + 2, yPos + 4.5);
//         yPos += hFila;
//         doc.setFont('helvetica','normal'); doc.setFontSize(8);
//         itemsSeccion.forEach((item) => {
//           if (yPos > pageHeight - 30) { doc.addPage(); yPos = 20; }
//           doc.rect(xActividad, yPos, wActividad, hFila);
//           doc.text(item, xActividad + 2, yPos + 4.5);
//           [1,2,3,4].forEach((semanaNum, i) => {
//             const xSem = xActividad + wActividad + (i * wSemana);
//             doc.rect(xSem, yPos, wOpcion, hFila);
//             doc.rect(xSem + wOpcion, yPos, wOpcion, hFila);
//             doc.rect(xSem + (wOpcion*2), yPos, wOpcion, hFila);
//             const respuestaSemana = historicoSemanas[semanaNum]?.[item];
//             if (respuestaSemana) {
//               let xMark = xSem;
//               let color = [200,200,200];
//               if (respuestaSemana === "SI") color = [76,175,80];
//               else if (respuestaSemana === "NO") { xMark += wOpcion; color = [244,67,54]; }
//               else if (respuestaSemana === "NA") { xMark += (wOpcion*2); color = [255,152,0]; }
//               doc.setFillColor(...color);
//               doc.rect(xMark + 0.5, yPos + 0.5, wOpcion - 1, hFila - 1, 'F');
//               doc.setTextColor(255); doc.setFont('helvetica','bold');
//               doc.text("X", xMark + (wOpcion/2), yPos + 4.5, { align: 'center' });
//               doc.setTextColor(0); doc.setFont('helvetica','normal');
//             }
//           });
//           yPos += hFila;
//         });
//       });

//       // Kilometraje
//       if (yPos > pageHeight - 30) { doc.addPage(); yPos = 20; }
//       doc.setFillColor(230,230,230);
//       doc.rect(xActividad, yPos, wActividad, hFila, 'FD');
//       doc.setFont('helvetica','bold'); doc.setFontSize(9);
//       doc.text("KILOMETRAJE REGISTRADO", xActividad + 2, yPos + 4.5);
//       [1,2,3,4].forEach((semanaNum, i) => {
//         const xSem = xActividad + wActividad + (i * wSemana);
//         doc.rect(xSem, yPos, wSemana, hFila);
//         const km = historicoSemanas[semanaNum]?._kilometraje;
//         if (km) doc.text(`${km} km`, xSem + (wSemana/2), yPos + 4.5, { align: 'center' });
//       });
//       yPos += (hFila + 10);

//       // Nota y firmas
//       if (yPos + 40 > pageHeight - 20) { doc.addPage(); yPos = 20; }
//       doc.setFontSize(7); doc.setFont('helvetica','bold');
//       const notaAviso = "NOTA: SI CUMPLISTE CON TODOS LOS REQUERIMIENTOS, MANEJA EL VEHÍCULO CON SEGURIDAD. SI ALGUNA DE TUS RESPUESTA FUE NO, CORRÍGELO EN COORDINACION CON TU JEFE INMEDIATO Y CON LA OFICINA DE SERVICIOS GENERALES";
//       const textoDividido = doc.splitTextToSize(notaAviso, pageWidth - (margin * 2));
//       doc.text(textoDividido, margin, yPos);
//       yPos += (textoDividido.length * 4) + 15;
//       doc.setFontSize(9);
//       doc.text("RESPONSABLE DE LA REVISIÓN:", margin, yPos);
//       doc.text("JEFE INMEDIATO:", pageWidth - margin - 80, yPos);
//       yPos += 5;
//       if (datos.firma) doc.addImage(datos.firma, 'PNG', margin, yPos, 50, 25);
//       yPos += 25;
//       doc.line(margin, yPos, margin + 70, yPos);
//       doc.line(pageWidth - margin - 80, yPos, pageWidth - margin, yPos);
//       yPos += 5;
//       doc.setFont('helvetica','normal'); doc.setFontSize(8);
//       doc.text(`Nombre: ${f.nombre || '____________________'}`, margin, yPos);
//       doc.text(`RPE: ${f.rpe || '_______'}`, margin, yPos + 5);

//       // Anexos fotográficos
//       [1,2,3,4].forEach((semanaNum) => {
//         const fotoData = historicoFotos[semanaNum];
//         if (fotoData && fotoData.imagen) {
//           doc.addPage();
//           doc.setFontSize(14); doc.setFont('helvetica','bold');
//           doc.text(`ANEXO: EVIDENCIA DE FALLOS - SEMANA ${semanaNum}`, margin, 20);
//           doc.setFontSize(10); doc.setFont('helvetica','normal');
//           doc.text(`Fecha captura: ${fotoData.hora || ''}`, margin, 30);
//           doc.text(`Ubicación GPS: ${fotoData.direccion || ''}`, margin, 36);
//           if (fotoData.coordenadas) doc.text(`Coordenadas: Lat ${fotoData.coordenadas.latitude}, Lon ${fotoData.coordenadas.longitude}`, margin, 42);
//           doc.addImage(fotoData.imagen, 'JPEG', margin, 50, 160, 120);
//         }
//       });

//       // Pie de página
//       const totalPages = doc.internal.getNumberOfPages();
//       for (let i = 1; i <= totalPages; i++) {
//         doc.setPage(i);
//         doc.setFontSize(8); doc.setTextColor(128);
//         doc.text('Documento generado automáticamente por SeguridApp', pageWidth / 2, pageHeight - 8, { align: 'center' });
//         doc.text(`ID: ${ID_GENERADO} - Pág ${i}/${totalPages}`, pageWidth / 2, pageHeight - 4, { align: 'center' });
//       }

//       doc.save(`Reporte_${ID_GENERADO}.pdf`);
//       showNotification('✅ PDF generado correctamente', 'success');
//     } catch (error) {
//       console.error(error);
//       showNotification('❌ Error al generar PDF', 'error');
//     }
//   };

//   return (
//     <div className="card text-center">
//       <h2>🎉 Inspección de la Semana {datos.form?.semanaReporte || '1'} Finalizada</h2>
//       <p className="text-gray-600 mb-6">Tu PDF guardará el historial para las próximas semanas.</p>
//       <button onClick={generarPDF} className="btn btn-success btn-large">
//         📄 Descargar Documento Oficial
//       </button>
//     </div>
//   );
// };

// export default Reporte;




import React from 'react';
import { jsPDF } from 'jspdf';
import { estructura } from './Checklist';

const Reporte = ({ datos, historicoSemanas, historicoFotos, showNotification }) => {
  const generarID = () => {
    const textoUbicacion = (datos.direccion || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let codigo = "SW000";
    if (textoUbicacion.includes("montejo") || textoUbicacion.includes("alvarado") || textoUbicacion.includes("divisionales")) codigo = "SW000";
    else if (textoUbicacion.includes("merida")) codigo = "SW010";
    else if (textoUbicacion.includes("motul")) codigo = "SW020";
    else if (textoUbicacion.includes("ticul")) codigo = "SW030";
    else if (textoUbicacion.includes("campeche")) codigo = "SW040";
    else if (textoUbicacion.includes("carmen")) codigo = "SW050";
    else if (textoUbicacion.includes("chetumal")) codigo = "SW060";
    else if (textoUbicacion.includes("tizimin")) codigo = "SW070";
    else if (textoUbicacion.includes("cancun")) codigo = "SW120";
    else if (textoUbicacion.includes("riviera") || textoUbicacion.includes("maya")) codigo = "SW200";
    
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const anio = now.getFullYear();
    const hora = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const seg = String(now.getSeconds()).padStart(2, '0');
    return `${codigo}${dia}${mes}${anio}${hora}${min}${seg}`;
  };

  const generarPDF = async () => {
    try {
      const ID_GENERADO = generarID();
      const doc = new jsPDF('l', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      let yPos = 15;
      const f = datos.form || {};
      
      const estadoParaGuardar = JSON.stringify({
        form: f,
        historicoSemanas,
        historicoFotos
      });
      
      doc.setProperties({
        title: `Reporte_${ID_GENERADO}`,
        subject: 'Inspeccion Vehicular CFE',
        author: f.nombre || 'Trabajador CFE',
        keywords: estadoParaGuardar,
        creator: 'SeguridApp'
      });

      // Cabecera
      doc.setFontSize(8);
      doc.text("Forma SH-209", pageWidth - margin, yPos, { align: 'right' });
      yPos += 8;
      doc.setFillColor(230, 230, 230);
      doc.rect(margin, yPos, 20, 20, 'F');
      doc.rect(pageWidth - margin - 20, yPos, 20, 20, 'F');
      doc.setFontSize(6);
      doc.text("SUTERM", margin + 10, yPos + 10, { align: 'center' });
      doc.text("CFE", pageWidth - margin - 10, yPos + 10, { align: 'center' });
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text("COMISION FEDERAL DE ELECTRICIDAD", pageWidth / 2, yPos + 4, { align: 'center' });
      doc.setFontSize(12);
      doc.text("DIVISION DE DISTRIBUCION PENINSULAR", pageWidth / 2, yPos + 11, { align: 'center' });
      doc.setFontSize(10);
      doc.text("VERIFICACION SEMANAL DE VEHÍCULO DE TRABAJO, PERSONAL OFICINA", pageWidth / 2, yPos + 18, { align: 'center' });
      yPos += 30;

      // Datos generales
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`NO. ECO:`, margin, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.noEco || '______'}`, margin + 20, yPos);
      doc.setFont('helvetica', 'bold'); doc.text(`ÁREA O DEPTO:`, margin + 70, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.area || '______'}`, margin + 100, yPos);
      doc.setFont('helvetica', 'bold'); doc.text(`KILOMETRAJE INICIAL:`, margin + 180, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${historicoSemanas[1]?._kilometraje || f.kilometraje || '______'}`, margin + 225, yPos);
      yPos += 8;
      doc.setFont('helvetica', 'bold'); doc.text(`PERIODO DE REVISIÓN:`, margin, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.periodo || '______'}`, margin + 45, yPos);
      doc.setFont('helvetica', 'bold'); doc.text(`MES:`, margin + 140, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.mes || '___'}`, margin + 150, yPos);
      doc.setFont('helvetica', 'bold'); doc.text(`AÑO:`, margin + 190, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.anio || '___'}`, margin + 200, yPos);
      yPos += 12;

      // Tabla de semanas (CÓDIGO OCULTO TEMPORALMENTE: Cambiar [1] por [1, 2, 3, 4])
      const wActividad = 70;
      const wSemana = 48;
      const wOpcion = wSemana / 3;
      const hFila = 6.5;
      const xActividad = margin;

      // Encabezado
      doc.setFillColor(220, 220, 220);
      doc.rect(xActividad, yPos, wActividad, hFila * 2, 'FD');
      doc.setFont('helvetica', 'bold'); doc.text("ACTIVIDAD", xActividad + (wActividad/2), yPos + 8, { align: 'center' });
      
      [1].forEach((semanaNum, i) => {
        const xSem = xActividad + wActividad + (i * wSemana);
        doc.setFillColor(220,220,220); doc.rect(xSem, yPos, wSemana, hFila, 'FD');
        doc.text(`SEMANA ${semanaNum}`, xSem + (wSemana/2), yPos + 4.5, { align: 'center' });
        const ySub = yPos + hFila;
        doc.rect(xSem, ySub, wOpcion, hFila, 'FD');
        doc.rect(xSem + wOpcion, ySub, wOpcion, hFila, 'FD');
        doc.rect(xSem + (wOpcion*2), ySub, wOpcion, hFila, 'FD');
        doc.setFontSize(8);
        doc.text("SI", xSem + (wOpcion/2), ySub + 4.5, { align: 'center' });
        doc.text("NO", xSem + wOpcion + (wOpcion/2), ySub + 4.5, { align: 'center' });
        doc.text("N/A", xSem + (wOpcion*2) + (wOpcion/2), ySub + 4.5, { align: 'center' });
        doc.setFontSize(9);
      });
      yPos += (hFila * 2);

      // Cuerpo
      Object.entries(estructura).forEach(([nombreSeccion, itemsSeccion]) => {
        if (yPos > pageHeight - 30) { doc.addPage(); yPos = 20; }
        doc.setFillColor(200,200,200); doc.setFont('helvetica','bold');
        
        // El ancho gris del separador abarca solo 1 semana (wSemana * 1). 
        // Cambiar por (wSemana * 4) cuando lo actives
        doc.rect(xActividad, yPos, wActividad + (wSemana*1), hFila, 'FD'); 
        doc.text(nombreSeccion.toUpperCase(), xActividad + 2, yPos + 4.5);
        yPos += hFila;
        doc.setFont('helvetica','normal'); doc.setFontSize(8);
        
        itemsSeccion.forEach((item) => {
          if (yPos > pageHeight - 30) { doc.addPage(); yPos = 20; }
          doc.rect(xActividad, yPos, wActividad, hFila);
          doc.text(item, xActividad + 2, yPos + 4.5);
          
          // CÓDIGO OCULTO TEMPORALMENTE: Cambiar [1] por [1, 2, 3, 4]
          [1].forEach((semanaNum, i) => {
            const xSem = xActividad + wActividad + (i * wSemana);
            doc.rect(xSem, yPos, wOpcion, hFila);
            doc.rect(xSem + wOpcion, yPos, wOpcion, hFila);
            doc.rect(xSem + (wOpcion*2), yPos, wOpcion, hFila);
            
            const respuestaSemana = historicoSemanas[semanaNum]?.[item];
            if (respuestaSemana) {
              let xMark = xSem;
              let color = [200,200,200];
              if (respuestaSemana === "SI") color = [76,175,80];
              else if (respuestaSemana === "NO") { xMark += wOpcion; color = [244,67,54]; }
              else if (respuestaSemana === "NA") { xMark += (wOpcion*2); color = [255,152,0]; }
              doc.setFillColor(...color);
              doc.rect(xMark + 0.5, yPos + 0.5, wOpcion - 1, hFila - 1, 'F');
              doc.setTextColor(255); doc.setFont('helvetica','bold');
              doc.text("X", xMark + (wOpcion/2), yPos + 4.5, { align: 'center' });
              doc.setTextColor(0); doc.setFont('helvetica','normal');
            }
          });
          yPos += hFila;
        });
      });

      // Kilometraje
      if (yPos > pageHeight - 30) { doc.addPage(); yPos = 20; }
      doc.setFillColor(230,230,230);
      doc.rect(xActividad, yPos, wActividad, hFila, 'FD');
      doc.setFont('helvetica','bold'); doc.setFontSize(9);
      doc.text("KILOMETRAJE REGISTRADO", xActividad + 2, yPos + 4.5);
      
      // CÓDIGO OCULTO TEMPORALMENTE: Cambiar [1] por [1, 2, 3, 4]
      [1].forEach((semanaNum, i) => {
        const xSem = xActividad + wActividad + (i * wSemana);
        doc.rect(xSem, yPos, wSemana, hFila);
        const km = historicoSemanas[semanaNum]?._kilometraje;
        if (km) doc.text(`${km} km`, xSem + (wSemana/2), yPos + 4.5, { align: 'center' });
      });
      yPos += (hFila + 10);

      // Nota y firmas
      if (yPos + 40 > pageHeight - 20) { doc.addPage(); yPos = 20; }
      doc.setFontSize(7); doc.setFont('helvetica','bold');
      const notaAviso = "NOTA: SI CUMPLISTE CON TODOS LOS REQUERIMIENTOS, MANEJA EL VEHÍCULO CON SEGURIDAD. SI ALGUNA DE TUS RESPUESTA FUE NO, CORRÍGELO EN COORDINACION CON TU JEFE INMEDIATO Y CON LA OFICINA DE SERVICIOS GENERALES";
      const textoDividido = doc.splitTextToSize(notaAviso, pageWidth - (margin * 2));
      doc.text(textoDividido, margin, yPos);
      yPos += (textoDividido.length * 4) + 15;
      doc.setFontSize(9);
      doc.text("RESPONSABLE DE LA REVISIÓN:", margin, yPos);
      doc.text("JEFE INMEDIATO:", pageWidth - margin - 80, yPos);
      yPos += 5;
      if (datos.firma) doc.addImage(datos.firma, 'PNG', margin, yPos, 50, 25);
      yPos += 25;
      doc.line(margin, yPos, margin + 70, yPos);
      doc.line(pageWidth - margin - 80, yPos, pageWidth - margin, yPos);
      yPos += 5;
      doc.setFont('helvetica','normal'); doc.setFontSize(8);
      doc.text(`Nombre: ${f.nombre || '____________________'}`, margin, yPos);
      doc.text(`RPE: ${f.rpe || '_______'}`, margin, yPos + 5);

      // Anexos fotográficos (CÓDIGO OCULTO TEMPORALMENTE: Cambiar [1] por [1, 2, 3, 4])
      [1].forEach((semanaNum) => {
        const fotoData = historicoFotos[semanaNum];
        if (fotoData && fotoData.imagen) {
          doc.addPage();
          doc.setFontSize(14); doc.setFont('helvetica','bold');
          doc.text(`ANEXO: EVIDENCIA DE FALLOS - SEMANA ${semanaNum}`, margin, 20);
          doc.setFontSize(10); doc.setFont('helvetica','normal');
          doc.text(`Fecha captura: ${fotoData.hora || ''}`, margin, 30);
          doc.text(`Ubicación GPS: ${fotoData.direccion || ''}`, margin, 36);
          if (fotoData.coordenadas) doc.text(`Coordenadas: Lat ${fotoData.coordenadas.latitude}, Lon ${fotoData.coordenadas.longitude}`, margin, 42);
          doc.addImage(fotoData.imagen, 'JPEG', margin, 50, 160, 120);
        }
      });

      // Pie de página
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8); doc.setTextColor(128);
        doc.text('Documento generado automáticamente por SeguridApp', pageWidth / 2, pageHeight - 8, { align: 'center' });
        doc.text(`ID: ${ID_GENERADO} - Pág ${i}/${totalPages}`, pageWidth / 2, pageHeight - 4, { align: 'center' });
      }

      doc.save(`Reporte_${ID_GENERADO}.pdf`);
      showNotification('✅ PDF generado correctamente', 'success');
    } catch (error) {
      console.error(error);
      showNotification('❌ Error al generar PDF', 'error');
    }
  };

  return (
    <div className="card text-center">
      <h2>🎉 Inspección de la Semana 1 Finalizada</h2>
      <p className="text-gray-600 mb-6">El documento de revisión está listo para descargar.</p>
      <button onClick={generarPDF} className="btn btn-success btn-large">
        📄 Descargar Documento Oficial
      </button>
    </div>
  );
};

export default Reporte;