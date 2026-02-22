const puppeteer = require('puppeteer');

/**
 * Generates a PDF buffer from resume analysis data.
 * @param {Object} data - The analysis data object.
 * @returns {Promise<Buffer>} - The generated PDF buffer.
 */
const generateAnalysisPDF = async (data) => {
    const {
        role,
        atsScore,
        score_breakdown = {},
        matchedSkills = [],
        missingSkills = [],
        recommendations = [],
        strengths = [],
        weaknesses = [],
    } = data;

    const {
        skills_match = 0,
        experience_match = 0,
        education_match = 0,
    } = score_breakdown;

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #333;
                line-height: 1.6;
                margin: 0;
                padding: 40px;
                background-color: #fff;
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 2px solid #3b82f6;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .header h1 {
                margin: 0;
                color: #1e40af;
                font-size: 28px;
            }
            .header p {
                margin: 5px 0 0;
                color: #666;
                font-size: 14px;
            }
            .score-container {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            .ats-score-box {
                background: #f0f7ff;
                border: 2px solid #3b82f6;
                border-radius: 12px;
                padding: 15px 25px;
                text-align: center;
            }
            .ats-score-value {
                font-size: 36px;
                font-weight: 800;
                color: #3b82f6;
                display: block;
            }
            .ats-score-label {
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #1e40af;
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-bottom: 30px;
            }
            .card {
                background: #fff;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
            .card h2 {
                margin-top: 0;
                font-size: 18px;
                color: #1f2937;
                border-bottom: 1px solid #f3f4f6;
                padding-bottom: 10px;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .breakdown-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
                margin-bottom: 20px;
            }
            .breakdown-item {
                text-align: center;
                padding: 10px;
                background: #f9fafb;
                border-radius: 8px;
            }
            .breakdown-label {
                font-size: 10px;
                color: #6b7280;
                text-transform: uppercase;
            }
            .breakdown-value {
                font-size: 18px;
                font-weight: 700;
                color: #111827;
            }
            .tag-container {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            .tag {
                padding: 4px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
            }
            .tag-matched { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
            .tag-missing { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
            
            ul {
                padding-left: 20px;
                margin: 0;
            }
            li {
                margin-bottom: 8px;
                font-size: 13px;
            }
            .recommendation-item {
                background: #f8fafc;
                border-left: 4px solid #3b82f6;
                padding: 10px;
                margin-bottom: 10px;
                border-radius: 0 8px 8px 0;
            }
            .page-break {
                page-break-after: always;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div>
                <h1>Resume Analysis Report</h1>
                <p>Target Role: <strong>${role || 'Not specified'}</strong></p>
            </div>
            <div class="score-container">
                <div class="ats-score-box">
                    <span class="ats-score-value">${atsScore}%</span>
                    <span class="ats-score-label">ATS Score</span>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>Score Breakdown</h2>
            <div class="breakdown-grid">
                <div class="breakdown-item">
                    <div class="breakdown-label">Skills Match</div>
                    <div class="breakdown-value">${skills_match}%</div>
                </div>
                <div class="breakdown-item">
                    <div class="breakdown-label">Experience</div>
                    <div class="breakdown-value">${experience_match}%</div>
                </div>
                <div class="breakdown-item">
                    <div class="breakdown-label">Education</div>
                    <div class="breakdown-value">${education_match}%</div>
                </div>
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <h2>Matched Skills</h2>
                <div class="tag-container">
                  ${matchedSkills.map(skill => `<span class="tag tag-matched">${skill}</span>`).join('') || '<span style="color: #9ca3af; font-style: italic;">No specific skills matched.</span>'}
                </div>
            </div>
            <div class="card">
                <h2>Missing Keywords</h2>
                <div class="tag-container">
                    ${missingSkills.map(skill => `<span class="tag tag-missing">${skill}</span>`).join('') || '<span style="color: #9ca3af; font-style: italic;">No key skills missing.</span>'}
                </div>
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <h2>Strengths</h2>
                <ul>
                    ${strengths.map(s => `<li>${s}</li>`).join('') || '<li>No specific strengths identified.</li>'}
                </ul>
            </div>
            <div class="card">
                <h2>Weaknesses</h2>
                <ul>
                    ${weaknesses.map(w =>`<li>${w}</li>`).join('') || '<li>No specific weaknesses identified.</li>'}
                </ul>
            </div>
        </div>

        <div class="card">
            <h2>Recommendations</h2>
            <div>
                ${recommendations.map(r => `<div class="recommendation-item">${r}</div>`).join('') || '<p style="color: #9ca3af; font-style: italic;">No specific recommendations.</p>'}
            </div>
        </div>

        <div style="margin-top: 50px; text-align: center; color: #9ca3af; font-size: 10px; border-top: 1px solid #f3f4f6; padding-top: 20px;">
            Generated by AI Powered Resume Analyzer &copy; ${new Date().getFullYear()}
        </div>
    </body>
    </html>
    `;

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        });
        return pdfBuffer;
    } finally {
        await browser.close();
    }
};

module.exports = { generateAnalysisPDF } ;
