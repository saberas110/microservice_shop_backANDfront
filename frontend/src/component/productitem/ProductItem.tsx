import { use, useEffect, useRef, useState } from 'react'
import { Button } from '../button/Button'
import { useShoppingCartContext } from '../../context/ShoppingCartContext'
import { Link } from 'react-router-dom'
import { useSaveProductContext } from '../../context/SavedProductContext'
function ProductItem({ product }) {

    const [ishover, setIsHover] = useState(false)

    const { cartItem, handleDecreaseProductQty, unique_id_generator, deleteCart ,addToCart} = useShoppingCartContext()

    const { handleSaveProduct, products } = useSaveProductContext()
    const [color, setColor] = useState('')
    
    useEffect(()=>{

         setColor(product?.properties?.[0].color_code)

    })


    


    return (

        <div onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}


            className='shadow shadow-2xl  rounded pb-2 bg-white relative '>


            <div className='border-b flex justify-center '>
                <img className='rounded-t   h-50    ' src={product?.images?.[0]?.image} alt="imageeeeeeeeer" />
            </div>

            <div className='flex justify-between  px-4 mt-3'>
                <h3 className='line-clamp-1 w-50 font-bold'>{product.title}</h3>
                <span className='font-bold'>{product?.properties?.[0].price.toLocaleString()}</span>
            </div>
            <div className='px-4 mt-1 '>
                <p className='line-clamp-2 text-left text-gray-600'>
                    {product.title}</p>
            </div>


            <div className={` absolute bottom-0  w-full bg-white/95 h-18  z-50 p-3 transition-transform duration-300 translate-y-0
    ${ishover ? "opacity-100 visible translate-y-0 " : "opacity-0 invisible translate-y-full"}`}>

                <div className='flex justify-between w-3/4 mx-auto h-10  items-center '>

                    <div className='flex flex-row gap-2'>
                        {products.some(item => item === product.id) ? (
                            <Button onClick={() => handleSaveProduct(product.id)}
                                variant='secondary' className='rounded-2xl' >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>


                            </Button>
                        ) :
                            (
                                <Button onClick={() => handleSaveProduct(product.id)}
                                    variant='secondary' className='rounded-2xl' >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>


                                </Button>
                            )
                        }

                        {Object.values(cartItem).some(item=>item.id==product.id) ? (
                            <Button onClick={() => deleteCart(product.id)}
                                variant='secondary' className='rounded-2xl'  >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>

                            </Button>
                        ) :
                            (
                                <Button onClick={() => addToCart(product, color)}
                                    variant='secondary' className='rounded-2xl'  >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>

                                </Button>
                            )
                        }





                    </div>
                    <Link to={`/product/${product.id}`} >

                        <Button variant='secondary' className='rounded-2xl text-sm h-7 ' >مشاهده محصول</Button>

                    </Link>



                </div>

            </div>


        </div>
    )
}

export default ProductItem