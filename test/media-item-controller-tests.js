const common = '../lib/common';
const testrailApi = '../lib/test-rail-api';
const payloadsUrl = './payloads/media-item-controller-test-payloads';
const { payloads } = require(payloadsUrl);
const { siteId, expect, should, supertest, api, auth, sleep, error, testrail, runId, trTestRunCases } = require(common);
const { updateTestCase } = require(testrailApi);

var createRequestId, mediaItemId = 0;
var resultStatus = 3;
var resultComment = '';
var testRunCaseId = '';

describe('Mediaitem endpoints', function(){
    
    it('C45169426 It should be possible to Create a mediaItem', function(done){
      testRunCaseId = trTestRunCases.mediaItemNTTests.tests[0].id;

      api.post('/v1/mediaitem/site/' + siteId)
          .set(auth)
          .send(payloads[0])
          .expect('Content-Type', /json/)
          .end(async function (err, res){
            console.log(res.body);
            await sleep(5000);
            expect(res.status).to.equal(202);
            expect(res.body).to.have.property('requestId');
            createRequestId = res.body.requestId;
            api.get('/v1/requeststatus/site/' + siteId + '/request/' + createRequestId)
                .set(auth)
                .expect('Content-Type', /json/)
                .end(function (err, res){
                  console.log(res.body);
                  console.log("createRequestId: " + createRequestId);
                  try{
                    expect(res.status).to.equal(200);
                    mediaItemId = res.body.mediaItemURN.mediaitemId;
                    console.log("mediaItemId: " + mediaItemId);
                    resultStatus = 1;
                    resultComment = "Tested creating mediaItem " +  mediaItemId + " successfully";
                  }catch(e){
                    resultStatus = 5;
                    resultComment = "Tested creating mediaItem Failed: " +  e;
                  }                    
                  updateTestCase(runId, testRunCaseId, resultStatus, resultComment);
                });   
            done();
          });
  });


  it('C1184294 It should be able to return body of a mediaitem', function(done){
      testRunCaseId = trTestRunCases.mediaItemNTTests.tests[1].id;

      api.get('/v1/mediaitem/site/' + siteId + '/item/4198')
          .set(auth)
          .end(function(err, res){
            try{
              console.log(res.status);
              console.log(res.body);
              res.status.should.equal(200);
              resultStatus = 1;
              resultComment = "Tested getting details of a mediaItem: pass";
            }catch(e){
              resultStatus = 5;
              resultComment = "Tested getting details of a mediaItem: FAIL - " + e;
            }
            updateTestCase(runId, testRunCaseId, resultStatus, resultComment);
            done();
          });        
  });

  it('C1184295 It should be possible to edit the metadata of an item', function(done){
      testRunCaseId = trTestRunCases.mediaItemNTTests.tests[2].id;
      
      api.put('/v1/mediaitem/site/' + siteId + '/item/4198')
          .set(auth)
          .send(payloads[1])
          .expect('Content-Type', /json/)
          .end(function (err, res){
            try{
              console.log(res.body);
              expect(res.status).to.equal(202);
              expect(res.body).to.have.property('requestId');
              resultStatus = 1;
              resultComment = "Tested amending details of a mediaItem: pass";
            }catch(e){
              resultStatus = 5;
              resultComment = "Tested amending details of a mediaItem: FAIL - " + e;
            }
            updateTestCase(runId, testRunCaseId, resultStatus, resultComment);
            done();
          });

  });

});
