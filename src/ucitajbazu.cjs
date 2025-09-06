const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Load JSON file
const data = JSON.parse(fs.readFileSync('./data2025.json', 'utf8'));

async function uploadData() {
    // Upload knjige
    const knjigeCollection = db.collection('knjige');
    for (const [id, knjiga] of Object.entries(data.knjige)) {
        await knjigeCollection.doc(id).set(knjiga);
        console.log(`Uploaded knjiga ${id}`);
    }

    // Upload knjizare
    const knjizareCollection = db.collection('knjizare');
    for (const [id, knjizara] of Object.entries(data.knjizare)) {
        await knjizareCollection.doc(id).set(knjizara);
        console.log(`Uploaded knjizara ${id}`);
    }

    console.log('All data uploaded successfully!');
}

uploadData().catch(console.error);
