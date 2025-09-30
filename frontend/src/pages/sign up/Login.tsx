import {replace, useLocation, useNavigate} from "react-router-dom";
import { Button } from "../../component/button/Button";
import { Container } from "../../component/container/Container";
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { login, registerlogin } from "../../services/api";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";



export default function Login(){


    const location = useLocation()
    const phone_number = location.state?.phone_number
    const navigate = useNavigate()
    const {setUser} = useAuthContext()
    const [responseErr, setResponseErr] = useState(null)
    const from = location.state?.from?.pathname || '/'

    const schema = yup.object().shape({
        phone_number: yup.string().required(),
        password: yup.string().min(6, 'پسوورد حد اقل باید 6 کاراکتر باشد').max(12, 'پسوورد حداکثر باید 12 کاراکتر باشد').required('پسوورد را وارد کنید'),
        
      

    })



    async function handle_register(data) {

        

        try {
            const response = await login(data)
            console.log('response is ', response);
            setUser(response.user, response.exp)


            navigate(from, {replace:true, state: { message: 'ورود شما با موفقیت انجام شد' } })

        } catch (error) {
            setResponseErr(error.response?.data.message)
            console.log('register failed:', error.response.data.message);
        }


    }

 const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })




    return (

<div className=" bg-radial-[at_25%_25%] from-white to-zinc-300 to-75% h-dvh w-full flex flex-row     ">
            <Container>

                <h1 className="text-2xl font-black text-center mb-10 mt-3 "> ورود </h1>

                

                <form onSubmit={handleSubmit(handle_register)}
                    className=" relative shadow-2xl shadow-gray-500 rounded   w-full sm:w-full lg:w-70/100  h-120   bg-gray-50  flex flex-col  justify-center " >
                        <h2 className="w-1/2 h-10  text-center  text-red-600">
{responseErr}
                        </h2>

                    <div className="  px-5 mt-10 flex flex-col gap-3 w-full sm:w-1/2 xl:w-35/100 xl:ml-15 items-center ">

                        

                        <input {...register('phone_number')} placeholder="phonenumber" maxLength={11}
                            className=" text-center border border-gray-400 rounded w-full py-2 " type="text" />

                        {errors.phone_number && (<h2 className=" w-72  ml-5 font-medium  text-right text-red-700 ">!{errors.phone_number?.message} </h2>)}

                        <input {...register('password')} placeholder="password"
                            className=" text-center border border-gray-400 rounded w-full py-2" type="text" />

                        {errors.password && (<h2 className=" w-72  ml-5 font-medium  text-right text-red-700 ">!{errors.password?.message} </h2>)}

                 

                        <Button type="submit" className="  w-full my-3  py-2 cursor-pointer" variant="primary" > ورود / ثبت نام</Button>

                    </div>




                    <div className=" absolute right-0 w-0 sm:w-1/2 h-full ">
                        <img className="h-full w-full" src="database\login-vector.jpg" alt="" />
                    </div>


                </form>

            </Container>
        </div>
    )

    
}