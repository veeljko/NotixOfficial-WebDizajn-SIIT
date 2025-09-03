import React from "react";


function AdminKnjizaraCard({knjizare}) {

    const handleAdd = async () => {

    };

    // Edit Knjizara
    const handleEdit = async (id, updatedData) => {

    };

    // Delete Knjizara
    const handleDelete = async (id) => {

    };

    return (
        <div className="p-6">

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

                    <div className="flex gap-x-2 md:justify-end w-full flex-wrap justify-center">
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            // onClick={}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            // onClick={}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdminKnjizaraCard;