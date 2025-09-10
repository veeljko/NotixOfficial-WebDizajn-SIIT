import ImageUploader from "./ImageUploader.jsx";
import React, {useState} from "react";
import {knjigaValidation} from "../validation/KnjigaValidation.js";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../firebaseConfig.js";

function DodajKnjigu({setIsKnjigaEditable, knjizara}){
    const [newKnjiga, setNewKnjiga] = useState({
        naziv: "",
        autor: "",
        zanr: "",
        format: "Format",
        brojStrana: "",
        cena: "",
        opis: "",
        slike: []
    });
    const [outputMessage, setOutputMessage] = useState("");
    const [flag, setFlag] = useState(false);

    function handleChangeNaziv(e){
        setNewKnjiga((prev) => ({...prev, naziv: e.target.value}));
    }
    function handleChangeAutor(e){
        setNewKnjiga((prev) => ({...prev, autor: e.target.value}));
    }
    function handleChangeZanr(e){
        setNewKnjiga((prev) => ({...prev, zanr: e.target.value}));
    }
    function handleChangeBrojStrana(e){
        setNewKnjiga((prev) => ({...prev, brojStrana: e.target.value}));
    }
    function handleChangeCena(e){
        setNewKnjiga((prev) => ({...prev, cena: e.target.value}));
    }
    function handleChangeOpis(e){
        setNewKnjiga((prev) => ({...prev, opis: e.target.value}));
    }
    function handleChangeFormat(e){
        setNewKnjiga((prev) => ({...prev, format: e.target.value}));
    }


    async function addBookToBooksDoc(docId, bookData) {
        try {
            const booksRef = doc(db, "knjige", docId);

            // generate a new unique key for the book
            const bookId = crypto.randomUUID?.() ?? String(Date.now() + Math.random());

            // update the document by adding a new book field
            await updateDoc(booksRef, {
                [bookId]: bookData
            });

            console.log("Book added successfully:", bookId);
        } catch (error) {
            console.error("Error adding book:", error);
        }
    }


    function handleSave(e){
        const output = knjigaValidation(newKnjiga);
        setOutputMessage(output);
        if (output === "Uspesno dodata knjiga!"){
            console.log(newKnjiga);


            addBookToBooksDoc(knjizara.knjige, {
                autor: newKnjiga.autor,
                brojStrana: newKnjiga.brojStrana,
                cena: newKnjiga.cena,
                format: newKnjiga.format,
                naziv: newKnjiga.naziv,
                opis: newKnjiga.opis,
                zanr: newKnjiga.zanr,
                slike: newKnjiga.slike
            })


            setNewKnjiga((prev) => ({
                ...prev,
                naziv: "",
                autor: "",
                format: "Format",
                zanr: "",
                brojStrana: "",
                cena: "",
                opis: "",
                slike: []
            }));
            setFlag(prev => !prev);
        }
    }


    return (<>
        {/*<p>Dodaj</p>*/}
        <div className="text-center">
            <h1 className="text-xl font-semibold text-white bg-blue-500 px-4 py-2 rounded-t-lg shadow mt-10">Dodavanje knjige</h1>
        </div>
        <div className="flex flex-col pt-2 bg-gray-100  px-4  rounded-lg ">
            <button
                onClick={() => setIsKnjigaEditable(prev => !prev)}
                className="self-end  text-gray-500 hover:text-gray-800 pb-2"
            >
                ✕
            </button>
            <input
                type="text"
                className="border p-1 mb-3 rounded"
                name="naziv"
                value={newKnjiga.naziv}
                onChange={(e) => handleChangeNaziv(e)}
                placeholder="Naziv"
            />

            <input
                type="text"
                className="border p-1 mb-3 rounded "
                name="autor"
                value={newKnjiga.autor}
                onChange={(e) =>handleChangeAutor(e)}
                placeholder="Autor"
            />
            <div className="flex sm:justify-between sm:gap-2 sm:flex-wrap sm:flex-row flex-col w-auto">
                <select name="format" id="format" className="border p-1 mb-3 rounded"
                onChange={(e) => handleChangeFormat(e)}
                value={newKnjiga.format}>
                    <option value="meki-povez">Format</option>
                    <option value="meki-povez">Meki povez</option>
                    <option value="tvrdi-povez">Tvrdi povez</option>
                    <option value="e-knjiga">E-knjiga</option>
                    <option value="audio-knjiga">Audio knjiga</option>
                </select>

                <input
                    type="number"
                    className="border p-1 mb-3 rounded sm:max-w-[100px] max-w-auto"
                    name="brojStrana"
                    value={newKnjiga.brojStrana}
                    onChange={(e) => handleChangeBrojStrana(e)}
                    placeholder="Broj Strana"
                />

                <input
                    type="text"
                    className="border p-1 mb-3 rounded sm:max-w-[100px] max-w-auto"
                    name="cena"
                    value={newKnjiga.cena}
                    onChange={(e) => handleChangeCena(e)}
                    placeholder="Cena"
                />
            </div>
            <input
                type="zanr"
                className="border p-1 mb-3 rounded"
                name="zanr"
                value={newKnjiga.zanr}
                onChange={(e) => handleChangeZanr(e)}
                placeholder="Zanr"
            />

            <textarea
                type="text"
                className="border p-1 mb-1 rounded"
                name="opis"
                value={newKnjiga.opis}
                onChange={(e) => handleChangeOpis(e)}
                placeholder="Opis"
            />
            <ImageUploader setNewKnjiga={setNewKnjiga} flag={flag}/>
            <button
                className="bg-gray-300 p-2 rounded-lg border-1 hover:bg-gray-400 mb-3"
                onClick={() => handleSave()}
            >
                Dodaj knjigu
            </button>

            {outputMessage !== "" && <p className="text-xl text-center mb-2">{outputMessage}</p>}
        </div>
    </>)
}

export default DodajKnjigu;