
const axios = require("axios");

const callPythonAI = async (resumeText, jdText, role) => {
    try {
        const response = await axios.post("http://127.0.0.1:8001/analyze", {
            resume_text: resumeText,
            jd_text: jdText,
            role: role || null
        })
        return response.data;
    } catch (error) {
        console.log("Error calling Python AI:", error.message);
        throw error;
    }
}
module.exports = { callPythonAI }; 