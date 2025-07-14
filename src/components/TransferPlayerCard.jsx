const TransferPlayerCard = ({ player, onBuyPlayer }) => {
  const handleBuy = () => {
    onBuyPlayer(player.id);
  };

  return (
    <div 
      style={{
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '6px',
        backgroundColor: '#fff'
      }}
    >
      <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{player.name}</h4>
      <p style={{ margin: '0.25rem 0', color: '#666' }}>
        <strong>Position:</strong> {player.position}
      </p>
      <p style={{ margin: '0.25rem 0', color: '#666' }}>
        <strong>Team:</strong> {player.team.teamName}
      </p>
      <p style={{ margin: '0.25rem 0', color: '#dc3545', fontWeight: 'bold' }}>
        <strong>Asking Price:</strong> ${player.askingPrice.toLocaleString()}
      </p>
      <p style={{ margin: '0.25rem 0', color: '#28a745', fontWeight: 'bold' }}>
        <strong>Buy Price:</strong> ${(player.askingPrice * 0.95).toLocaleString()}
      </p>
      
      <button
        onClick={handleBuy}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Buy Player
      </button>
    </div>
  );
};

export default TransferPlayerCard; 