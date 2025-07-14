import { useState } from 'react';
import { addPlayerToTransfer, removePlayerFromTransfer } from '../api';

const PlayerCard = ({ player, onUpdate }) => {
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddToTransfer = async () => {
    if (!price || isNaN(price) || price <= 0) {
      setError('Please enter a valid price');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await addPlayerToTransfer(player.id, price);

      setShowPriceInput(false);
      setPrice('');
      onUpdate(); // Refresh the team data
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add player to transfer list');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromTransfer = async () => {
    try {
      setLoading(true);
      setError('');
      
      await removePlayerFromTransfer(player.id);

      onUpdate(); // Refresh the team data
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to remove player from transfer list');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowPriceInput(false);
    setPrice('');
    setError('');
  };

  return (
    <div 
      style={{
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '6px',
        backgroundColor: '#fff',
        position: 'relative'
      }}
    >
      <h5 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{player.name}</h5>
      <p style={{ margin: '0', color: '#666' }}>
        <strong>Position:</strong> {player.position}
      </p>
      
      {player.askingPrice && (
        <p style={{ margin: '0.5rem 0 0 0', color: '#dc3545' }}>
          <strong>Transfer Listed:</strong> ${player.askingPrice.toLocaleString()}
        </p>
      )}

      {error && (
        <p style={{ 
          margin: '0.5rem 0 0 0', 
          color: '#dc3545', 
          fontSize: '0.9rem' 
        }}>
          {error}
        </p>
      )}

      {showPriceInput ? (
        <div style={{ marginTop: '1rem' }}>
          <input
            type="number"
            placeholder="Enter asking price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '0.5rem'
            }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleAddToTransfer}
              disabled={loading}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: loading ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {loading ? 'Adding...' : 'Add to Transfer'}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '1rem' }}>
          {player.askingPrice ? (
            <button
              onClick={handleRemoveFromTransfer}
              disabled={loading}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: loading ? '#6c757d' : '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {loading ? 'Removing...' : 'Remove from Transfer'}
            </button>
          ) : (
            <button
              onClick={() => setShowPriceInput(true)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Add to Transfer Market
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerCard; 