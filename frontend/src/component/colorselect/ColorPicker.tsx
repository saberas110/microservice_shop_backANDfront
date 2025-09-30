import { Check } from "lucide-react";
import { useEffect, useState } from "react";



export function ColorPicker({colors,getColor}){
    
    
const [selectedColor, setSelectedColor] = useState(null)



useEffect(()=>{

    if(selectedColor==null&&colors?.[0]){
        setSelectedColor(colors[0])
        getColor(selectedColor)
    }else{
        getColor(selectedColor)
    }


},[selectedColor, colors])


    return (
        <div className="flex gap-4">
            
            {colors.map((color:string, index:number)=>
                
                <div onClick={()=>setSelectedColor(color)}
                 key={index} className="relative size-7 rounded-full border cursor-pointer " style={{backgroundColor:color}}>
                    {color===selectedColor && <Check className= {`absolute inset-0  ${color=='#ffffff'? "text-black":"text-white" }`} />}
                </div>
        )}
            
            
        </div>
    )
}