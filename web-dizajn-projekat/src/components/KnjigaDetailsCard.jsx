import ImageSlideShow from "./ImageSlideShow.jsx";


function KnjigaDetailsCard({knjiga}) {


    return (<>
        <div className="flex justify-center pt-5 ">
            <div className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-xl transition max-w-150">
                <ImageSlideShow images={knjiga.slike} />

                {/* Title */}
                <p className="pb-2">
                    <span className="text-xl font-semibold text-gray-800">"{knjiga.naziv}" - </span>
                    <span className="text-xl font-semibold text-gray-600">{knjiga.autor} </span>
                </p>

                {/* Specification */}
                <div className="flex flex-col pb-1">
                    <p className="text-gray-500 text-sm pb-0.5">Broj strana: {knjiga.brojStrana}</p>
                    <p className="text-gray-500 text-sm pb-0.5">Cena: {knjiga.cena} din</p>
                    <p className="text-gray-500 text-sm pb-0.5">Format: {knjiga.format}</p>
                    <p className="text-gray-500 text-sm pb-0.5">Zanr: {knjiga.zanr}</p>
                </div>

                <div>
                    <p className=" text-md">Opis: </p>
                    <p className="text-gray-500 text-sm">{knjiga.opis}</p>
                </div>

                {/* Edit button */}
                <div className="flex justify-center">
                    <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Uredi Knjigu
                    </button>
                </div>
            </div>
        </div>
    </>)
}

export default KnjigaDetailsCard;