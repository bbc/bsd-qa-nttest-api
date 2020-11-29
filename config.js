module.exports = {
    "baseUrl": process.env.BASEURL,   
    "nodeTLSRejectUnauth": process.env.NODE_TLS_REJECT_UNAUTHORIZED,
    "junitReportPath": process.env.JUNIT_REPORT_PATH,
    "junitReportStack": process.env.JUNIT_REPORT_STACK,
    "apiAuth": {
        "Content-Type": "application/json",
        "Authorization": process.env.TOKEN
    }
}