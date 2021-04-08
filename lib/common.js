const { agent } = require('supertest');
const trTestRunConf = require('../settings/testrail/testRunMapping');
const trTestRunCases = require('../settings/testrail/testcaseMapping');
const trConf = require('../settings/testrail/config');
const jupiterNTApi = require('../settings/jupiterNTAPI');
const baseURL = jupiterNTApi.baseUrl; 
const keyframeServerURL = jupiterNTApi.keyframeServer;
var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest(baseURL),
    ApiTestRail = require('api-testrail');
const auth = jupiterNTApi.apiAuth;
const runId = trTestRunConf.runId;
const trURL = trConf.url;
const trUsername = trConf.username;
const trPassword = trConf.password;
 
const testrail = new ApiTestRail(
   trURL, 
   trUsername,
   trPassword
);

const siteIdSelect = (baseURL) => {
   console.log('baseUrl: ',baseURL);
   if(baseURL.match(/int/g)){ //need to find out which server is used for INT, other wise this won't work
      return 77;
   }else if(baseURL.match(/zgbwcjvapi7500/g)){
      return 75;
   }else{
      return "not matching anything";
   }
}

var siteId = siteIdSelect(baseURL);
    
var sleep = timeout => {
   return new Promise(resolve => {
      setTimeout(() => {
         console.log(`waiting for request to process for .... ${timeout} ms`);
         resolve();
      }, timeout);
   });
};

var error = timeout => {
   setTimeout(() => {
      throw new Error("BOOM!!!");
   }, timeout);
};


 module.exports = {
    siteId: siteId,
    keyframeServerURL: keyframeServerURL,
    agent: agent,
    should: should,
    expect: expect,
    supertest: supertest,
    auth: auth,
    api: api,
    sleep: sleep,
    error: error,
    testrail: testrail,
    runId: runId,
    trTestRunCases: trTestRunCases 
 }


