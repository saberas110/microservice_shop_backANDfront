
import { Button } from "../../component/button/Button";
import { Container } from "../../component/container/Container";
import { send_phonenumber } from "../../services/api"
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'



export function Otp() {
    const navigate = useNavigate()


    const schema = yup.object().shape({
        phone_number: yup.string().required('این فیلد اجباری است').length(11, "شماره تلفن باید دقیقاً 11 رقم باشد"),

    })





    async function handleregister(formdata) {

        console.log('start',);

        try {
            const data = await send_phonenumber(formdata.phone_number)

            console.log('Logged in:', data);
            navigate('/register', { state: { phone_number: formdata.phone_number } })
        }
        catch (error) {
            console.log('Login failed:', error);

        }

    }


    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })







    return (
        <div className="bg-radial-[at_25%_25%] from-white to-zinc-300 to-75% min-h-screen w-full flex flex-row  pb-10  ">
            <Container>

                <h1 className="text-2xl font-black text-center mb-10 mt-3 "> ثبت نام</h1>

                <form onSubmit={handleSubmit(handleregister)} className=" relative shadow-2xl shadow-gray-500 rounded 
                  w-full sm:w-full lg:w-70/100  h-120   bg-gray-50  flex flex-col  justify-center"  action="">


                    <div className=" relative px-5 mt-10 flex flex-col gap-5 w-full sm:w-1/2 xl:w-35/100 xl:ml-15 items-center ">

                        <label className=" absolute -top-3 w-1/2  bg-gray-50 text-center text-sm" htmlFor="">شماره تلفن خود را وارد کنید</label>
                        <input placeholder="09121234567"
                            className=" text-center border border-gray-400 rounded w-full py-4 "
                            type="text"
                            maxLength='11'
                            {...register('phone_number')}

                        />



                        {errors.phone_number && (
                            <h2 className=" w-72 mt-22 ml-5 font-medium  text-right text-red-700 ">
                                !{errors.phone_number?.message} </h2>)}
                        <Button type="submit" className=" w-full   left-5  py-2  " variant="primary"> ورود / ثبت نام</Button>
                    </div>






                    <div className="  absolute  w-0  sm:w-1/2 h-full right-0   ">
                        <img className=' h-full w-full ' src="database\login-vector.jpg" alt="" />
                    </div>


                </form>

            </Container>
        </div>
    )


}