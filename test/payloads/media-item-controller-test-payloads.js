var dateTime = new Date();
var eventDate = dateTime.toISOString().split('Z')[0];
var randString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

module.exports = {
    payloads: [{
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
      },
      {
        "archiveLogging": {
            "keywords": randString,
            "language": "FR",
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
        "eventDate": eventDate,
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
        "story": "zzivanregression" + eventDate
    }]
}