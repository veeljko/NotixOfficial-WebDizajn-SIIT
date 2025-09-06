import React, {useEffect, useState} from "react";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../firebaseConfig.js";
import Confirm from "./Confirm.jsx";
import KnjizaraEditKnjige from "./KnjizaraEditKnjige.jsx";


function AdminKnjizaraCard({knjizare, knjizara, setKnjizara, setEditable, setIsKnjigaEditable, isKnjigaEditable}) {
    const id = knjizare.id;

    
    const handleEdit = (k) => {
        setKnjizara((prev) => ({
            ...prev,
            ...k, 
            id: k.id, 
        }));
        setEditable(prev => (!prev));
    };

    const [confirmOpen, setConfirmOpen] = useState(false);

    async function deleteKnjizara(knjizaraId) {
        try {
            await deleteDoc(doc(db, "knjizare", knjizaraId));
            console.log("Knjizara deleted successfully!");
        } catch (error) {
            console.error("Error deleting knjizara:", error);
        }
    }

    const handleConfirm = () => {
        setConfirmOpen(false);
        
        deleteKnjizara(knjizara.id);
    };

    const handleCancel = () => {
        setKnjizara(null);
        setConfirmOpen(false);
    };

    const handleDeleteKnjizara = (knjizara) => {
        setKnjizara((prev) => ({ ...prev, ...knjizara}));
        setConfirmOpen(true);
    }

    return (
        <div className="p-6 ">

            {/* Display Knjizare */}
            {knjizare.map((k) => (
                <div
                    key={k.id}
                    className=" border p-3 rounded-lg shadow-md bg-white mb-5 flex flex-col md:flex-row md:items-center gap-5 hover:shadow-2xl transition-shadow duration-300"
                >
                    <div className="flex md:flex-row flex-col md:items-center gap-y-5 md:gap-x-5">
                        <div className="flex justify-center px-2 sm:px-0">
                            <img src={k.logo} className=" sm:max-w-[250px] sm:max-h-[250px] sm:min-h-[150px] sm:min-w-[150px] object-contain rounded-lg shadow-md"></img>
                        </div>
                        <div className="flex flex-col md:items-stretch items-center text-center sm:text-justify lg:w-max">
                            <h2 className="text-xl font-bold mb-2">{k.naziv}</h2>
                            <p className="text-gray-600">{k.adresa}</p>
                            <p className="text-gray-600">{k.kontaktTelefon}</p>
                            <p className="text-gray-600">{k.email}</p>
                            <p className="text-gray-600">Godina osnivanja: {k.godinaOsnivanja}.</p>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end w-full ">
                        <div className="flex flex-row md:flex-col gap-x-2 md:gap-y-2 flex-wrap justify-center">
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 md:max-w-[120px]"
                                onClick={() => handleEdit(k)}
                            >
                                Izmeni
                            </button>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 md:max-w-[120px]"
                                onClick={() => handleDeleteKnjizara(k)}
                            >
                                Izbrisi
                            </button>
                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 md:max-w-[120px]"
                                onClick={() => {
                                    setIsKnjigaEditable(prev => !prev);
                                    setKnjizara((prev) => ({ ...prev, ...k}));
                                }
                            }
                            >
                                Dodaj knjigu
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <Confirm
                isOpen={confirmOpen}
                title="Potvrda brisanja"
                message={`Da li ste sigurni da želite da obrišete knjizaru ${knjizara == null ? "" : knjizara.naziv}`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

        </div>
    );
}

export default AdminKnjizaraCard;