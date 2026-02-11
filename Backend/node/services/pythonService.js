
const axios = require("axios");

const callPythonAI = async (resumeText, jdText, role) => {
    try {
        const response = await axios.post("", {
            resumeText,
            jdText,
            role
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
module.exports = { callPythonAI }; 