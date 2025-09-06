

function KnjigePretraga({search, setSearch}){


    return (<>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 mt-2">
            <input
                type="text"
                placeholder="Naziv..."
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                value={search.naziv}
                onChange={(e) => setSearch((prev) => ({ ...prev, naziv: e.target.value }))}
            />
            <input
                type="text"
                placeholder="Zanr..."
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                value={search.zanr}
                onChange={(e) => setSearch((prev) => ({ ...prev, zanr: e.target.value }))}
            />
            <input
                type="text"
                placeholder="Autor..."
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                value={search.autor}
                onChange={(e) => setSearch((prev) => ({ ...prev, autor: e.target.value }))}
            />
        </div>
    </>)
}

export default KnjigePretraga;