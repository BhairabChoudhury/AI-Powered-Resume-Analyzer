const { generateAnalysisPDF } = require("../services/pdfService");

/**
 * Controller to handle PDF export request.
 */
const exportToPDF = async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ error: "No analysis data provided" });
        }

        const pdfBuffer = await generateAnalysisPDF(data);

        // Set response headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Resume_Analysis_${Date.now()}.pdf`);
        res.setHeader('Content-Length', pdfBuffer.length);

        res.send(pdfBuffer);

    } catch (err) {
        console.error("PDF Export Error:", err);
        res.status(500).json({ error: "Failed to generate PDF", details: err.message });
    }
};

module.exports = { exportToPDF };
