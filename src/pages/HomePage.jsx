import KnjizaraCard from "../components/KnjizaraCard.jsx";
import {useEffect, useState} from "react";
import {collection, getDocs, onSnapshot} from "firebase/firestore";
import { db } from "../firebaseConfig.js";

function HomePage() {
    const [knjizare, setKnjizare] = useState([]);

    const knjizareRef = collection(db, "knjizare");

    // Fetch all Knjizare
    useEffect(() => {
        // Real-time listener for knjizare collection
        const unsubscribe = onSnapshot(knjizareRef, (snapshot) => {
            const lista = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setKnjizare(lista);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
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