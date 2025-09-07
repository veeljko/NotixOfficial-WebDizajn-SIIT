import React, { useState, useEffect } from "react";
import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";

function ImageSlideShow({ images }) {
    if (images === null) images = ["https:"]
    const [nextIndex, setNextIndex] = useState(0);
    const arrayLength = images.length;

    function handleForwardClick() {
        setNextIndex((prev) => (prev < arrayLength - 1 ? prev + 1 : 0));
    }

    function handleBackClick() {
        setNextIndex((prev) => (prev > 0 ? prev - 1 : arrayLength - 1));
    }

    useEffect(() => {
        if (images.length > 1) {
            const preloadNext = new Image();
            preloadNext.src = images[(nextIndex + 1) % arrayLength];

            const preloadPrev = new Image();
            preloadPrev.src = images[(nextIndex - 1 + arrayLength) % arrayLength];
        }
    }, [nextIndex, images, arrayLength]);

    return (
        <>
            <div className="flex justify-center gap-5">
                <img
                    onClick={handleBackClick}
                    src={leftArrow}
                    alt="back arrow"
                    style={{ width: 25 }}
                    className="cursor-pointer"
                />

                    <img
                        src={images[nextIndex]}
                        alt={`Slide ${nextIndex + 1}`}
                        className="w-75 h-90 object-contain rounded-lg shadow"
                        loading="lazy"
                    />

                <img
                    onClick={handleForwardClick}
                    src={rightArrow}
                    alt="forward arrow"
                    style={{ width: 25 }}
                    className="cursor-pointer"
                />
            </div>
            <div className="flex justify-center pt-1 pb-2">
                <p>
                    {nextIndex + 1} / {images.length}
                </p>
            </div>
        </>
    );
}

export default ImageSlideShow;
