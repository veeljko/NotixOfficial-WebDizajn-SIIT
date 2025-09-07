import React, { useState } from "react";
import logo from "../assets/logo.svg";
import {Link, useLocation} from "react-router-dom";
import Popup from "./LoginRegister.jsx";
import Confirm from "./Confirm.jsx";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navLinks = [
        { name: "Pocetna", href: "/" },
        { name: "Prijava", href: location.pathname },
        { name: "Admin Nalozi", href: "/accounts" },
        { name: "Admin Knjizara", href: "/adminknjizara" },
    ];

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleConfirm = () => {
        setConfirmOpen(false);
        window.location.reload();
    };

    const handleCancel = () => {
        setConfirmOpen(false);
    };

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md w-full pb-2 pt-2 ">
            <div className="container mx-auto px-4 flex items-center justify-between h-16">
                {/* Logo and Name */}
                <div className="flex items-center space-x-2">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-20 h-20 rounded-full"
                    />
                    <span className="font-bold text-xl text-gray-800">Papir & Mastilo</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        (link.name === "Prijava" ?
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                {user !== null ?
                                    <button className="text-shadow-lg font-medium"
                                    onClick={() => setConfirmOpen(true)}>
                                        {user.korisnickoIme}
                                    </button>
                                    :
                                    <button onClick={() => setIsPopupOpen(true)}> {link.name}</button>
                                }
                            </Link>
                        :
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                {link.name}
                            </Link>
                        )

                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
                        {isOpen ? (
                            
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md flex flex-col items-end pr-5">
                    {navLinks.map((link) => (
                        (link.name === "Prijava" ?
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >

                                    <button onClick={() => setIsPopupOpen(true)}> {link.name}</button>
                                </Link>
                                :
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    {link.name}
                                </Link>
                        )
                    ))}
                </div>
            )}
            <Popup isOpen={isPopupOpen} setUser={setUser} onClose={setIsPopupOpen} />
            <Confirm
                isOpen={confirmOpen}
                title="Potvrda odjave"
                message={`Da li ste sigurni da želite da se odjavite ${user == null ? "" : user.ime}`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </nav>
    );
};

export default Navbar;
