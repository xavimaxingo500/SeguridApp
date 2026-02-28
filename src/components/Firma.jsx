import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const Firma = ({ onFirmaCompletada, showNotification }) => {
  const firmaRef = useRef(null);
  const [firmaData, setFirmaData] = useState(null);

  const limpiarFirma = () => {
    firmaRef.current.clear();
    setFirmaData(null);
  };

  const guardarFirma = () => {
    if (!firmaRef.current || firmaRef.current.isEmpty()) {
      showNotification('Por favor, firma en el espacio proporcionado', 'warning');
      return;
    }
    const firmaBase64 = firmaRef.current.getCanvas().toDataURL('image/png');
    setFirmaData(firmaBase64);
    onFirmaCompletada(firmaBase64);
    showNotification('✅ Firma guardada correctamente', 'success');
  };

  return (
    <div className="card">
      <h2 className="card-title">✍️ Firma Digital de Confirmación</h2>
      <p className="text-gray-600 mb-4">Firma en el recuadro para confirmar la veracidad de la información.</p>
      <div className="signature-pad">
        <SignatureCanvas
          ref={firmaRef}
          canvasProps={{ className: 'signature-canvas' }}
          penColor="black"
          backgroundColor="white"
        />
      </div>
      <div className="flex gap-4">
        <button onClick={limpiarFirma} className="btn btn-secondary flex-1">🧹 Borrar Firma</button>
        <button onClick={guardarFirma} className="btn btn-primary flex-1">💾 Guardar Firma</button>
      </div>
      {firmaData && (
        <div className="success-message">
          <span>✅ Firma guardada correctamente</span>
        </div>
      )}
      <p className="text-sm text-gray-500 mt-4"><strong>Nota:</strong> Esta firma tiene validez legal.</p>
    </div>
  );
};

export default Firma;