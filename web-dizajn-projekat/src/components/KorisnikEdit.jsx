

function KorisnikEdit({setIsEditable, editAccount, setEditAccount}) {
    // const [user, setUser] = useState({ name: "", email: "", role: "", phone: "" });

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const userRef = doc(db, "users", id);
    //         const userSnap = await getDoc(userRef);
    //         if (userSnap.exists()) {
    //             setUser(userSnap.data());
    //         }
    //     };
    //     fetchUser();
    // }, [id]);

    const handleChange = () => {

    };

    const handleChangeIme = (e) => {
        setEditAccount((prev) => ({
            ...prev,
            ime: e.target.value
        }))
    };

    const handleChangePrezime = (e) => {
        setEditAccount((prev) => ({
            ...prev,
            prezime: e.target.value
        }))
    };

    const handleChangeKorisnickoIme = (e) => {
        setEditAccount((prev) => ({
            ...prev,
            korisnickoIme: e.target.value
        }))
    };

    const handleChangeAdresa = (e) => {
        setEditAccount((prev) => ({
            ...prev,
            adresa: e.target.value
        }))
    };

    const handleChangeDatumRodjenja = (e) => {
        setEditAccount((prev) => ({
            ...prev,
            datumRodjenja: e.target.value
        }))
    };

    const handleChangeEmail = (e) => {
        setEditAccount((prev) => ({
            ...prev,
            email: e.target.value
        }))
    };

    const handleChangeTelefon = (e) => {
        setEditAccount((prev) => ({
            ...prev,
            telefon: e.target.value
        }))
    };

    const handleChangeZanimanje = (e) => {
        setEditAccount((prev) => ({
            ...prev,
            zanimanje: e.target.value
        }))
    };

    const handleChangeLozinka = (e) => {
        setEditAccount((prev) => ({
            ...prev,
            lozinka: e.target.value
        }))
    };


    const handleOnClose = () => {
        setIsEditable(false);
    }

    // const handleSave = async () => {
    //     const userRef = doc(db, "users", id);
    //     await updateDoc(userRef, user);
    //     alert("Podaci uspešno izmenjeni!");
    //     navigate("/admin/users");
    // };

    return (
        <div className="p-4 sm:p-10 md:p-20 fixed inset-0 flex items-center justify-center bg-gray-900/80 z-20">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md h-auto p-5 relative overflow-y-auto max-h-[90vh]">
                {/*<h1 className="text-2xl font-bold mb-4">Izmeni korisnika</h1>*/}
                <button
                    onClick={handleOnClose}
                    className="absolute top-1 right-3 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>
                <div className="flex flex-col max-w-md">
                    <label htmlFor="ime" className="text-gray-700 font-semibold">Ime</label>
                    <input
                        type="text"
                        className="border p-1 mb-1 rounded"
                        name="ime"
                        value={editAccount.ime}
                        onChange={handleChangeIme}
                        placeholder="Ime"
                    />
                    <label htmlFor="prezime" className="text-gray-700 font-semibold">Prezime</label>
                    <input
                        className="border p-1 mb-1 rounded"
                        name="prezime"
                        value={editAccount.prezime}
                        onChange={handleChangePrezime}
                        placeholder="Prezime"
                    />
                    <label htmlFor="korisnickoIme" className="text-gray-700 font-semibold">Korisnicko ime</label>
                    <input
                        className="border p-1 mb-1 rounded"
                        name="korisnickoIme"
                        value={editAccount.korisnickoIme}
                        onChange={handleChangeKorisnickoIme}
                        placeholder="Korisnicko ime"
                    />
                    <label htmlFor="adresa" className="text-gray-700 font-semibold">Adresa</label>
                    <input
                        className="border p-1 mb-1 rounded"
                        name="adresa"
                        type="email"
                        value={editAccount.adresa}
                        onChange={handleChangeAdresa}
                        placeholder="Adresa"
                    />
                    <label htmlFor="datumRodjenja" className="text-gray-700 font-semibold">Datum rodjenja</label>
                    <input
                        className="border p-1 mb-1 rounded"
                        name="datumRodjenja"
                        type="date"
                        value={editAccount.datumRodjenja}
                        onChange={handleChangeDatumRodjenja}
                        placeholder="Datum rodjenja"
                    />
                    <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
                    <input
                        className="border p-1 mb-1 rounded"
                        name="email"
                        value={editAccount.email}
                        onChange={handleChangeEmail}
                        placeholder="Email"
                    />
                    <label htmlFor="telefon" className="text-gray-700 font-semibold">Telefon</label>
                    <input
                        className="border p-1 mb-1 rounded"
                        name="telefon"
                        type="tel"
                        value={editAccount.telefon}
                        onChange={handleChangeTelefon}
                        placeholder="Telefon"
                    />
                    <label htmlFor="zanimanje" className="text-gray-700 font-semibold">Zanimanje</label>
                    <input
                        className="border p-1 mb-1 rounded"
                        name="zanimanje"
                        value={editAccount.zanimanje}
                        onChange={handleChangeZanimanje}
                        placeholder="Zanimanje"
                    />
                    <label htmlFor="lozinka" className="text-gray-700 font-semibold">Lozinka</label>
                    <input
                        className="border p-1 mb-2 rounded"
                        type="password"
                        name="lozinka"
                        value={editAccount.lozinka}
                        onChange={handleChangeLozinka}
                        placeholder="Lozinka"
                    />
                    <button
                        // onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Sačuvaj
                    </button>
                </div>
            </div>
        </div>
    );
}

export default KorisnikEdit;