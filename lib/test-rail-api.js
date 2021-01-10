const common = '../lib/common';
const { testrail } = require(common);

var resultStatus = 3;
var resultComment = '';
var testRunCaseId = '';

const updateResultVars = (res, comment) => {
  resultStatus = res;
  resultComment = comment;
}

const testGetTestcase = async tc => {
    try {
        const testCase = await testrail.getCase(tc);
        console.log('testcase: ', testCase);
    }catch(e){
        console.log("e: " + e);
    }
}

const updateTestCase = async (runID, caseID, statusID, comment = '') => {
    try {
        const result = await testrail.addResultForCase (runID, caseID, statusID, comment);
        console.log('result: ', result);
    } catch(e) {
        console.log("e: " + e);
    }
}

module.exports = {
    testGetTestcase: testGetTestcase,
    updateTestCase: updateTestCase
}
