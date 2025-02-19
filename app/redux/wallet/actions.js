// @flow
import { eventsService } from '/infra/eventsService';
import { createError, getAddress } from '/infra/utils';
import { Action, Dispatch, GetState, WalletMeta, Account, AccountTxs, Contact, Tx } from '/types';
import TX_STATUSES from '/vars/enums';

export const SET_WALLET_META: string = 'SET_WALLET_META';
export const SET_ACCOUNTS: string = 'SET_ACCOUNTS';
export const SET_CURRENT_ACCOUNT_INDEX: string = 'SET_CURRENT_ACCOUNT_INDEX';
export const SET_MNEMONIC: string = 'SET_MNEMONIC';
export const SET_TRANSACTIONS: string = 'SET_TRANSACTIONS';
export const SET_CONTACTS: string = 'SET_CONTACTS';

export const SAVE_WALLET_FILES = 'SAVE_WALLET_FILES';

export const SET_BALANCE: string = 'SET_BALANCE';

export const SET_BACKUP_TIME: string = 'SET_BACKUP_TIME';

export const setWalletMeta = ({ meta }: { meta: WalletMeta }): Action => ({ type: SET_WALLET_META, payload: { meta } });

export const setAccounts = ({ accounts }: { accounts: Account[] }): Action => ({ type: SET_ACCOUNTS, payload: { accounts } });

export const setCurrentAccount = ({ index }: { index: number }): Action => ({ type: SET_CURRENT_ACCOUNT_INDEX, payload: { index } });

export const setMnemonic = ({ mnemonic }: { mnemonic: string }): Action => ({ type: SET_MNEMONIC, payload: { mnemonic } });

export const setTransactions = ({ transactions }: { transactions: AccountTxs }): Action => ({ type: SET_TRANSACTIONS, payload: { transactions } });

export const setContacts = ({ contacts }: { contacts: Contact[] }): Action => ({ type: SET_CONTACTS, payload: { contacts } });

export const createNewWallet = ({ existingMnemonic, password }: { existingMnemonic?: string, password: string }): Action => async (dispatch: Dispatch): Dispatch => {
  const { error, accounts, mnemonic, meta } = await eventsService.createWallet({ password, existingMnemonic });
  if (error) {
    console.log(error); // eslint-disable-line no-console
    throw createError('Error creating new wallet!', () => dispatch(createNewWallet({ existingMnemonic, password })));
  } else {
    dispatch(setWalletMeta({ meta }));
    dispatch(setAccounts({ accounts }));
    dispatch(setMnemonic({ mnemonic }));
    dispatch(readWalletFiles());
  }
};

export const readWalletFiles = (): Action => async (dispatch: Dispatch): Dispatch => {
  const { error, files } = await eventsService.readWalletFiles();
  if (error) {
    console.log(error); // eslint-disable-line no-console
    dispatch({ type: SAVE_WALLET_FILES, payload: { files: [] } });
    return [];
  }
  dispatch({ type: SAVE_WALLET_FILES, payload: { files } });
  return files;
};

export const unlockWallet = ({ password }: { password: string }): Action => async (dispatch: Dispatch, getState: GetState): Dispatch => {
  const { walletFiles } = getState().wallet;
  const { error, accounts, mnemonic, meta, contacts } = await eventsService.unlockWallet({ path: walletFiles[0], password });
  if (error) {
    console.log(error); // eslint-disable-line no-console
    throw createError(error.message, () => dispatch(unlockWallet({ password })));
  } else {
    dispatch(setWalletMeta({ meta }));
    dispatch(setAccounts({ accounts }));
    dispatch(setMnemonic({ mnemonic }));
    dispatch(setContacts({ contacts }));
    dispatch(setCurrentAccount({ index: 0 }));
  }
};

export const updateWalletName = ({ displayName }: { displayName: string }): Action => async (dispatch: Dispatch, getState: GetState): Dispatch => {
  const { walletFiles, meta } = getState().wallet;
  const updatedMeta = { ...meta, displayName };
  await eventsService.updateWalletFile({ fileName: walletFiles[0], data: updatedMeta });
  dispatch(setWalletMeta({ meta: updatedMeta }));
};

export const createNewAccount = ({ password }: { password: string }): Action => async (dispatch: Dispatch, getState: GetState): Dispatch => {
  const { walletFiles, accounts } = getState().wallet;
  const { error, newAccount } = await eventsService.createNewAccount({ fileName: walletFiles[0], password });
  if (error) {
    console.log(error); // eslint-disable-line no-console
    throw createError('Failed to create new account', () => dispatch(createNewAccount({ password })));
  } else {
    dispatch(setAccounts({ accounts: [...accounts, newAccount] }));
  }
};

