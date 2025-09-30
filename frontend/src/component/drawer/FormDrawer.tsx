import {  useEffect, useState } from "react";
import { Button } from "../button/Button";


export default function FormDrawer({ data, changeedit}) {


    const [edit, setEdit] = useState(data);



    useEffect(()=>{

        setEdit(data)

    },[data])



console.log('from form ', data);


    return (

        <div>
            {edit && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm  z-50">
                    {/* مودال */}
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 w-96 animate-slideDown "
                    >
                        <h2 className="text-xl font-bold mb-4 text-center">ویرایش اطلاعات</h2>
                        <form className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="نام و نام خانوادگی"
                                className="border border-gray-300 rounded p-2"
                            />
                            <input
                                type="text"
                                placeholder="شماره تلفن"
                                className="border border-gray-300 rounded p-2"
                            />
                            <input
                                type="email"
                                placeholder="ایمیل"
                                className="border border-gray-300 rounded p-2"
                            />
                            <input
                                type="text"
                                placeholder="آدرس"
                                className="border border-gray-300 rounded p-2"
                            />
                            <div className="flex justify-between mt-4">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setEdit(false)
                                        changeedit(false)
                                    }}
                                    variant="secondary"
                                    className="px-4 py-2"
                                >
                                    انصراف
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="px-4 py-2"
                                >
                                    ذخیره
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}