import { useEffect, useState } from "react";
import { useSaveProductContext } from "../../context/SavedProductContext";
import { searchServiece } from "../../services/api";
import { Container } from "../container/Container";
import ProductItem from "../productitem/ProductItem";




export default function SavedProducts() {

    const { handleSaveProduct, products } = useSaveProductContext()
    const [savedProducts, setSavedProducts] = useState()

    useEffect(() => {

        if (products.length !== 0) {

            searchServiece("ids", products.join(",")).then(res => {
                setSavedProducts(res)
            })
        } else {
            setSavedProducts(null)
        }



    }, [products])



    return (

        <div>
            <div className="bg-gray-200 h-screen py-5 ">

                <Container>
                    <div className="flex flex-row-reverse justify-between rounded bg-white gap-10 py-5 px-4 mb-5  ">
                        <div className="flex flex-row-reverse gap-10 ">
                            <h1 className="font-bold text-sm pt-">مرتب سازی بر اساس</h1>
                            <button className="cursor-pointer " onClick={(e) => sortedProduct('expensive', e)}>گرانترین</button>
                            <button className="cursor-pointer " onClick={(e) => sortedProduct('cheap', e)} >ارزان ترین</button>
                            <p>جدیدترین</p>
                        </div>



                    </div >

                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-4 xl:grid-cols-3 xl:gap-4 '>

                        {
                            savedProducts?.map((product) => {
                                console.log('product', product)
                                return (

                                    <ProductItem product={product} />

                                )
                            })
                        }
                    </div>
                </Container>
            </div>
        </div>

    )



}