const Analysis = require("../Models/AnalysisModel") ;
const { callPythonAI } = require("../services/pythonService.js") ;
const pdfParse = require("pdf-parse") ;

const analyzeResume = async (req, res) => {
  try {
    const userId = req.userId // from auth middleware
    const jdText = req.body.jd;// jd means Job Description 
    const  role = req.body.role ; // specific role   
    const file = req.file ; // PDF file 

    // extract text from PDF
    const pdfData = await pdfParse(file.buffer);
    const resumeText = pdfData.text;

    // call Python AI
    const aiResult = await callPythonAI(resumeText, jdText,role);

    // save analysis
    const saved = await Analysis.create({
          userId,
      ...aiResult
    });

    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Analysis failed" });
  }
};

module.exports = {analyzeResume} ;
