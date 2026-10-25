// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { worker } from 'node:cluster';
import { trace } from 'node:console';


const config = ({
  testDir: './tests',
  retries : 1,
  worker:3,
  timeout: 30 * 1000,

  expect: {
    timeout: 5 * 1000,
  },
  reporter: 'html',

  projects: [
    {

      name: 'safariexecution',
      use: {
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        
        //screenshot :'only-on-failure'
        trace: 'on',
        //trace : 'retain-on-failure',
        ...devices['iPhone 11']
      }
    },
    {
      name: 'chrome',

      use: {
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        //this helps to reocrd video for every testcase but once execution is done,
        //  it removes all the recordings of successfull tests and keeps only failure ones
        video : ['retain-on-failure'],
        Permissions:['geolocation'],
        //this is for ssl certifications errors
        ignoreHttpsErrors:true,
        //screenshot :'only-on-failure'
        trace: 'on',
        //trace : 'retain-on-failure',
       // viewport: { height: 720,width: 720}

      }

    }

  ]
  ,

});
module.exports = config

