'use client';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import Image from 'next/image';
import logo from '../../public/assets/8848_logo.jpg'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-black shadow-lg">
            <div className="max-w-6xl mx-auto px-2">
                <div className="flex justify-between items-center h-16">
                    <Image src={logo} alt="Logo" width={64} height={64} />

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="px-4 py-2 text-white-700 hover:text-gray-900 rounded-md hover:bg-gray-100 flex items-center">
                            <AiOutlineUser className="mr-2" />
                            Login
                        </button>
                        <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center">
                            <AiOutlineUser className="mr-2" />
                            Register
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        >
                            {isOpen ? (
                                <FaTimes className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <button className="block w-full text-left px-4 py-2 text-white-100 hover:text-white-900 rounded-md hover:bg-white-100 flex items-center">
                                <AiOutlineUser className="mr-2" />
                                Login
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center">
                                <AiOutlineUser className="mr-2" />
                                Register
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;