export const updateAccountName = ({ accountIndex, name, password }: { accountIndex: number, name: string, password: string }): Action => async (
  dispatch: Dispatch,
  getState: GetState
): Dispatch => {
  const { walletFiles, accounts, mnemonic, contacts } = getState().wallet;
  const updatedAccount = { ...accounts[accountIndex], displayName: name };
  const updatedAccounts = [...accounts.slice(0, accountIndex), updatedAccount, ...accounts.slice(accountIndex + 1)];
  await eventsService.updateWalletFile({ fileName: walletFiles[0], password, data: { mnemonic, accounts: updatedAccounts, contacts } });
  dispatch(setAccounts({ accounts: updatedAccounts }));
};

export const addToContacts = ({ contact, password }: { contact: Contact, password: string }): Action => async (dispatch: Dispatch, getState: GetState): Dispatch => {
  const { walletFiles, accounts, mnemonic, contacts } = getState().wallet;
  const updatedContacts = [contact, ...contacts];
  await eventsService.updateWalletFile({ fileName: walletFiles[0], password, data: { accounts, mnemonic, contacts: updatedContacts } });
  dispatch(setContacts({ contacts: updatedContacts }));
};

export const restoreFile = ({ filePath }: { filePath: string }): Action => async (dispatch: Dispatch, getState: GetState): Dispatch => {
  const { walletFiles } = getState().wallet;
  const { error, newFilePath } = await eventsService.copyFile({ filePath });
  if (error) {
    console.log(error); // eslint-disable-line no-console
    throw createError('Error restoring file!', () => dispatch(restoreFile({ filePath })));
  } else {
    dispatch({ type: SAVE_WALLET_FILES, payload: { files: walletFiles ? [newFilePath, ...walletFiles] : [newFilePath] } });
  }
};

export const backupWallet = (): Action => async (dispatch: Dispatch, getState: GetState): Dispatch => {
  const { walletFiles } = getState().wallet;
  const { error } = await eventsService.copyFile({ filePath: walletFiles[0], copyToDocuments: true });
  if (error) {
    console.log(error); // eslint-disable-line no-console
    throw createError('Error creating wallet backup!', () => dispatch(backupWallet()));
  } else {
    dispatch({ type: SET_BACKUP_TIME, payload: { backupTime: new Date() } });
  }
};

export const getBalance = (): Action => async (dispatch: Dispatch, getState: GetState): Dispatch => {
  const { accounts, currentAccountIndex } = getState().wallet;
  const { error, balance } = await eventsService.getBalance({ address: accounts[currentAccountIndex].publicKey });
  if (error) {
    console.log(error); // eslint-disable-line no-console
  } else {
    dispatch({ type: SET_BALANCE, payload: { balance } });
  }
};

export const sendTransaction = ({ receiver, amount, fee, note }: { receiver: string, amount: number, fee: number, note: string }): Action => async (
  dispatch: Dispatch,
  getState: GetState
): Dispatch => {
  const { accounts, currentAccountIndex, contacts } = getState().wallet;
  const fullTx: Tx = {
    sender: getAddress(accounts[currentAccountIndex].publicKey),
    receiver,
    amount,
    fee,
    status: TX_STATUSES.PENDING,
    timestamp: new Date().getTime(),
    note
  };
  contacts.forEach((contact) => {
    if (contact.address.substring(2) === fullTx.sender || contact.address.substring(2) === fullTx.receiver) {
      fullTx.nickname = contact.nickname;
    }
  });
  const { error, transactions, id } = await eventsService.sendTx({ fullTx, accountIndex: currentAccountIndex });
  if (error) {
    console.log(error); // eslint-disable-line no-console
    throw createError('Error sending transaction!', () => {
      dispatch(sendTransaction({ receiver, amount, fee, note }));
    });
  } else {
    dispatch(setTransactions({ transactions }));
    return id;
  }
};

export const updateTransaction = ({ newData, txId }: { newData: Object, txId?: string }): Action => async (dispatch: Dispatch, getState: GetState): Dispatch => {
  const { currentAccountIndex } = getState().wallet;
  const { transactions } = await eventsService.updateTransaction({ newData, accountIndex: currentAccountIndex, txId });
  dispatch(setTransactions({ transactions }));
};

export const getTxList = ({ approveTxNotifier }: { approveTxNotifier: ({ hasConfirmedIncomingTxs: boolean }) => void }): Action => async (dispatch: Dispatch): Dispatch => {
  const { transactions, hasConfirmedIncomingTxs, hasConfirmedOutgoingTxs } = await eventsService.getAccountTxs();
  if (hasConfirmedIncomingTxs || hasConfirmedOutgoingTxs) {
    approveTxNotifier({ hasConfirmedIncomingTxs });
  }
  dispatch(setTransactions({ transactions }));
};
