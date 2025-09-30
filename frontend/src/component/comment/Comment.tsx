import { Container } from "../container/Container.tsx";
import { StarRating } from './Star'
import { Button } from "../button/Button.tsx";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext.tsx";


export function Comment({ comments }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('')
    const { user, loding } = useAuthContext()



    return (
        <Container>

            <div className='min-h-screen rounded-lg bg-white  shadow flex flex-col items-end ml-auto w-3/4 '>
                {user ? (

                    <>
                         <h1 className='text-right text-2xl font-bold p-3 '>نظرت در مورد این محصول چیه؟</h1>
                        <form className=' border border-gray-300 rounded-lg w-3/4 h-100 m-3   ' action="">
                            <div className=' m-3 flex flex-col items-end '>
                                <p className='font-bold text-right '>امتیاز شما</p>
                                <div className=' my-2  '>
                                    <StarRating onChange={(value) => setRating(value)} />
                                </div>
                                {/*<div className=' border border-gray-300 rounded-lg w-3/4 h-60 m-3 ml-auto flex flex-col items-end '>*/}

                                <textarea onChange={(e) => setComment(e.target.value)} className='border border-gray-300 rounded-lg text-right m-3 h-40 w-3/4 p-2 '
                                    placeholder='متن خود را وارد کنید'></textarea>

                                {/*</div>*/}
                                <Button variant='success' className='px-3 text-lg m-3'>
                                    ثبت نظر
                                </Button>
                            </div>
                        </form>
                    </>
              
                ):
                <div></div>
                }

                <h1 className=' text-right mt-10 text-2xl font-bold '> : نظرات </h1>


                {comments?.map(comment => {
                    console.log(comment)
                    return (
                        <div className='rounded-lg border border-gray-300 shadow w-3/4 h-100 right-20 mt-6 m-3'>
                            <div className='flex  flex-row-reverse'>
                                <h2 className=' text-right m-1 mt-0  text-gray-400  '>صابر اسدی</h2>
                                <p className=' text-right text-xs m-1 text-gray-400'>1404/01/01</p>
                            </div>
                            <p className='rounded-lg border border-gray-300 shadow text-right h-5/7 mr-20 ml-3 mb-2 p-5'>{comment.text}</p>
                        </div>
                    )
                })}


            </div>


        </Container>
    )
}