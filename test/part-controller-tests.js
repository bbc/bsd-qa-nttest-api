const common = '../lib/common';
const testrailApi = '../lib/test-rail-api';
const payloadsUrl = './payloads/part-controller-test-payloads';
const { payloads } = require(payloadsUrl);
const { siteId, expect, should, supertest, api, auth, sleep, error, testrail, runId, trTestRunCases } = require(common);
const { updateTestCase, updateResultVars } = require(testrailApi);

var createRequestId, mediaItemId = 0;
var allParts, lastPartId, createdPartId = 0;
var ItemUnderTestId = trTestRunCases.partNTTests.mediaItemUnderTest;
var testRunCaseId = '';

describe('Part endpoints', function(){
    it('It should be able to create a part for a mediaitem', function(done){
        testRunCaseId = trTestRunCases.partNTTests.tests[0].id;
        api.post('/v1/part/site/' + siteId + '/item/' + ItemUnderTestId)
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
                        createdPartId = res.body.entityIds[0].mediaitemPropertyId
                        expect(res.status).to.equal(200);
                        updateResultVars(1, "requeststatus available\n");
    
                        api.get('/v1/mediaitem/site/' + siteId + '/item/' + ItemUnderTestId)
                        .set(auth)
                        .expect('Content-Type', /json/)
                        .end(async function (err, res){
                           allParts = res.body.parts; 
                           lastPartId = allParts[allParts.length - 1].id
                           expect(lastPartId).to.equal(createdPartId);    
                           updateResultVars(1, "created Part " + createdPartId + " in the mediaitem " + ItemUnderTestId + "\n");   
                           await updateTestCase(runId, testRunCaseId);                
                        });                
                    });               
                  }catch(e){
                    updateResultVars(5, "Issue with create an Part for a media item: " +  e + "\n");
                    updateTestCase(runId, testRunCaseId);  
                  }
                  done();  
            });   
              
    });

    it('It should be able to delete a part for a mediaitem', function(done){
        testRunCaseId = trTestRunCases.partNTTests.tests[1].id;
        api.post('/v1/part/site/' + siteId + '/item/' + ItemUnderTestId)
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
                        createdPartId = res.body.entityIds[0].mediaitemPropertyId;
                        api.delete('/v1/part/site/' + siteId + '/item/' + mediaItemId + '/part/' + createdPartId)
                            .set(auth)
                            .expect('Content-Type', /json/)
                            .end(async function (err, res){
                                expect(res.status).to.equal(202);
                                updateResultVars(1, "requeststatus available for submission to delete part from mediaitem\n");
                                await sleep(5000);
                                api.get('/v1/mediaitem/site/' + siteId + '/item/' + mediaItemId)
                                    .set(auth)
                                    .expect('Content-Type', /json/)
                                    .end(async function (err, res){
                                        allParts = res.body.parts; 
                                        lastPartId = allParts[allParts.length - 1].id
                                        expect(lastPartId).not.to.equal(createdPartId);   
                                        updateResultVars(1, "checked that part " + createdPartId + " has been removed from " + mediaItemId + "\n"); 
                                        await updateTestCase(runId, testRunCaseId);
                                    });
                            });
                    }); 

            }catch(e){
                updateResultVars(5, "Issue with create an part for a media item: " +  e + "\n");
                updateTestCase(runId, testRunCaseId);
            }  
            done();  
        });   
    });

    it('It should be able to bulk create a part for a mediaitem', function(done){
        testRunCaseId = trTestRunCases.partNTTests.tests[2].id;
        
        api.get('/v1/mediaitem/site/' + siteId + '/item/' + ItemUnderTestId)
        .set(auth)
        .end(function(err, res){
            res.status.should.equal(200);
            allParts = res.body.parts; 
            allParts.forEach(function(part){
                api.delete('/v1/part/site/' + siteId + '/item/' + ItemUnderTestId + '/part/' + part.id)
                .set(auth)
                .expect('Content-Type', /json/)
                .end(async function (err, res){});
            });
        });     

        api.post('/v1/part/bulk/site/' + siteId + '/item/' + ItemUnderTestId)
            .set(auth)
            .send(payloads[1])
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
                        countCreatedParts = res.body.entityIds.length;
                        expect(res.status).to.equal(200);
                        updateResultVars(1, "requeststatus available\n");
                        updateResultVars(1, "number of parts created in bulk (can amend via test/payloads): " + countCreatedParts + "\n");
                        await sleep(5000);
                        api.get('/v1/mediaitem/site/' + siteId + '/item/' + ItemUnderTestId)
                        .set(auth)
                        .expect('Content-Type', /json/)
                        .end(async function (err, res){
                           countAllParts = res.body.parts.length; 
                           expect(countCreatedParts).to.equal(countAllParts);    
                           updateResultVars(1, "Bulk created Parts in the mediaitem " + ItemUnderTestId + "\n");  
                           await updateTestCase(runId, testRunCaseId);                 
                        });                
                    });               
                  }catch(e){
                    updateResultVars(5, "Issue with create an Part for a media item: " +  e + "\n");
                    updateTestCase(runId, testRunCaseId); 
                  }
                  done();  
            });         
    });
});