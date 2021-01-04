const common = '../lib/common';
const testrailApi = '../lib/test-rail-api';
const { siteId, expect, should, supertest, api, auth, sleep, error, testrail, runId, trTestRunCases } = require(common);
const { updateTestCase } = require(testrailApi);

var createRequestId, mediaItemId = 0;
var resultStatus = 3;
var resultComment = '';
var testRunCaseId = '';

var dateTime = new Date();
var eventDate = dateTime.toISOString().split('Z')[0];
var randString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);


describe('Mediaitem endpoints', function(){
    
    it('C45169426 It should be possible to Create a mediaItem', function(done){
      testRunCaseId = trTestRunCases.mediaItemNTTests.tests[0].id;

      api.post('/v1/mediaitem/site/' + siteId)
          .set(auth)
          .send(
              {
                  "archiveLogging": {
                    "keywords": "Ivan",
                    "language": "EN",
                    "locationEditorial": "London",
                    "reporter": "Stew"
                  },
                  "category": "Recording",
                  "creationDate": dateTime,
                  "creator": "Johnson",
                  "crew": [
                    {
                      "name": "John Newman",
                      "position": "Camera"
                    }
                  ],
                  "description": "post mediatem test - dateTime",
                  "details": "proxyless test",
                  "editorialRights": {
                    "restrictions": "Disney",
                    "trafficLight": "GREEN"
                  },
                  "eventDate": eventDate,
                  "externalDescription": "string",
                  "frameRate": {
                    "denominator": 1,
                    "numerator": 60
                  },
                  "isAgency": true,
                  "isBestMedia": true,
                  "lengthFrames": 38072,
                  "modifiedDate": dateTime,
                  "outlet": "News",
                  "pictureFormat": "16x9",
                  "rights": {
                    "copyright": "BSD",
                    "restrictions": "WARNING THIS A TRAFFICLIGHT DESCRIPTION",
                    "trafficLight": "GREEN"
                  },
                  "schemaVersion": "1-0-0",
                  "soundFormat": "Mono",
                  "source": "Morocco",
                  "status": "Raw",
                  "story": "zznttest",
                  "type": "Edit"
                }
          )
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
      api.get('/v1/mediaitem/site/' + siteId + '/item/4198')
          .set(auth)
          .end(function(err, res){
            console.log(res.status);
            console.log(res.body);
            res.status.should.equal(200);
            done();
          });        
  });

  it('C1184295 It should be possible to edit the metadata of an item', function(done){
      api.put('/v1/mediaitem/site/' + siteId + '/item/4198')
          .set(auth)
          .send(
              {
                "archiveLogging": {
                    "keywords": randString,
                    "language": "French- GB",
                    "locationEditorial": "Perth",
                    "reporter": "Jaden Smith"
                },    
                "category": "Package",
                "crew": [
                {
                  "name": "Sir Arthur Conan Doyle",
                  "position": "Author"
                },
                {
                  "name": "JK Rowling",
                  "position": "Author"
                },
                {
                  "name": "Madam Carrie Lam",
                  "position": "CEO"
                }
                ],
                "description": "test amending item with string " + randString,
                "details": "zzivanregression",
                "eventDate": "2020-08-11T20:34:33.015",
                "isBestMedia": true,
                "outlet": "BBCNews",
                "pictureFormat": "16x9",
                "rights": {
                    "copyright": "BSD",
                    "restrictions": "NaN",
                    "trafficLight": "RED"
                },
                "schemaVersion": "1-0-2",
                "soundFormat": "Mono",
                "source": "from Tooting",
                "status": "Finished",
                "story": "zzivanregression25-9-2020-13:48"
            }
          )
          .expect('Content-Type', /json/)
          .end(function (err, res){
            console.log(res.body);
            expect(res.status).to.equal(202);
            expect(res.body).to.have.property('requestId');
            done();
          });

  });

});
