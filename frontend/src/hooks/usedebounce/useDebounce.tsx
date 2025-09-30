import { useEffect, useState } from "react";


export default function useDebounce(value:string, delay:number){
    
    
    const [debouncevalue, setDebounceValue] = useState(value)

    useEffect(()=>{

        const handler = setTimeout(()=>{
            setDebounceValue(value)
        },delay)

        return ()=>{
            clearTimeout(handler)
        }

    },[value, delay])
    console.log('im from debounce', debouncevalue);
    

    return debouncevalue

}