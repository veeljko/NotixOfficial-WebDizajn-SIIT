import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebaseConfig.js";
import KnjigaDetailsCard from "../components/KnjigaDetailsCard.jsx";


function KnjigaPage() {
    const { id } = useParams();
    const location = useLocation();
    const [knjiga, setKnjiga] = useState(location.state?.knjiga || null);

    useEffect(() => {
        const fetchKnjiga = async () => {
            try {
                const docRef = doc(db, "knjige", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setKnjiga({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("Knjiga not found in Firestore");
                }
            } catch (error) {
                console.error("Error fetching knjiga:", error);
            }
        };

        if (!knjiga) {
            fetchKnjiga();
        }
    }, [id, knjiga]);

    if (!knjiga) {
        return <p className="text-gray-500">Učitavanje...</p>;
    }

    return (<>
        <KnjigaDetailsCard knjiga={knjiga} />
    </>);
}

export default KnjigaPage;