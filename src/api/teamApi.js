import { authenticatedClient } from './client';

export const getTeamStatus = async () => {
  const response = await authenticatedClient.get('/team/status');
  return response.data;
}; 