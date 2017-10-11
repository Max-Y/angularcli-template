/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

/**
 * @const environment
 *
 * 
 * @description
 * The file contents for the current environment will overwrite these during build.
 * The build system defaults to the dev environment which uses `environment.ts`, but if you do
 * The list of which env maps to which file can be found in `.angular-cli.json`.
 */
export const environment = {
  baseUri: 'http://10.10.2.56:9090',
  baseUrl: '/api/',
  maxRetry: 1, // number max of retry for request 
  retryDelay: 500, // delay in ms between 2 try for request backend
  timeout: 2000, // max timeout(milliseconds) for request backend
  endpoints:{
   casURL: 'https://localhost/login?service=',
   login: '/login'
  },
  backUri: 'http://www.google.com/',
  production: false
};
