
import { Link, useLocation } from "react-router-dom"
import ProductItem from "../../component/productitem/ProductItem"
import { Container } from "../../component/container/Container"
import SearchPlus from "../../component/search/SearchPlus"
import { useEffect, useState, type MouseEvent } from "react"




export default function Search() {

    const location = useLocation()
    const productsloc = location.state?.products
    const titlesearch = location.state?.titlesearch

    const [products, setProducts] = useState([])


    useEffect(() => {

        setProducts(productsloc)


    }, [productsloc])


    console.log('im from search', productsloc);




    const sortedProduct = (sortedby, e: MouseEvent) => {

        const buttons = e.currentTarget.parentNode?.querySelectorAll('button')

        buttons?.forEach(btn => btn.classList.remove('text-red-600'))

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


        <div className=" bg-gray-200 w-full min-h-screen py-10 ">

            <Container>
                {titlesearch ?
                    <div className='items-center text-right p-4 flex flex-row-reverse gap-3 shadow-xl h-17 mb-5   rounded-xl bg-gray-100  '>
                        <h1 className='font-s text-right text-2xl  flex flex-row-reverse font-bold' >جست و جو بر اساس </h1>
                        <p className="text-red-600 text-2xl font-black">" {titlesearch} " :</p>
                    </div> :
                    <h1 className='text-right p-4 flex flex-row-reverse font-bold' >صفحه ی جست و جو</h1>}


                <div className=" flex flex-row justify-between">
                    <div className="w-2/3 flex flex-col " >

                        <div className="flex flex-row-reverse justify-between rounded-xl bg-white gap-10 py-5 px-4 mx-4">
                            <div className="flex flex-row-reverse gap-10 ">
                                <h1 className="font-bold text-sm pt-">مرتب سازی بر اساس</h1>
                                <button className="cursor-pointer " onClick={(e) => sortedProduct('expensive', e)}>گرانترین</button>
                                <button className="cursor-pointer " onClick={(e) => sortedProduct('cheap', e)} >ارزان ترین</button>
                                <p>جدیدترین</p>
                            </div>

                            <p>تعداد کالاهای پیداشده : {products?.length || 0}</p>


                        </div >

                        <div className='  m-4   rounded   grid grid-cols-1 gap-4 
                    sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-4 xl:grid-cols-3 xl:gap-4 '>
                            {
                                products?.map((product, i) => {
                                    return (
                                        
                                            <ProductItem key={i} product={product} />
                                        
                                    )
                                })
                            }
                        </div>

                    </div>

                    <div className="w-1/4  bg-white rounded ">

                        <SearchPlus />
                    </div>

                </div>

            </Container>
        </div>



    )
}