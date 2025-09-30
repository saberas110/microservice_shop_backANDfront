import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../component/button/Button";
import { Container } from "../../component/container/Container";
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerlogin } from "../../services/api";
import { useAuthContext } from "../../context/AuthContext";


export function Register() {
    const location = useLocation()
    const phone_number = location.state?.phone_number
    const navigate = useNavigate()
    const {setUser} = useAuthContext()

    const schema = yup.object().shape({
        phone_number: yup.string().required(),
        password: yup.string().min(6, 'پسوورد حد اقل باید 6 کاراکتر باشد').max(12, 'پسوورد حداکثر باید 12 کاراکتر باشد').required('پسوورد را وارد کنید'),
        confirm_password: yup.string().oneOf([yup.ref('password')], 'passwords not matching').required('پسوورد را وارد کنید'),
        otp_code: yup.string().required('کد 4 رقمی را وارد کنید')

    })



    async function handle_register(data) {

        try {
            const response = await registerlogin(data)
            console.log('response is ', response);
            setUser(response.user, response.exp)
            

            navigate('/', { state: { message: 'ثبت نام با موفقیت انجام شد' } })

        } catch (error) {
            console.log('register failed:', error);
        }


    }




    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })


    return (
        <div className=" bg-radial-[at_25%_25%] from-white to-zinc-300 to-75% h-dvh w-full flex flex-row    ">
            <Container>

                <h1 className="text-2xl font-black text-center mb-10 mt-3 "> ثبت نام</h1>
                {/* <h2 className="border border-gray-400 rounded font-bold mb-3 text-right shadow shadow-2xl
                     w-150 py-5 ml-40 pr-3 bg-cyan-100 text-green-950">کد 4 رقمی به شماره ی شما ارسال شد </h2> */}

                <form onSubmit={handleSubmit(handle_register)}
                    className=" relative shadow-2xl shadow-gray-500 rounded   w-full sm:w-full lg:w-70/100  h-120   bg-gray-50  flex flex-col  " >


                    <div className="  px-5 mt-10 flex flex-col gap-3 w-full sm:w-1/2 xl:w-35/100 xl:ml-15 items-center ">

                        <input {...register('phone_number')} placeholder="09121234567"
                            className=" text-center border border-gray-400 rounded w-full py-2" type="text" value={phone_number} />

                        <input {...register('password')} placeholder="password"
                            className=" text-center border border-gray-400 rounded w-full py-2 " type="text" />

                        {errors.password && (<h2 className=" w-72  ml-5 font-medium  text-right text-red-700 ">!{errors.password?.message} </h2>)}
                        <input {...register('confirm_password')} placeholder="condfirm password"
                            className=" text-center border border-gray-400 rounded w-full py-2" type="text" />

                        {errors.confirm_password && (<h2 className=" w-72  ml-5 font-medium  text-right text-red-700 ">!{errors.confirm_password?.message} </h2>)}

                        <input {...register('otp_code')} placeholder="code"
                            className=" text-center border border-gray-400 rounded w-full py-2 " type="text" />
                        {errors.otp_code && (<h2 className="  w-72  ml-5 font-medium  text-right text-red-700 ">!{errors.otp_code?.message} </h2>)}

                        <Button type="submit" className="  w-full my-3  py-2 " variant="primary" > ورود / ثبت نام</Button>

                    </div>




                    <div className=" absolute right-0 w-0 sm:w-1/2 h-full ">
                        <img className="h-full w-full" src="database\login-vector.jpg" alt="" />
                    </div>


                </form>

            </Container>
        </div>
    )
}