import {useNavigate} from "react-router-dom";


function KnjizaraDetailsCard({knjizara, knjige}){
    const navigate = useNavigate();

    return (<div className="p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
                <img src={knjizara.logo} alt={knjizara.name} className="w-full h-60 object-cover rounded" />
                <h1 className="text-3xl font-bold mt-4">{knjizara.naziv}</h1>
                <div className="flex flex-col  pt-3">
                    <div className="flex justify-between items-end-safe mt-2 gap-10">
                        <p className="flex flex-col justify-end">Adresa</p>
                        <p className="">{knjizara.adresa}</p>
                    </div>
                    <hr/>
                    <div className="flex justify-between mt-2 gap-4">
                        <p className="">Godina osnivanja</p>
                        <p className=""> {knjizara.godinaOsnivanja}.</p>
                    </div>
                    <hr/>
                    <div className="flex justify-between mt-2 gap-4">
                        <p className="">Email</p>
                        <p className=""> {knjizara.email}</p>
                    </div>
                    <hr/>
                    <div className="flex justify-between mt-2 gap-4">
                        <p className="">Telefon</p>
                        <p className="">{knjizara.kontaktTelefon}</p>
                    </div>
                    <hr/>
                </div>
                <h2 className="text-xl font-semibold mt-6 pb-3">Knjige:</h2>
                {knjige.map(knjiga => (
                    <div key={knjiga.id}>
                        <div className="flex justify-between">
                            <span className="basis-3/5 flex flex-col justify-end">"{knjiga.naziv}" - {knjiga.autor}</span>
                            <div className="w-auto h-auto flex flex-col justify-center">
                                <button className="my-1.5 py-1.5 px-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors" onClick={() => navigate(`/knjiga/${knjiga.id}`)}>Vise Detalja</button>
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