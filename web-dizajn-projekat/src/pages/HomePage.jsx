import KnjizaraCard from "../components/KnjizaraCard.jsx";
import {useEffect, useState} from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../src/firebaseConfig.js";

function HomePage() {
    const [knjizare, setKnjizare] = useState([]);

    useEffect(() => {
        const fetchKnjizare = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "knjizare"));
                const knjizareData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setKnjizare(knjizareData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchKnjizare();
    }, []);

    return (<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,2fr))] gap-8 p-8">
            {knjizare.map(knjizara => (
                <div className="flex justify-center">
                    <KnjizaraCard
                        key={knjizara.id}
                        naziv={knjizara.naziv}
                        adresa={knjizara.adresa}
                        logo={knjizara.logo}
                        onMoreDetails={null}
                    />
                </div>
            ))}
    </div>)
}

export default HomePage;