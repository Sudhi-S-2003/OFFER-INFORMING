import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ token, userType, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <header className="w-full bg-gray-700 text-white py-6 sticky top-0 z-30 shadow-lg">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-2xl font-extrabold">
                    <Link to="/" className="hover:text-gray-300">
                        Offer Informing App
                    </Link>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/offers" className="hover:text-gray-300">Offers</Link>
                        </li>
                        {token ? (
                            <>
                                {userType === 'business' && (
                                    <li>
                                        <Link to="/Auth/Business" className="hover:text-gray-300">Business</Link>
                                    </li>
                                )}
                                {userType === 'customer' && (
                                    <li>
                                        <Link to="/Auth/Customers" className="hover:text-gray-300">Customers</Link>
                                    </li>
                                )}
                                 <li>
                                    <button
                                        onClick={onLogout}
                                        className="hover:text-gray-300 focus:outline-none"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                               <li className="relative">
                            <button 
                                onClick={toggleDropdown} 
                                className="hover:text-gray-300 focus:outline-none"
                                aria-expanded={isOpen}
                                aria-controls="register-dropdown"
                            >
                                Register
                            </button>
                            {isOpen && (
                                <ul 
                                    id="register-dropdown" 
                                    className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg"
                                >
                                    <li>
                                        <Link 
                                            to="/register/customer" 
                                            className="block px-4 py-2 hover:bg-gray-700"
                                            onClick={() => setIsOpen(false)}
                                        >
                                           Customer
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/register/business" 
                                            className="block px-4 py-2 hover:bg-gray-700"
                                            onClick={() => setIsOpen(false)}
                                        >
                                             Business
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                                <li>
                                    <Link to="/login" className="hover:text-gray-300">Login</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to="/polls" className="hover:text-gray-300">Polls</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
