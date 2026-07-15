import { jsPDF } from 'jspdf';
import cfeLogo from '../Logos/cfe.png';
import sutermLogo from '../Logos/suterm.png';
import { estructuraBotiquin } from './ChecklistBotiquin';

const cargarImagen = (src) => {
  return new Promise((resolve) => {
    const img = new Image(); img.src = src;
    img.onload = () => resolve(img); img.onerror = () => resolve(null);
  });
};

export const generarPDFBotiquin = async (datosForm, checklist, firma, coordenadasGPS) => {
  // Hoja A4 estándar: 210mm x 297mm
  const doc = new jsPDF('p', 'mm', 'a4');
  const margin = 10;
  let y = 10;
  
  // Total usable width = 190
  const wTotal = 190;
  const col1 = 45; // Logo CFE
  const col2 = 30; // PROCESO / FORMATO
  const col3 = 70; // Centro (Textos largos amarillos)
  const col4 = 20; // DEPTO / BOTIQUIN #
  const col5 = 25; // Logo Suterm

  const imgSuterm = await cargarImagen(sutermLogo);
  const imgCfe = await cargarImagen(cfeLogo);

  // ================= 1. ENCABEZADO (Igual al Excel) =================
  doc.setLineWidth(0.4);
  
  // Fila 1 (Altura 9)
  doc.rect(margin, y, col1, 18); // Logo CFE abarca 2 filas
  doc.rect(margin + col1, y, col2, 9);
  doc.setFillColor(255, 255, 0); // Amarillo
  doc.rect(margin + col1 + col2, y, col3, 9, 'FD'); 
  doc.rect(margin + col1 + col2 + col3, y, col4, 9);
  doc.rect(margin + col1 + col2 + col3 + col4, y, col5, 18); // Logo Suterm abarca 2 filas
  
  // Textos Fila 1
  doc.setFontSize(8); doc.setFont('helvetica', 'bold');
  doc.text("PROCESO", margin + col1 + (col2/2), y + 6, { align: 'center' });
  doc.text("DEPTO.", margin + col1 + col2 + col3 + (col4/2), y + 6, { align: 'center' });
  
  y += 9;
  
  // Fila 2 (Altura 9)
  doc.rect(margin + col1, y, col2, 9);
  doc.rect(margin + col1 + col2, y, col3, 9); 
  doc.rect(margin + col1 + col2 + col3, y, col4, 9, 'FD'); // Amarillo para Botiquín #
  
  // Textos Fila 2
  doc.text("FORMATO", margin + col1 + (col2/2), y + 6, { align: 'center' });
  doc.setFontSize(7);
  doc.text("INSPECCIÓN Y CONTROL DE BOTIQUINES Y", margin + col1 + col2 + (col3/2), y + 4, { align: 'center' });
  doc.text("ELEMENTOS DE PRIMEROS AUXILIOS", margin + col1 + col2 + (col3/2), y + 7.5, { align: 'center' });
  doc.setFontSize(8);
  doc.text(datosForm.botiquinNum || "BOTIQUÍN # 1", margin + col1 + col2 + col3 + (col4/2), y + 6, { align: 'center' });
  
  // Insertar Logos
  if (imgCfe) doc.addImage(imgCfe, 'PNG', margin + 2, 12, 41, 14);
  if (imgSuterm) doc.addImage(imgSuterm, 'PNG', margin + col1 + col2 + col3 + col4 + 2, 11, 21, 15);

  y += 9;

  // Fila 3: Ubicación y Área (Altura 8)
  const colUbiL = 35; 
  const colAreaL = 30; 
  const colInputs = wTotal - colUbiL - colAreaL; // 125
  
  doc.rect(margin, y, colUbiL, 8);
  doc.rect(margin + colUbiL, y, colAreaL, 8);
  doc.setFillColor(255, 255, 0); // Amarillo
  doc.rect(margin + colUbiL + colAreaL, y, colInputs, 8, 'FD');
  
  doc.setFontSize(9);
  doc.text("UBICACIÓN", margin + (colUbiL/2), y + 5.5, { align: 'center' });
  doc.text("ÁREA / PISO", margin + colUbiL + (colAreaL/2), y + 5.5, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  const ubiTexto = `Ubicación: ${datosForm.ubicacion || ''}   |   Piso: ${datosForm.areaPiso || ''}`;
  doc.text(ubiTexto, margin + colUbiL + colAreaL + 5, y + 5.5);

  y += 8;

  // ================= 2. TABLA DE INVENTARIO =================
  const wElem = 95; 
  const wCant = 20; 
  const wVenc = 30; 
  const wVerif = 20; 
  const wObs = 25; 
  const hFila = 4.8; // Altura reducida para que quepa en 1 hoja
  
  // Cabeceras de la tabla
  doc.setFillColor(255, 255, 0);
  doc.rect(margin, y, wElem, hFila, 'FD');
  doc.rect(margin + wElem, y, wCant, hFila, 'FD');
  doc.rect(margin + wElem + wCant, y, wVenc, hFila, 'FD');
  doc.rect(margin + wElem + wCant + wVenc, y, wVerif, hFila, 'FD');
  doc.rect(margin + wElem + wCant + wVenc + wVerif, y, wObs, hFila, 'FD');
  
  doc.setFontSize(7); doc.setFont('helvetica', 'bold');
  doc.text("ELEMENTO", margin + (wElem/2), y + 3.5, { align: 'center' });
  doc.text("CANTIDAD", margin + wElem + (wCant/2), y + 3.5, { align: 'center' });
  doc.text("FECHA DE VENCIMIENTO", margin + wElem + wCant + (wVenc/2), y + 3.5, { align: 'center' });
  doc.text("VERIFICACIÓN", margin + wElem + wCant + wVenc + (wVerif/2), y + 3.5, { align: 'center' });
  doc.text("OBSERVACIÓN", margin + wElem + wCant + wVenc + wVerif + (wObs/2), y + 3.5, { align: 'center' });
  
  y += hFila;

  Object.keys(estructuraBotiquin).forEach(seccion => {
    // Fila Gris de Categoría
    doc.setFillColor(220, 220, 220);
    doc.rect(margin, y, wTotal, hFila, 'FD');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7);
    doc.text(seccion, margin + (wTotal/2), y + 3.5, { align: 'center' });
    y += hFila;

    // Filas de Insumos
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6);
    estructuraBotiquin[seccion].forEach(item => {
      const res = checklist[item.nombre] || {};

      doc.rect(margin, y, wElem, hFila);
      doc.rect(margin + wElem, y, wCant, hFila);
      doc.rect(margin + wElem + wCant, y, wVenc, hFila);
      doc.rect(margin + wElem + wCant + wVenc, y, wVerif, hFila);
      doc.rect(margin + wElem + wCant + wVenc + wVerif, y, wObs, hFila);

      doc.setTextColor(0);
      doc.text(item.nombre.length > 60 ? item.nombre.substring(0, 58) + '...' : item.nombre, margin + 2, y + 3.5);
      doc.text(item.unidad, margin + wElem + 2, y + 3.5);
      
      doc.setFont('helvetica', 'bold');
      doc.text(res.vencimiento || "---", margin + wElem + wCant + (wVenc/2), y + 3.5, { align: 'center' });
      
      if (res.verificacion === "SI") doc.setTextColor(0, 120, 0);
      else if (res.verificacion === "NO" || res.verificacion === "N/A") doc.setTextColor(200, 0, 0);
      doc.text(res.verificacion || "", margin + wElem + wCant + wVenc + (wVerif/2), y + 3.5, { align: 'center' });
      
      doc.setTextColor(0); doc.setFont('helvetica', 'normal');
      if (res.observacion) {
        doc.text(res.observacion.length > 18 ? res.observacion.substring(0, 16) + "..." : res.observacion, margin + wElem + wCant + wVenc + wVerif + 1, y + 3.5);
      }
      y += hFila;
    });
  });

  // ================= 3. SECCIÓN FINAL Y FIRMAS =================
  // Todo cabe perfectamente si y está cerca de 213mm
  doc.rect(margin, y, 60, 20); // Caja Gris Responsable
  doc.rect(margin + 60, y, wTotal - 60, 20); // Caja Firmas
  
  doc.setFillColor(220, 220, 220);
  doc.rect(margin, y, 60, 20, 'F');
  
  doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
  doc.text("FIRMA Y R.P.E. DEL RESPONSABLE", margin + 30, y + 8, { align: 'center' });
  doc.text("DEL BOTIQUÍN:", margin + 30, y + 13, { align: 'center' });

  // Tabla chiquita de Fechas
  const xFecha = margin + wTotal - 45;
  const wCell = 15;
  doc.rect(xFecha, y, 45, 10);
  doc.rect(xFecha, y, wCell, 5); doc.text("DÍA", xFecha + (wCell/2), y + 3.5, { align: 'center' });
  doc.rect(xFecha + wCell, y, wCell, 5); doc.text("MES", xFecha + wCell + (wCell/2), y + 3.5, { align: 'center' });
  doc.rect(xFecha + (wCell*2), y, wCell, 5); doc.text("AÑO", xFecha + (wCell*2) + (wCell/2), y + 3.5, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.rect(xFecha, y + 5, wCell, 5);
  doc.rect(xFecha + wCell, y + 5, wCell, 5);
  doc.rect(xFecha + (wCell*2), y + 5, wCell, 5);
  
  if (datosForm.fechaRevision) {
    const [anio, mes, dia] = datosForm.fechaRevision.split('-');
    doc.text(dia, xFecha + (wCell/2), y + 8.5, { align: 'center' });
    doc.text(mes, xFecha + wCell + (wCell/2), y + 8.5, { align: 'center' });
    doc.text(anio, xFecha + (wCell*2) + (wCell/2), y + 8.5, { align: 'center' });
  }

  // Nombre y Firma plasmados
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9);
  doc.text(datosForm.responsable ? datosForm.responsable.toUpperCase() : "", margin + 60 + ((wTotal - 60)/2), y + 15, { align: 'center' });
  doc.line(margin + 65, y + 16, margin + wTotal - 5, y + 16); // Línea para firmar
  
  if (firma) {
    doc.addImage(firma, 'PNG', margin + 60 + ((wTotal - 60)/2) - 15, y + 2, 30, 11);
  }

  // Sello GPS
  if (coordenadasGPS) {
    doc.setFontSize(6); doc.setTextColor(150);
    doc.text(`Ubicación GPS registrada al inspeccionar: Lat ${coordenadasGPS.lat}, Lon ${coordenadasGPS.lng}`, margin, y + 24);
  }

  const idDoc = `Botiquin_${datosForm.botiquinNum ? datosForm.botiquinNum.replace(/\s+/g, '') : '1'}_${new Date().getTime()}`;
  doc.setProperties({ title: idDoc, keywords: encodeURIComponent(JSON.stringify({ form: datosForm, checklist })) });
  doc.save(`${idDoc}.pdf`);
};