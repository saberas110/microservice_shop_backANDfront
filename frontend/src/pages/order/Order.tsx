import {Container} from "../../component/container/Container.tsx";
import CartItem from "../../component/cartItem/CartItem.tsx";
import {Button} from "../../component/button/Button.tsx";
import {useShoppingCartContext} from "../../context/ShoppingCartContext.tsx";
import {useEffect, useState} from "react";
import {getAddresses, sendOrder} from "../../services/api.ts";
import {useNavigate} from "react-router-dom";



export default function Order() {
    const {cartItem, total, removeCart} = useShoppingCartContext()
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)
    const navigate = useNavigate()
        useEffect
    ( () => {
         getAddresses().then(res=>setAddresses(res))

    }, []);


let address = addresses?.find(address=>address.id == selectedAddress)

   async function setOrder() {
        if (address){
            console.log('selectedadd', selectedAddress)
            try {
             const order =    await sendOrder(cartItem, address)
                console.log(order.message)
                removeCart()
                navigate('/pay', {state:{message:order.message}})
            }catch (error){
                console.log('noooot', error)
            }
        }
    }

    return (
        <div>
            <Container>

                <div className='flex flex-row-reverse justify-between'>
                    <div>
                        <div className='mb-10 mt-3 border border-blue-300 p-3 rounded-xl'>
                            <h1 className='text-right text-blue-400 '>ارسال به ادرس انتخاب شده</h1>
                            {addresses && (
                                <div className='flex flex-row-reverse items-center justify-end'>
                                    <label htmlFor="province" className="font-bold">
                                        آدرس
                                    </label>
                                    <select
                                            id="address"
                                            name="address"
                                            className="border rounded p-2 m-2"
                                            value={selectedAddress || ""}
                                            onChange={(e)=>{setSelectedAddress(e.target.value)}}
                                    >
                                        <option value="" disabled>
                                           انتخاب آدرس
                                        </option>
                                        {addresses.map((address, index) => (
                                            <option
                                                    key={index} value={address.id}>
                                                {address.address}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className='pb-4 '>
                            {Object.values(cartItem)?.map((item, index) => {
                                return <CartItem key={index} item={item}/>
                            })}

                        </div>
                    </div>

                    <div>
                        <div className='shadow p-4 w-70 text-right bg-gray-50 '>
                            <p className='shadow p-2'>قیمت کل:{total.toLocaleString()}</p>
                            <p className='shadow p-2'>تخفیف شما:200</p>
                            <p className='shadow p-2'>قیمت نهایی:1,800</p>
                        </div>

                        <Button onClick={()=>setOrder()}
                            variant='success' className='mt-3'>
                            تایید و تکمیل سفارش
                        </Button>
                    </div>


                </div>


            </Container>
        </div>
    )
}