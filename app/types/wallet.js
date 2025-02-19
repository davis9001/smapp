// @flow

export type Account = {
  displayName: string,
  created: number,
  path: string,
  publicKey: string,
  secretKey: string
};

export type WalletMeta = {
  displayName: string,
  created: string,
  netId: number, // 0 - test net, 1 - main net, etc
  meta: {
    salt: string
  },
  crypto: {
    cipher: string,
    cipherText: {
      accounts: Array<Account>,
      mnemonic: string
    }
  }
};

export type Contact = {
  address: string,
  nickname: string
};
