import React, {useEffect, useState} from "react";

function ImageUploader({setNewKnjiga, flag}) {
    const [images, setImages] = useState([]);


    function update(images) {
        setNewKnjiga(prev => ({
            ...prev,
            slike: images
        }));
    }

    useEffect(() => {
        setNewKnjiga(prev => ({
            ...prev,
            slike: images,
        }));
    }, [images]);

    useEffect(() => {
        setImages([]);
    }, [flag])


    const handleUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setImages((prev) => [...prev, { id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()), url, file }]);
        
        e.target.value = "";
    };

    const handleDelete = (id) => {
        setImages((prev) => {
            const img = prev.find((x) => x.id === id);
            if (img) URL.revokeObjectURL(img.url);
            return prev.filter((x) => x.id !== id);
        });
    };

    return (
        <div className="pb-2 pt-3">
            <div className="flex gap-5 flex-wrap pb-1">
                {images.map((img) => (
                    <div key={img.id} className="relative">
                        <img
                            src={img.url}
                            alt=""
                            className="w-20 h-20 object-cover rounded-lg border"
                        />
                        <button
                            type="button"
                            onClick={() => handleDelete(img.id)}
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white leading-none flex items-center justify-center hover:bg-red-600"
                            aria-label="Remove image"
                            title="Remove"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex justify-around pt-5 ">
                <label className="w-full flex justify-center border-2 rounded-lg p-2 items-center cursor-pointer hover:bg-gray-100">
                    <span className="text-gray-500 text-sm text-center">Dodaj sliku</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload}/>
                </label>
            </div>


        </div>
    );
}

export default ImageUploader;
