import React from 'react';
import ScoreChart from './ScoreChart';
import { FaCheckCircle, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';

const ResultSection = ({ data }) => {
    if (!data) {
        return null;
    }

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

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-6 animate-fadeIn">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Analysis Report</h2>
                    <p className="text-gray-500 mt-1">
                        Target Role: <span className="font-semibold text-blue-600">{role || 'Not specified'}</span>
                    </p>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Breakdown & Skills */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Detailed Breakdown */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Detailed Breakdown</h3>
                        <div className="space-y-4">
                            <ScoreBar label="Skills Match" score={skills_match} />
                            <ScoreBar label="Experience Match" score={experience_match} />
                            <ScoreBar label="Education Match" score={education_match} />
                        </div>
                    </div>

                    {/* Value Proposition / Skills Analysis */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Skills Analysis</h3>

                        <div className="mb-6">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                <FaCheckCircle className="text-green-500" /> Matched Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {matchedSkills.length > 0 ? (
                                    matchedSkills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-100">
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
                                        <span key={index} className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full border border-red-100">
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

                {/* Right Column: Chart & Recommendations */}
                <div className="space-y-6">
                    {/* Chart */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-gray-800">Visual Analysis</h3>
                        </div>
                        <div className="p-4">
                            <ScoreChart data={chartData} />
                        </div>
                    </div>
                       
    {/* Strengths & Weaknesses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                                <FaCheckCircle className="text-green-500" /> Strengths
                            </h3>
                            <ul className="space-y-3">
                                {strengths.length > 0 ? (
                                    strengths.map((item, index) => (
                                        <li key={index} className="flex gap-2 text-sm text-gray-600">
                                            <span className="text-green-500 font-bold">✓</span>
                                            {item}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-400 text-sm italic">No specific strengths identified.</li>
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
                                        <span className="text-blue-500 font-bold">•</span>
                                        {rec}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-400 text-sm italic">No specific recommendations.</li>
                            )}
                        </ul>
                    </div>

                

                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                                <FaExclamationTriangle className="text-red-500" /> Weaknesses
                            </h3>
                            <ul className="space-y-3">
                                {weaknesses.length > 0 ? (
                                    weaknesses.map((item, index) => (
                                        <li key={index} className="flex gap-2 text-sm text-gray-600">
                                            <span className="text-red-500 font-bold">!</span>
                                            {item}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-400 text-sm italic">No specific weaknesses identified.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Component for Progress Bars
const ScoreBar = ({ label, score }) => (
    <div>
        <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">{label}</span>
            <span className="font-bold text-gray-900">{score}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
                className={`h-2.5 rounded-full transition-all duration-500 ${score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-yellow-400' : 'bg-red-500'}`}
                style={{ width: `${score}%` }}
            ></div>
        </div>
    </div>
);

export default ResultSection;