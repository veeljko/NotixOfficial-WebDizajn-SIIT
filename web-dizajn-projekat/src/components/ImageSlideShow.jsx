import React, {useState} from "react"
import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";

function ImageSlideShow({images}) {
    //Array of images >>>

    // State variable is set to 0 = the first index in our array >>>
    const [nextIndex, setNextIndex] = useState (0);

    //Update "images" to your array name >>>
    const arrayLength = images.length;

    //onClick function to move "forward" one instance in our array
    function handleForwardClick (){
        if (nextIndex < arrayLength - 1) {
            setNextIndex(nextIndex + 1);
        } else {
            setNextIndex(0);
        }
    }

    //onClick function to move "backward" one instance in memory
    function handleBackClick (){
        if (nextIndex > 0 ){
            setNextIndex(nextIndex - 1);
        } else {
            setNextIndex(arrayLength - 1);
        }
    };

    //Below is our display>>>
    return(<>
            <div className="flex justify-center gap-5 pb-5">
                <img onClick={handleBackClick} src={leftArrow} alt="back arrow" style={{width: 25}}></img>
                <div className="">
                    <img src={images[nextIndex]} alt="Nick" className="w-50 h-75"></img>
                </div>
                <img onClick={handleForwardClick} src={rightArrow} alt="back arrow" style={{width: 25}}></img>
            </div>
        </>
    )
}

export default ImageSlideShow;