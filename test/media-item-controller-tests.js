const common = '../lib/common';
const testrailApi = '../lib/test-rail-api';
const payloadsUrl = './payloads/media-item-controller-test-payloads';
const { payloads } = require(payloadsUrl);
const { siteId, expect, should, supertest, api, auth, sleep, error, testrail, runId, trTestRunCases } = require(common);
const { resetResultVars, updateTestCase, updateResultVars } = require(testrailApi);

var createRequestId, mediaItemId = 0;
var testRunCaseId = '';
var ItemUnderTestId = trTestRunCases.mediaItemNTTests.mediaItemUnderTest;

describe('Mediaitem endpoints', function(){

    before(async () => {  
      resetResultVars;
    });
    
    it('It should be possible to Create a mediaItem', function(done){
      testRunCaseId = trTestRunCases.mediaItemNTTests.tests[0].id;
      api.post('/v1/mediaitem/site/' + siteId)
          .set(auth)
          .send(payloads[0])
          .expect('Content-Type', /json/)
          .end(async function (err, res){
            await sleep(5000);
            try{
                expect(res.status).to.equal(202);
                updateResultVars(1, "Request sent successfully with 202 \n");
                expect(res.body).to.have.property('requestId');
                updateResultVars(1, "Create request returns a requestId\n");
                createRequestId = res.body.requestId;
                api.get('/v1/requeststatus/site/' + siteId + '/request/' + createRequestId)
                    .set(auth)
                    .expect('Content-Type', /json/)
                    .end(async function (err, res){
                      console.log("createRequestId: " + createRequestId);                 
                        expect(res.status).to.equal(200);
                        mediaItemId = res.body.mediaItemURN.mediaitemId;
                        console.log("mediaItemId: " + mediaItemId);
                        updateResultVars(1, "Tested creating mediaItem " +  mediaItemId + " successfully\n");
                        await updateTestCase(runId, testRunCaseId);  
                    });   
                }catch(e){
                  updateResultVars(5, "Tested creating mediaItem Failed: " +  e + "\n");
                  updateTestCase(runId, testRunCaseId);  
                }                      
                done();
          });
  });


  it('It should be able to return body of a mediaitem', function(done){
      testRunCaseId = trTestRunCases.mediaItemNTTests.tests[1].id;
      api.get('/v1/mediaitem/site/' + siteId + '/item/' + ItemUnderTestId)
          .set(auth)
          .end(function(err, res){
            try{
              res.status.should.equal(200);
              updateResultVars(1, "MediaItem " + ItemUnderTestId + " can be returned\n");
              updateTestCase(runId, testRunCaseId);
            }catch(e){
              updateResultVars(5, "Tested getting details of a mediaItem Failed: " + e + "\n");
              updateTestCase(runId, testRunCaseId);
            }
            done();
          });        
  });

  it('It should be possible to edit the metadata of an item', function(done){
      testRunCaseId = trTestRunCases.mediaItemNTTests.tests[2].id;
      api.put('/v1/mediaitem/site/' + siteId + '/item/' + ItemUnderTestId)
          .set(auth)
          .send(payloads[1])
          .expect('Content-Type', /json/)
          .end(function (err, res){
            try{
              expect(res.status).to.equal(202);
              updateResultVars(1, "Edit request sent successfully with response 202\n");
              expect(res.body).to.have.property('requestId');
              updateResultVars(1, "Edit request returns a requestId\n");
              updateTestCase(runId, testRunCaseId);
            }catch(e){
              updateResultVars(5, "Tested amending details of a mediaItem Failed: " + e + "\n");
              updateTestCase(runId, testRunCaseId);
            }
            done();
          });
  });
});
