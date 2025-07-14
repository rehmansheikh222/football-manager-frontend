const TransferFilters = ({ filters, onFilterChange }) => {
  const positions = ['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'ATTACKER'];

  return (
    <div style={{ 
      marginBottom: '2rem', 
      padding: '1rem', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '6px',
      border: '1px solid #ddd'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Filters</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem' 
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Team Name:
          </label>
          <input
            type="text"
            value={filters.teamName}
            onChange={(e) => onFilterChange('teamName', e.target.value)}
            placeholder="Filter by team name"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Player Name:
          </label>
          <input
            type="text"
            value={filters.playerName}
            onChange={(e) => onFilterChange('playerName', e.target.value)}
            placeholder="Filter by player name"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Position:
          </label>
          <select
            value={filters.position}
            onChange={(e) => onFilterChange('position', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <option value="">All Positions</option>
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Min Price:
          </label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            placeholder="Minimum price"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Max Price:
          </label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            placeholder="Maximum price"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TransferFilters; 