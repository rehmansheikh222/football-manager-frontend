import { useState, useEffect } from 'react';
import { getTeamStatus } from '../api';
import PlayerCard from '../components/PlayerCard';

const Home = () => {
  const [teamStatus, setTeamStatus] = useState(null);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const checkTeamStatus = async () => {
    try {
      setLoading(true);
      setError('');
      const statusData = await getTeamStatus();
      setTeamStatus(statusData);
      
      if (statusData.teamCreated) {
        // Team data is already included in the status response
        setTeam(statusData.team);
      }
    } catch (err) {
      setError('Failed to check team status. Please try again.');
      console.error('Team status error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkTeamStatus();
  }, []);

  const handleRefresh = () => {
    checkTeamStatus();
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading...</h2>
        <p>Checking your team status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Error</h2>
        <p style={{ color: '#dc3545' }}>{error}</p>
        <button 
          onClick={handleRefresh}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Team is still being created
  if (!teamStatus?.teamCreated) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Team Creation in Progress</h2>
        <p>Your team is being created. This may take a few moments.</p>
        <button 
          onClick={handleRefresh}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Refresh Status
        </button>
      </div>
    );
  }

  // Team is created and loaded
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to Football Fantasy Manager</h2>
      
      {team && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Your Team: {team.teamName}</h3>
          <p><strong>Budget:</strong> ${team.budget.toLocaleString()}</p>
          <p><strong>Players:</strong> {team.playersCount}</p>
          
          <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Your Players:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {team.players.map((player) => (
              <PlayerCard 
                key={player.id}
                player={player}
                onUpdate={checkTeamStatus}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 