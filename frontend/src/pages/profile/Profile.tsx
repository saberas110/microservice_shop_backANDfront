
import { Outlet } from "react-router-dom";
import { Container } from "../../component/container/Container";
import ProfileSetting from "../../component/profile/ProfileSetting";






export default function Profile() {





    return (
        <>

            <Container>
                <div className=" flex justify-between pt-5">

                    <div className=" bg-gray-200 rounded shadow-2xl  w-2/3 mx-auto mb-10">

                        <Outlet />

                    </div>

                    <div className=" shadow-2xl rounded w-1/4 bg-white mb-10 border border-gray-300 h-150 ">

                        <ProfileSetting />

                    </div>
                </div>
            </Container>



        </>
    )
}