const stargazer = require('./wallets/stargazer');
const stellarkey = require('./wallets/stellarkey');
const qr = require('qr-image');

const wallets = [
  'Centaurus',
  'Papaya',
  'Stargazer',
  'StellarKey',
];

const getStellarLink = (params) => {
  console.log(params);
  switch (params.wallet.toLowerCase()) {
    case 'stellarkey':
      return stellarkey.getQR(params);
    case 'papaya':
    case 'stargazer':
      return Promise.resolve(stargazer.getQR(params));
    default:
      // same for centaurus
      return Promise.resolve(params.accountId);
  }
};

const getStellarQR = (link) => {
  console.log(link);
  return qr.imageSync(link, { type: 'svg' });
};

module.exports = {
  wallets,
  getStellarLink,
  getStellarQR,
};
