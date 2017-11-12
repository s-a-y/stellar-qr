export function buildElement(name, attrs = {}) {
  const el = document.createElement(name);
  Object.keys(attrs).forEach((attr) => {
    el.setAttribute(attr, attrs[attr]);
  });
  return el;
}

export function buildInput(attrs = {}, options) {
  if (options) {
    const input = buildElement('select', attrs);
    options.forEach((item) => {
      const optionAttrs = { value: item.value };
      if (attrs.value && item.value === attrs.value) {
        optionAttrs.selected = 'selected';
      }
      const option = buildElement('option', optionAttrs);
      option.innerHTML = item.text;
      input.append(option);
    });
    return input;
  }

  return buildElement('input', Object.assign({ type: 'text' }, attrs));
}

export function buildLabel(text, attrs) {
  const label = buildElement('label', attrs);
  label.innerHTML = text;
  return label;
}
