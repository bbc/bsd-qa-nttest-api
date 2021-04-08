const common = '../../lib/common';
const { siteId, keyframeServerURL, trTestRunCases } = require(common);
var ItemUnderTestId = trTestRunCases.partNTTests.mediaItemUnderTest;
var dateTime = new Date();

module.exports = {
    payloads:[{
        "creationDate": dateTime,
        "creator": "system",
        "partDetails": {
            "description": "inserted 1",
            "keyframe": {
                "location": {
                    "storeName": siteId + ".key01",
                    "path": ItemUnderTestId + "/keyframe-00000000.jpg"
                },
                "url": keyframeServerURL + "/keyframe/" + ItemUnderTestId + "/keyframe-00000000.jpg"
            },
            "rights": {
                "copyright": "Dakota",
                "trafficLight": "RED",
                "restrictions": "Normal restrictions"
            },
            "schemaVersion": "1-0-0",
            "title": "keyframe-00000000"
        },
        "endFrame": 380,
        "schemaVersion": "1-0-0",
        "startFrame": 379
    },
    {
        "parts": [
          {
            "creationDate": dateTime,
            "creator": "system",
            "endFrame": 0,
            "partDetails": {
              "description": "this is a customized bulk post 1",
              "keyframe": {
                "location": {
                  "storeName": siteId + ".key01",
                  "path": ItemUnderTestId + "/keyframe-00000000.jpg"
                },
                "url": keyframeServerURL + "/keyframe/" + ItemUnderTestId + "/keyframe-00000000.jpg"
              },
              "rights": {
                "copyright": "Chris Ahyow",
                "restrictions": "He has a curfew and needs to be home by 6",
                "trafficLight": "RED"
              },
              "schemaVersion": "1-0-0",
              "title": "keyframe-00000000"
            },
            "schemaVersion": "1-0-0",
            "startFrame": 0
          },
          {
            "creationDate": dateTime,
            "creator": "system",
            "endFrame": 0,
            "partDetails": {
              "description": "this is a customized bulk post 2",
              "keyframe": {
                "location": {
                  "storeName": siteId + ".key01",
                  "path": ItemUnderTestId + "/keyframe-00000000.jpg"
                },
                "url": keyframeServerURL + "/keyframe/" + ItemUnderTestId + "/keyframe-00000000.jpg"
              },
              "rights": {
                "copyright": "Chris Ahyow",
                "restrictions": "He has a curfew and needs to be home by 6",
                "trafficLight": "RED"
              },
              "schemaVersion": "1-0-0",
              "title": "keyframe-00000000"
            },
            "schemaVersion": "1-0-0",
            "startFrame": 0
          },
          {
            "creationDate": dateTime,
            "creator": "system",
            "endFrame": 0,
            "partDetails": {
              "description": "this is a customized bulk post 3",
              "keyframe": {
                "location": {
                  "storeName": siteId + ".key01",
                  "path": ItemUnderTestId + "/keyframe-00000000.jpg"
                },
                "url": keyframeServerURL + "/keyframe/" + ItemUnderTestId + "/keyframe-00000000.jpg"
              },
              "rights": {
                "copyright": "Chris Ahyow",
                "restrictions": "He has a curfew and needs to be home by 6",
                "trafficLight": "RED"
              },
              "schemaVersion": "1-0-0",
              "title": "keyframe-00000000"
            },
            "schemaVersion": "1-0-0",
            "startFrame": 0
          },
          {
            "creationDate": dateTime,
            "creator": "system",
            "endFrame": 0,
            "partDetails": {
              "description": "this is a customized bulk post 4",
              "keyframe": {
                "location": {
                  "storeName": siteId + ".key01",
                  "path": ItemUnderTestId + "/keyframe-00000000.jpg"
                },
                "url": keyframeServerURL + "/keyframe/" + ItemUnderTestId + "/keyframe-00000000.jpg"
              },
              "rights": {
                "copyright": "Chris Ahyow",
                "restrictions": "He has a curfew and needs to be home by 6",
                "trafficLight": "RED"
              },
              "schemaVersion": "1-0-0",
              "title": "keyframe-00000000"
            },
            "schemaVersion": "1-0-0",
            "startFrame": 0
          },
          {
            "creationDate": dateTime,
            "creator": "system",
            "endFrame": 0,
            "partDetails": {
              "description": "this is a customized bulk post 5",
              "keyframe": {
                "location": {
                  "storeName": siteId + ".key01",
                  "path": ItemUnderTestId + "/keyframe-00000000.jpg"
                },
                "url": keyframeServerURL + "/keyframe/" + ItemUnderTestId + "/keyframe-00000000.jpg"
              },
              "rights": {
                "copyright": "Chris Ahyow",
                "restrictions": "He has a curfew and needs to be home by 6",
                "trafficLight": "RED"
              },
              "schemaVersion": "1-0-0",
              "title": "keyframe-00000000"
            },
            "schemaVersion": "1-0-0",
            "startFrame": 0
          }    
        ]
      }]
}