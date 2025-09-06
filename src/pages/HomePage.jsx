import KnjizaraCard from "../components/KnjizaraCard.jsx";
import {useEffect, useState} from "react";
import {collection, getDocs, onSnapshot} from "firebase/firestore";
import { db } from "../firebaseConfig.js";

function HomePage() {
    const [knjizare, setKnjizare] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const knjizareRef = collection(db, "knjizare");

    useEffect(() => {
        const unsubscribe = onSnapshot(knjizareRef, (snapshot) => {
            const lista = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setKnjizare(lista);
        });

        return () => unsubscribe();
    }, []);

    const filteredKnjizare = knjizare.filter((knjizara) =>
        knjizara.naziv.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (<>
            <div className="flex justify-center mb-6 mt-5">
                <input
                    type="text"
                    placeholder="Pretrazi knjizaru..."
                    className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,2fr))] gap-8 p-8">


                {filteredKnjizare.map(knjizara => (
                    <div className="flex justify-center" key={knjizara.id}>
                        <KnjizaraCard
                            key={knjizara.id}
                            naziv={knjizara.naziv}
                            adresa={knjizara.adresa}
                            logo={knjizara.logo}
                            id={knjizara.id}
                        />
                    </div>
                ))}
        </div>
    </>)
}

export default HomePage;