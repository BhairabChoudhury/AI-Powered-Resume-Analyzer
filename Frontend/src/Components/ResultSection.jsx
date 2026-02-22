import ScoreChart from './ScoreChart';
import { FaCheckCircle, FaExclamationTriangle, FaLightbulb, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';

const ResultSection = ({ data }) => {
    if (!data) {
        return null;
    }

    const [isDownloading, setIsDownloading] = useState(false);

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

    // Data for the chart
    const chartData = [
        { name: 'Skills', score: skills_match },
        { name: 'Experience', score: experience_match },
        { name: 'Education', score: education_match },
        { name: 'Overall', score: atsScore },
    ];

    const downloadPDF = async () => {
        try {
            setIsDownloading(true);
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8000/api/match/export',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    responseType: 'blob'
                }
            );

            // Create a link to download the PDF
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Resume_Analysis_${Date.now()}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading PDF:', error);
            alert('Failed to download PDF. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-6 animate-fadeIn">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Analysis Report</h2>
                    <p className="text-gray-500 mt-1">
                        Target Role: <span className="font-semibold text-blue-600">{role || 'Not specified'}</span>
                    </p>
                    <button
                        onClick={downloadPDF}
                        disabled={isDownloading}
                        className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95 ${isDownloading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        <FaDownload className={isDownloading ? 'animate-bounce' : ''} />
                        {isDownloading ? 'Generating PDF...' : 'Download Report'}
                    </button>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm text-gray-500 uppercase tracking-wide">ATS Score</p>
                        <p className={`text-4xl font-extrabold ${atsScore >= 70 ? 'text-green-500' : atsScore >= 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {atsScore}%
                        </p>
                    </div>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${atsScore >= 70 ? 'border-green-100 bg-green-50 text-green-500' : atsScore >= 40 ? 'border-yellow-100 bg-yellow-50 text-yellow-500' : 'border-red-100 bg-red-50 text-red-500'}`}>
                        <span className="text-xl font-bold">{atsScore}</span>
                    </div>
                </div>
            </div>

            {/* 1. Score Breakdown (Now at top) */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Detailed Score Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center transform hover:scale-105 transition-transform">
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Skills</p>
                        <p className="text-2xl font-black text-blue-800">{skills_match}%</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center transform hover:scale-105 transition-transform">
                        <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">Experience</p>
                        <p className="text-2xl font-black text-green-800">{experience_match}%</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-center transform hover:scale-105 transition-transform">
                        <p className="text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">Education</p>
                        <p className="text-2xl font-black text-purple-800">{education_match}%</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-center transform hover:scale-105 transition-transform">
                        <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mb-1">Overall ATS</p>
                        <p className="text-2xl font-black text-amber-800">{atsScore}%</p>
                    </div>
                </div>
            </div>

            {/* 2. Main Grid: Detailed Match Analysis on Left (Wider), Visual on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Keywords/Match Analysis (Wider - lg:col-span-2) */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-full">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Detailed Match Analysis</h3>

                        <div className="mb-6">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                <FaCheckCircle className="text-green-500" /> Matched Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {matchedSkills.length > 0 ? (
                                    matchedSkills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400 text-sm italic">No specific skills matched.</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                <FaExclamationTriangle className="text-amber-500" /> Missing Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {missingSkills.length > 0 ? (
                                    missingSkills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full border border-red-100">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400 text-sm italic">Great job! No key skills missing.</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Analysis (Narrower - lg:col-span-1) */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 text-center">
                            <h3 className="font-bold text-gray-800">Visual Summary</h3>
                        </div>
                        <div className="flex items-center justify-center min-h-[350px]">
                            <ScoreChart data={chartData} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Grid: Insights & Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Strengths */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                        <FaCheckCircle className="text-green-500" /> Strengths
                    </h3>
                    <ul className="space-y-3">
                        {strengths.length > 0 ? (
                            strengths.map((item, index) => (
                                <li key={index} className="flex gap-2 text-sm text-gray-600">
                                    <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400 text-sm italic">No specific strengths identified.</li>
                        )}
                    </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                        <FaExclamationTriangle className="text-red-500" /> Weaknesses
                    </h3>
                    <ul className="space-y-3">
                        {weaknesses.length > 0 ? (
                            weaknesses.map((item, index) => (
                                <li key={index} className="flex gap-2 text-sm text-gray-600">
                                    <span className="text-red-500 font-bold flex-shrink-0">!</span>
                                    <span>{item}</span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400 text-sm italic">No specific weaknesses identified.</li>
                        )}
                    </ul>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                        <FaLightbulb className="text-yellow-400" /> Recommendations
                    </h3>
                    <ul className="space-y-3">
                        {recommendations.length > 0 ? (
                            recommendations.map((rec, index) => (
                                <li key={index} className="flex gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <span className="text-blue-500 font-bold flex-shrink-0">•</span>
                                    <span>{rec}</span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400 text-sm italic">No specific recommendations.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};


export default ResultSection;