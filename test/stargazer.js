import test from 'ava';
import stargazer from '../wallets/stargazer';

test('Stargazer account', t => {
  let res = JSON.parse(stargazer.getQR({ accountId: 'GAN4Y5A2SVY4DOO6YCJAXVBT6XWJ25JQMCTD4OKUG63M3P52FXTBG6ID' }));
  t.is(res.stellar.account.id, 'GAN4Y5A2SVY4DOO6YCJAXVBT6XWJ25JQMCTD4OKUG63M3P52FXTBG6ID');
});

test('Stargazer minimal payment', t => {
  let res = JSON.parse(stargazer.getQR({
    accountId: 'GAN4Y5A2SVY4DOO6YCJAXVBT6XWJ25JQMCTD4OKUG63M3P52FXTBG6ID',
    amount: 1000
  }));
  t.is(res.stellar.payment.destination, 'GAN4Y5A2SVY4DOO6YCJAXVBT6XWJ25JQMCTD4OKUG63M3P52FXTBG6ID');
});

test('Stargazer different network', t => {
  let res = JSON.parse(stargazer.getQR({
    accountId: 'GAN4Y5A2SVY4DOO6YCJAXVBT6XWJ25JQMCTD4OKUG63M3P52FXTBG6ID',
    amount: 1000,
    networkHash: 'cee0302d',
  }));
  t.is(res.stellar.payment.destination, 'GAN4Y5A2SVY4DOO6YCJAXVBT6XWJ25JQMCTD4OKUG63M3P52FXTBG6ID');
  t.is(res.stellar.payment.network, 'cee0302d');
});

test('Stargazer memo payment', t => {
  let res = JSON.parse(stargazer.getQR({
    accountId: 'GAN4Y5A2SVY4DOO6YCJAXVBT6XWJ25JQMCTD4OKUG63M3P52FXTBG6ID',
    amount: 1000,
    memoType: 'text',
    memo: 'uniqueMemo'
  }));
  t.is(res.stellar.payment.destination, 'GAN4Y5A2SVY4DOO6YCJAXVBT6XWJ25JQMCTD4OKUG63M3P52FXTBG6ID');
  t.is(res.stellar.payment.memo.type, 'text');
  t.is(res.stellar.payment.memo.value, 'uniqueMemo');
});

test('Stargazer asset payment', t => {
  let res = JSON.parse(stargazer.getQR({
    accountId: 'GAN4Y5A2SVY4DOO6YCJAXVBT6XWJ25JQMCTD4OKUG63M3P52FXTBG6ID',
    amount: 0.00001,
    assetCode: 'BTC',
    assetIssuer: 'GDZWDH7GCVSCJOAGOLO5SUSKGJBPQ5F5HNPBRBAVEZBA2PIX7VSRNZIU'
  }));
  t.is(res.stellar.payment.destination, 'GAN4Y5A2SVY4DOO6YCJAXVBT6XWJ25JQMCTD4OKUG63M3P52FXTBG6ID');
  t.is(res.stellar.payment.asset.code, 'BTC');
  t.is(res.stellar.payment.asset.issuer, 'GDZWDH7GCVSCJOAGOLO5SUSKGJBPQ5F5HNPBRBAVEZBA2PIX7VSRNZIU');
});