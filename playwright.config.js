// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';


const config=({
  testDir: './tests',
  timeout : 30*1000,

 expect: {
  timeout:5*1000,
 },
  reporter: 'html',
  use: {
     actionTimeout : 10*1000,
    navigationTimeout: 30*1000,
    browserName: 'chromium',
    headless : false,
    screenshot : 'on',
    //screenshot :'only-on-failure'
    trace  : 'on'
    //trace : 'retain-on-failure',
  },
  
 });
module.exports= config

