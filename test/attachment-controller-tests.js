const common = '../lib/common';
const testrailApi = '../lib/test-rail-api';
const payloadsUrl = './payloads/attachment-controller-test-payloads';
const { payloads } = require(payloadsUrl);
const { siteId, expect, should, supertest, api, auth, sleep, error, testrail, runId, trTestRunCases } = require(common);
const { updateTestCase, updateResultVars } = require(testrailApi);

var createRequestId, mediaItemId = 0;
var allAttachments, lastAttachmentId, createdAttachmentId = 0;
var ItemUnderTestId = trTestRunCases.attachmentNTTests.mediaItemUnderTest;
var testRunCaseId = '';

describe('Attachment endpoints', function(){

    it('It should be able to create an attachment for a media item', function(done){
        testRunCaseId = trTestRunCases.attachmentNTTests.tests[0].id;
        api.post('/v1/attachment/site/' + siteId + '/item/' + ItemUnderTestId)
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
                    createdAttachmentId = res.body.entityIds[0].mediaitemPropertyId
                    expect(res.status).to.equal(200);
                    updateResultVars(1, "requeststatus available\n");

                    api.get('/v1/mediaitem/site/' + siteId + '/item/' + ItemUnderTestId)
                    .set(auth)
                    .expect('Content-Type', /json/)
                    .end(async function (err, res){
                       allAttachments = res.body.attachments; 
                       lastAttachmentId = allAttachments[allAttachments.length - 1].id
                       expect(lastAttachmentId).to.equal(createdAttachmentId);    
                       updateResultVars(1, "created attachment " + createdAttachmentId + " in the mediaitem " + ItemUnderTestId + "\n");  
                       await updateTestCase(runId, testRunCaseId);                 
                    });                
                });               
              }catch(e){
                updateResultVars(5, "Issue with create an attachment for a media item: " +  e + "\n");
              }
              done();  
            });   
          
    });

    it('It should be able to delete an attachment for a media item', function(done){
        testRunCaseId = trTestRunCases.attachmentNTTests.tests[1].id;           
            api.post('/v1/attachment/site/' + siteId + '/item/' + ItemUnderTestId)
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
                            createdAttachmentId = res.body.entityIds[0].mediaitemPropertyId;
                            api.delete('/v1/attachment/site/' + siteId + '/item/' + mediaItemId + '/attachment/' + createdAttachmentId)
                                .set(auth)
                                .expect('Content-Type', /json/)
                                .end(async function (err, res){
                                    expect(res.status).to.equal(202);
                                    updateResultVars(1, "requeststatus available for submission to delete attachment from mediaitem\n");
                                    await sleep(5000);
                                    api.get('/v1/mediaitem/site/' + siteId + '/item/' + mediaItemId)
                                        .set(auth)
                                        .expect('Content-Type', /json/)
                                        .end(async function (err, res){
                                            allAttachments = res.body.attachments; 
                                            lastAttachmentId = allAttachments[allAttachments.length - 1].id
                                            expect(lastAttachmentId).not.to.equal(createdAttachmentId);   
                                            updateResultVars(1, "checked that attachment " + createdAttachmentId + " has been removed from " + mediaItemId + "\n"); 
                                            updateTestCase(runId, testRunCaseId);
                                        });
                                });
                        }); 

                }catch(e){
                    updateResultVars(5, "Issue with create an attachment for a media item: " +  e + "\n");
                }  
                done();  
            });   
        });
});