import { cwd, spawn } from '@sys';

export function executeScript() {
  const ahk = spawn([`${cwd()}/ahk.exe`]);
  return ahk;
}