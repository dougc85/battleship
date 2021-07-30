import shipFactory from './ship/ship';

function component() {
  const element = document.createElement('div');

  element.innerText = shipFactory().foo;

  return element;
}

document.body.appendChild(component());