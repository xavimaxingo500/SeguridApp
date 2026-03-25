import React from 'react';
import { jsPDF } from 'jspdf';
import { estructura } from './Checklist';

const Reporte = ({ datos, historicoSemanas, historicoFotos, showNotification }) => {
  const generarID = () => {
    const t = (datos.form.direccion || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let codigo = "SW000";
    if (t.includes("montejo") || t.includes("alvarado") || t.includes("divisionales")) codigo = "SW000";
    else if (t.includes("merida")) codigo = "SW010";
    else if (t.includes("motul")) codigo = "SW020";
    else if (t.includes("ticul")) codigo = "SW030"; else if (t.includes("campeche")) codigo = "SW040";
    else if (t.includes("carmen")) codigo = "SW050"; else if (t.includes("chetumal")) codigo = "SW060";
    else if (t.includes("tizimin")) codigo = "SW070";
    else if (t.includes("cancun")) codigo = "SW120";
    else if (t.includes("riviera") || t.includes("maya")) codigo = "SW200";
    
    const now = new Date();
    return `${codigo}${String(now.getDate()).padStart(2,'0')}${String(now.getMonth()+1).padStart(2,'0')}${now.getFullYear()}${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
  };

  const generarPDF = async () => {
    try {
      const ID_GENERADO = generarID();
      const doc = new jsPDF('l', 'mm', 'a4'); // Horizontal
      const pageWidth = doc.internal.pageSize.getWidth(); // ~297mm
      const pageHeight = doc.internal.pageSize.getHeight(); // ~210mm
      
      const margin = 10; 
      let yPos = 10;
      const hFila = 4.8; 

      const f = datos.form || {};
      const semanaActual = parseInt(f.semanaReporte || 1);
      
      if (historicoFotos[semanaActual]) {
        historicoFotos[semanaActual].idDocumento = `Reporte_${ID_GENERADO}`;
      }

      const fotosLigeras = JSON.parse(JSON.stringify(historicoFotos)); 
      Object.keys(fotosLigeras).forEach(sem => {
        if (fotosLigeras[sem].capturas) delete fotosLigeras[sem].capturas; 
      });

      const estadoParaGuardar = JSON.stringify({ form: f, historicoSemanas, historicoFotos: fotosLigeras, idActual: ID_GENERADO });
      doc.setProperties({ title: `Reporte_${ID_GENERADO}`, keywords: estadoParaGuardar });

      // ==========================================
      // CABECERA OFICIAL COMPRIMIDA
      // ==========================================
      doc.setFontSize(7); doc.text("Forma SH-209", pageWidth - margin, yPos, { align: 'right' });
      yPos += 5;
      
      doc.setFillColor(230, 230, 230); doc.rect(margin, yPos, 15, 15, 'F'); doc.rect(pageWidth - margin - 15, yPos, 15, 15, 'F');
      doc.setFontSize(6); doc.text("SUTERM", margin + 7.5, yPos + 8, { align: 'center' });
      doc.text("CFE", pageWidth - margin - 7.5, yPos + 8, { align: 'center' });

      doc.setFontSize(14); doc.setFont('helvetica', 'bold');
      doc.text("COMISION FEDERAL DE ELECTRICIDAD", pageWidth / 2, yPos + 4, { align: 'center' });
      doc.setFontSize(11);
      doc.text("DIVISION DE DISTRIBUCION PENINSULAR", pageWidth / 2, yPos + 9, { align: 'center' });
      doc.setFontSize(9);
      doc.text("VERIFICACION SEMANAL DE VEHÍCULO DE TRABAJO, PERSONAL OFICINA", pageWidth / 2, yPos + 14, { align: 'center' });
      
      yPos += 20;

      // ==========================================
      // DATOS GENERALES ESTILO FORMULARIO
      // ==========================================
      doc.setFontSize(8); doc.setFont('helvetica', 'bold');
      doc.text(`NO. ECO:`, margin, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.noEco || ''}`, margin + 18, yPos);
      doc.line(margin + 17, yPos + 1, margin + 50, yPos + 1); 
      
      doc.setFont('helvetica', 'bold'); doc.text(`KILOMETRAJE INICIAL:`, margin + 60, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${historicoSemanas[1]?._kilometraje || f.kilometraje || ''}`, margin + 98, yPos);
      doc.line(margin + 97, yPos + 1, margin + 130, yPos + 1);
      
      doc.setFont('helvetica', 'bold'); doc.text(`ÁREA O DEPTO:`, margin + 140, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.area || ''}`, margin + 165, yPos);
      doc.line(margin + 164, yPos + 1, margin + 230, yPos + 1);

      yPos += 6;
      doc.setFont('helvetica', 'bold'); doc.text(`PERIODO DE REVISIÓN:`, margin, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.periodo || ''}`, margin + 38, yPos);
      doc.line(margin + 37, yPos + 1, margin + 100, yPos + 1);
      
      doc.setFont('helvetica', 'bold'); doc.text(`MES:`, margin + 110, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.mes || ''}`, margin + 120, yPos);
      doc.line(margin + 119, yPos + 1, margin + 160, yPos + 1);
      
      doc.setFont('helvetica', 'bold'); doc.text(`AÑO:`, margin + 170, yPos); doc.setFont('helvetica', 'normal'); doc.text(`${f.anio || ''}`, margin + 180, yPos);
      doc.line(margin + 179, yPos + 1, margin + 210, yPos + 1);

      yPos += 6;
      if (f.idDocumentoPrevio) {
          doc.setFont('helvetica', 'bold'); doc.text(`REF. DOC. ANTERIOR:`, margin, yPos);
          doc.setFont('helvetica', 'normal'); doc.text(`Reporte_${f.idDocumentoPrevio}`, margin + 38, yPos);
          yPos += 5;
      } else {
          yPos += 2; 
      }

      // ==========================================
      // ENCABEZADOS DE LA TABLA
      // ==========================================
      const anchoTotal = pageWidth - (margin * 2);
      const wActividad = 55; 
      const wSemana = 36;
      const wOpcion = wSemana / 3;
      const wComentarios = anchoTotal - wActividad - (wSemana * 4);
      const xActividad = margin;

      doc.setFillColor(220, 220, 220); 
      doc.rect(xActividad, yPos, wActividad, hFila * 2, 'FD');
      doc.setFont('helvetica', 'bold'); 
      doc.text("ACTIVIDAD", xActividad + (wActividad/2), yPos + 6, { align: 'center' });

      [1, 2, 3, 4].forEach((semanaNum, i) => { 
        const xSem = xActividad + wActividad + (i * wSemana);
        doc.setFillColor(220,220,220); 
        doc.rect(xSem, yPos, wSemana, hFila, 'FD');
        doc.text(`SEMANA ${semanaNum}`, xSem + (wSemana/2), yPos + 3.5, { align: 'center' });
        
        const ySub = yPos + hFila;
        doc.setFillColor(235, 235, 235);
        doc.rect(xSem, ySub, wOpcion, hFila, 'FD'); 
        doc.rect(xSem + wOpcion, ySub, wOpcion, hFila, 'FD'); 
        doc.rect(xSem + (wOpcion*2), ySub, wOpcion, hFila, 'FD');
        
        doc.setFontSize(7); doc.setTextColor(0,0,0);
        doc.text("SI", xSem + (wOpcion/2), ySub + 3.5, { align: 'center' }); 
        doc.text("NO", xSem + wOpcion + (wOpcion/2), ySub + 3.5, { align: 'center' }); 
        doc.text("N/A", xSem + (wOpcion*2) + (wOpcion/2), ySub + 3.5, { align: 'center' });
        doc.setFontSize(8);
      });

      const xComentarios = xActividad + wActividad + (wSemana * 4);
      doc.setFillColor(220, 220, 220);
      doc.rect(xComentarios, yPos, wComentarios, hFila * 2, 'FD');
      doc.text("COMENTARIOS", xComentarios + (wComentarios/2), yPos + 6, { align: 'center' });
      
      yPos += (hFila * 2);

      // ==========================================
      // CUERPO DE LA TABLA (CHECKLIST)
      // ==========================================
      Object.entries(estructura).forEach(([nombreSeccion, itemsSeccion]) => {
        doc.setFillColor(200,200,200); doc.setFont('helvetica','bold');
        doc.rect(xActividad, yPos, anchoTotal, hFila, 'FD'); 
        doc.text(nombreSeccion.toUpperCase(), xActividad + 2, yPos + 3.5); 
        yPos += hFila;
        
        doc.setFont('helvetica','normal'); doc.setFontSize(7.5);
        itemsSeccion.forEach((item) => {
          doc.rect(xActividad, yPos, wActividad, hFila);
          doc.text(item, xActividad + 2, yPos + 3.5);
          
          let comentariosFila = [];
          [1, 2, 3, 4].forEach((semanaNum, i) => {
            const xSem = xActividad + wActividad + (i * wSemana);
            doc.rect(xSem, yPos, wOpcion, hFila);
            doc.rect(xSem + wOpcion, yPos, wOpcion, hFila); 
            doc.rect(xSem + (wOpcion*2), yPos, wOpcion, hFila);
            
            const respuestaSemana = historicoSemanas[semanaNum]?.[item];
            const obsSemana = historicoSemanas[semanaNum]?._observaciones?.[item];

            if (obsSemana) {
              comentariosFila.push(`S${semanaNum}: ${obsSemana}`);
            }
            if (respuestaSemana) {
              let xMark = xSem;
              let color = [200,200,200]; let texto = respuestaSemana;
              if (respuestaSemana === "SI") color = [76,175,80];
              else if (respuestaSemana === "NO") { xMark += wOpcion; color = [244,67,54]; }
              else if (respuestaSemana === "NA") { xMark += (wOpcion*2); color = [255,152,0]; texto = "N/A"; }
              
              doc.setFillColor(...color);
              doc.rect(xMark + 0.5, yPos + 0.5, wOpcion - 1, hFila - 1, 'F');
              doc.setTextColor(255,255,255); doc.setFont('helvetica','bold');
              doc.text(texto, xMark + (wOpcion/2), yPos + 3.5, { align: 'center' });
              doc.setTextColor(0,0,0); doc.setFont('helvetica','normal');
            }
          });

          doc.rect(xComentarios, yPos, wComentarios, hFila);
          if (comentariosFila.length > 0) {
            let textoObs = comentariosFila.join(" | ");
            if (textoObs.length > 55) textoObs = textoObs.substring(0, 52) + "...";
            doc.setFontSize(6);
            doc.setTextColor(200, 50, 0);
            doc.text(textoObs, xComentarios + 2, yPos + 3.2);
            doc.setTextColor(0,0,0); doc.setFontSize(7.5);
          }
          yPos += hFila;
        });
      });

      doc.setFillColor(230,230,230); doc.rect(xActividad, yPos, wActividad, hFila, 'FD');
      doc.setFont('helvetica','bold'); doc.setFontSize(8);
      doc.text("KILOMETRAJE REGISTRADO", xActividad + 2, yPos + 3.5);
      
      [1, 2, 3, 4].forEach((semanaNum, i) => {
        const xSem = xActividad + wActividad + (i * wSemana);
        doc.rect(xSem, yPos, wSemana, hFila);
        const km = historicoSemanas[semanaNum]?._kilometraje;
        if (km) doc.text(`${km} km`, xSem + (wSemana/2), yPos + 3.5, { align: 'center' });
      });

      doc.rect(xComentarios, yPos, wComentarios, hFila);
      yPos += (hFila + 4);

      // ==========================================
      // NOTAS Y FIRMAS (Todo en la Pág 1)
      // ==========================================
      doc.setFontSize(6); doc.setFont('helvetica','bold');
      const notaAviso = "NOTA: SI CUMPLISTE CON TODOS LOS REQUERIMIENTOS, MANEJA EL VEHÍCULO CON SEGURIDAD. SI ALGUNA DE TUS RESPUESTAS FUE NO, CORRÍGELO EN COORDINACION CON TU JEFE INMEDIATO Y CON LA OFICINA DE SERVICIOS GENERALES";
      doc.text(notaAviso, margin, yPos); 
      yPos += 8;
      
      doc.setFontSize(8);
      let centerX1 = margin + 40;
      let centerX2 = pageWidth - margin - 40;
      
      doc.text("RESPONSABLE DE LA REVISIÓN", centerX1, yPos, { align: 'center' });
      doc.text("JEFE INMEDIATO", centerX2, yPos, { align: 'center' });
      
      yPos += 2;
      if (datos.firma) doc.addImage(datos.firma, 'PNG', centerX1 - 20, yPos, 40, 15);
      yPos += 15;
      
      doc.line(centerX1 - 35, yPos, centerX1 + 35, yPos);
      doc.line(centerX2 - 35, yPos, centerX2 + 35, yPos);
      
      yPos += 4;
      doc.setFont('helvetica','normal'); doc.setFontSize(7);
      doc.text(`Nombre: ${f.nombre || ''}`, centerX1 - 35, yPos);
      doc.text(`RPE: ${f.rpe || ''}`, centerX1 - 35, yPos + 4);

      // =======================================================
      // IMPRESIÓN DEL HISTORIAL DE ANEXOS FOTOGRÁFICOS
      // =======================================================
      let currentYTextOnly = 20;
      let paginaHistoricoAgregada = false;

      [1, 2, 3, 4].forEach((semanaNum) => {
        const fotoData = historicoFotos[semanaNum];
        if (fotoData && (fotoData.hora || fotoData.capturas)) {
          
          const tieneImagenes = fotoData.capturas && Object.keys(fotoData.capturas).length > 0;

          if (tieneImagenes) {
            // ---> SEMANA ACTUAL (Con fotos). Mantiene su hoja independiente.
            doc.addPage();
            doc.setFontSize(14); doc.setFont('helvetica','bold');
            doc.text(`ANEXO: EVIDENCIA FOTOGRÁFICA - SEMANA ${semanaNum}`, margin, 20);
            
            doc.setFontSize(9); doc.setFont('helvetica','normal');
            doc.text(`Fecha captura: ${fotoData.hora || 'No registrada'}`, margin, 28);
            doc.text(`Ubicación GPS: ${fotoData.direccion || 'No registrada'}`, margin, 34);
            
            if (fotoData.coordenadas) {
              doc.text(`Coordenadas: Lat ${fotoData.coordenadas.lat}, Lon ${fotoData.coordenadas.lng}`, margin, 40);
            }
            
            const idDoc = fotoData.idDocumento || (semanaNum === semanaActual ? `Reporte_${ID_GENERADO}` : 'Desconocido');
            doc.setFont('helvetica','bold');
            doc.text(`ID del Documento: ${idDoc}`, margin, 46);
            
            let currentY = 56;
            
            const nombresFotos = Object.keys(fotoData.capturas);
            nombresFotos.forEach((nombre, index) => {
              if (index > 0 && index % 4 === 0) { doc.addPage(); currentY = 20; }
              
              const isRightColumn = index % 2 !== 0; 
              const xPos = isRightColumn ? 155 : margin;
              const rowOnPage = Math.floor((index % 4) / 2); 
              const yPosF = currentY + (rowOnPage * 75); 
              
              doc.setFontSize(10); doc.setFont('helvetica','bold');
              doc.text(`Evidencia: ${nombre}`, xPos, yPosF);
              
              const imgData = fotoData.capturas[nombre];
              doc.addImage(imgData, 'JPEG', xPos, yPosF + 3, 125, 65);
            });

          } else {
            // ---> SEMANAS PASADAS (Solo texto). Se agrupan en una sola hoja.
            if (!paginaHistoricoAgregada) {
              doc.addPage();
              doc.setFontSize(14); doc.setFont('helvetica','bold');
              doc.text(`REGISTRO HISTÓRICO DE EVIDENCIAS`, margin, currentYTextOnly);
              currentYTextOnly += 12;
              paginaHistoricoAgregada = true;
            }

            // Por si acaso se llenara la hoja de mucho texto (difícil pero previsor)
            if (currentYTextOnly > pageHeight - 40) {
              doc.addPage();
              currentYTextOnly = 20;
            }

            doc.setFontSize(11); doc.setFont('helvetica','bold');
            doc.text(`DATOS DE LA SEMANA ${semanaNum}`, margin, currentYTextOnly);
            currentYTextOnly += 6;

            doc.setFontSize(9); doc.setFont('helvetica','normal');
            doc.text(`Fecha captura: ${fotoData.hora || 'No registrada'}`, margin, currentYTextOnly); currentYTextOnly += 5;
            doc.text(`Ubicación GPS: ${fotoData.direccion || 'No registrada'}`, margin, currentYTextOnly); currentYTextOnly += 5;
            
            if (fotoData.coordenadas) {
              doc.text(`Coordenadas: Lat ${fotoData.coordenadas.lat}, Lon ${fotoData.coordenadas.lng}`, margin, currentYTextOnly); currentYTextOnly += 5;
            }
            
            const idDoc = fotoData.idDocumento || 'Desconocido';
            doc.setFont('helvetica','bold');
            doc.text(`ID del Documento: ${idDoc}`, margin, currentYTextOnly); currentYTextOnly += 6;

            doc.setFontSize(9); doc.setFont('helvetica','italic'); doc.setTextColor(100);
            doc.text(`* Las fotografías de esta revisión se encuentran en el archivo original: ${idDoc}.pdf`, margin, currentYTextOnly);
            doc.setTextColor(0); 

            currentYTextOnly += 12; // Espacio para la siguiente semana
          }
        }
      });

      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i); doc.setFontSize(8); doc.setTextColor(128);
        doc.text('Documento generado automáticamente por SeguridApp', pageWidth / 2, pageHeight - 8, { align: 'center' });
        doc.text(`ID: ${ID_GENERADO} - Pág ${i}/${totalPages}`, pageWidth / 2, pageHeight - 4, { align: 'center' });
      }
      doc.save(`Reporte_${ID_GENERADO}.pdf`);
      showNotification(' ✅  PDF generado correctamente', 'success');
    } catch (error) { console.error(error); showNotification(' ❌  Error al generar PDF', 'error'); }
  };

  return (
    <div className="card text-center">
      <h2> 🎉  Inspección Finalizada</h2>
      <p className="text-gray-600 mb-6">El documento de revisión con las semanas llenadas, observaciones y evidencias fotográficas recientes está listo.</p>
      <button onClick={generarPDF} className="btn btn-success btn-large">
         📄  Descargar Documento Oficial
      </button>
    </div>
  );
};
export default Reporte;