const Analysis = require("../Models/AnalysisModel");
const { callPythonAI } = require("../services/pythonService.js");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const logDebug = (message) => {
  const logPath = path.join(__dirname, "../debug.log");
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`);
}

const analyzeResume = async (req, res) => {
  try {
    logDebug("Analysis request started");
    const userId = req.userId
    const jdText = req.body.jobDescription;
    const role = req.body.role;
    const file = req.file;
 console.log("Analysis request received for user:", userId);
 console.log("Role:", role);
 console.log("JD length:", jdText?.length || 0); 
    if (!file) {
      logDebug("Error: No file uploaded");
      return res.status(400).json({ error: "No resume file uploaded" });
    }

    if (!jdText) {
      logDebug("Error: No job description provided");
      return res.status(400).json({ error: "Job description is required" });
    }

    logDebug(`User ID: ${userId}, Role: ${role}, JD Length: ${jdText.length}`);

    // extract text from PDF
    logDebug("Extracting text from PDF...");
    let resumeText = "";
    try {
      const pdfData = await pdfParse(file.buffer);
      resumeText = pdfData.text;
      logDebug(`Extracted text length: ${resumeText.length}`);
    } catch (pdfErr) {
      logDebug(`PDF parsing failed: ${pdfErr.message}`);
      throw new Error(`Failed to parse PDF: ${pdfErr.message}`);
    }

    // call Python AI
    logDebug("Calling AI service...");
    let aiResult;
    try {
      aiResult = await callPythonAI(resumeText, jdText, role);
      logDebug("AI service responded successfully");
    } catch (aiErr) {
      logDebug(`AI service call failed: ${aiErr.message}`);
      throw aiErr;
    }

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
    logDebug("Saving analysis to database...");
    let saved;
    try {
      saved = await Analysis.create(analysisData);
      logDebug("Analysis saved to database");
    } catch (dbErr) {
      logDebug(`Database save failed: ${dbErr.message}`);
      throw dbErr;
    }

    res.json(saved);
  } catch (err) {
    console.log("Analysis controller error:", err); 

    console.error("Analysis controller error:", err);
    res.status(500).json({ error: "Analysis failed", details: err.message });
  }
};

module.exports = { analyzeResume };
