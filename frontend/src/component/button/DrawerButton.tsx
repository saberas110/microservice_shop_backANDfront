import { useState } from "react";

export default function DrawerButton({children , className, buttonText}) {
  const [isOpen, setIsOpen] = useState(false);

  return (

    <>

      <button onClick={() => setIsOpen(!isOpen)} className={` h-10 items-center bg-gray-300 rounded flex justify-between  
        ${className}`} >
        <h1>{buttonText}</h1>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"

          className={`size-6 transform duration-1000 ${isOpen ? "rotate-180" : ""}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>


      </button>

      <div className={`  overflow-hidden transition-all duration-500
        ${isOpen ? "max-h-60 p-3 " : 'max-h-0 p-0'}`} >


       {children}


      </div>

    </>


  )

}