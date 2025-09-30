import { useState } from "react"
import { Button } from "../button/Button";
import  {DragScroll} from "./DragScroll"




export default function ImagesSlider({ images }) {

    

    

    


    const [currentIndex, setCurrentIndex] = useState(0)


    const goToNext = () => {

        setCurrentIndex(previndex => previndex === images.length - 1 ? 0 : previndex + 1)
    }

    const goToPrevious = () => {

        setCurrentIndex(previndex => previndex === 0 ? images.length - 1 : previndex - 1)
    }

    return (

<div className="flex flex-col ">

        <div className="flex flex-row items-center ">

            <Button onClick={goToPrevious} variant="secondary" className="size-10">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>


            </Button>

          
                <img src={images[currentIndex].image} alt="" className="w-full h-60  " />
            




            <Button onClick={goToNext} variant="secondary" className="size-10">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>


            </Button>

        </div>

        {/* <div className="grid grid-cols-3 "
        >

            {images.map((image,i)=>(

                <div className=" border border-gray-300 rounded p-1 m-2 ">
                    <img src={image.image} className="w-full h-full opacity-60"  alt="" />
                </div>

            ))}

        </div> */}

        <DragScroll images={images} 
        onSelect = {(index)=>setCurrentIndex(index)}
        outSelect ={currentIndex} />

</div>

    )


}