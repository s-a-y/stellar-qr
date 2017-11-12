import config from './config';
import Widget from './widget';

function init(container, sourceAddress, amount, currency, destinationAddress, memoType, memo) {
  config.set('sourceAddress', sourceAddress);
  config.set('amount', amount);
  config.set('currency', currency);
  config.set('destinationAddress', destinationAddress);
  config.set('memoType', memoType);
  config.set('memo', memo);

  const widget = new Widget();
  widget.render(container);
}

window[config.get('namespace')] = {
  init,
};
