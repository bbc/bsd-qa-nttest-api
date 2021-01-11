const common = '../lib/common';
const { expect, should, supertest, api, auth, sleep, error } = require(common);

describe('Publish metadata endpoints', function(){

    var site = 8;
    var dateTime = new Date();
    var eventDate = dateTime.toISOString().split('Z')[0] + "Z";
    var randString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3);

    it("It should be able to create a placeholder", function(done){
        api.post("/v1/publish/placeholder/site/" + site)
            .set(auth)
            .send(
                {
                    "publishMediaitem": {
                        "category": {
                            "id": 3,
                            "name": "Sequence"
                        },
                              "clipName": "automation",
                        "date": eventDate,
                              "details": "placeholder " + randString,
                        "description": "Test",
                        "outlet": {
                            "id": 1,
                            "name": "News"
                        },
                        "schemaVersion": "1-0-22",
                        "status": {
                            "id": 5,
                            "name": "Placeholder"
                        },
                        "story": "zzivan"
                    }
                }
            )
            .expect('Content-Type', /json/)
            .end(function(err,res){
                console.log(res.status);
                // expect(res.status).to.equal(200);
                console.log(res.body);
                done();
            });
    });

    it("It should be able to Publish metadata", function(){

    });

    it("It should be able to Publish subclip", function(){


    });

});   