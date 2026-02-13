import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 relative">
                    {/* 1. Logo (Left) */}
                    <div className="flex-shrink-0 cursor-pointer flex items-center gap-2">
        
                        <h1 className='text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight'>
                            Resume Teacher 
                        </h1>
                    </div>

                    {/* 2. Navigation Links (Center) */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium text-lg transition-colors duration-200 relative group">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium text-lg transition-colors duration-200 relative group">
                            Dashboard
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* 3. Auth Buttons (Right) */}
                    <div className="flex items-center gap-4">
                        <Link to="/signin" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-50">
                            Log in
                        </Link>
                        <Link to="/signup" className="bg-gray-900 text-white hover:bg-black px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;