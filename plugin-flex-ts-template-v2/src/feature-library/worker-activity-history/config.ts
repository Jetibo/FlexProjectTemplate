import { getFeatureFlags, getLoadedFeatures } from '../../utils/configuration';
import WorkerActivityHistoryConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.worker_details as WorkerActivityHistoryConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};

export const isWorkerCanvasTabsEnabled = () => {
  return getLoadedFeatures().includes('worker-canvas-tabs');
};
