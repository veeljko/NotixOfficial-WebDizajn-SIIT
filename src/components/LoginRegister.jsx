import React, { useState } from "react";
import {registerValidation} from "../validation/RegisterValidation.js";
import {loginValidation} from "../validation/LoginValidation.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

const Popup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [isRegister, setIsRegister] = useState(false);
    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        passwordPotvrda: "",
        ime: "",
        prezime: "",
        korisnickoIme: "",
        adresa: "",
        date: null,
        telefon: "",
        zanimanje: ""
    });
    const [outputMessage, setOutputMessage] = useState("");

    function handleEmailChange(e) {
        setNewUser(prev => ({ ...prev, email: e.target.value }));
    }
    function handlePasswordChange(e) {
        setNewUser(prev => ({ ...prev, password: e.target.value }));
    }
    function handlePasswordPotvrdaChange(e) {
        setNewUser(prev => ({ ...prev, passwordPotvrda: e.target.value }));
    }
    function handleImeChange(e) {
        setNewUser(prev => ({ ...prev, ime: e.target.value }));
    }
    function handlePrezimeChange(e) {
        setNewUser(prev => ({ ...prev, prezime: e.target.value }));
    }
    function handleKorisnickoImeChange(e) {
        setNewUser(prev => ({ ...prev, korisnickoIme: e.target.value }));
    }
    function handleAdresaChange(e) {
        setNewUser(prev => ({ ...prev, adresa: e.target.value }));
    }
    function handleDateChange(e) {
        setNewUser(prev => ({ ...prev, date: e.target.value }));
    }
    function handleTelefonChange(e) {
        setNewUser(prev => ({ ...prev, telefon: e.target.value }));
    }
    function handleZanimanjeChange(e) {
        setNewUser(prev => ({ ...prev, zanimanje: e.target.value }));
    }

    async function addNewUser() {
        try {
            await addDoc(collection(db, "korisnici"), {
                adresa: newUser.adresa,
                datumRodjenja: newUser.date,
                email: newUser.email,
                ime: newUser.ime,
                korisnickoIme: newUser.korisnickoIme,
                lozinka: newUser.password,
                prezime: newUser.prezime,
                telefon: newUser.telefon,
                zanimanje: newUser.zanimanje
            });
            console.log("User added successfully!");
        } catch (error) {
            console.error("Error adding user:", error);
        }
    }

    function handleSubmit(){
        
        const output = isRegister ? registerValidation(newUser) : loginValidation(newUser);
        
        setOutputMessage(output);
        if (output === "Uspesna registracija"){
            addNewUser();
        }
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50 ">
            <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-center mb-4">
                    {isRegister ? "Registracija" : "Prijava"}
                </h2>

                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                        onChange={(e) => handleEmailChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Lozinka"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                        onChange={(e) => handlePasswordChange(e)}
                    />
                    {isRegister && (<>
                            <input
                                type="password"
                                placeholder="Potvrdi lozinku"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                                onChange={(e) => handlePasswordPotvrdaChange(e)}
                            />
                            <input
                                type="text"
                                placeholder="Ime"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                                onChange={(e) => handleImeChange(e)}
                            />

                            <input
                                type="text"
                                placeholder="Prezime"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                                onChange={(e) => handlePrezimeChange(e)}
                            />

                            <input
                                type="text"
                                placeholder="Korisnicko ime"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                                onChange={(e) => handleKorisnickoImeChange(e)}
                            />

                            <input
                                type="text"
                                placeholder="Adresa"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                                onChange={(e) => handleAdresaChange(e)}
                            />

                            <input
                                type="date"
                                placeholder="Datum rodjenja"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                                onChange={(e) => handleDateChange(e)}
                            />

                            <input
                                type="tel"
                                placeholder="Telefon"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                                onChange={(e) => handleTelefonChange(e)}
                            />

                            <input
                                type="text"
                                placeholder="Zanimanje"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                                onChange={(e) => handleZanimanjeChange(e)}
                            />
                        </>
                    )}
                    {outputMessage !== "" && isRegister && <p className="text-center text-gray-600">{outputMessage}</p>}
                    {outputMessage !== "" && !isRegister && <p className="text-center text-gray-600">{outputMessage}</p>}
                    <button
                        type="button"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        onClick={() => handleSubmit()}
                    >
                        {isRegister ? "Registracija" : "Prijava"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    {isRegister ? "Vec imate nalog?" : "Nemate nalog?"}{" "}
                    <button
                        onClick={() => {
                                setIsRegister(!isRegister);
                                setOutputMessage("");
                                setNewUser((prev) => ({
                                    ...prev,
                                    passwordPotvrda: "",
                                    ime: "",
                                    prezime: "",
                                    korisnickoIme: "",
                                    adresa: "",
                                    date: null,
                                    telefon: "",
                                    zanimanje: ""
                                }))
                            }
                        }
                        className="text-blue-600 hover:underline"
                    >
                        {isRegister ? "Prijava" : "Registracija"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Popup;
