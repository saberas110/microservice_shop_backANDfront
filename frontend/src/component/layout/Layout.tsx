import React from "react";
import Navbar from "../navbar/Navbar.tsx";

interface ILayout{
    children:React.ReactNode
}

export function Layout({children}:ILayout){

    return(
        <>
            <Navbar />
            {children}
        </>

    )
}