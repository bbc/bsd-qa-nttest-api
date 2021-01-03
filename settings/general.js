module.exports = {
    "TLS":{
        "nodeTLSRejectUnauth": process.env.NODE_TLS_REJECT_UNAUTHORIZED
    },
    "testFrameworks":{
        "junitReportPath": process.env.JUNIT_REPORT_PATH,
        "junitReportStack": process.env.JUNIT_REPORT_STACK
    }
}