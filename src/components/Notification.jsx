import { useEffect } from 'react';

const Notification = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getBackgroundColor = () => {
    if (type === 'success') return '#28a745';
    if (type === 'error') return '#dc3545';
    return '#007bff';
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        backgroundColor: getBackgroundColor(),
        color: 'white',
        borderRadius: '6px',
        fontWeight: 'bold',
        zIndex: 1000,
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}
    >
      {message}
    </div>
  );
};

export default Notification; 