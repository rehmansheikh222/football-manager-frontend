// Export all API functions from a single entry point
export { getTeamStatus } from './teamApi';
export { 
  addPlayerToTransfer, 
  removePlayerFromTransfer, 
  getTransferMarket, 
  buyPlayer 
} from './transferApi'; 