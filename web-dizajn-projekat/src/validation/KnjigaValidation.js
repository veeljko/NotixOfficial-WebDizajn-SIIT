
export function knjigaValidation(knjiga){
    if (knjiga.naziv === "") return "Unesi naziv!";
    if (knjiga.autor === "") return "Unesi autora!";
    if (knjiga.zanr === "Zanr") return "Unesi zanr!";
    if (knjiga.brojStrana === "") return "Unesi broj strana!";
    if (knjiga.cena === "") return "Unesi cenu!";
    if (isNaN(Number(knjiga.cena))) return "Pogresno uneta cena!";
    if (knjiga.opis === "") return "Unesi opis!";
    if (knjiga.slike.length === 0) return "Postavi barem 1 sliku";
    return "Uspesno dodata knjiga!";
}