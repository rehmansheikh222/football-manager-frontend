import { useState, useEffect } from 'react';
import { getTransferMarket, buyPlayer } from '../api';
import TransferFilters from '../components/TransferFilters';
import TransferPlayerList from '../components/TransferPlayerList';
import Notification from '../components/Notification';

const TransferMarket = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    teamName: '',
    playerName: '',
    position: '',
    minPrice: '',
    maxPrice: ''
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTransferMarket(debouncedFilters);
      setPlayers(data);
    } catch (err) {
      setError('Failed to load transfer market. Please try again.');
      console.error('Transfer market error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce filters to avoid excessive API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  // Fetch players when debounced filters change
  useEffect(() => {
    fetchPlayers();
  }, [debouncedFilters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBuyPlayer = async (playerId) => {
    try {
      await buyPlayer(playerId);
      // Refresh the list after purchase
      fetchPlayers();
      setNotification({ 
        message: 'Player purchased successfully!', 
        type: 'success' 
      });
    } catch (err) {
      setNotification({ 
        message: err.response?.data?.error || 'Failed to purchase player', 
        type: 'error' 
      });
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading Transfer Market...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Transfer Market</h2>
      
      <TransferFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {error && (
        <div style={{
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      <TransferPlayerList 
        players={players}
        onBuyPlayer={handleBuyPlayer}
      />
      
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default TransferMarket; 