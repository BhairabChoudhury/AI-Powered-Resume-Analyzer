import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import heroImage from '../assets/Match-rate@2x-3-1.png'
import { useNavigate } from 'react-router-dom'
import { FaRobot, FaFileAlt, FaCheckCircle, FaStar, FaArrowRight, FaMagic } from 'react-icons/fa'

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard')
    } else {
      navigate('/signup')
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-blue-500">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                <FaStar className="text-yellow-500" />
                <span>#1 AI Resume Analyzer</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 mb-6">
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Boost Your Resume with AI Powered ATS Analysis</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Don't let automated systems reject your application. Our AI-powered tool scans, scores, and optimizes your resume to help you land your dream job faster.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={handleGetStarted}
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  Get Started Free <FaArrowRight />
                </button>
               
              </div>

              <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> Free Analysis
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> No Credit Card
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> Instant Results
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:w-1/2 relative perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full filter blur-3xl opacity-60 -z-10 transform scale-110"></div>
              <img
                src={heroImage}
                alt="AI Resume Analysis Preview"
                className="w-full h-auto rounded-2xl shadow-2xl border border-gray-100 transform rotate-y-6 hover:rotate-y-0 transition-transform duration-500"
              />
              {/* Floating Cards (Decorative) */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-bounce-slow hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <FaCheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">ATS Score</p>
                    <p className="text-lg font-bold text-gray-900">92/100</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Our AI Analyzer?</h2>
            <p className="text-gray-600 text-lg">We define the standard for resume optimization. Here's how we help you stand out from the crowd.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300 border border-transparent hover:border-blue-100 group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaRobot />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-600">Our advanced algorithms scan your resume against thousands of job descriptions to identify gaps and opportunities.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-indigo-50 transition-colors duration-300 border border-transparent hover:border-indigo-100 group">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaFileAlt />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ATS Compatibility</h3>
              <p className="text-gray-600">Ensure your resume is readable by Applicant Tracking Systems. We fix formatting errors that get you rejected.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-purple-50 transition-colors duration-300 border border-transparent hover:border-purple-100 group">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaMagic />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Suggestions</h3>
              <p className="text-gray-600">Get actionable, line-by-line feedback on how to improve your bullet points to show impact and results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">Three simple steps to a better resume.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-700 -z-10"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full border-4 border-gray-900 flex items-center justify-center text-3xl font-bold text-blue-400 mb-6 shadow-xl">1</div>
              <h3 className="text-xl font-bold mb-2">Upload Resume</h3>
              <p className="text-gray-400">Upload your PDF or DOCX resume to our secure platform.</p>
            </div>

            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full border-4 border-gray-900 flex items-center justify-center text-3xl font-bold text-indigo-400 mb-6 shadow-xl">2</div>
              <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
              <p className="text-gray-400">Our engine scans for keywords, formatting, and content quality.</p>
            </div>

            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full border-4 border-gray-900 flex items-center justify-center text-3xl font-bold text-green-400 mb-6 shadow-xl">3</div>
              <h3 className="text-xl font-bold mb-2">Get Results</h3>
              <p className="text-gray-400">Receive a detailed score and step-by-step optimization guide.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Join thousands of job seekers who have optimized their resumes and secured more interviews.</p>
          <button
            onClick={handleGetStarted}
            className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-2xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
          >
            Analyze My Resume Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home