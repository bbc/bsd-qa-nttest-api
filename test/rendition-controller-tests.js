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
        api.get('/v1/mediaitem/site/' + siteId + '/item/' + ItemUnderTestId)
        .set(auth)
        .end(function(err, res){
            res.status.should.equal(200);
            allRenditions = res.body.renditions; 
            allRenditions.forEach(function(rendition){
                api.delete('/v1/rendition/site/' + siteId + '/item/' + ItemUnderTestId + '/rendition/' + rendition.id)
                .set(auth)
                .expect('Content-Type', /json/)
                .end(async function (err, res){});
            });
        });   



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
                    updateTestCase(runId, testRunCaseId);
                }
                done();  
            });   
              
    });

    it('It should be able to delete a rendition for a mediaitem', function(done){
        testRunCaseId = trTestRunCases.renditionNTTests.tests[3].id;
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
                        await sleep(2000);
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
                                        await updateTestCase(runId, testRunCaseId);
                                    });
                            });
                    }); 

            }catch(e){
                updateResultVars(5, "Issue with create an rendition for a media item: " +  e + "\n");
                updateTestCase(runId, testRunCaseId);
            }  
            done();  
        });   
    });

    it('It should be able to amend a rendition for a mediaitem', function(done){
        testRunCaseId = trTestRunCases.renditionNTTests.tests[2].id;
        api.get('/v1/mediaitem/site/' + siteId + '/item/' + ItemUnderTestId)
        .set(auth)
        .end(function(err, res){
            res.status.should.equal(200);
            allRenditions = res.body.renditions; 
            allRenditions.forEach(function(rendition){
                api.delete('/v1/rendition/site/' + siteId + '/item/' + ItemUnderTestId + '/rendition/' + rendition.id)
                .set(auth)
                .expect('Content-Type', /json/)
                .end(async function (err, res){
                    await sleep(5000);
                });
            });
        });  

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
                            expect(res.status).to.equal(200);
                            createdRenditionId = res.body.entityIds[0].mediaitemPropertyId;
                            console.log("createdRenditionId: " + createdRenditionId);

                            updateResultVars(1, "requeststatus available\n");
        
                            api.put('/v1/rendition/site/' + siteId + '/item/' + ItemUnderTestId + '/rendition/' + createdRenditionId)
                            .set(auth)
                            .send(payloads[1])
                            .expect('Content-Type', /json/)
                            .end(async function (err, res){
                                expect(res.status).to.equal(202);   
                               updateResultVars(1, "created rendition " + createdRenditionId + " in the mediaitem " + ItemUnderTestId + "\n");  
                               await sleep(5000);
                               api.get('/v1/rendition/site/' + siteId + '/item/' + ItemUnderTestId + '/rendition/' + createdRenditionId)
                                .set(auth)
                                .expect('Content-Type', /json/)
                                .end(async function (err, res){
                                    expect(res.status).to.equal(200);
                                    expect(res.body.deletionDate).to.equal(payloads[1].deletionDate);
                                    updateResultVars(1, "amended deletionDate for rendition " + createdRenditionId + " in the mediaitem " + ItemUnderTestId + "\n");  
                                    await updateTestCase(runId, testRunCaseId);                 
                                });
                            
                            });                
                        });               
                  }catch(e){
                    updateResultVars(5, "Issue with amending the date for rendition for a media item: " +  e + "\n");
                    updateTestCase(runId, testRunCaseId);
                  }
                  done();  

            });
    });

    it('It should be able to return a rendition for a mediaitem', function(done){
        testRunCaseId = trTestRunCases.renditionNTTests.tests[1].id;
        api.get('/v1/mediaitem/site/' + siteId + '/item/' + ItemUnderTestId)
        .set(auth)
        .end(function(err, res){
            res.status.should.equal(200);
            allRenditions = res.body.renditions; 
            allRenditions.forEach(function(rendition){
                api.delete('/v1/rendition/site/' + siteId + '/item/' + ItemUnderTestId + '/rendition/' + rendition.id)
                    .set(auth)
                    .expect('Content-Type', /json/)
                    .end(async function (err, res){
                        await sleep(5000);
                    });
            
            });
        });   

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
                        .end(async function (err, res){
                            expect(res.status).to.equal(200);
                            updateResultVars(1, "requeststatus available\n");
                            createdRenditionId = res.body.entityIds[0].mediaitemPropertyId;
                            await sleep(5000);
                            api.get('/v1/rendition/site/' + siteId + '/item/' + ItemUnderTestId + '/rendition/' + createdRenditionId)
                            .set(auth)
                            .expect('Content-Type', /json/)
                            .end(async function (err, res){
                                expect(res.status).to.equal(200);
                                updateResultVars(1, "created rendition " + createdRenditionId + " is able to be retrieved from GET request\n");
                                await updateTestCase(runId, testRunCaseId);  
                            });
                        });
                    }catch(e){
                        updateResultVars(5, "Issue with retrieving the newly created rendition " + createdRenditionId + " for a media item: " +  e + "\n");
                        updateTestCase(runId, testRunCaseId);
                    }
                    done();
            });

    });
});