const common = '../../lib/common';
const { siteId, trTestRunCases } = require(common);
var ItemUnderTestId = trTestRunCases.attachmentNTTests.mediaItemUnderTest;

module.exports = {
    payloads:[{
        "location": {
            "storeName": siteId + ".att01",
            "path": ItemUnderTestId + "-original_metadata.xml"
        },
        "mimeType": "application/xml",
        "schemaVersion": "1-0-0",
        "type": "Original metadata"
    }]
}