const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load your JSON file
const data = JSON.parse(fs.readFileSync("./data2025.json", "utf8"));

// Function to upload knjizare
async function uploadData() {
    // Upload knjizare
    const knjizareRef = db.collection("knjizare");
    for (const [id, knjizara] of Object.entries(data.knjizare)) {
        await knjizareRef.doc(id).set(knjizara);
        console.log(`Knjizara added: ${knjizara.naziv}`);
    }

    // Upload knjige
    const knjigeRef = db.collection("knjige");
    for (const [id, knjigaGroup] of Object.entries(data.knjige)) {
        const groupRef = knjigeRef.doc(id).collection("lista");
        for (const [bookId, bookData] of Object.entries(knjigaGroup)) {
            await groupRef.doc(bookId).set(bookData);
            console.log(`Book added: ${bookData.naziv}`);
        }
    }

    // Upload korisnici
    const korisniciRef = db.collection("korisnici");
    for (const [id, korisnik] of Object.entries(data.korisnici)) {
        await korisniciRef.doc(id).set(korisnik);
        console.log(`User added: ${korisnik.korisnickoIme}`);
    }

    console.log("✅ All data uploaded successfully!");
}

uploadData().catch(console.error);
