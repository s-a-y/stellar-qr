import test from 'ava';
import StellarSdk from 'stellar-sdk';
import stellarkey from '../wallets/stellarkey';

test('Stellarkey account not found', async (t) => {
  await t.throws(stellarkey.getQR({
    accountId: 'GAN4Y5A2SVY4DOO6YCJAXVBT6XWJ25JQMCTD4OKUG63M3P52FXTBG6ID',
    sourceAccount: 'GDZWDH7GCVSCJOAGOLO5SUSKGJBPQ5F5HNPBRBAVEZBA2PIX7VSRNZIU',
    amount: '1000',
  }));
});

test('Stellarkey minimal', async (t) => {
  const res = await stellarkey.getQR({
    accountId: 'GAN4Y5A2SVY4DOO6YCJAXVBT6XWJ25JQMCTD4OKUG63M3P52FXTBG6ID',
    sourceAccount: 'GCR3L4I5C2WE4C5BNHEFHLFSIYHGLZRDAUG3MOWL7R3CVVSI4XL47OTJ',
    amount: '1000',
  });

  t.is(res.split('&').shift(), 'stellar:7ac33997?action=sign');

  const xdr = res.split('&').pop().substr(4);
  const tx = new StellarSdk.Transaction(xdr);
  t.is(tx.source, 'GCR3L4I5C2WE4C5BNHEFHLFSIYHGLZRDAUG3MOWL7R3CVVSI4XL47OTJ');
});
