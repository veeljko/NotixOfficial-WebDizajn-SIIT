import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import {doc, getDoc, onSnapshot} from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import KnjizaraDetailsCard from "../components/KnjizaraDetailsCard.jsx";

function KnjizaraPage() {
    const id = useParams().id;
    const [knjizara, setKnjizara] = useState(null);
    const [knjige, setKnjige] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!id) return;

        // Reference to the Knjizara document
        const knjizaraRef = doc(db, "knjizare", id);

        // Listen to Knjizara in real-time
        const unsubscribeKnjizara = onSnapshot(knjizaraRef, (knjizaraSnap) => {
            if (!knjizaraSnap.exists()) {
                console.log("Knjizara not found");
                setKnjizara(null);
                setKnjige([]);
                setLoading(false);
                return;
            }

            const knjizaraData = { id: knjizaraSnap.id, ...knjizaraSnap.data() };
            setKnjizara(knjizaraData);

            const knjigeField = knjizaraData.knjige;
            if (!knjigeField) {
                console.log("No 'knjige' field yet");
                setKnjige([]);
                setLoading(false);
                return;
            }

            // Reference to the Knjige document
            const knjigeRef = doc(db, "knjige", knjigeField);

            // Listen to Knjige in real-time
            const unsubscribeKnjige = onSnapshot(knjigeRef, (knjigeSnap) => {
                if (!knjigeSnap.exists()) {
                    console.log("Knjige not found");
                    setKnjige([]);
                    setLoading(false);
                    return;
                }

                const knjigeList = Object.entries(knjigeSnap.data()).map(([id, data]) => ({
                    id,
                    ...data,
                }));

                setKnjige(knjigeList);
                setLoading(false);
            });

            // Cleanup knjige listener when Knjizara updates
            return () => unsubscribeKnjige();
        });

        // Cleanup knjizara listener
        return () => unsubscribeKnjizara();
    }, [id]);


    if (loading) return <p className="flex justify-center text-2xl">Ucitavanje...</p>;


    return (<>
            <KnjizaraDetailsCard knjizara={knjizara} knjige = {knjige}/>
        </>
    );
}

export default KnjizaraPage;