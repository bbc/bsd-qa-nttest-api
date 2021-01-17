const suiteId = 6923;
module.exports = {
    "mediaItemNTTests": {
        "description": "Mediaitem endpoints",
        "mediaItemUnderTest" : 4198,
        "testSuiteId": suiteId,
        "tests": [{
            "testName": "It should be possible to Create a mediaItem",
            "id": 1184293
        },
        {
            "testName": "It should be able to return body of a mediaitem",
            "id": 1184294
        },
        {
            "testName": "It should be possible to edit the metadata of an item",
            "id": 1184295
        }]
    },
    "attachmentNTTests": {
        "description": "Attachment endpoints",
        "mediaItemUnderTest" : 5791,
        "testSuiteId": suiteId,
        "tests": [{
            "testName": "It should be able to create an attachment for a media item",
            "id": 1184488
        },
        {
            "testName": "It should be able to delete an attachment for a media item",
            "id": 1184489
        }]
    }
}