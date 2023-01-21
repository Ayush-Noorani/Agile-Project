

export const onChange=(e:any, key:any, setValue:React.Dispatch<React.SetStateAction<any>>)=>{
    setValue((prev:any)=>({
        ...prev,
        [key]:e
    }))
}