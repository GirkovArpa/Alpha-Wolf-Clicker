import { $ } from '@sciter';
import { launch } from '@env';

document.on('click', 'a', (evt) => {
  launch(evt.target.attributes.href);
  return true;
});

$('button').on('click', () => Window.this.close());