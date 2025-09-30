import { useState } from "react"
import { Button } from "../button/Button";
import { searchServiece } from "../../services/api";
import { useNavigate } from "react-router-dom";



export const categories = [
    {
        id: 0,
        name: 'محصولات',
        children: [
            {
                id: 1,
                name: "الکترونیک",
                children: [
                    {
                        id: 2,
                        name: "موبایل",
                        children: [
                            { id: 3, name: "سامسونگ" },
                            { id: 4, name: "اپل" }
                        ]
                    },
                    {
                        id: 5,
                        name: "لپ‌تاپ",
                        children: [
                            { id: 6, name: "ایسوس" },
                            { id: 7, name: "لنوو" }
                        ]
                    }
                ]
            },
            {
                id: 8,
                name: "پوشاک",
                children: [
                    { id: 9, name: "مردانه" },
                    { id: 10, name: "زنانه" }
                ]
            }
        ]
    }
];





export default function CategoryParent({ data, isRoot = false }) {


    const [isopen, setIsOpen] = useState(false)
    const [activeCat, setActiveCat] = useState(null)
    const [submenuTop, setSubmenuTop] = useState(0);
    const navigate = useNavigate()

    const handleSearchByCategory = (category:string)=>{
            searchServiece('category', category).then(res=>{
                console.log(res);
                
               navigate('/search', {state:{products:res, titlesearch:category}})
                
            })

    }



    return (

        <div className="  relative  "
            onMouseEnter={() => isRoot && setIsOpen(true)}
            onMouseLeave={() => {
                setActiveCat(null)
                isRoot && setIsOpen(false);
            }}>

            {isRoot && (
                <div className="w-30 ">




                    <Button variant="primary" className="w-full text-left pl-3 flex flex-row-reverse gap-2 ">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>

                        {data.name}
                    </Button>
                </div>
            )}


            {(!isRoot || isopen) && data.children && (
                <div className=" absolute right-0 z-10  text-right  flex flex-row-reverse gap-20 " >
                    <div className="  flex flex-col gap-2   min-w-[120px] border-r  bg-gray-100 shadow-xl rounded border border-gray-300 ">

                        {data.children.map(item => (

                            <button
                                key={item.id}
                                onClick={()=> handleSearchByCategory(item.name) }
                                onMouseEnter={(e) => {
                                    setActiveCat(activeCat === item.id ? null : item.id)
                                    setSubmenuTop(e.currentTarget.offsetTop);
                                    
                                }}
                                className={`py-2 hover:bg-gray-200 w-full cursor-pointer ${activeCat == item.id ? "bg-blue-500" : ""} `}
                            >
                                {item.name}

                            </button>

                        ))}
                    </div>

                    {activeCat && data.children?.find(c => c.id === activeCat)?.children &&


                        <div className={`absolute right-full min-w-[120px] border-r  bg-blue-100 `}
                            style={{ top: submenuTop }}>



                            <CategoryParent data={data.children?.find(c => c.id === activeCat)}
                                isRoot={false} />


                        </div>
                    }
                </div>
            )

            }

        </div>
    )


}