import TransferPlayerCard from './TransferPlayerCard';

const TransferPlayerList = ({ players, onBuyPlayer }) => {
  if (players.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <p>No players found matching your filters.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Available Players ({players.length})</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '1rem' 
      }}>
        {players.map((player) => (
          <TransferPlayerCard 
            key={player.id}
            player={player}
            onBuyPlayer={onBuyPlayer}
          />
        ))}
      </div>
    </div>
  );
};

export default TransferPlayerList; 