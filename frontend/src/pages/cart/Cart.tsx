import {Container} from "../../component/container/Container.tsx";
import CartItem from "../../component/cartItem/CartItem.tsx";
import {Button} from "../../component/button/Button.tsx";
import {useShoppingCartContext} from "../../context/ShoppingCartContext.tsx";
import {useAuthContext} from "../../context/AuthContext.tsx";
import {Link, useLocation, useNavigate} from "react-router-dom";


export function Cart() {
    const {cartItem, total} = useShoppingCartContext()
    const {user} = useAuthContext()
    const location = useLocation();
    const navigate = useNavigate()


    return (
        <div>
            <Container>
                <div className='flex flex-row-reverse justify-between'>
                    <div className='pb-4'>
                        {Object.values(cartItem)?.map((item, index) => {
                            return <CartItem key={index} item={item}/>
                        })}

                    </div>
                 <div className=''>
                        <div className='shadow p-4 w-70 text-right bg-gray-50 '>
                        <p className='shadow p-2'>قیمت کل:{total.toLocaleString()}</p>
                        <p className='shadow p-2'>تخفیف شما:200</p>
                        <p className='shadow p-2'>قیمت نهایی:1,800</p>
                    </div>
                    {user ? (
                            <Link to={'/order'}><Button variant='success' className='mt-3'>
                                تایید و تکمیل سفارش
                            </Button></Link>
                        ) :
                        (
                            <Button onClick={() => navigate('/login', {state: {from: location}})}
                                    variant='success' className='mt-3'>
                                ابتدا وارد شوید
                            </Button>
                        )
                    }
                 </div>
                </div>

            </Container>
        </div>
    )
}