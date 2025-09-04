import ImageUploader from "./ImageUploader.jsx";
import React from "react";


function DodajKnjigu({setIsKnjigaEditable}){

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
                // onChange={handleChangeIme}
                placeholder="Ime"
            />

            <input
                type="text"
                className="border p-1 mb-3 rounded "
                name="autor"
                // onChange={handleChangeIme}
                placeholder="Autor"
            />
            <div className="flex sm:justify-between sm:gap-2 sm:flex-wrap sm:flex-row flex-col w-auto">
                <select name="format" id="format" className="border p-1 mb-3 rounded">
                    <option value="meki-povez">Zanr</option>
                    <option value="meki-povez">Meki povez</option>
                    <option value="tvrdi-povez">Tvrdi povez</option>
                    <option value="e-knjiga">E-knjiga</option>
                    <option value="audio-knjiga">Audio knjiga</option>
                </select>

                <input
                    type="number"
                    className="border p-1 mb-3 rounded sm:max-w-[100px] max-w-auto"
                    name="brojStrana"
                    // onChange={handleChangeIme}
                    placeholder="Broj Strana"
                />

                <input
                    type="text"
                    className="border p-1 mb-3 rounded sm:max-w-[100px] max-w-auto"
                    name="cena"
                    // onChange={handleChangeIme}
                    placeholder="Cena"
                />
            </div>


            <textarea
                type="text"
                className="border p-1 mb-1 rounded"
                name="opis"
                // onChange={handleChangeIme}
                placeholder="Opis"
            />
            <ImageUploader/>
        </div>
    </>)
}

export default DodajKnjigu;