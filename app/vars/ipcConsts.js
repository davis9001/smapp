const ipcConsts = {
  CREATE_WALLET_FILE: 'CREATE_WALLET_FILE',
  UNLOCK_WALLET_FILE: 'UNLOCK_WALLET_FILE',
  COPY_FILE: 'COPY_FILE',
  UPDATE_WALLET_FILE: 'UPDATE_WALLET_FILE',
  CREATE_NEW_ACCOUNT: 'CREATE_NEW_ACCOUNT',
  READ_WALLET_FILES: 'READ_WALLET_FILES',
  SELECT_POST_FOLDER: 'SELECT_POST_FOLDER',
  PRINT: 'PRINT',
  GET_AUDIO_PATH: 'GET_AUDIO_PATH',
  GET_AUDIO_PATH_RESPONSE: 'GET_AUDIO_PATH_RESPONSE',
  SHOW_FILE_IN_FOLDER: 'SHOW_FILE_IN_FOLDER',
  GET_NODE_SETTINGS: 'GET_NODE_SETTINGS',
  SET_NODE_IP: 'SET_NODE_IP',
  SET_NODE_IP_RESPONSE: 'SET_NODE_IP_RESPONSE',
  NOTIFICATION_CLICK: 'NOTIFICATION_CLICK',
  RELOAD_APP: 'RELOAD_APP',
  DELETE_FILE: 'DELETE_FILE',
  WIPE_OUT: 'WIPE_OUT',
  TOGGLE_AUTO_START: 'TOGGLE_AUTO_START',
  IS_AUTO_START_ENABLED_REQUEST: 'IS_AUTO_START_ENABLED_REQUEST',
  CLOSING_APP: 'CLOSING_APP',
  START_NODE: 'START_NODE',
  SET_NODE_PORT: 'SET_NODE_PORT',
  KEEP_RUNNING_IN_BACKGROUND: 'KEEP_RUNNING_IN_BACKGROUND',
  SIGN_MESSAGE: 'SIGN_MESSAGE',
  IS_SERVICE_READY: 'IS_SERVICE_READY',
  // gRPC calls
  // Node management
  GET_NODE_STATUS: 'GET_NODE_STATUS',
  GET_MINING_STATUS: 'GET_MINING_STATUS',
  INIT_MINING: 'INIT_MINING',
  INIT_MINING_RESPONSE: 'INIT_MINING_RESPONSE',
  GET_UPCOMING_REWARDS: 'GET_UPCOMING_REWARDS',
  GET_ACCOUNT_REWARDS: 'GET_ACCOUNT_REWARDS',
  SET_REWARDS_ADDRESS: 'SET_REWARDS_ADDRESS',
  // Wallet management
  IS_APP_MINIMIZED: 'IS_APP_MINIMIZED',
  GET_BALANCE: 'GET_BALANCE',
  SEND_TX: 'SEND_TX',
  UPDATE_TX: 'UPDATE_TX',
  GET_ACCOUNT_TXS: 'GET_ACCOUNT_TXS'
};

export default ipcConsts;
