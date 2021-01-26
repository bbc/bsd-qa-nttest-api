const common = '../lib/common';
const testrailApi = '../lib/test-rail-api';
const payloadsUrl = './payloads/rendition-controller-test-payloads';
const { payloads } = require(payloadsUrl);
const { siteId, expect, should, supertest, api, auth, sleep, error, testrail, runId, trTestRunCases } = require(common);
const { updateTestCase, updateResultVars } = require(testrailApi);

var createRequestId, mediaItemId = 0;
var allRenditions, lastRenditionId, createdRenditionId = 0;
var ItemUnderTestId = trTestRunCases.renditionNTTests.mediaItemUnderTest;
var testRunCaseId = '';

describe('Rendition endpoints', function(){
    it('It should be able to create a rendition for a mediaitem', function(done){
        testRunCaseId = trTestRunCases.renditionNTTests.tests[0].id;
        console.log("testRunCaseId: " + testRunCaseId);
        api.post('/v1/rendition/site/' + siteId + '/item/' + ItemUnderTestId)
            .set(auth)
            .send(payloads[0])
            .expect('Content-Type', /json/)
            .end(async function (err, res){
                try{
                    expect(res.status).to.equal(202);
                    updateResultVars(1, "request submitted successfully\n");
                    expect(res.body).to.have.property('requestId');
                    updateResultVars(1, "requestId returned\n");
                    createRequestId = res.body.requestId;
                    await sleep(5000);
                    api.get('/v1/requeststatus/site/' + siteId + '/request/' + createRequestId)
                    .set(auth)
                    .expect('Content-Type', /json/)
                    .end(function (err, res){
                        createdRenditionId = res.body.entityIds[0].mediaitemPropertyId
                        expect(res.status).to.equal(200);
                        updateResultVars(1, "requeststatus available\n");
    
                        api.get('/v1/mediaitem/site/' + siteId + '/item/' + ItemUnderTestId)
                        .set(auth)
                        .expect('Content-Type', /json/)
                        .end(async function (err, res){
                           allRenditions = res.body.renditions;
                           lastRenditionId = allRenditions[allRenditions.length - 1].id
                           expect(lastRenditionId).to.equal(createdRenditionId);    
                           updateResultVars(1, "created rendition " + createdRenditionId + " in the mediaitem " + ItemUnderTestId + "\n");  
                           await updateTestCase(runId, testRunCaseId);                 
                        });                
                    });               
                  }catch(e){
                    updateResultVars(5, "Issue with create an rendition for a media item: " +  e + "\n");
                  }
                  done();  
            });   
              
    });

    it('It should be able to delete a rendition for a mediaitem', function(done){
        testRunCaseId = trTestRunCases.renditionNTTests.tests[1].id;
        api.post('/v1/rendition/site/' + siteId + '/item/' + ItemUnderTestId)
        .set(auth)
        .send(payloads[0])
        .expect('Content-Type', /json/)
        .end(async function (err, res){
            try{
                createRequestId = res.body.requestId;
                await sleep(5000);
                api.get('/v1/requeststatus/site/' + siteId + '/request/' + createRequestId)
                    .set(auth)
                    .expect('Content-Type', /json/)
                    .end(async function (err, res){
                        mediaItemId = res.body.mediaItemURN.mediaitemId;   
                        createdRenditionId = res.body.entityIds[0].mediaitemPropertyId;
                        api.delete('/v1/rendition/site/' + siteId + '/item/' + mediaItemId + '/rendition/' + createdRenditionId)
                            .set(auth)
                            .expect('Content-Type', /json/)
                            .end(async function (err, res){
                                expect(res.status).to.equal(202);
                                updateResultVars(1, "requeststatus available for submission to delete rendition from mediaitem\n");
                                await sleep(5000);
                                api.get('/v1/mediaitem/site/' + siteId + '/item/' + mediaItemId)
                                    .set(auth)
                                    .expect('Content-Type', /json/)
                                    .end(async function (err, res){
                                        allRenditions = res.body.renditions; 
                                        lastRenditionId = allRenditions[allRenditions.length - 1].id
                                        expect(lastRenditionId).not.to.equal(createdRenditionId);   
                                        updateResultVars(1, "checked that rendition " + createdRenditionId + " has been removed from " + mediaItemId + "\n"); 
                                        updateTestCase(runId, testRunCaseId);
                                    });
                            });
                    }); 

            }catch(e){
                updateResultVars(5, "Issue with create an rendition for a media item: " +  e + "\n");
            }  
            done();  
        });   
    });
});