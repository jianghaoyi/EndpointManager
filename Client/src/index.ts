import { readdirSync } from 'fs';
import _ from 'lodash';
import * as path from 'path';
import { commonReader } from './commonAppConfigReader';
const configFilesPath = path.resolve('./config');
export interface Service {
  name: string;
  protocol: 'http' | 'https';
  domain: string;
  port: number;
}
const allServiceMap: Record<string, Array<Partial<Service>>> = {};
function listAllConfigFiles(dir: string) {
  const files = readdirSync(dir);
  files.forEach((fileName) => {
    if (_.startsWith(fileName, 'appsettings') && _.endsWith(fileName, '.json') && !_.endsWith(fileName, '.template.json')) {
      const serviceObj = commonReader(path.resolve(configFilesPath, fileName));
      allServiceMap[serviceObj.fileName] = serviceObj.services;
    }
  });
}
listAllConfigFiles(path.resolve('./config'));
console.log(allServiceMap);
