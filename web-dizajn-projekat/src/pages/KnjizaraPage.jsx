import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import KnjizaraDetailsCard from "../components/KnjizaraDetailsCard.jsx";

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


    if (loading) return <p className="flex justify-center text-2xl">Loading...</p>;


    return (<>
            <KnjizaraDetailsCard knjizara={knjizara} knjige = {knjige}/>
        </>
    );
}

export default KnjizaraPage;