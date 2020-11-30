import { Modal } from 'antd';

const MAINNET = '1';
const ROPSTEN = '3';

const networkConfigs = {};

const localNetworkConfig = {};

export const getNetworkConfig = (networkID) => {
  let networkConfig = localNetworkConfig;
  if (networkConfigs[networkID]) {
    networkConfig = networkConfigs[networkID];
  }

  return networkConfig;
};

export const checkNetworkCompatibility = async () => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  if (!window.ethereum) {
    return false;
  }
  const chainIdRaw =
    window.ethereum.chainId || (await window.ethereum.request({ method: 'eth_chainId' }));
  const chainId = String(parseInt(chainIdRaw));
  const requiredId = process.env.REACT_APP_NETWORK_ID;
  let requiredName;
  switch (requiredId) {
    case ROPSTEN:
      requiredName = 'ropsten';
      break;
    case MAINNET:
      requiredName = 'mainnet';
      break;
    default:
      requiredName = 'unknown';
  }
  if (chainId !== requiredId) {
    Modal.error({
      title: `Current network ID ${chainId} is not supported`,
      content: `Please switch to ${requiredName}`
    });
    return false;
  }
  return true;
};
