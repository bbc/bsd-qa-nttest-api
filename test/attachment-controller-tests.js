const common = '../lib/common';
const testrailApi = '../lib/test-rail-api';
const payloadsUrl = './payloads/attachment-controller-test-payloads';
const { payloads } = require(payloadsUrl);
const { siteId, expect, should, supertest, api, auth, sleep, error, testrail, runId, trTestRunCases } = require(common);
const { updateTestCase, updateResultVars } = require(testrailApi);

describe('Attachment endpoints', function(){

    it('It should be able to create an attachment for a media item', function(done){
        testRunCaseId = trTestRunCases.attachmentNTTests.tests[0].id;

        api.post('/v1/attachment/site/76/item/4198')
            .set(auth)
            .send(payloads[0])
            .expect('Content-Type', /json/)
            .end(function (err, res){
              console.log(res.status);
              try{
                expect(res.status).to.equal(202);
                updateResultVars(1, "request submitted successfully\n");
                expect(res.body).to.have.property('requestId');
                updateResultVars(1, "requestId returned\n");
              }catch(e){
                updateResultVars(5, "request submitted successfully\n");
              }
                

              updateTestCase(runId, testRunCaseId);
              done();
            });   
    });

    it('It should be able to delete an attachment for a media item', function(done){
        api.delete('/v1/attachment/site/76/item/4198/attachment/3071')
            .set(auth)
            .end(function(err, res){
                // console.log(res.body);
                console.log(res.status);
                res.status.should.equal(202);
                expect(res.body).to.have.property('requestId');
            });


        api.get('/v1/mediaitem/site/76/item/4198')
            .set(auth)
            .end(function(err, res){
                // console.log(res.body.attachments);
                expect(res.body.attachments.some(code => code.id === 3071)).to.equal(false);
                // expect(res.body.attachments).to.have.property('id',3062);
                res.status.should.equal(200);
                done();
            });   
        
    });
});