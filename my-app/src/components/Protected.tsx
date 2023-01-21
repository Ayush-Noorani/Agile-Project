import React from "react";


interface ProtectedProps {
    children: React.ReactNode | React.ReactNode[];
}
export const  Protected=({children}:ProtectedProps)=>{
    //validation to be implemented
    return (
        <div>
            {children}
        </div>
    )


}