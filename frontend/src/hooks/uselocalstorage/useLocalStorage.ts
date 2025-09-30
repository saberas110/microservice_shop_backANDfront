import {useEffect, useState} from "react";

export function useLocalStorage<T>(key:string, initialState:T) {
    const [value, setValue] = useState<T>(()=>{
        const localValue = localStorage.getItem(key)
        if (localValue != null){
            return JSON.parse(localValue)
        }else
            return initialState
    })
    useEffect(() => {

        localStorage.setItem(key, JSON.stringify(value))

    }, [value, key]);
    return [value, setValue] as [typeof value, typeof setValue]
}