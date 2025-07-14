import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NotFound = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleAction = () => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '500px',
        padding: '3rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '6rem',
          margin: '0 0 1rem 0',
          color: '#dc3545'
        }}>
          404
        </h1>
        
        <h2 style={{
          fontSize: '2rem',
          margin: '0 0 1rem 0',
          color: '#333'
        }}>
          Page Not Found
        </h2>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#666',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={handleAction}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1.1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {isLoggedIn ? 'Go Back to Homepage' : 'Click Here to Login'}
        </button>
      </div>
    </div>
  );
};

export default NotFound; 