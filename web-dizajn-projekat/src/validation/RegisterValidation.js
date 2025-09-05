export function registerValidation(user) {
    if (user.email === "") return "Unesi email!";
    if (!user.email.includes("@")) return "Pogresno unet email!";
    if (user.password === "") return "Unesi lozinku!";
    if (user.password !== user.passwordPotvrda) return "Lozinke se ne poklapaju!";
    if (user.ime === "") return "Unesi ime!";
    if (user.prezime === "") return "Unesi prezime!";
    if (user.korisnickoIme === "") return "Unesi korisnicko ime!";
    if (user.adresa === "") return "Unesi adresu!";
    if (user.adresa.split(",").length !== 3) return "Adresa mora da bude u formatu: Ulica broj, Grad, Postanski broj";
    if (user.date === null) return "Unesi datum rodjenja!";
    if (user.telefon === "") return "Unesi telefon!";
    if (isNaN(Number(user.telefon))) return "Pogresno unet telefon!";
    if (user.zanimanje === "") return "Unesi zanimanje!";
    return "Uspesna registracija";
}