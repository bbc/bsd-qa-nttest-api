const { agent } = require('supertest');
var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    auth = require('../config.json').api,
    api = supertest('https://test-api.jupiter.bbc.co.uk');

    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    process.env['JUNIT_REPORT_PATH'] = 'test-result/result.xml';
    process.env['JUNIT_REPORT_STACK'] = 1;


var Testrail = require('testrail-api');

var testrail = new Testrail({
   host: 'https://bbcpodtest.testrail.com',
   user: 'ivan.cheung@bbc.co.uk',
   password: 'xxxxxxxxxx'
});    


var sleep = timeout => {
   return new Promise(resolve => {
      setTimeout(() => {
         console.log(`I was sleeping ${timeout} ms`);
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
    agent: agent,
    should: should,
    expect: expect,
    supertest: supertest,
    auth: auth,
    api: api,
    sleep: sleep,
    error: error,
    testrail: testrail
 }


