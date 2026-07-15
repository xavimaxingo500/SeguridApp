import { jsPDF } from 'jspdf';
import { itemsExtintor } from './ChecklistExtintor';

// 👇 Agregamos "capturas" como quinto parámetro
export const generarPDFExtintor = async (datosForm, checklist, firma, coordenadasGPS, capturas) => {
  const doc = new jsPDF('l', 'mm', 'a4');
  const pw = 297; 
  const ph = 210;
  const margin = 10;
  let y = 10;

  // ================= ENCABEZADO =================
  doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.setTextColor(0);
  doc.text("CFE", margin, y + 5);
  doc.setFontSize(8); doc.setFont('helvetica', 'italic');
  doc.text("DIVISIÓN DE DISTRIBUCIÓN PENINSULAR", margin + 15, y + 5);
  
  doc.setFontSize(10); doc.setFont('helvetica', 'bold');
  doc.text("GUÍA DE INSPECCIÓN: EXTINTORES", pw - margin, y + 5, { align: 'right' });
  
  doc.setLineWidth(0.6);
  doc.line(margin, y + 7, pw - margin, y + 7);
  
  doc.setFontSize(8);
  doc.text("HOJA 1 DE 1", pw - margin, y + 12, { align: 'right' });

  // Textos Área y Fecha
  y += 18;
  doc.setFontSize(9);
  doc.text("ÁREA DE TRABAJO: ", margin + 10, y);
  doc.setFont('helvetica', 'normal');
  const areaTxt = datosForm.area === "Otros" ? datosForm.areaEspecifica : datosForm.area;
  doc.text(areaTxt || "", margin + 45, y);
  doc.line(margin + 44, y + 1, margin + 120, y + 1);

  doc.setFont('helvetica', 'bold');
  doc.text("FECHA", margin + 140, y);
  doc.setFont('helvetica', 'normal');
  doc.text(datosForm.fecha || "", margin + 155, y);
  doc.line(margin + 153, y + 1, margin + 200, y + 1);

  y += 6;

  // ================= TABLA GIGANTE =================
  const wNo = 8;
  const wIdent = 55;
  const wExt = 12; 
  const wObs = pw - (margin * 2) - wNo - wIdent - (wExt * 10); 
  const hFila = 6.2; 
  
  // Cabecera Gris
  doc.setFillColor(200, 200, 200);
  doc.rect(margin, y, pw - (margin*2), hFila * 2, 'FD');
  
  doc.setFontSize(8); doc.setFont('helvetica', 'bold');
  doc.text("No", margin + 2, y + 6);
  doc.text("IDENTIFICACIÓN", margin + wNo + (wIdent/2), y + 4.5, { align: 'center' });
  doc.text("EXTINTORES", margin + wNo + (wIdent/2), y + 9, { align: 'center' });
  
  for (let i = 1; i <= 10; i++) {
    const xCol = margin + wNo + wIdent + ((i-1) * wExt);
    doc.line(xCol, y, xCol, y + (hFila * 2)); 
    doc.text("EXT.", xCol + (wExt/2), y + 4.5, { align: 'center' });
    doc.text(i.toString(), xCol + (wExt/2), y + 9, { align: 'center' });
  }
  
  const xObs = margin + wNo + wIdent + (wExt * 10);
  doc.line(xObs, y, xObs, y + (hFila * 2));
  doc.text("OBSERVACIONES", xObs + (wObs/2), y + 6, { align: 'center' });

  y += (hFila * 2);

  // Filas 
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7);
  
  for (let f = 1; f <= 20; f++) {
    doc.rect(margin, y, wNo, hFila);
    doc.rect(margin + wNo, y, wIdent, hFila);
    
    for (let i = 1; i <= 10; i++) {
      doc.rect(margin + wNo + wIdent + ((i-1) * wExt), y, wExt, hFila);
    }
    
    doc.rect(xObs, y, wObs, hFila);
    doc.text(`${f}.`, margin + 2, y + 4.5);
    
    if (f <= 16) {
      const itemData = itemsExtintor.find(i => Number(i.id) === f);
      if (itemData) {
        doc.text(itemData.nombre, margin + wNo + 2, y + 4.5);
        
        for (let extNum = 1; extNum <= 10; extNum++) {
          const respExtintor = checklist.extintores?.[extNum] || {};
          const valor = respExtintor[f.toString()];
          
          if (valor) {
            const xCentroCelda = margin + wNo + wIdent + ((extNum-1) * wExt) + (wExt/2);
            if (itemData.tipo === 'texto') {
              doc.setFontSize(4.5);
              const txtLimpio = valor.length > 10 ? valor.substring(0, 9) + "..." : valor;
              doc.text(txtLimpio, xCentroCelda, y + 4, { align: 'center' });
              doc.setFontSize(7);
            } else {
              doc.setFont('helvetica', 'bold');
              doc.text(valor, xCentroCelda, y + 4.5, { align: 'center' });
              doc.setFont('helvetica', 'normal');
            }
          }
        }

        const obsRow = checklist.observacionesRow?.[f.toString()];
        if (obsRow) {
          doc.text(obsRow.length > 55 ? obsRow.substring(0, 52) + "..." : obsRow, xObs + 2, y + 4.5);
        }
      }
    }
    y += hFila;
  }

  // ================= PIE DE PÁGINA =================
  y += 5;
  const wFirmaBox = 160;
  const xFirma = margin + 50; 
  
  doc.rect(xFirma, y, wFirmaBox, 15);
  doc.line(xFirma + (wFirmaBox/2), y, xFirma + (wFirmaBox/2), y + 15); 
  
  doc.setFontSize(7); doc.setFont('helvetica', 'bold');
  const xLeyenda = pw - margin - 40;
  doc.text("B = BUENO", xLeyenda, y + 2);
  doc.text("E = EXTRAVIADO", xLeyenda, y + 5);
  doc.text("R = ROBADO", xLeyenda, y + 8);
  doc.text("M = MALO", xLeyenda, y + 11);
  doc.text("NA= NO APLICA", xLeyenda, y + 14);

  doc.text("CLSH DE ZONA COMERCIAL MÉRIDA:", margin, y + 18);
  doc.text("INSPECCIONO", xFirma + (wFirmaBox/4), y + 18, { align: 'center' });
  doc.text("Vo. Bo", xFirma + wFirmaBox - (wFirmaBox/4), y + 18, { align: 'center' });

  doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
  doc.text(datosForm.inspecciono || "", xFirma + (wFirmaBox/4), y + 10, { align: 'center' });
  doc.text(datosForm.vobo || "", xFirma + wFirmaBox - (wFirmaBox/4), y + 10, { align: 'center' });
  
  if (firma) {
    doc.addImage(firma, 'PNG', xFirma + 15, y + 1, 40, 12);
  }

  if (coordenadasGPS) {
    doc.setFontSize(6); doc.setTextColor(150);
    doc.text(`GPS Registrado: Lat ${coordenadasGPS.lat}, Lon ${coordenadasGPS.lng}`, margin, y + 22);
  }

  const yFooter = ph - 10;
  doc.setLineWidth(0.4); doc.setTextColor(0);
  doc.line(margin, yFooter - 3, pw - margin, yFooter - 3);
  doc.text("SUBGERENCIA DE TRABAJO Y SERVICIOS ADMINISTRATIVOS", pw / 2, yFooter + 1, { align: 'center' });
  doc.text("DEPARTAMENTO DE SEGURIDAD E HIGIENE", pw / 2, yFooter + 4, { align: 'center' });
  doc.setFontSize(6);
  doc.text("FORMA SH-207", margin, yFooter + 5);

