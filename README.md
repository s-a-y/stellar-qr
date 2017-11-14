Stellar QR generator
-
This package is intended to fill current vacuum in the area of payment link generation and QR codes.

There were multiple attempts to come up with standard way of generating payment links and QR codes:
https://galactictalk.org/d/12-formats-for-qr-codes-uris-nfcs

But decision have never been made and as a result nobody is really using Stellar for payments (it's hard and inconvenient for users to enter manually address + memo)
and many services in Stellar ecosystem ask user for secret key, which is a very bad practice and must be **eradicated**.


How it works
-
Require this package into your project
```
npm i --save stellar-qr
```

Then use it in your code
```
const StellarQr = require('stellar-qr');

const wallets = StellarQr.wallets(); 
// returns list of wallets with support for QR codes
```

Currently returns:
* Centaurus (QR code doesn't support memo, simply encodes public address)
* Stargazer (QR code contains JSON structure with required fields)
* Papaya (uses Stargazer format)
* StellarKey (Builds transaction envelope, which is ready to be signed, but requires `sourceAccount` parameter, so you must ask user for his address first)

Then you offer user to choose wallet they are using
and generate QR code for it:
```
const StellarQr = require('stellar-qr');
 
const link = StellarQr.getStellarLink({
  wallet: 'stargazer',
  accountId: '',
  amount: '0.01',
  assetCode: 'BTC',
  assetIssuer: 'GAUTUYY2THLF7SGITDFMXJVYH3LHDSMGEAKSBU267M2K7A3W543CKUEF',
  memoType: 'text',
  memo: 'KAUOsC3bTU2+V2LwT18vDg=='	
});
const svgString = StellarQr.getStellarQR(link);
```

And use `svgString` to show QR on your payment page

Parameters:
* wallet - one from the list
* networkHash - first 8 chars of sha256 hash of stellar network passphrase (`7ac33997` - default, for public stellar network, `cee0302d` for testnet)
* networkPassphrase - can be provided directly to derive `networkHash`
* accountId - required, destination account for payment to be sent to
* amount - amount of assets to send (optional for stargazer format, useless for centaurus format)
* memoType - one of `id`, `text`, `hash`, `return`
* memo - memo value
* assetCode - asset code, default is `XLM`
* assetIssuer - asset issuer, required if assetCode != `XLM`
* sourceAccount - sender account, required for Stellarkey to prepare transaction envelope

You can also use it as frontend widget
```$html
<div id="stellar-qr"></div>
<link rel="stylesheet" href="https://swap.apay.io/stellar-qr/bundle/widget.css">
<script src="https://swap.apay.io/stellar-qr/bundle/widget.js"></script>
<script>
  window.STELLAR_QR_WIDGET.init({
  	container: document.getElementById('stellar-qr'), 
  	sourceAddress: userStellarAccount, // needed only for StellarKey 
  	amount: 123, 
  	currency: 'XLM', 
  	destinationAddress: yourStellarAccount, 
  	memoType: 'TEXT', 
  	memo: 'orderNumber'
  });
</script>
```