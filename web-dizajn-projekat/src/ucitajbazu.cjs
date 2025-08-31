const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const jsonData = require("./data2025.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function uploadKnjizare() {
    const collectionRef = db.collection("knjizare");
    const knjizareObj = jsonData.knjizare;

    for (let id in knjizareObj) {
        const item = knjizareObj[id];
        await collectionRef.doc(id).set(item); // preserve original ID
    }

    console.log("Knjizare upload complete");
}

async function uploadKnjige() {
    const collectionRef = db.collection("knjige");
    const knjigeObj = jsonData.knjige;

    for (let knjigaId in knjigeObj) {
        const subObj = knjigeObj[knjigaId];

        // Each subObj may have nested objects
        for (let subId in subObj) {
            const item = subObj[subId];

            // Optional: add a reference to parent ID (knjigaId)
            item.parentId = knjigaId;

            await collectionRef.doc(subId).set(item); // preserve subId as doc ID
        }
    }

    console.log("Knjige upload complete");
}

async function uploadAll() {
    try {
        await uploadKnjizare();
        await uploadKnjige();
        console.log("All data uploaded successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Error uploading data:", err);
        process.exit(1);
    }
}

uploadAll();
