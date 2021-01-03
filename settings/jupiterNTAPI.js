module.exports = {
    "baseUrl": process.env.BASEURL, 
    "apiAuth": {
        "Content-Type": "application/json",
        "Authorization": process.env.TOKEN
    }
}