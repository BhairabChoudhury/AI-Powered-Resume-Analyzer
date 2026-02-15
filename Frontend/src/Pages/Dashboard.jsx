import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { FaCloudUploadAlt, FaBriefcase, FaFileAlt, FaMagic, FaCheckCircle, FaSpinner } from 'react-icons/fa'

const Dashboard = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [role, setRole] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === "application/pdf") {
            setFile(droppedFile);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file || !jobDescription) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert("Analysis feature coming soon!");
        }, 2000);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans text-gray-900">
            <Navbar />

            <main className="flex-grow container mx-auto  px-4 py-8 lg:py-12">

                {/* Header Section */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
                        Analyze Your Resume with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI Precision</span>
                    </h1>
                    <p className="text-lg text-gray-600">
                        Upload your resume and the job description to get a detailed ATS score, keyword gap analysis, and personalized improvement tips.
                    </p>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-6xl mx-auto border border-gray-100">
                    <div className="flex flex-col lg:flex-row">

                        {/* Left Sidebar - Information */}
                        <div className="lg:w-1/3 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 lg:p-12 flex flex-col justify-between">
                            <div>
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-blue-600 rounded-2xl shadow-sm mb-8 text-3xl">
                                    <FaMagic />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Analysis Includes:</h2>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">ATS Compatibility Score (0-100)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">Missing Keywords & Skills Gap</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">Formatting & Layout Check</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">Actionable Improvement Tips</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Content - Form */}
                        <div className="lg:w-2/3 p-8 lg:p-12">
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* File Upload Area */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Upload Resume (PDF only) <span className="text-red-500">*</span>
                                    </label>
                                    <div
                                        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer group
                                            ${isDragging
                                                ? 'border-blue-500 bg-blue-50 scale-[1.02]'
                                                : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
                                            }
                                            ${file ? 'bg-green-50 border-green-200' : ''}
                                        `}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={() => document.getElementById('resume-upload').click()}
                                    >
                                        <input
                                            id="resume-upload"
                                            type="file"
                                            accept=".pdf"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />

                                        {file ? (
                                            <div className="flex flex-col items-center animate-fadeIn">
                                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-3 shadow-sm">
                                                    <FaCheckCircle />
                                                </div>
                                                <p className="text-lg font-semibold text-gray-900">{file.name}</p>
                                                <p className="text-sm text-green-600">Ready for analysis</p>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                                    className="mt-3 text-xs text-red-500 hover:text-red-700 font-medium hover:underline"
                                                >
                                                    Remove file
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                                    <FaCloudUploadAlt />
                                                </div>
                                                <p className="text-lg font-semibold text-gray-700">Click to upload or drag & drop</p>
                                                <p className="text-sm text-gray-500 mt-1">PDF format (Max 5MB)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Target Role */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <FaBriefcase className="text-gray-400" /> Target Role(Optional)
                                        </label>
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        > 
                                            <option value={""}>Select a role</option>
                                            <option value="frontend">Frontend Developer</option>
                                            <option value="backend">Backend Developer</option>
                                            <option value="fullstack">Fullstack Developer</option>
                                            <option value="datascience">Data Scientist</option>
                                            <option value="product">Product Manager</option>
                                            <option value="design">UI/UX Designer</option>
                                        </select>
                                    </div>

                                    {/* Job Description Placeholder for Alignment */}
                                    <div className="hidden md:block"></div>
                                </div>

                                {/* Job Description */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <FaFileAlt className="text-gray-400" /> Job Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        rows="6"
                                        placeholder="Paste the job description here. Our AI will compare your resume against these requirements..."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading || !file || !jobDescription}
                                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300 transform
                                        ${loading || !file || !jobDescription
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/30 hover:-translate-y-1 cursor-pointer'
                                        }
                                    `}
                                >
                                    {loading ? (
                                        <>
                                            <FaSpinner className="animate-spin" /> Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            Analyze Resume <FaMagic />
                                        </>
                                    )}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Dashboard