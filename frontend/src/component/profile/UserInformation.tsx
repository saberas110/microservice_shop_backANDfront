import { useState } from "react";
import { Button } from "../button/Button";
import { Container } from "../container/Container";
import FormDrawer from "../drawer/FormDrawer";



export default function UserInformation() {
    const [edit, setEdit] = useState(false)

    console.log('edit', edit);





    return (

        <div className="w-full h-50  mx-auto ">
            <div className="flex justify-between">

                <Button onClick={() => setEdit(!edit)}
                    variant="primary" className=" m-4 w-20 h-10 flex items-center gap-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                    <h1>ویرایش</h1>

                </Button>
                <FormDrawer data={edit} changeedit={(e)=>{
                    setEdit(e)}} />



                <div className="flex gap-2 m-4 ">
                    <h1 className="text-3xl  font-black" >پروفایل</h1>
                    <h1 className="text-3xl text-red-600 font-black">ویرایش </h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>


                </div>

            </div>

            <div className=" mx-auto w-9/10  mt-10 rounded bg-white p-4 ">

                <table className="w-full   text-right ">
                    <tbody className="w-full  flex flex-col gap-2   ">
                        <tr className="w-full flex flex-row-reverse gap-70 border-b py-2 ">
                            <td className="flex flex-col gap-4">
                                <h1 className="text-lg ">: نام و نام خانوادگی </h1>
                                <p className="text-sm">صابر اسدی</p>
                            </td>
                            <td className="flex flex-col gap-4">
                                <h1 className="text-lg ">: شماره تلفن</h1>
                                <p className="text-sm mb-1">09181234567</p>
                            </td>

                        </tr>
                        <tr className="w-full flex flex-row-reverse gap-70 border- py-2 ">
                            <td className="flex flex-col gap-4">
                                <h1 className="text-lg ">: ایمیل</h1>
                                <p className="text-sm"> saber@gmail.com</p>
                            </td>
                            <td className="flex flex-col gap-4">
                                <h1 className="text-lg ">: آدرس</h1>
                                <p className="text-sm mb-1">اراک-خ دانشگاه </p>
                            </td>

                        </tr>
                    </tbody>

                </table>

            </div>

        </div>

    )

}