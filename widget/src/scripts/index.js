import config from './config';
import Widget from './widget';

function init({container, sourceAddress, amount, currency, destinationAddress, memoType, memo}) {
  if (sourceAddress) {
    // config.set('sourceAddress', sourceAddress);
  }
  if (amount) {
    config.set('amount', amount);
  }
  if (currency) {
    config.set('currency', currency);
  }
  config.set('destinationAddress', destinationAddress);
  if (memoType) {
    config.set('memoType', memoType);
  }
  if (memo) {
    config.set('memo', memo);
  }

  const widget = new Widget();
  widget.render(container);
}

window[config.get('namespace')] = {
  init,
};
