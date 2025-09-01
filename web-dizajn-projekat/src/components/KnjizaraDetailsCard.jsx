import {useNavigate} from "react-router-dom";


function KnjizaraDetailsCard({knjizara, knjige}){
    const navigate = useNavigate();

    return (<div className="p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
                <img src={knjizara.logo} alt={knjizara.name} className="w-full h-60 object-cover rounded" />
                <h1 className="text-3xl font-bold mt-4">{knjizara.naziv}</h1>
                <p className="text-gray-600 mt-2">{knjizara.adresa}</p>
                <p className="mt-2">Godina osnivanja: {knjizara.godinaOsnivanja}.</p>
                <p className="">Email: {knjizara.email}</p>
                <p className="">Telefon: {knjizara.kontaktTelefon}</p>

                <h2 className="text-xl font-semibold mt-6">Knjige:</h2>
                {knjige.map(knjiga => (
                    <div key={knjiga.id}>
                        <div className="flex justify-between ">
                            <span className="">"{knjiga.naziv}" - {knjiga.autor}</span>
                            <button onClick={() => navigate(`/knjiga/${knjiga.id}`)}>Vise Detalja</button>
                        </div>
                        <hr/>
                    </div>
                ))}

                {/* Edit button */}
                <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Uredi Knjizaru
                </button>
            </div>
        </div>
    )
}

export default KnjizaraDetailsCard;