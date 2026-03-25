import React from 'react';

const Home = ({ onSelectModule }) => {
  return (
    <div className="card text-center" style={{ maxWidth: '600px', margin: '40px auto', padding: '40px 20px' }}>
      <h1 style={{ color: '#1a365d', fontSize: '2.2rem', marginBottom: '10px' }}>SeguridApp CFE</h1>
      <p style={{ color: '#718096', marginBottom: '40px', fontSize: '1.1rem' }}>Sistema Integral de Reportes y Revisiones</p>

      <h2 style={{ fontSize: '1.3rem', color: '#2d3748', marginBottom: '20px' }}>Selecciona el módulo a utilizar:</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
        <button
          onClick={() => onSelectModule('vehiculos')}
          style={{
            background: '#2196F3', color: 'white', padding: '20px', borderRadius: '16px',
            fontSize: '1.1rem', fontWeight: 'bold', border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(33,150,243,0.3)', transition: 'transform 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <span style={{ fontSize: '1.5rem' }}>🚗</span> Inspección de Vehículos Oficiales
        </button>

        <button disabled style={btnInactivoStyle}>
          <span style={{ fontSize: '1.5rem' }}>🧯</span> Revisión de Extintores <br/><span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(En desarrollo)</span>
        </button>

        <button disabled style={btnInactivoStyle}>
          <span style={{ fontSize: '1.5rem' }}>📋</span> Módulo 3 <br/><span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(En desarrollo)</span>
        </button>

        <button disabled style={btnInactivoStyle}>
          <span style={{ fontSize: '1.5rem' }}>🏗️</span> Módulo 4 <br/><span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(En desarrollo)</span>
        </button>
      </div>
    </div>
  );
};

const btnInactivoStyle = {
  background: '#f1f5f9', color: '#94a3b8', padding: '15px', borderRadius: '16px',
  fontSize: '1.1rem', fontWeight: 'bold', border: '2px dashed #cbd5e1', cursor: 'not-allowed',
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
};

export default Home;





