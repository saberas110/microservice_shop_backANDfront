import ProductItem from "../../component/productitem/ProductItem.tsx";
import { Container } from "../../component/container/Container.tsx";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/api.ts";
import { useEffect, useState, type MouseEvent } from "react";

function Store() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts().then((result) => {
            setProducts(result)

        })

    }, [])


    const sortedProduct = (sortedby, e:MouseEvent) => {

        const buttons = e.currentTarget.parentNode?.querySelectorAll('button')
        buttons?.forEach(btn=>btn.classList.remove('text-red-600'))
        e.currentTarget.classList.add('text-red-600')

        switch (sortedby) {

            case 'cheap':
                return setProducts([...products].sort((a, b) => a.price - b.price));
            case 'expensive':    
                return setProducts([...products].sort((a, b) => b.price - a.price));
            default:
                return;

        }
    }


    return (
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

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-4 xl:grid-cols-4 xl:gap-4 '>
                   
                    {
                        products.map((product) => {
                            
                            return (
                                
                                    <ProductItem product={product} />
                               
                            )
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default Store