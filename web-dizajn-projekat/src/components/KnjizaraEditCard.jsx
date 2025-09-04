import React, {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebaseConfig.js";
import DodajKnjigu from "./DodajKnjigu.jsx";


function KnjizaraEditCard({knjizara, setEditable}) {
    const [knjige, setKnjige] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editKnjiga, setEditKnjiga] = useState(false);
    const id = knjizara.id;

    useEffect(() => {
        console.log(knjizara.ime)
        const fetchData = async () => {
            try {
                const knjizaraRef = doc(db, "knjizare", id);
                const knjizaraSnap = await getDoc(knjizaraRef);

                if (!knjizaraSnap.exists()) {
                    console.log("Knjizara not found");
                    return;
                }
                const knjizaraData = { id: knjizaraSnap.id, ...knjizaraSnap.data() };
                const knjigeField = knjizaraData.knjige;

                //console.log(knjigeField);
                const knjigeRef = doc(db, "knjige", knjigeField);
                const knjigeSnap = await getDoc(knjigeRef);

                if (!knjigeSnap.exists()) {
                    console.log("Knjige not found");
                    return;
                }
                // Convert to array with IDs included
                const knjigeList = Object.entries(knjigeSnap.data()).map(([id, data]) => ({
                    id,   // preserve the document ID
                    ...data
                }));

                // knjigeList.forEach((knjige) => {
                //     console.log(knjige.naziv);
                // });
                setKnjige(knjigeList);

            } catch (error) {
                console.error("Error fetching data:", error);
                setKnjige([]);
            } finally {
                setLoading(false);
            }
        };



        fetchData();

    }, [id]);


    const handleOnClose = () => {
        setEditable(prev => !prev);
    }

    return (
        <div className="fixed inset-0 bg-gray-900/80 flex justify-center pt-10 pb-10 overflow-y-auto ">
            <div className="bg-white px-5 pb-3 rounded-lg w-11/12 max-w-md overflow-y-auto">
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
                <label htmlFor="ime" className="text-gray-700 font-semibold">Ime</label>
                <input
                    className="w-full border p-2 mb-2 rounded"
                    placeholder="Naziv"
                    name="ime"
                    value={knjizara.naziv}
                    // onChange={(e) =>
                    //     setEditingKnjizara({ ...editingKnjizara, naziv: e.target.value })
                    // }
                />
                <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
                <input
                    className="w-full border p-2 mb-2 rounded"
                    placeholder="Email"
                    name="email"
                    value={knjizara.email}
                    // onChange={(e) =>
                    //     setEditingKnjizara({ ...editingKnjizara, kontaktTelefon: e.target.value })
                    // }
                />
                <label htmlFor="adresa" className="text-gray-700 font-semibold">Adresa</label>
                <input
                    className="w-full border p-2 mb-2 rounded"
                    placeholder="Adresa"
                    name="adresa"
                    value={knjizara.adresa}
                    // onChange={(e) =>
                    //     setEditingKnjizara({ ...editingKnjizara, adresa: e.target.value })
                    // }
                />
                <label htmlFor="godinaOsnovanja" className="text-gray-700 font-semibold">Godina osnivanja</label>
                <input
                    className="w-full border p-2 mb-4 rounded"
                    placeholder="Godina osnivanja"
                    value={knjizara.godinaOsnivanja}
                    name="godinaOsnivanja"
                    // onChange={(e) =>
                    //     setEditingKnjizara({ ...editingKnjizara, godinaOsnivanja: e.target.value })
                    // }
                />

                {/* Upload button */}
                <label
                    htmlFor="logoUpload"
                    className="cursor-pointer bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                    Upload New Logo
                </label>
                <input
                    id="logoUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    // onChange={handleLogoChange}
                />

                <h2 className="text-xl font-semibold mt-6 pb-2">Knjige:</h2>
                {knjige.map(knjiga => (
                    <div key={knjiga.id}>
                        <div className="flex justify-between gap-x-10">
                            <span
                                className="flex-wrap flex flex-col justify-center">"{knjiga.naziv}" - {knjiga.autor}</span>
                            <div className="flex gap-3 justify-center">
                                <button
                                    className="mt-2.5 mb-2.5 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600">
                                    Delete
                                </button>
                            </div>
                        </div>
                        <hr/>
                    </div>
                ))}

                <DodajKnjigu/>

                 {/*Buttons*/}
                <div className="flex justify-end gap-2 pt-7">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={() => setEditable(prev => !prev)}
                    >
                        Ponisti
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        // onClick={() => {
                        //     handleEdit(editingKnjizara.id, editingKnjizara);
                        //     setEditingKnjizara(null);
                        // }}
                    >
                        Sacuvaj promene
                    </button>
                </div>
            </div>
        </div>
    )
}

export default KnjizaraEditCard;