function Footer() {
    return (
        <footer className="w-full bg-blue-600 text-white py-4 mt-10 ">
            <div className="text-center text-sm">
                © {new Date().getFullYear()} Veljko Mladenovic. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;