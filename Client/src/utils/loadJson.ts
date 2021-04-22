var requireJSON5 = require('require-json5');
export function loadJsonFile(filePath: string) {
  return requireJSON5(filePath);
}
