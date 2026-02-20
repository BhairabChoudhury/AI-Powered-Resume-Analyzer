const Analysis = require("../Models/AnalysisModel");
const { callPythonAI } = require("../services/pythonService.js");
const pdfParse = require("pdf-parse");

const analyzeResume = async (req, res) => {
  try {
    const userId = req.userId // from auth middleware
    const jdText = req.body.jd;// jd means Job Description 
    const role = req.body.role; // specific role   
    const file = req.file; // PDF file 

    // extract text from PDF
    const pdfData = await pdfParse(file.buffer);
    const resumeText = pdfData.text;

    // call Python AI
    const aiResult = await callPythonAI(resumeText, jdText, role);

    // map AI result to Analysis model keys
    const analysisData = {
      userId,
      role: aiResult.role,
      atsScore: aiResult.overall_score,
      score_breakdown: aiResult.score_breakdown,
      techstack_coverage: aiResult.techstack_coverage,
      matchedSkills: aiResult.matched_skills,
      missingSkills: aiResult.missing_skills,
      strengths: aiResult.strengths,
      weaknesses: aiResult.weaknesses,
      recommendations: aiResult.recommendations
    };

    // save analysis
    const saved = await Analysis.create(analysisData);

    res.json(saved);
  } catch (err) {
    console.error("Analysis controller error:", err);
    res.status(500).json({ error: "Analysis failed", details: err.message });
  }
};

module.exports = { analyzeResume };
