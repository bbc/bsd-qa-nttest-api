module.exports = {
    "baseUrl": process.env.BASEURL, 
    "keyframeServer": process.env.KEYFRAME_SERVER,
    "apiAuth": {
        "Content-Type": "application/json",
        "Authorization": process.env.TOKEN
    }
}