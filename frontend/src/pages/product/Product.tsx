import { useParams } from "react-router-dom";
import { Container } from "../../component/container/Container.tsx";
import { Button } from "../../component/button/Button.tsx";
import { useEffect, useState } from "react";
import { getProduct } from "../../services/api.ts";
import { useShoppingCartContext } from "../../context/ShoppingCartContext.tsx";
import { Comment } from '../../component/comment/Comment.tsx'
import useWindowSize from "../../hooks/usewindowssize/useWindowSize.tsx";
import ImagesSlider from "../../component/showimages/ImagesSlider.tsx";
import { ColorPicker } from "../../component/colorselect/ColorPicker.tsx";



function Product() {
    const { width } = useWindowSize()
    const params = useParams<{ id: string }>()
    const [product, setProduct] = useState({})
    const { handleIncreaseProductQty, handleDecreaseProductQty, getProductQty, deleteCart, cartItem, unique_id_generator,addToCart} = useShoppingCartContext()
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    useEffect(() => {

        getProduct(params.id as string).then((data) => {
            setProduct({ ...data })


                ;
        })
    }, [params])

    const colors: string[] = []
    product?.properties?.forEach(obj => {
        colors.push(obj.color_code)
    });



    return (
        <div className='min-h-screen bg-gray-100 p-6'>
            <Container>
                {width > 768 ? (
                    <div className=' bg-white  shadow  my-4 grid grid-cols-12  pb-10'>
                        <div className=' col-span-3 p-2'>
                            <div className='shadow  mb-5 border-b  '>

                                {product.images && product.images.length > 0 && (
                                    <ImagesSlider images={product?.images} />
                                )}
                            </div>
                            <div
                                className='rounded text-center w-1/3 shadow mx-auto px-1 bg-cyan-50'>{getProductQty(parseInt(params.id as string), selectedColor)}:
                                تعداد
                            </div>
                            <div >
                                {cartItem[unique_id_generator(params.id, selectedColor)]? (
                                    <>
                                        <div className='flex justify-center px-3 pt-3 '>
                                            <Button className='px-7 mr-1 font-bold ' variant='primary' onClick={() => {
                                                handleIncreaseProductQty(product.id, selectedColor)
                                            }}>+ </Button>

                                            <Button className='px-7 ml-1 font-bold' variant='primary'
                                                onClick={() => {
                                                    handleDecreaseProductQty
                                                        (parseInt(params.id as string), selectedColor)
                                                }}>-</Button></div>
                                        <div className='flex justify-center px-3 pt-3 '>
                                            <Button className='px-4 py-2' variant='danger' onClick={() => {
                                                deleteCart(parseInt(params.id as string), selectedColor)
                                            }}>حذف از سبد خرید </Button>
                                        </div>
                                    </>)
                                    :
                                    (<div className='flex justify-center px-3 pt-3 '>
                                        <Button className='px-3 py-2' variant='success' onClick={() => {
                                            addToCart(product, selectedColor)
                                        }}>
                                            افزودن به سبد خرید

                                        </Button></div>)
                                }

                            </div>
                        </div>
                        <div className='  shadow col-span-9 m-2 p-4 '>
                            <h1 className="font-bold">
                                <span dir="ltr">{product.name}</span>
                                {" -- "}
                                <span dir="rtl">رم {product.ram}</span>
                                {" -- "}
                                <span dir="rtl">حافظه  {product.memory}</span>
                            </h1>                            <div>
                               <div className="my-3 flex gap-2">
                                    <p>قیمت :</p>
                                     {product?.properties?.map(item=>{
                                    console.log(item.color_code);
                                    
                                    if(item.color_code == selectedColor){
                                       return <h1>
                                        <span dir="rtl">تومان</span>
                                        <span className='font-bold '   > {item.price.toLocaleString()} </span>
                                        
                                       </h1>
                                    }
                                })}

                               </div>


                                <p className='line-clamp-2 text-gray-500'>{product.title}.....</p>
                            </div>
                            <div className="m-6">
                                <h1 className="mb-3 font-black">رنگ مورد نظر را انتخاب کنید</h1>
                                <ColorPicker colors={colors} getColor={(sc) => setSelectedColor(sc)} />
                            </div>
                        </div>
                    </div>
                ) : (



                    <div className=' bg-white   shadow  my-4 grid grid-cols-1  '>
                        <div>
                            <div className='shadow  mb-5 border-b '>
                                <img className='p-1' src={product.images?.[0].image} alt="image" />
                            </div>
                            <div
                                className='rounded text-center w-1/3 shadow mx-auto px-1 bg-cyan-50'>{getProductQty(parseInt(params.id as string))}:
                                تعداد
                            </div>

                        </div>

                    </div>









                )}
            </Container>
            <Comment comments={product.comments} />
        </div>
    )
}

export default Product