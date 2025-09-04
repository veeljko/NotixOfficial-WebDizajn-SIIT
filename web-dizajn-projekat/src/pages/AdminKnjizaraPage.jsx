import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig.js";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import AdminKnjizaraCard from "../components/AdminKnjizaraCard.jsx";
import KnjizaraEditCard from "../components/KnjizaraEditCard.jsx";
import KnjizaraEditKnjige from "../components/KnjizaraEditKnjige.jsx";

export default function AdminKnjizarePage() {
    const [isKnjigaEditable, setIsKnjigaEditable] = useState(false);
    const [knjizara, setKnjizara] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [knjizare, setKnjizare] = useState([]);
    const [newKnjizara, setNewKnjizara] = useState({
        naziv: "",
        kontakt: "",
        adresa: "",
    });

    const knjizareRef = collection(db, "knjizare");

    // Fetch all Knjizare
    const loadKnjizare = async () => {
        const snapshot = await getDocs(knjizareRef);
        setKnjizare(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        loadKnjizare();
    }, []);


    return (<>
        <AdminKnjizaraCard knjizare={knjizare} setKnjizara={setKnjizara} setEditable={setIsEditable} setIsKnjigaEditable={setIsKnjigaEditable} />
        {isEditable && <KnjizaraEditCard knjizara={knjizara} setEditable={setIsEditable}/>}
        {isKnjigaEditable && <KnjizaraEditKnjige knjizara = {knjizara} setIsKnjigaEditable={setIsKnjigaEditable}/>}
    </>);
}