// ================= ANEXO FOTOGRÁFICO (CORREGIDO) =================
  if (capturas && Object.keys(capturas).length > 0) {
    const nombresFotos = Object.keys(capturas);
    let currentY = 20;
    
    nombresFotos.forEach((nombre, index) => {
      if (index % 4 === 0) {
        doc.addPage();
        doc.setFontSize(14); doc.setFont('helvetica','bold'); doc.setTextColor(0);
        doc.text(`ANEXO FOTOGRÁFICO - EXTINTORES`, margin, 20);
        currentY = 30; 
      }
      
      const indexEnHoja = index % 4; 
      const columna = indexEnHoja % 2; 
      const fila = Math.floor(indexEnHoja / 2); 
      
      const xPos = margin + (columna * 140); 
      const yPosF = currentY + (fila * 85);  
      
      // --- MAGIA PARA QUE NO SE ESTIREN ---
      const imgData = capturas[nombre];
      const imgProps = doc.getImageProperties(imgData);
      const maxWidth = 125; 
      const maxHeight = 70;
      
      // Calculamos la proporción para que no se deforme
      let finalW = maxWidth;
      let finalH = (imgProps.height * maxWidth) / imgProps.width;
      
      if (finalH > maxHeight) {
        finalH = maxHeight;
        finalW = (imgProps.width * finalH) / imgProps.height;
      }
      // Centramos la imagen en su caja de 125x70
      const offsetX = xPos + (maxWidth - finalW) / 2;
      const offsetY = yPosF + 3 + (maxHeight - finalH) / 2;
      
      doc.setFontSize(10); doc.setFont('helvetica','bold');
      doc.text(nombre, xPos, yPosF);
      doc.addImage(imgData, 'JPEG', offsetX, offsetY, finalW, finalH); 
    });
  }

  // Guardamos todo
  const idDoc = `Extintores_${datosForm.fecha ? datosForm.fecha.replace(/-/g, '') : '2026'}_${new Date().getTime()}`;
  const estadoParaGuardar = { form: datosForm, checklist };
  doc.setProperties({ title: idDoc, keywords: encodeURIComponent(JSON.stringify(estadoParaGuardar)) });
  
  doc.save(`${idDoc}.pdf`);
};