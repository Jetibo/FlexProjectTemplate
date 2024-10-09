import { getFeatureFlags } from '../../utils/configuration';
import TestFeatureConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.test_feature as TestFeatureConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
