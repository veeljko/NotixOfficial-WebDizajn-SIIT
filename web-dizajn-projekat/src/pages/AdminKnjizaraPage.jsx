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

export default function AdminKnjizarePage() {
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
        <AdminKnjizaraCard knjizare={knjizare} />
    </>);
}
