import config from './config';
import { getStellarQR, getStellarLink } from '../../../main';
import { buildElement, buildLabel, buildInput } from './dom';

export default class Widget {
  constructor() {
    this.groupClassName = 'sqw-input-group';
    this.groupControlClassName = 'sqw-input-group__control';
    this.groupInputClassName = 'sqw-input-group__input';
    this.groupLabelClassName = 'sqw-input-group__label';
    this.groupMessageClassName = 'sqw-input-group__message _hidden';
    this.qrClassName = 'sqw-qr';
    this.widget = buildElement('div', { class: 'sqw' });

    this.buildWalletGroup();
    this.buildRecipientGroup();

    if (config.get('memo')) {
      this.buildMemoGroup();
    }

    this.buildQR();
  }

  render(container) {
    container.append(this.widget);
  }

  buildWalletGroup() {
    this.walletGroup = buildElement('div', { class: this.groupClassName });
    this.walletGroupLabel = buildLabel('Wallet', { class: this.groupLabelClassName });
    this.walletGroupInput = buildInput({ class: this.groupInputClassName }, config.get('wallets'));
    this.walletGroup.append(this.walletGroupLabel);
    this.walletGroup.append(this.walletGroupInput);
    this.widget.append(this.walletGroup);

    this.walletGroupInput.value = 'stargazer';
    this.walletGroupInput.addEventListener('change', (event) => {
      this.handlerChangeWallet(event);
    });
  }

  buildRecipientGroup() {
    const label = `Send exactly ${config.get('amount')} ${config.get('currency')} to`;
    const value = config.get('destinationAddress');
    this.recipientGroup = buildElement('div', { class: this.groupClassName });
    this.recipientGroupLabel = buildLabel(label, { class: this.groupLabelClassName });
    this.recipientGroupInput = buildInput({ class: this.groupInputClassName, value, readonly: true });
    this.recipientGroup.append(this.recipientGroupLabel);
    this.recipientGroup.append(this.recipientGroupInput);
    this.widget.append(this.recipientGroup);

    this.recipientGroupInput.addEventListener('click', (event) => {
      this.handlerClickSelect(event);
    });
  }

  buildMemoGroup() {
    const label = 'With memo';
    this.memoGroup = buildElement('div', { class: this.groupClassName });
    this.memoGroupLabel = buildLabel(label, { class: this.groupLabelClassName });
    const memoGroupControl = buildElement('div', { class: this.groupControlClassName });
    this.memoGroupTypeInput = buildInput(
      { class: `${this.groupInputClassName} _short`, value: config.get('memoType'), disabled: !!config.get('memoType') },
      config.get('memoTypes'),
    );
    this.memoGroupTextInput = buildInput({
      class: `${this.groupInputClassName} _long`,
      value: config.get('memo'),
      readonly: !!config.get('memo')
    });
    memoGroupControl.append(this.memoGroupTypeInput);
    memoGroupControl.append(this.memoGroupTextInput);
    this.memoGroupAttention = buildElement('div', { class: this.groupMessageClassName });
    this.memoGroupAttention.innerHTML = '<span>Attention!</span> Centaurus doesn\'t scan MEMO, ' +
      'amount and asset type from QR code, you need to specify it manually.';
    this.memoGroup.append(this.memoGroupLabel);
    this.memoGroup.append(memoGroupControl);
    this.memoGroup.append(this.memoGroupAttention);
    this.widget.append(this.memoGroup);

    if (config.get('memo')) {
      this.memoGroupTextInput.addEventListener('click', (event) => {
        this.handlerClickSelect(event);
      });
    }
  }

  buildQR() {
    this.qr = buildElement('div', { class: this.qrClassName });
    this.updateQrSvg();
    this.widget.append(this.qr);
  }

  handlerChangeWallet(event) {
    const wallet = event.target.value;

    if (wallet === 'centaurus') {
      this.showMemoAttention();
    } else {
      this.hideMemoAttention();
    }

    this.updateQrSvg();

    if (wallet === 'other') {
      this.hideQr();
    } else {
      this.showQr();
    }
  }

  handlerClickSelect(event) {
    event.target.select();
  }

  showMemoAttention() {
    if (this.memoGroupAttention) {
      this.memoGroupAttention.classList.remove('_hidden');
    }
  }

  hideMemoAttention() {
    if (this.memoGroupAttention) {
      this.memoGroupAttention.classList.add('_hidden');
    }
  }

  showQr() {
    if (this.qr) {
      this.qr.classList.remove('_hidden');
    }
  }

  hideQr() {
    if (this.qr) {
      this.qr.classList.add('_hidden');
    }
  }

  updateQrSvg() {
    getStellarLink({
      wallet: this.walletGroupInput.value,
      accountId: config.get('destinationAddress'),
      // sourceAccount: config.get('sourceAddress'),
      amount: config.get('amount'),
      memoType: config.get('memoType'),
      memo: config.get('memo'),
    }).then(link => {
      return getStellarQR(link);
    })
    .then((svg) => {
      this.qr.innerHTML = svg;
    });
  }
}
