const axios = require('axios');
const { callPythonAI } = require('./services/pythonService');

async function testConnection() {
    console.log("Testing connection to AI Backend...");
    const resumeText = "Experienced software engineer with skills in React, Node.js, and Python.";
    const jdText = "Looking for a fullstack developer with React and Node.js experience.";
    const role = "fullstack";

    try {
        const result = await callPythonAI(resumeText, jdText, role);
        console.log("Response from AI Backend:");
        console.log(JSON.stringify(result, null, 2));

        if (result && result.overall_score !== undefined) {
            console.log("\nSUCCESS: Connection and analysis successful!");
        } else {
            console.log("\nFAILURE: Response format unexpected.");
        }
    } catch (error) {
        console.error("\nERROR: Failed to connect to AI Backend.");
        console.error(error.message);
    }
}

testConnection();
