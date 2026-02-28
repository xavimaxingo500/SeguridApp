import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const Firma = ({ onFirmaCompletada }) => {
  const firmaRef = useRef(null);
  const [firmaData, setFirmaData] = useState(null);

  const limpiarFirma = () => {
    firmaRef.current.clear();
    setFirmaData(null);
  };
const guardarFirma = () => {
  if (!firmaRef.current || firmaRef.current.isEmpty()) {
    alert('Por favor, firma en el espacio proporcionado');
    return;
  }

  const firmaBase64 = firmaRef.current
    .getCanvas()
    .toDataURL('image/png');

  setFirmaData(firmaBase64);
  onFirmaCompletada(firmaBase64);
};


  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">3. Firma Digital de Confirmación</h2>
      
      <div className="mb-4">
        <p className="text-gray-600 mb-2">
          Firma en el recuadro para confirmar la veracidad de la información proporcionada.
        </p>
      </div>

      <div className="border-2 border-gray-300 rounded-lg p-2 bg-white mb-4">
        <SignatureCanvas
          ref={firmaRef}
          canvasProps={{
            width: 600,
            height: 200,
            className: 'w-full h-48 border border-gray-200 rounded'
          }}
          penColor="black"
          backgroundColor="white"
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={limpiarFirma}
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
        >
          Borrar Firma
        </button>
        
        <button
          onClick={guardarFirma}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Guardar Firma
        </button>
      </div>

      {firmaData && (
        <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
          <div className="flex items-center text-green-700">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Firma guardada correctamente</span>
          </div>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        <p><strong>Nota:</strong> Esta firma tiene validez legal como confirmación de los datos reportados.</p>
      </div>
    </div>
  );
};

export default Firma;




