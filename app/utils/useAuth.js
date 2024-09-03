import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { jwtVerify } from "jose"

const useAuth = () => {
    const [loginUserEmail, setLoginUserEmail] = useState("")

    const router = useRouter() 

    useEffect(() => {  
        const checkToken = async() => { 
            const token = localStorage.getItem("token")
            // const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5leHVzN25leHVzQGljbG91ZC5jb20iLCJleHAiOjE3MTc1NDExNjR9.uAxEUZBzt2l-7tftdoW5eLxEWX09bwTgg9BbYmt0uO8"

            if(!token){
                router.push("/user/login")
            }

            try{
                const secretKey = new TextEncoder().encode("next-market-app-book")
                const decodedJwt = await jwtVerify(token, secretKey) 
                setLoginUserEmail(decodedJwt.payload.email) 
            }catch(error){
                router.push("/user/login")
            }
        }   
        checkToken() 
    }, [router]) 

    return loginUserEmail
}

export default useAuth