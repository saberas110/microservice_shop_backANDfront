import {useAuthContext} from "../../context/AuthContext.tsx";
import {Navigate, Outlet} from "react-router-dom";

export default function IsAuthenticated() {

    const {user, loading} = useAuthContext();

    if (loading) {
        return <p>Loading...</p>; // یا یه spinner
    }

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>

}