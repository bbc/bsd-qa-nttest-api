const common = '../lib/common';
const { testrail } = require(common);

var resultStatus = 3;
var resultComment = '';

const resetResultVars = () => {
    console.log("resetting testrail vars");
    resultStatus = 3;
    resultComment= '';
}

const updateResultVars = (res, comment) => {
    resultStatus = res;
    resultComment = resultComment + comment;
}

const testGetTestcase = async tc => {
    try {
        const testCase = await testrail.getCase(tc);
        console.log('testcase: ', testCase);
    }catch(e){
        console.log("e: " + e);
    }
}

const updateTestCase = async (runID, caseID) => {   
    try {
         const result = await testrail.addResultForCase (runID, caseID, resultStatus, resultComment);
        console.log('result: ', result);
    } catch(e) {
        console.log("e: " + e);
    }
}

module.exports = {
    testGetTestcase: testGetTestcase,
    resetResultVars: resetResultVars,
    updateResultVars: updateResultVars,
    updateTestCase: updateTestCase
}
