import { fs, cwd } from '@sys';

export async function writeScript(settings) {
  const { interval, options, mousePosition } = settings;
  const { hours, minutes, seconds, milliseconds } = interval;
  const { mouseButton, repeatOnly, repeatValue } = options;
  const { customLocation, x, y } = mousePosition;

  Object.entries({ ...interval, ...options, ...mousePosition }).forEach(
    ([key, value]) => {
      console.log(key + ': ' + value);
    }
  );

  const script = `#NoTrayIcon
CoordMode, Mouse, Screen

Main()
  
Main() {
  Loop${repeatOnly ? `, ${fixNaN(repeatValue)}` : ''} { 
    MouseClick, ${mouseButton}${
    customLocation ? `, ${fixNaN(x)}, ${fixNaN(y)}` : ''
  }
    Sleep, ${calcMS({ hours, minutes, seconds, milliseconds })}
  }
  ExitApp
}

F8::
  ExitApp
  return`;

  console.log(script);

  await writeFile(`${cwd()}/ahk.ahk`, script);
}

function calcMS({ hours, minutes, seconds, milliseconds }) {
  return (
    fixNaN(milliseconds) +
    fixNaN(seconds) * 1_000 +
    fixNaN(minutes) * 60 * 1_000 +
    fixNaN(hours) * 60 * 60 * 1_000
  );
}

async function writeFile(filename, string) {
  const file = await fs.open(filename, 'w', 0o666);
  await file.write(string);
  await file.close();
}

function fixNaN(n) {
  return isNaN(n) ? 0 : n;
}
