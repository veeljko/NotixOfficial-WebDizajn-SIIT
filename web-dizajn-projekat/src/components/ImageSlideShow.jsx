import React, {useState} from "react"
import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";

function ImageSlideShow({images}) {
    const [nextIndex, setNextIndex] = useState (0);
    const arrayLength = images.length;

    function handleForwardClick (){
        if (nextIndex < arrayLength - 1) {
            setNextIndex(nextIndex + 1);
        } else {
            setNextIndex(0);
        }
    }

    function handleBackClick (){
        if (nextIndex > 0 ){
            setNextIndex(nextIndex - 1);
        } else {
            setNextIndex(arrayLength - 1);
        }
    };

    return(<>
            <div className="flex justify-center gap-5">
                <img onClick={handleBackClick} src={leftArrow} alt="back arrow" style={{width: 25}}></img>
                <div className="">
                    <img src={images[nextIndex]} alt="Nick" className="w-50 h-75" loading="lazy"></img>
                </div>
                <img onClick={handleForwardClick} src={rightArrow} alt="back arrow" style={{width: 25}}></img>
            </div>
            <div className="flex justify-center pt-1 pb-2">
                <p>{nextIndex + 1} / {images.length}</p>
            </div>
        </>
    )
}

export default ImageSlideShow;