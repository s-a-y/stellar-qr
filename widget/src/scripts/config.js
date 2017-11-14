import { wallets } from '../../../main';

class Config {
  constructor() {
    this.config = {};
    this.config.namespace = 'STELLAR_QR_WIDGET';
    this.config.memoTypes = [
      {
        text: 'TEXT',
        value: 'text',
      },
      {
        text: 'ID',
        value: 'id',
      },
      {
        text: 'HASH',
        value: 'hash',
      },
      {
        text: 'RETURN',
        value: 'return',
      },
    ];

    this.config.wallets = wallets.map(wallet => ({ text: wallet, value: wallet.toLowerCase() }));
    this.config.wallets.push({ text: 'Other', value: 'other' });
  }

  set(key, value) {
    this.config[key] = value;
    return value;
  }

  get(key) {
    return this.config[key];
  }
}

export default new Config();
