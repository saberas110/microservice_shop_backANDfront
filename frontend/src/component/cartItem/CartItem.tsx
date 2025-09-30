import {Button} from "../button/Button.tsx";
import {useShoppingCartContext} from "../../context/ShoppingCartContext.tsx";
import {Link, useLocation} from 'react-router-dom';


function CartItem({item}) {
    const {handleIncreaseProductQty, handleDecreaseProductQty, deleteCart, cartItem} = useShoppingCartContext()
    const location = useLocation()
    console.log(location.pathname)


    return (

        <div className='shadow  flex flex-row-reverse p-2'>

            <Link to={`/product/${item.id}`}>
                <img className='rounded size-25' src={item?.image} alt="image "/>
            </Link>

            <div className='mr-4 shadow relative flex flex-col gap-2 '>
                <h3 className='text-right w-80 line-clamp-1'>{item.name}</h3>
                {/*<div className='mt-2 shadow absolute right-0'>*/}
                {location.pathname !== "/order" && <div className='mt-2 shadow  text-right '>
                    <Button onClick={() => deleteCart(item.id, item.color)} className='mx-2 '
                            variant='danger'>Remove</Button>
                    <Button onClick={() => handleIncreaseProductQty(item.id, item.color)} className='px-2'
                            variant='primary'>+</Button>
                    <span className='mx-2'>{item.qty}</span>
                    <Button onClick={() => handleDecreaseProductQty(item.id, item.color)} className='ml-2 px-2'
                            variant='primary'>-</Button>
                </div>}
                <div className='text-right p-2 flex flex-row gap-2' dir='rtl' >
                    <span>
                        رنگ کالا :
                    </span>
                    <h1 className=' size-5 border rounded-full '
                    style={{backgroundColor:item.color}}
                    >

                    </h1>
                </div>
            </div>


        </div>
    )

}

export default CartItem