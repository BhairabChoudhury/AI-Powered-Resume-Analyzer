const Analysis = require("../Models/AnalysisModel");
const { callPythonAI } = require("../services/pythonService.js");
const { PDFParse } = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const analyzeResume = async (req, res) => {
  try {
    const userId = req.userId;
    const jdText = req.body.jobDescription;
    const role = req.body.role;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No resume file uploaded" });
    }

    if (!jdText) {
      return res.status(400).json({ error: "Job description is required" });
    }

    // Extract PDF text
    const parser = new PDFParse({ data: file.buffer });
    const pdfData = await parser.getText();
    const resumeText = pdfData.text;
    await parser.destroy();

    // Call AI
    const aiResult = await callPythonAI(resumeText, jdText, role);

    // Save to DB
    const saved = await Analysis.create({
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
    });

    res.json(saved);

  } catch (err) {
    console.error("Analysis controller error:", err);
    res.status(500).json({ error: "Analysis failed", details: err.message });
  }
};

module.exports = { analyzeResume };