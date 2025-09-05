import KnjizaraCard from "../components/KnjizaraCard.jsx";
import {useEffect, useState} from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

function HomePage() {
    const [knjizare, setKnjizare] = useState([]);

    const knjizareRef = collection(db, "knjizare");

    // Fetch all Knjizare
    const loadKnjizare = async () => {
        const snapshot = await getDocs(knjizareRef);
        setKnjizare(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        loadKnjizare();
    }, []);

    return (<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,2fr))] gap-8 p-8">
            {knjizare.map(knjizara => (
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
    </div>)
}

export default HomePage;