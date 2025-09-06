import React, {useEffect, useState} from "react";
import {doc, getDoc, updateDoc, deleteField, onSnapshot} from "firebase/firestore";
import {db} from "../firebaseConfig.js";
import {knjizaraValidation} from "../validation/KnjizaraValidation.js";
import Confirm from "./Confirm.jsx";

function KnjizaraEditCard({knjizara, setEditable, setKnjizara}) {
    const [knjige, setKnjige] = useState([]);
    const [loading, setLoading] = useState(true);
    const [outputMessage, setOutputMessage] = useState("");
    const id = knjizara.id;

    useEffect(() => {
        if (!id) return;

        // Reference to the Knjizara document
        const knjizaraRef = doc(db, "knjizare", id);

        // Real-time listener for the Knjizara document
        const unsubscribe = onSnapshot(knjizaraRef, async (knjizaraSnap) => {
            if (!knjizaraSnap.exists()) {
                console.log("Knjizara not found");
                setKnjige([]);
                setLoading(false);
                return;
            }

            const knjizaraData = { id: knjizaraSnap.id, ...knjizaraSnap.data() };
            const knjigeField = knjizaraData.knjige;

            if (!knjigeField) {
                console.log("No 'knjige' field yet");
                setKnjige([]);
                setLoading(false);
                return;
            }

            // Reference to the Knjige document
            const knjigeRef = doc(db, "knjige", knjigeField);

            // Real-time listener for Knjige
            const unsubscribeKnjige = onSnapshot(knjigeRef, (knjigeSnap) => {
                if (!knjigeSnap.exists()) {
                    console.log("Knjige not found");
                    setKnjige([]);
                    setLoading(false);
                    return;
                }

                const knjigeList = Object.entries(knjigeSnap.data()).map(([id, data]) => ({
                    id,
                    ...data,
                }));

                setKnjige(knjigeList);
                setLoading(false);
            });

            // Cleanup Knjige listener when Knjizara changes
            return () => unsubscribeKnjige();
        });



        // Cleanup Knjizara listener
        return () => unsubscribe();
    }, [id]);


    const handleOnClose = () => {
        setEditable(prev => !prev);
    }

    async function updateKnjizara(knjizaraId, updatedData) {
        try {
            const knjizaraRef = doc(db, "knjizare", knjizaraId);
            await updateDoc(knjizaraRef, updatedData);
            console.log("Knjizara updated successfully!");
        } catch (error) {
            console.error("Error updating knjizara:", error);
        }
    }

    const handleSubmit = () => {
        // console.log(knjizara);
        const output = knjizaraValidation(knjizara);
        setOutputMessage(output);
        if (output === "Podaci sacuvani!"){
            updateKnjizara(knjizara.id, {
                adresa: knjizara.adresa,
                email: knjizara.email,
                godinaOsnivanja: knjizara.godinaOsnivanja,
                knjige: knjizara.knjige,
                kontaktTelefon: knjizara.kontaktTelefon,
                logo: knjizara.logo,
                naziv: knjizara.naziv
            })

        }
    }

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedKnjiga, setSelectedKnjiga] = useState(null);

    async function removeBook(booksDocId, bookId) {
        try {
            const booksRef = doc(db, "knjige", booksDocId);

            await updateDoc(booksRef, {
                [bookId]: deleteField() // removes this book from the document
            });

            console.log("Book removed:", bookId);
        } catch (error) {
            console.error("Error removing book:", error);
        }
    }

    const handleConfirm = () => {
        setConfirmOpen(false);
        console.log(knjizara.naziv + " " + selectedKnjiga.naziv);
        removeBook(knjizara.knjige, selectedKnjiga.id);
    };

    const handleCancel = () => {
        setSelectedKnjiga(null);
        setConfirmOpen(false);
    };

    const handleDeleteUser = (user) => {
        setSelectedKnjiga((prev) => ({ ...prev, ...user}));
        setConfirmOpen(true);
    }

    return (
        <div className="fixed inset-0 bg-gray-900/80 flex justify-center pt-10 pb-10 overflow-y-auto ">
            <div className="bg-white px-5 pb-3 rounded-lg w-11/12 max-w-md overflow-y-auto h-auto self-start">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold mb-4 pt-5">Izmena informacija o knjizari</h2>
                    <button
                        onClick={() => setEditable(prev => !prev)}
                        className=" text-gray-500 hover:text-gray-800 "
                    >
                        ✕
                    </button>
                </div>
                {/* Form fields */}
                <label htmlFor="ime" className="text-gray-700 font-semibold">Naziv</label>
                <input
                    className="w-full border p-2 mb-2 rounded"
                    placeholder="Naziv"
                    name="ime"
                    value={knjizara.naziv}
                    onChange={(e) =>
                        setKnjizara((prev) => ({ ...prev, naziv: e.target.value }))
                    }
                />
                <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
                <input
                    className="w-full border p-2 mb-2 rounded"
                    placeholder="Email"
                    name="email"
                    value={knjizara.email}
                    onChange={(e) =>
                        setKnjizara((prev) => ({ ...prev, email: e.target.value }))
                    }
                />
                <label htmlFor="adresa" className="text-gray-700 font-semibold">Adresa</label>
                <input
                    className="w-full border p-2 mb-2 rounded"
                    placeholder="Adresa"
                    name="adresa"
                    value={knjizara.adresa}
                    onChange={(e) =>
                        setKnjizara((prev) => ({ ...prev, adresa: e.target.value }))
                    }
                />
                <label htmlFor="godinaOsnovanja" className="text-gray-700 font-semibold">Godina osnivanja</label>
                <input
                    className="w-full border p-2 mb-4 rounded"
                    placeholder="Godina osnivanja"
                    value={knjizara.godinaOsnivanja}
                    name="godinaOsnivanja"
                    onChange={(e) =>
                        setKnjizara((prev) => ({ ...prev, godinaOsnivanja: e.target.value }))
                    }
                />

                {/* Upload button */}
                {outputMessage !== "" && <p className="text-grey-600 text-center py-2">{outputMessage}</p>}
                <div className="flex justify-between py-2">
                    <label
                        htmlFor="logoUpload"
                        className="cursor-pointer bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                        Postavi novi logo
                    </label>
                    <input
                        id="logoUpload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                            setKnjizara((prev) => ({ ...prev, logo: e.target.value }))
                        }
                    />
                    <button
                        className="border py-1 px-2 rounded-lg"
                        onClick={() => handleSubmit()}>
                        Submit
                    </button>
                </div>

                <div className="mt-3">
                    {knjige.map(knjiga => (
                        <div key={knjiga.id} className="">
                            <div className="flex justify-between gap-x-5 bg-white">
                                    <span
                                        className="flex-wrap flex flex-col justify-center">"{knjiga.naziv}" - {knjiga.autor}</span>
                                <div className="flex flex-col justify-center">
                                    <button
                                        className="max-h-[30px] mt-2.5 mb-2.5 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
                                        onClick={() => handleDeleteUser(knjiga)}>
                                        Izbrisi
                                    </button>
                                </div>
                            </div>
                            <hr/>

                        </div>
                    ))}
                </div>
            </div>
            <Confirm
                isOpen={confirmOpen}
                title="Potvrda brisanja"
                message={`Da li ste sigurni da želite da obrišete knjigu ${selectedKnjiga == null ? "" : selectedKnjiga.naziv}`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default KnjizaraEditCard;