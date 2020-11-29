const env = '../settings/env';
const { expect, should, supertest, api, auth, sleep, error } = require(env);

describe('Attachment endpoints', function(){

    before(function (done) {
        this.timeout(5000);
        done();
    });

    it('It should be able to create an attachment for a media item', function(done){
        api.post('/v1/attachment/site/76/item/4198')
            .set(auth)
            .send(
                {
                    "location": {
                        "storeName": "76.att01",
                        "path": "4198-original_metadata.xml"
                    },
                    "mimeType": "application/xml",
                    "schemaVersion": "1-0-0",
                    "type": "Original metadata"
                }
            )
            .expect('Content-Type', /json/)
            .end(function (err, res){
            //   console.log(res.body);
              console.log(res.status);
              expect(res.status).to.equal(202);
              expect(res.body).to.have.property('requestId');
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