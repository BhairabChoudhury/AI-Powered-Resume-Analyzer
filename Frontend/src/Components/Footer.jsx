import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'; // import icon from react-icons/fa  

const Footer = () => {
    return (
        <footer className='bg-gray-900 text-gray-300 py-16 font-sans'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>

                    {/* Brand Section */}
                    <div className='space-y-4 mr-20'>
                        <h2 className='text-3xl font-bold text-white tracking-tight flex items-center gap-2'>
                            <span className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-lg'>RT</span>
                            Resume Teacher
                        </h2>
                        <p className='text-gray-400 text-sm leading-relaxed'>
                            Empowering your career journey with AI-driven resume analysis and optimization. Build a resume that stands out.
                        </p>
                        <div className='flex space-x-4 pt-2'>
                            <a href="#" className='text-gray-400 hover:text-white transition-colors duration-200'>
                                <FaTwitter className="h-6 w-6" />
                            </a>
                            <a href="#" className='text-gray-400 hover:text-white transition-colors duration-200'>
                                <FaLinkedin className="h-6 w-6" />
                            </a>
                            <a href="https://github.com/BhairabChoudhury/AI-Powered-Resume-Analyzer" target="_blank" rel="noopener noreferrer" className='text-gray-400 hover:text-white transition-colors duration-200'>
                                <FaGithub className="h-6 w-6" />
                            </a>
                            <a href="#" className='text-gray-400 hover:text-white transition-colors duration-200'>
                                <FaInstagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className='text-lg font-semibold text-white mb-6'>Product</h3>
                        <ul className='space-y-3 text-sm'>
                            <li><Link to="/features" className='hover:text-indigo-400 transition-colors'>Features</Link></li>
                            <li><Link to="/pricing" className='hover:text-indigo-400 transition-colors'>Pricing</Link></li>
                            <li><Link to="/dashboard" className='hover:text-indigo-400 transition-colors'>Analyze Resume</Link></li>
                            <li><Link to="/templates" className='hover:text-indigo-400 transition-colors'>Resume Templates</Link></li>
                        </ul>
                    </div>

                    {/* <div>
                        <h3 className='text-lg font-semibold text-white mb-6'>Company</h3>
                        <ul className='space-y-3 text-sm'>
                            <li><Link to="/about" className='hover:text-indigo-400 transition-colors'>About Us</Link></li>
                            <li><Link to="/careers" className='hover:text-indigo-400 transition-colors'>Careers</Link></li>
                            <li><Link to="/blog" className='hover:text-indigo-400 transition-colors'>Blog</Link></li>
                            <li><Link to="/contact" className='hover:text-indigo-400 transition-colors'>Contact</Link></li>
                        </ul>
                    </div>  */}

                    {/* Newsletter */}
                    <div>
                        <h3 className='text-lg font-semibold text-white mb-6'>Stay Updated</h3>
                        <p className='text-gray-400 text-sm mb-4'>Subscribe to our newsletter for the latest career tips and updates.</p>
                        <form className='flex flex-col space-y-2'>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500'
                            />
                            <button className='w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200'>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className='border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500'>
                    <p>&copy; {new Date().getFullYear()} Resume Teacher. All rights reserved.</p>
                    <div className='flex space-x-6 mt-4 md:mt-0'>
                        <Link to="/privacy" className='hover:text-white transition-colors'>Privacy Policy</Link>
                        <Link to="/terms" className='hover:text-white transition-colors'>Terms of Service</Link>
                        <Link to="/cookies" className='hover:text-white transition-colors'>Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 