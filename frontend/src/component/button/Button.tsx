import React, {ComponentProps} from "react";

 type TVariant = 'primary'|'secondary'|'danger'|'success'|'warning'
type TButton = ComponentProps<'button'> & {
    variant? : TVariant
}
export function Button({children,className,variant,...rest}:TButton){

    return(
        <button  {...rest} className={`cursor-pointer rounded p-1 text-w ${className} ${checkVariant(variant)}`}  >
            {children}
        </button>
    )
}

function checkVariant(variant?:TVariant){
     switch (variant){
         case "primary":
             return 'bg-blue-500 text-white'
         case 'danger':
             return 'bg-red-500 text-white'
         case 'secondary':
             return 'bg-gray-200 text-black-800'
         case 'warning':
             return 'bg-yellow-500 text-black-800'
         case 'success':
             return 'bg-green-700 text-white'
         default :
             return ''
     }
}