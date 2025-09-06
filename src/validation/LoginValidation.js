
export function loginValidation(user) {
    if (user.email === "") return "Unesi email!";
    if (!user.email.includes("@")) return "Pogresno unet email!";
    if (user.password === "") return "Unesi sifru!";
    return "Uspesno Logovanje!";
}