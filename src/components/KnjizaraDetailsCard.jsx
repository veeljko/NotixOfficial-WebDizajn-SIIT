import {useNavigate} from "react-router-dom";
import KnjigePretraga from "./KnjigePretraga.jsx";


function KnjizaraDetailsCard({knjizara, knjige, search, setSearch}) {
    const navigate = useNavigate();

    return (<div className="p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">

                <img src={knjizara.logo} alt={knjizara.name} className="w-full h-60 object-cover rounded" />
                <h1 className="text-3xl font-bold mt-4">{knjizara.naziv}</h1>
                <div className="flex flex-col  pt-1">
                        <p className="text-start flex flex-col justify-end">{knjizara.adresa}</p>
                        <p className="text-gray-600">Godina osnivanja: {knjizara.godinaOsnivanja}.</p>
                        <p className="text-gray-600">Email: {knjizara.email}</p>
                        <p className="text-gray-600">Telefon: {knjizara.kontaktTelefon}</p>
                </div>

                <h2 className="text-xl font-semibold mt-6">Knjige:</h2>
                <KnjigePretraga search={search} setSearch={setSearch}/>
                {knjige.map(knjiga => (
                    <div key={knjiga.id}>
                        <div className="flex justify-between">
                            <span className="basis-3/5 flex flex-col justify-end">"{knjiga.naziv}" - {knjiga.autor}</span>
                            <div className="w-auto h-auto flex flex-col justify-center">
                                <button className="my-1.5 py-1.5 px-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                                onClick={() => navigate(`/knjiga/${knjiga.id}`, {state : {knjiga}})}>
                                    Vise Detalja
                                </button>
                            </div>
                        </div>
                        <hr/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default KnjizaraDetailsCard;