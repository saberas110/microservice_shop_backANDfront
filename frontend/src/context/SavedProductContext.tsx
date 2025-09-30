import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/uselocalstorage/useLocalStorage";




interface SaveProductContext{

    products:[]
    handleSaveProduct:(productId:number)=>void

}
interface SaveProductProdvider{
    children:React.ReactNode
}


export const SaveProductContext = createContext({}as SaveProductContext)

export const useSaveProductContext = ()=>{
    return useContext(SaveProductContext)
}




export default function SavedProductProvider({children}:SaveProductProdvider){

    const [products, setProducts] = useLocalStorage('savedProducts', [])


    const handleSaveProduct = (productId:number)=>{

        
        setProducts(prev=>{
            if(prev.includes(productId)){
                return prev.filter(item=>item!==productId)
            }else{
                 return [...prev, productId];
            }
        })
    }





    return(
        <SaveProductContext.Provider value={{
            handleSaveProduct,
            products
            
        }}
        
        >



            {children}


        </SaveProductContext.Provider>
    )




}