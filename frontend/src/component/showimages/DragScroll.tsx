
import { use, useEffect, useRef, useState } from "react";



 export function DragScroll( {images, onSelect, outSelect}) {

 
  

  const divref = useRef<HTMLDivElement>(null);
  const isDrag = useRef(false)
  const prevScroll = useRef(0)
  const scroll = useRef(0)
  const startX = useRef(0)
  const x = useRef(0)
  const dcleft = (divref.current?.offsetLeft || 0)
  const [activeImageIndex, setActiveImageIndex] = useState()


  
  


function turnOnDrag (e){
e.preventDefault();
isDrag.current = true
startX.current = e.pageX - dcleft 

divref.current && (prevScroll.current = divref.current?.scrollLeft)

}

function drag (e){

if(isDrag.current && divref.current){
 
e.preventDefault();

x.current = (e.pageX - dcleft - startX.current) * 1

scroll.current = prevScroll.current - x.current;

divref.current && (divref.current.scrollLeft = scroll.current)

}

}
function stopDrag (e){

  isDrag.current = false
}

useEffect(()=>{

setActiveImageIndex(outSelect)


},[outSelect])




  return (


      <div ref={divref}
        onMouseDown={(e)=>turnOnDrag(e)}
        onMouseMove={(e)=>drag(e)}
        onMouseUp={(e)=>stopDrag(e)}
        onMouseLeave={(e)=>stopDrag(e)}
        className=" overflow-hidden whitespace-nowrap  no-scrollbar cursor-pointer flex  mt-2"
      >
       
      {images && images.map((image, i)=>(

        <div onClick={()=>{setActiveImageIndex(i)
          onSelect(i)
      }}
        className={`size-25  rounded m-4 shrink-0 opacity-70 
          ${activeImageIndex === i ? "border-2 border-blue-600":"border border-gray-300"} `}
        
        >
          <img src={image.image} alt="" />
        </div>


      ))}

      </div >
    
  )
}

