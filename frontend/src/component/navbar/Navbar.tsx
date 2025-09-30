import {Link, useLocation} from "react-router-dom";
import {Container} from "../container/Container.tsx";
import {FaShoppingBasket} from 'react-icons/fa'
import {useShoppingCartContext} from "../../context/ShoppingCartContext.tsx";
import {SearchNavbar} from "../search/Search-Navbar.tsx";
import {categories} from "../category/CategoryParent.tsx";
import CategoryParent from "../category/CategoryParent.tsx";
import {  useEffect, useRef} from "react";


function Navbar() {
    const location = useLocation()
    const divRef = useRef<HTMLElement>(null)


    useEffect(() => {
        if (divRef.current) {
            const links =  divRef.current.querySelectorAll("a");
            links.forEach(link => {
                link.classList.remove("text-red-500", "font-bold")
                if (location.pathname === link.pathname) {
                    link.classList.add("text-red-500", "font-bold")
                }
            })
        }


    }, [location.pathname]);


    const {cartItem} = useShoppingCartContext()
    return (
        <div className="sticky top-0 bg-white shadow-md z-50 ">
            <SearchNavbar/>
            <div className=' h-14 border-b shadow flex  items-center mb-4'>

                <Container>
                    <div ref={divRef}
                         className=' flex flex-row-reverse gap-3 px-2 justify-between    sm:flex sm:justify-between sm:flex-row-reverse   '>
                        <ul className='flex flex-row-reverse'>
                            <CategoryParent key={categories[0].id} data={categories[0]} isRoot={true}/>


                            <li className='mx-4'><Link to='/'>خانه</Link></li>
                            <li className='ml-4'><Link to='/store'>فروشگاه</Link></li>

                            <li className='ml-4'><Link to='/tamrin'>تمرین</Link></li>
                            <li className='ml-4'><Link to='/search'>جست و جو</Link></li>

                        </ul>
                        <div className='shadow relative '>
                            <Link to='/cart'> <FaShoppingBasket size={25} color="blue"></FaShoppingBasket></Link>
                            <span className={' absolute flex justify-center text-center text-xs w-4 h-4 -top-2 ' +
                                ' -right-3 rounded-full opacity-80 bg-red-600'}>{cartItem ? Object?.keys(cartItem)?.length : 0}</span>
                        </div>
                    </div>
                </Container>
            </div>

        </div>
    )

}

export default Navbar