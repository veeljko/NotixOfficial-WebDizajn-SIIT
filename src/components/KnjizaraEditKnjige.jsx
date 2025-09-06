import DodajKnjigu from "./DodajKnjigu.jsx";
import React, {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebaseConfig.js";

function KnjizaraEditKnjige({knjizara, setIsKnjigaEditable}) {

    return (<div className="fixed inset-0 bg-gray-900/80 flex justify-center pt-10 overflow-y-auto">
        <div className=" px-5 rounded-lg  w-11/12 max-w-md overflow-y-auto">
            <DodajKnjigu setIsKnjigaEditable={setIsKnjigaEditable} knjizara={knjizara}/>

        </div>
    </div>)
}

export default KnjizaraEditKnjige;