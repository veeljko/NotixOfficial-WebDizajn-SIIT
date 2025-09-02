import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { useNavigate } from "react-router-dom";

function KorisniciList({isEditable, setIsEditable, setEditAccount}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const querySnapshot = await getDocs(collection(db, "korisnici"));
            const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersList);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Da li ste sigurni da želite da obrišete korisnika?")) {
            //await deleteDoc(doc(db, "users", id));
            //setUsers(users.filter(user => user.id !== id));
        }
    };

    return (
        <div className="p-6">

            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="w-full border-collapse text-sm text-gray-700">
                    <thead className="bg-gray-100 text-gray-700 sticky top-0">
                    <tr>
                        <th className="px-6 py-3 text-left font-semibold">Ime</th>
                        <th className="px-6 py-3 text-left font-semibold">Prezime</th>
                        <th className="px-6 py-3 text-left font-semibold">Korisnicko Ime</th>
                        <th className="px-6 py-3 text-left font-semibold">Adresa</th>
                        <th className="px-6 py-3 text-left font-semibold">Datum Rodjenja</th>
                        <th className="px-6 py-3 text-left font-semibold">Email</th>
                        <th className="px-6 py-3 text-left font-semibold">Telefon</th>
                        <th className="px-6 py-3 text-left font-semibold">Zanimanje</th>
                        <th className="px-6 py-3 text-left font-semibold">Lozinka</th>
                        <th className="px-6 py-3 text-center font-semibold">Akcije</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-t hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-2">{user.ime}</td>
                            <td className="px-6 py-2">{user.prezime}</td>
                            <td className="px-6 py-2">{user.korisnickoIme}</td>
                            <td className="px-6 py-2">{user.adresa}</td>
                            <td className="px-6 py-2">{user.datumRodjenja}</td>
                            <td className="px-6 py-2">{user.email}</td>
                            <td className="px-6 py-2">{user.telefon}</td>
                            <td className="px-6 py-2">{user.zanimanje}</td>
                            <td className="px-6 py-2">{user.lozinka}</td>
                            <td className="px-6 py-2">
                                <div className="flex flex-col gap-1">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition"
                                        onClick={() => {
                                            setIsEditable(true);
                                            setEditAccount((prev) => ({
                                                ...prev,
                                                ime: user.ime,
                                                prezime: user.prezime,
                                                korisnickoIme: user.korisnickoIme,
                                                adresa: user.adresa,
                                                datumRodjenja: user.datumRodjenja,
                                                email: user.email,
                                                telefon: user.telefon,
                                                zanimanje: user.zanimanje,
                                                lozinka: user.lozinka
                                            }));
                                        }}
                                    >
                                        Izmeni
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Obriši
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default KorisniciList;
