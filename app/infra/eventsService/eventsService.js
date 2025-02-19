// @flow
import { ipcRenderer } from 'electron';
import { ipcConsts } from '/vars';

class EventsService {
  static createWallet = ({ password, existingMnemonic }: { password: string, existingMnemonic: string }) =>
    ipcRenderer.invoke(ipcConsts.CREATE_WALLET_FILE, { password, existingMnemonic });

  static readWalletFiles = () => ipcRenderer.invoke(ipcConsts.READ_WALLET_FILES);

  static unlockWallet = ({ path, password }: { path: string, password: string }) => ipcRenderer.invoke(ipcConsts.UNLOCK_WALLET_FILE, { path, password });

  static updateWalletFile = ({ fileName, password, data }: { fileName: string, password: string, data: Object, field: string }) =>
    ipcRenderer.send(ipcConsts.UPDATE_WALLET_FILE, { fileName, password, data });

  static createNewAccount = ({ fileName, password }: { fileName: string, password: string }) => ipcRenderer.invoke(ipcConsts.CREATE_NEW_ACCOUNT, { fileName, password });

  static copyFile = ({ filePath, copyToDocuments }: { filePath: string, copyToDocuments?: boolean }) => ipcRenderer.invoke(ipcConsts.COPY_FILE, { filePath, copyToDocuments });

  static showFileInFolder = ({ isBackupFile, isLogFile }: { isBackupFile?: boolean, isLogFile?: boolean }) =>
    ipcRenderer.send(ipcConsts.SHOW_FILE_IN_FOLDER, { isBackupFile, isLogFile });

  static deleteWalletFile = ({ fileName }: { fileName: string }) => ipcRenderer.send(ipcConsts.DELETE_FILE, { fileName });

  static wipeOut = () => ipcRenderer.send(ipcConsts.WIPE_OUT);

  /** ************************************   NODE   ****************************************** */

  static startNode = () => ipcRenderer.send(ipcConsts.START_NODE);

  static stopNode = () => ipcRenderer.send(ipcConsts.STOP_NODE);

  static getNodeStatus = () => ipcRenderer.invoke(ipcConsts.GET_NODE_STATUS);

  static getNodeSettings = () => ipcRenderer.invoke(ipcConsts.GET_NODE_SETTINGS);

  static setPort = ({ port }: { port: string }) => ipcRenderer.send(ipcConsts.SET_NODE_PORT, { port });

  static selectPostFolder = () => ipcRenderer.invoke(ipcConsts.SELECT_POST_FOLDER);

  static initMining = ({ logicalDrive, commitmentSize, coinbase }: { logicalDrive: string, commitmentSize: number, coinbase: string }) =>
    ipcRenderer.invoke(ipcConsts.INIT_MINING, { logicalDrive, commitmentSize, coinbase });

  static getMiningStatus = () => ipcRenderer.invoke(ipcConsts.GET_MINING_STATUS);

  static getUpcomingRewards = () => ipcRenderer.invoke(ipcConsts.GET_UPCOMING_REWARDS);

  static getAccountRewards = ({ address, accountIndex }: { address: string, accountIndex: number }) => ipcRenderer.invoke(ipcConsts.GET_ACCOUNT_REWARDS, { address, accountIndex });

  static setRewardsAddress = ({ address }: { address: string }) => ipcRenderer.invoke(ipcConsts.SET_REWARDS_ADDRESS, { address });

  static setNodeIpAddress = ({ nodeIpAddress }: { nodeIpAddress: string }) => ipcRenderer.invoke(ipcConsts.SET_NODE_IP, { nodeIpAddress });

  /** **********************************   TRANSACTIONS   ************************************** */

  static getBalance = ({ address }: { address: string }) => ipcRenderer.invoke(ipcConsts.GET_BALANCE, { address });

  static sendTx = ({ fullTx, accountIndex }: { fullTx: Object, accountIndex: number }) => ipcRenderer.invoke(ipcConsts.SEND_TX, { fullTx, accountIndex });

  static updateTransaction = ({ newData, accountIndex, txId }: { newData: Object, accountIndex: number, txId?: string }) =>
    ipcRenderer.invoke(ipcConsts.UPDATE_TX, { newData, accountIndex, txId });

  static getAccountTxs = () => ipcRenderer.invoke(ipcConsts.GET_ACCOUNT_TXS);

  /** ************************************   AUTOSTART   ************************************** */

  static isAutoStartEnabled = () => ipcRenderer.invoke(ipcConsts.IS_AUTO_START_ENABLED_REQUEST);

  static toggleAutoStart = () => ipcRenderer.send(ipcConsts.TOGGLE_AUTO_START);

  /** **************************************   MISC   ***************************************** */

  static reloadApp = () => ipcRenderer.send(ipcConsts.RELOAD_APP);

  static getAudioPath = () => ipcRenderer.invoke(ipcConsts.GET_AUDIO_PATH);

  static print = ({ content }: { content: string }) => ipcRenderer.send(ipcConsts.PRINT, { content });

  static isAppMinimized = () => ipcRenderer.invoke(ipcConsts.IS_APP_MINIMIZED);

  static notificationWasClicked = () => ipcRenderer.send(ipcConsts.NOTIFICATION_CLICK);

  static signMessage = ({ message, accountIndex }: { message: string, accountIndex: number }) => ipcRenderer.invoke(ipcConsts.SIGN_MESSAGE, { message, accountIndex });

  static isServiceReady = () => ipcRenderer.invoke(ipcConsts.IS_SERVICE_READY);
}

export default EventsService;
