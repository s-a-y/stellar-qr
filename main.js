const stargazer = require('./wallets/stargazer');
const stellarkey = require('./wallets/stellarkey');

const wallets = [
  'Centaurus',
  'Papaya',
  'Stargazer',
  'Stellarkey',
];

const getStellarQR = (params) => {
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

module.exports = {
  wallets,
  getStellarQR,
};
