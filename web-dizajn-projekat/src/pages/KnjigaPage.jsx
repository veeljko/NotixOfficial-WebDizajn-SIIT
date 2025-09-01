import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../firebaseConfig.js";
import ImageSlideShow from "../components/ImageSlideShow.jsx";
import KnjigaDetailsCard from "../components/KnjigaDetailsCard.jsx";


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
    }, []);

    if (!knjiga) {
        return <p className="text-gray-500">Učitavanje...</p>;
    }

    return (<>
        <KnjigaDetailsCard knjiga={knjiga} />
    </>);
}

export default KnjigaPage;