import { authenticatedClient } from './client';

export const addPlayerToTransfer = async (playerId, askingPrice) => {
  const response = await authenticatedClient.post('/transfer/add', {
    playerId,
    askingPrice: parseInt(askingPrice)
  });
  return response.data;
};

export const removePlayerFromTransfer = async (playerId) => {
  const response = await authenticatedClient.post('/transfer/remove', {
    playerId
  });
  return response.data;
};

export const getTransferMarket = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.teamName) params.append('teamName', filters.teamName);
  if (filters.playerName) params.append('playerName', filters.playerName);
  if (filters.position) params.append('position', filters.position);
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

  const response = await authenticatedClient.get(`/transfer/market?${params.toString()}`);
  return response.data;
};

export const buyPlayer = async (playerId) => {
  const response = await authenticatedClient.post('/transfer/buy', {
    playerId
  });
  return response.data;
}; 