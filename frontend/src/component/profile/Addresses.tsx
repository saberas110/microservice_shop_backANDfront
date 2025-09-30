import {Button} from "../button/Button.tsx";
import {useEffect, useState} from "react";

import AddressDrawer from "../drawer/AddressDrawer.tsx";
import {deleteAddress, getAddresses, selectedAddress} from "../../services/api.ts";

export default function Addresses() {
    const [edit, setEdit] = useState(false)
    const [addresses, setAddresses] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [addressSetting, setAddressSetting] = useState<number | null>(null)

    useEffect(() => {
        getAddresses().then(res => {
            setAddresses(res)
            console.log(addresses, 'addresses')
        })
        console.log('im from get address')
    }, [refresh]);

    async function selectedAddss(id) {
        await selectedAddress(id)
    }

    async function editAddress(id: number) {
        console.log('hello from eddit')
        setEdit(!edit)

    }


    return (
        <div className='flex flex-col items-end gap-3'>
            <div className='flex justify-between w-full'>
                <Button onClick={() => setEdit(!edit)}
                        className='m-3' variant='primary'>افزودن ادرس
                </Button>
                     <AddressDrawer
                    data={edit}
                    changeedit={setEdit}
                    setRefsh={setRefresh}
                />
                <div className="flex gap-2 m-4 ">
                    <h1 className="text-3xl  font-black">ادرس</h1>
                    <h1 className="text-3xl text-red-600 font-black">ویرایش </h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                        <path
                            d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"/>
                        <path
                            d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"/>
                    </svg>


                </div>
            </div>
            {addresses?.map(address => (
                <div onClick={async () => {
                    await selectedAddss(address.id)
                    setRefresh(prevState => !prevState)
                }}
                     className={`flex flex-col gap-3  cursor-pointer w-2/3  p-5 ${address.isSelected ? 'rounded border-3 border-blue-600' : 'rounded border border-gray-400'} `}>
                    <AddressDrawer
                        data={edit}
                        changeedit={setEdit}
                        setRefsh={setRefresh}
                    />
                    <div className='flex flex-row-reverse justify-between '>
                        <div className='flex'>

                            <h1 className={`text-xl ${address.isSelected && 'text-blue-500'} `}>{address.address}</h1>


                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="size-6 text-gray-400">
                                <path fillRule="evenodd"
                                      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                      clipRule="evenodd"/>
                            </svg>

                        </div>
                        <button className='relative' onClick={(e) => {
                            e.stopPropagation();
                            setAddressSetting(
                                addressSetting === address.id ? null : address.id
                            );
                            console.log(addressSetting)

                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                            </svg>
                            {addressSetting === address.id &&
                                <div className='absolute left-0 mt-2 w-40 bg-white/80 rounded-xl  shadow-md z-20 p-2'>
                                    <p onClick={() => editAddress(address.id)}
                                       className="cursor-pointer hover:bg-gray-100 p-1">ویرایش</p>
                                    <p onClick={async () => {
                                        await deleteAddress(address.id)
                                        setRefresh(prevState => !prevState)
                                    }} className="cursor-pointer hover:bg-gray-100 p-1">حذف</p>
                                </div>}
                        </button>

                    </div>
                    <div className='pr-5 flex flex-col gap-3 items-end'>
                        {/*<h1 className=''>ج تلخاب، خ. امام خمینی</h1>*/}
                        <h1 className='flex gap-2 '>
                            <span>{address.postcode}</span>
                            <span dir='rtl'>کد پستی : </span>
                        </h1>
                        <h1 className='text-right'>{address.province}-{address.city}</h1>

                    </div>
                </div>

            ))}

        </div>
    )
}