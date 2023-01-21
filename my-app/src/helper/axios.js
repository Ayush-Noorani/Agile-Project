import axios from "axios"


const url=process.env.SERVER_URL

export const axiosInstance=axios.create({
    baseURL:url
})
axiosInstance.interceptors.request.use(async config=>{

    if(['post','get','put','delete'].includes(config.method)){
        try{
                let token= await localStorage.getItem('token')
                console.log(token)
                config.headers['Authorization']=`Bearer ${token}`
                config.headers['Access-Control-Allow-Origin']='*'
        }catch(e){
            console.log(e)
        }
        return config
    }
})
