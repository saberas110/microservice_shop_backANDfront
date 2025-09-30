import { Children, createContext, useContext, useEffect, useState } from "react";

interface IAuthContext{
    logout:()=>void
}



export const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}



export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    function saveUser(user, exp){

        const userData = {user, exp:exp*1000}
        localStorage.setItem('auth', JSON.stringify(userData))
        setUser(userData)


    }

    const logout = ()=>{
        localStorage.removeItem('auth')
        setUser(null)
    }




useEffect(()=>{

    const userData = localStorage.getItem('auth')
    if(userData){
        const dataparsed = JSON.parse(userData)
        if(dataparsed.exp>Date.now()){

            setUser(dataparsed)
        }else{
            console.log('logout');
            
            logout()
        }
    }
        setLoading(false)
},[])

return (

    <AuthContext.Provider value = {{user,setUser:saveUser,loading,logout}} >

        {children}

    </AuthContext.Provider>
)

}