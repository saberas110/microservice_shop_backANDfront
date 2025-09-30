import {useEffect, useState} from "react";
import {Button} from "../button/Button";
import ProvinceSelect from "../selectedprovinces/ProvinceSelect.tsx";
import {useForm, FormProvider} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {saveAddress} from "../../services/api.ts";


export default function AddressDrawer({data, changeedit, setRefsh}) {

    const [edit, setEdit] = useState(data)

    const schema = yup.object().shape({
        address : yup.string().required(),
        receiver_phone  : yup.string().required(),
        province  : yup.string().required(),
        city : yup.string().required(),
        plaque : yup.string().required(),
        postcode : yup.string().required(),
        unit : yup.string(),

    })

   async function handleAddress(data){
        try {
            const response = await saveAddress(data)
            console.log(response,'response')
            setRefsh(prev=>!prev)
            changeedit(false)

        }catch (error){
            console.log(error)
        }
    }


    useEffect(() => {

        setEdit(data)

    }, [data])


    const methods = useForm({resolver:yupResolver(schema)})
    return (

        <div>
            {edit && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 overflow-auto">
                    {/* مودال */}
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 w-96 animate-slideDown "
                    >
                        <h2 className="text-xl font-bold mb-4 text-center">افزودن ادرس</h2>
                        <form className="flex flex-col gap-4" onSubmit={methods.handleSubmit(handleAddress)}>
                            <FormProvider {...methods} >

                            <ProvinceSelect/>
                            <input
                                {...methods.register('receiver_phone')}
                                type="text"
                                placeholder=" شماره تلفن گیرنده"
                                className="border border-gray-300 rounded p-2"
                            />

                            <input
                                {...methods.register('address')}
                                type="text"
                                placeholder="*آدرس"
                                className="border border-gray-300 rounded p-2"
                            />
                            <input
                                {...methods.register('plaque')}
                                type="text"
                                placeholder="*پلاک"
                                className="border border-gray-300 rounded p-2"
                            />
                            <input
                                    {...methods.register('postcode')}

                                type="text"
                                placeholder="*کدپستی"
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
                                </FormProvider>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}