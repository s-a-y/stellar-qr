'use strict';
const StellarSdk = require('stellar-sdk');

const stellarMemo = (memoType, memo) => {
  switch (memoType) {
    case 'id': return StellarSdk.Memo.id(memo);
    case 'text': return StellarSdk.Memo.text(memo);
    case 'hash': return StellarSdk.Memo.hash(memo);
    case 'return': return StellarSdk.Memo.return(memo);
    default:
      return StellarSdk.Memo.none();
  }
};

module.exports = {
  getQR: ({networkHash, networkPassphrase, accountId, sourceAccount, memoType, memo, amount, assetCode, assetIssuer}) => {
    if (!accountId) {
      throw new Error('accountId is required to prepare transaction envelope')
    }
    if (!sourceAccount) {
      throw new Error('sourceAccount is required to prepare transaction envelope')
    }
    if (!amount) {
      throw new Error('amount is required to prepare transaction envelope')
    }
    if (assetCode && assetCode !== 'XLM' && !assetIssuer) {
      throw new Error('assetIssuer is required for non-native assets')
    }
    if (!networkHash) {
      if (!networkPassphrase) {
        networkPassphrase = StellarSdk.Networks.PUBLIC;
      }
      networkHash = new StellarSdk.Network(networkPassphrase).networkId().toString('hex').slice(0, 8);
    }
    StellarSdk.Network.use(networkPassphrase);
    let server = new StellarSdk.Server(process.env.HORIZON_URL || 'https://horizon.stellar.org');
    return server.loadAccount(sourceAccount)
      .then(account => {
        const options = (memo ? {memo: stellarMemo(memoType, memo)} : {});
        const transaction = new StellarSdk.TransactionBuilder(account, options)
          .addOperation(StellarSdk.Operation.payment({
            destination: accountId,
            asset: (assetCode? new StellarSdk.Asset(assetCode, assetIssuer) : StellarSdk.Asset.native()),
            amount: amount,
          }))
          .build().toEnvelope().toXDR('base64');

        return 'stellar:' + networkHash + '?action=sign&xdr=' + transaction;
      })
      .catch(err => {
        if (err.name === 'NotFoundError') {
          throw new Error('Account doesn\'t exist');
        }
        console.error(err);
      });
  }
};