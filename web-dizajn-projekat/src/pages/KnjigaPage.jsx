import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../firebaseConfig.js";


function KnjigaPage() {
    const knjigaId = useParams().id;
    const [knjiga, setKnjiga] = useState(null);

    useEffect(() => {
        const fetchKnjiga = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "knjige"));
                let foundKnjiga = null;

                querySnapshot.forEach(doc => {
                    const knjigeList = Object.entries(doc.data()).map(([id, data]) => ({
                        id,   // preserve the document ID
                        ...data
                    }));
                    for (const k of knjigeList) {
                        if (k.id === knjigaId){
                            foundKnjiga = k;
                            break;
                        }
                    }
                });
                //console.log(foundKnjiga);

                if (foundKnjiga) {
                    setKnjiga(foundKnjiga);
                } else {
                    console.log("Knjiga not found");
                }
            } catch (error) {
                console.error("Error fetching knjige:", error);
            }
        };

        fetchKnjiga();
    }, [knjigaId]);

    if (!knjiga) {
        return <p className="text-gray-500">Učitavanje...</p>;
    }

    return (
        <div className="flex justify-center pt-5">
            <div className="bg-white rounded-2xl shadow-lg p-5 max-w hover:shadow-xl transition">
                {/* Images */}
                <div className="flex gap-2 mb-4 justify-between">
                    {knjiga.slike && knjiga.slike.slice(0, 3).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Slika ${index + 1}`}
                            className="w-48 h-64 object-cover rounded-lg"
                        />
                    ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800">{knjiga.naziv}</h3>

                {/* Author */}
                <p className="text-gray-600">
                    <span className="font-semibold">Autor:</span> {knjiga.autor}
                </p>

                {/* Specification */}
                <div className="flex flex-col">
                    <p className="text-gray-500 text-sm">Broj strana: {knjiga.brojStrana}</p>
                    <p className="text-gray-500 text-sm">Cena: {knjiga.cena} din</p>
                    <p className="text-gray-500 text-sm">Format: {knjiga.format}</p>
                    <p className="text-gray-500 text-sm">Zanr: {knjiga.zanr}</p>
                </div>

                <div>
                    <p className=" text-md">Opis: </p>
                    <p className="text-gray-500 text-sm">{knjiga.opis}</p>
                </div>

                {/* Edit button */}
                <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Uredi Knjigu
                </button>
            </div>
        </div>
    );
}

export default KnjigaPage;