const { agent } = require('supertest');
const { apiAuth, baseUrl } =  require('../config');
var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest(baseUrl),
    Testrail = require('testrail-api');


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
    auth: apiAuth,
    api: api,
    sleep: sleep,
    error: error,
    testrail: testrail
 }


