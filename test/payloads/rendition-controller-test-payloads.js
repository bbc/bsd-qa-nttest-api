var dateTime = new Date();
var eventDate = dateTime.toISOString().split('Z')[0];
var deletionDateRaw = new Date();
var deletionDate = deletionDateRaw.setDate(dateTime.getDate() + 1);

const common = '../../lib/common';
const { siteId, trTestRunCases } = require(common);

module.exports = {
    payloads: [{
        "pictureFormat": "16x9",
        "soundFormat": "Mono",
        "audioTracks": [
            {
                "codec": "pcm_s24le",
                "duration": {
                    "frameCount": 533760,
                    "frameRate": {
                        "denominator": 1,
                        "numerator": 48000
                    }
                },
                "bitDepth": 24,
                "channels": 1
            },
            {
                "codec": "pcm_s24le",
                "duration": {
                    "frameCount": 533760,
                    "frameRate": {
                        "denominator": 1,
                        "numerator": 48000
                    }
                },
                "bitDepth": 24,
                "channels": 1
            },
            {
                "codec": "pcm_s24le",
                "duration": {
                    "frameCount": 533760,
                    "frameRate": {
                        "denominator": 1,
                        "numerator": 48000
                    }
                },
                "bitDepth": 24,
                "channels": 1
            },
            {
                "codec": "pcm_s24le",
                "duration": {
                    "frameCount": 533760,
                    "frameRate": {
                        "denominator": 1,
                        "numerator": 48000
                    }
                },
                "bitDepth": 24,
                "channels": 1
            },
            {
                "codec": "pcm_s24le",
                "duration": {
                    "frameCount": 533760,
                    "frameRate": {
                        "denominator": 1,
                        "numerator": 48000
                    }
                },
                "bitDepth": 24,
                "channels": 1
            },
            {
                "codec": "pcm_s24le",
                "duration": {
                    "frameCount": 533760,
                    "frameRate": {
                        "denominator": 1,
                        "numerator": 48000
                    }
                },
                "bitDepth": 24,
                "channels": 1
            },
            {
                "codec": "pcm_s24le",
                "duration": {
                    "frameCount": 533760,
                    "frameRate": {
                        "denominator": 1,
                        "numerator": 48000
                    }
                },
                "bitDepth": 24,
                "channels": 1
            },
            {
                "codec": "pcm_s24le",
                "duration": {
                    "frameCount": 533760,
                    "frameRate": {
                        "denominator": 1,
                        "numerator": 48000
                    }
                },
                "bitDepth": 24,
                "channels": 1
            }
        ],
        "creator": "God",
        "creationDate": eventDate + "Z",
        "firstFrameTimecode": "15:47:18:21",
        "interlacedTopFirst": false,
        "labels": [
            "offline"
        ],
        "location": {
            "storeName": siteId + ".diva_qa",
            "path": siteId + ".3754#FX0064.mov"
        },
        "mimeType": "video/mp4",
        "schemaVersion": "1-0-0",
        "videoTracks": [
            {
                "codec": "h264",
                "displayHeight": 2160,
                "displayWidth": 3840,
                "duration": {
                    "frameCount": 278,
                    "frameRate": {
                        "denominator": 1,
                        "numerator": 25
                    }
                },
                "pixelHeight": 2160,
                "pixelWidth": 3840
            }
        ]
    },
    {
        "deletionDate": "2021-03-07T21:01:37.220Z"
    }]
}