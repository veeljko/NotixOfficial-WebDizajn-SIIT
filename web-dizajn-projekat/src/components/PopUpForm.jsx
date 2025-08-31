import React, { useState } from "react";

const Popup = () => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
            <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-center mb-4">
                    {isRegister ? "Register" : "Login"}
                </h2>

                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                    />
                    {isRegister && (
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                        />
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        {isRegister ? "Register" : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-blue-600 hover:underline"
                    >
                        {isRegister ? "Login" : "Register"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Popup;
