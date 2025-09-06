
export function knjizaraValidation(knjizara) {
    if (knjizara.naziv === "") return "Unesi ime!";
    if (knjizara.email === "") return "Unesi email!";
    if (!knjizara.email.includes("@")) return "Pogresno unet email!";
    if (knjizara.adresa === "") return "Unesi adresu!";
    if (knjizara.adresa.split(",").length !== 3) return "Adresa mora da bude u formatu: Ulica broj, Grad, Postanski broj";
    if (knjizara.godinaOsnivanja === "") return "Unesi godinu!";
    if (isNaN(Number(knjizara.godinaOsnivanja))) return "Pogresno uneta godina!";
    return "Podaci sacuvani!";
}