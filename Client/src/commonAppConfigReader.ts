import _ from 'lodash';
import { Service } from '.';
import { loadJsonFile } from './utils/loadJson';
const parseUrl = require("parse-url")
type ServiceEndpoints = Record<string, { BaseAddress: string }>;

export  function commonReader(filePath: string) {
  const obj = loadJsonFile(filePath);
  const endPoints = obj.ServiceEndpoints as ServiceEndpoints;
  const services:Array<Partial<Service>> =[];
  _.keys(endPoints).forEach(k=>{
    const paserUrlObj = parseUrl(endPoints[k].BaseAddress)
    services.push({
      name: k,
      protocol: paserUrlObj.protocol,
      domain: paserUrlObj.resource,
      port: paserUrlObj.port ?? 80
    })
  })
  return {
    fileName: filePath,
    services: services
  };
}
