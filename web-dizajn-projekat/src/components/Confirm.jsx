
function Confirm({ isOpen, onConfirm, onCancel, title, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-96 p-6">
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-gray-700 mb-4">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                        onClick={onCancel}
                    >
                        Otkazi
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Potvrdi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Confirm;
