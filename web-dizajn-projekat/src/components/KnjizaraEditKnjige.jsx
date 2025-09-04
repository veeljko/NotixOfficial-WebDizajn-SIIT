import DodajKnjigu from "./DodajKnjigu.jsx";
import React, {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebaseConfig.js";

function KnjizaraEditKnjige({knjizara, setIsKnjigaEditable}) {
    const [knjige, setKnjige] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editKnjiga, setEditKnjiga] = useState(false);
    const id = knjizara.id;

    useEffect(() => {
        console.log(knjizara.ime)
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


    return (<div className="fixed inset-0 bg-gray-900/80 flex justify-center pt-10 overflow-y-auto">
        <div className=" px-5 rounded-lg  w-11/12 max-w-md overflow-y-auto">
            <DodajKnjigu setIsKnjigaEditable={setIsKnjigaEditable}/>

        </div>
    </div>)
}

export default KnjizaraEditKnjige;