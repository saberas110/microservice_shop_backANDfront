import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { Container } from "../container/Container";
import useWindowSize from "../../hooks/usewindowssize/useWindowSize";
import Drawer from "../drawer/Drawer";
import { useEffect, useRef, useState } from "react";
import { searchServiece } from "../../services/api";

import useDebounce from "../../hooks/usedebounce/useDebounce";
import { useAuthContext } from "../../context/AuthContext";

export function SearchNavbar() {
    const navigate = useNavigate()
    const [showdrawer, setShowdrawer] = useState(false)
    const { width } = useWindowSize()
    const { user, loading } = useAuthContext()
    const [search, setSearch] = useState({ text: '', isresponse: false, response: [] })
    const searchoff = { text: '', isresponse: false, response: [] }
    const sdt = useDebounce(search.text?.trim(), 700)

    const boxRef = useRef(null)
    const location = useLocation()

    useEffect(() => {



        if (sdt !== '') {
            searchServiece('quick',sdt).then((res) => {
                res[0] && setSearch(prev => ({
                    ...prev,
                    response: res,
                    isresponse: true
                }))


            })
        } else {
            setSearch(searchoff)
        }

        function handleClickOutSide(event) {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setSearch(searchoff)
            }
        }


        document.addEventListener('mousedown', handleClickOutSide)


        return () => {
            document.removeEventListener('mousedown', handleClickOutSide)
        }

    }, [sdt])


    useEffect(() => {

        setSearch(searchoff)



    }, [location])



    return (
        <Container>
            {width > 768 ? (
                <div className=" relative  w-full h-14 my-3 flex flex-row-reverse justify-between">
                    <div ref={boxRef}  className="  relative  w-1/3 h-full   flex-row-reverse flex " >
                        <Button variant="primary" className="absolute  py-2 px-5 my-1.5 right-1 ">
                            search
                        </Button>
                        <input 
                        value={search.text} onChange={(e) => setSearch(prev => ({ ...prev, text: e.target.value }))} placeholder="نام محصول مورد..."
                            className="bg-gray-50 border w-full border-gray-400
                rounded text-right pr-25 " type="text" />

                        {search.isresponse &&
                            (


                                <div className="opacity-98 absolute rounded right-0 
                                top-15  w-1/2  z-50 bg-gray-300 " >
                                    {search.response.map(item => (
                                        <h1 className="m-5 border-b border-dashed pb-2"><Link to={`/product/${item.id}`} >{item.name}</Link></h1>
                                    ))}
                                </div>

                            )}



                    </div>

                    {loading ? (
                        <div>

                        </div>
                    ) : (

                        <div className=" flex ">
                            {user ? (
                                <div className=" flex ">


                                    <Button className="border border-gray-400 rounded-2xl w-30 ">
                                        <Link to='profile'>پروفایل من</Link>
                                    </Button>

                                </div>
                            ) : (
                                <div className="flex flex-row p-2 gap-2 ">

                                    <Button variant="primary" className="w-30  rounded-2xl py-2 text-center "><Link to='/otp'>ثبت نام</Link>
                                    </Button>


                                    <Button className="border border-gray-400  rounded-2xl w-20 ">
                                        <Link to='/login'> ورود</Link>
                                    </Button>

                                </div>)}
                        </div>)}



                </div>)
                :
                <div className=" relative  w-full h-14 my-3 flex flex-row justify-between px-5">


                    <figure className="size-12">
                        <img src="src/assets/user.png" alt="" />
                    </figure>

                    <div>

                        <svg onClick={() => setShowdrawer(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>

                        {showdrawer && <Drawer isopen={showdrawer} onclose={() => setShowdrawer(false)} />}

                    </div>






                </div>





            }
        </Container>

    )
}