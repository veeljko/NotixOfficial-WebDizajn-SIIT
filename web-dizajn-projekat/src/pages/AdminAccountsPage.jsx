import KorisniciList from "../components/KorisniciList.jsx";
import KorisnikEdit from "../components/KorisnikEdit.jsx";
import {useState} from "react";


function AdminAccountsPage() {
    const [isEditable, setIsEditable] = useState(false);
    const [editAccount, setEditAccount] = useState({});

    return (<>
        <KorisniciList isEditable={isEditable} setIsEditable={setIsEditable} setEditAccount={setEditAccount} />
        {isEditable && <KorisnikEdit setIsEditable={setIsEditable} editAccount={editAccount} setEditAccount={setEditAccount} />}
    </>)
}

export default AdminAccountsPage;