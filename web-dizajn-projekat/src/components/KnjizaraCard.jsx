import { useNavigate } from "react-router-dom";

function KnjizaraCard({naziv, adresa, logo, id}){
    const navigate = useNavigate();

    return (
        <div className="max-w-75 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300
        flex flex-col justify-between">
            <div>
                <img
                    className="w-full h-48 object-cover"
                    src={logo}
                    alt={naziv}
                />
                <div className="pl-4 pr-4 pt-4">
                    <h2 className="text-xl font-bold text-gray-800">{naziv}</h2>
                    <p className="text-gray-600 mt-2">{adresa}</p>
                </div>
            </div>
            <div className="p-3">
                <button
                    onClick={() => navigate(`/knjizara/${id}`)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    Vise Detalja
                </button>
            </div>
        </div>
    );
}

export default KnjizaraCard;