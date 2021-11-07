import { $, $$ } from '@sciter';
import { fs, cwd } from '@sys';
import { adjustWindow } from 'this://app/js/adjust-window.js';
import { writeScript } from 'this://app/js/write-ahk-script.js';
import { executeScript } from 'this://app/js/execute-ahk-script.js';

main();

function main() {
  checkAHK();
  adjustWindow();
  initEvents();
}

function checkAHK() {
  if (!fs.$stat(`${cwd()}/ahk.exe`)) {
    Window.this.modal(
      <error caption="Alpha Wolf Clicker">The file ahk.exe was not found.<br /><br />Please place AutoHotKey.exe in this folder,<br />rename it to ahk.exe,<br />and restart this program.</error>
    );
    Window.this.close();
  }
}

function initEvents() {
  let ahk = null;
  $('#repeat-only').on('click', function () {
    $('#repeat-value').state.disabled = !this.state.checked;
  });
  $('#custom-location').on('click', function () {
    $$('#x, #y, #set').forEach(
      (el) => (el.state.disabled = !this.state.checked)
    );
  });
  $('#start').on('click', async function () {
    this.state.disabled = true;
    this.state.focus = false;
    $('#stop').state.disabled = false;

    await writeScript(collectOptions());
    ahk = await executeScript();
    ahk.wait().then(() => {
      $('#stop').state.disabled = true;
      $('#stop').state.focus = false;
      $('#start').state.disabled = false;
    });
  });
  $('#stop').on('click', function () {
    this.state.disabled = true;
    this.state.focus = false;
    $('#start').state.disabled = false;

    ahk.kill();
  });
  $('#about').on('click', () =>
    Window.this.modal({ url: 'this://app/html/about.html' })
  );
}

function collectOptions() {
  return {
    interval: {
      hours: +$('#hours').value,
      minutes: +$('#minutes').value,
      seconds: +$('#seconds').value,
      milliseconds: +$('#milliseconds').value,
    },
    options: {
      mouseButton: $('#mouse-button').value,
      repeatOnly: $('#repeat-only').state.checked,
      repeatValue: +$('#repeat-value').value,
    },
    mousePosition: {
      customLocation: $('#custom-location').state.checked,
      x: +$('#x').value,
      y: +$('#y').value,
    },
  };
}