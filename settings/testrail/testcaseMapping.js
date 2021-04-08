const suiteId = 6923;
module.exports = {
    "mediaItemNTTests": {
        "description": "Mediaitem endpoints",
        "mediaItemUnderTest" : 523,
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
        "mediaItemUnderTest" : 530,
        "testSuiteId": suiteId,
        "tests": [{
            "testName": "It should be able to create an attachment for a media item",
            "id": 1184488
        },
        {
            "testName": "It should be able to delete an attachment for a media item",
            "id": 1184489
        }]
    },
    "partNTTests": {
        "description": "Part endpoints",
        "mediaItemUnderTest" : 530,
        "testSuiteId": suiteId,
        "tests": [{
            "testName": "It should be able to create a part for a mediaitem",
            "id": 1184496
        },
        {
            "testName": "It should be able to delete a part for a mediaitem",
            "id": 1184497
        },
        {
            "testName": "It should be able to bulk create a part for a mediaitem",
            "id": 1184498
        }]
    },
    "renditionNTTests": {
        "description": "Rendition endpoints",
        "mediaItemUnderTest" : 530,
        "testSuiteId": suiteId,
        "tests": [{
            "testName": "It should be able to create a rendition for a mediaitem",
            "id": 1184503
        },
        {
            "testName": "It should be able to return a rendition for a mediaitem",
            "id": 1184504
        },
        {
            "testName": "It should be able to amend a rendition for a mediaitem",
            "id": 1184505
        },
        {
            "testName": "It should be able to delete a rendition for a mediaitem",
            "id": 1184506
        }]
    }
}