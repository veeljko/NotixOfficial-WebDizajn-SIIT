import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

function KnjizaraPage() {
    const id = useParams().id;
    const [knjizara, setKnjizara] = useState(null);
    const [knjige, setKnjige] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                setKnjizara(knjizaraData);

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


    if (loading) return <p>Loading...</p>;


    return (
        <div className="p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
                <img src={knjizara.logo} alt={knjizara.name} className="w-full h-60 object-cover rounded" />
                <h1 className="text-3xl font-bold mt-4">{knjizara.naziv}</h1>
                <p className="text-gray-600 mt-2">{knjizara.adresa}</p>
                <p className="mt-2">Godina osnivanja: {knjizara.godinaOsnivanja}</p>
                <p className="">Email: {knjizara.email}</p>
                <p className="">Telefon: {knjizara.kontaktTelefon}</p>

                <h2 className="text-xl font-semibold mt-6">Knjige:</h2>
                {knjige.map(knjiga => (
                    <div key={knjiga.id}>
                        <div className="flex justify-between ">
                            <span className="">"{knjiga.naziv}" - {knjiga.autor}</span>
                            <button>Vise Detalja</button>
                        </div>
                        <hr/>
                    </div>
                ))}

                {/* Edit button */}
                <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Uredi Knjizaru
                </button>
            </div>
        </div>
    );
}

export default KnjizaraPage;