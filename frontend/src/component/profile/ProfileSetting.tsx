import {Link, useLocation, useNavigate} from "react-router-dom";
import {Container} from "../container/Container";
import {useEffect, useRef} from "react";

import {useAuthContext} from "../../context/AuthContext.tsx";
import {logoutApi} from "../../services/api.ts";


export default function ProfileSetting() {

    const location = useLocation();
    const divRef = useRef(null);
    const navaigate = useNavigate()
    const {logout} = useAuthContext()

    useEffect(() => {
        if (divRef.current) {
            const links = divRef.current.querySelectorAll("a");
            links.forEach((link) => {
                link.classList.remove("text-red-500", "font-bold");
                link.classList.add("text-gray-700");
                if (link.getAttribute("href") === location.pathname) {
                    link.classList.add("text-red-500", "font-bold");
                    link.classList.remove("text-gray-700");
                }
            });
        }
    }, [location.pathname]);

    async function logout_(){
        await logoutApi()
        logout()
        navaigate('/store')
    }

    return (
        <Container>


            <div className=" p-5">
                <div className="text-right flex flex-col gap-3  p-5 ">
                    <p>صابر اسدی</p>
                    <p className="text-xs text-emerald-500">09186949623</p>
                </div>

                <div ref={divRef} className="flex flex-col  gap-7 p-5 mt-7">

                    <div className="flex flex-row-reverse text-right gap-1 ">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-6 text-gray-400">
                            <path fillRule="evenodd"
                                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                  clipRule="evenodd"/>
                        </svg>
                        <Link className="text-[15px] cursor-pointer" to='/profile'>
                            اطلاعات حساب
                        </Link>


                    </div>
                    <div className="flex flex-row-reverse text-right gap-1 ">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-6 text-gray-400">
                            <path
                                d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"/>
                        </svg>

                        <button className="text-[15px] cursor-pointer">خرید های من</button>


                    </div>
                    <div className="flex flex-row-reverse text-right gap-1 ">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-6 text-gray-400">
                            <path fillRule="evenodd"
                                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                  clipRule="evenodd"/>
                        </svg>

                        {/*<button className="text-[15px] cursor-pointer font-thin" >ادرس های ذخیره شده </button>*/}
                        <Link className="text-[15px] cursor-pointer " to='/profile/addresses'>ادرس های ذخیره
                            شده</Link>
                    </div>
                    <div className="flex flex-row-reverse text-right gap-1 ">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-6 text-gray-400">
                            <path fillRule="evenodd"
                                  d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                  clipRule="evenodd"/>
                        </svg>

                        <Link className="text-[15px] cursor-pointer " to='/profile/saved'>محصولات ذخیره شده </Link>


                    </div>
                    <div className="flex flex-row-reverse text-right gap-1 ">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-6 text-gray-400">
                            <path fillRule="evenodd"
                                  d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                  clipRule="evenodd"/>
                        </svg>

                        <button className="text-[15px] cursor-pointer " onClick={()=>logout_()}>  خروج </button>


                    </div>


                </div>


            </div>


        </Container>
    )
}