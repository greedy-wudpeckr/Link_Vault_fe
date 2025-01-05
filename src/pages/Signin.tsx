import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";



export function SignIn(){

    const userRef = useRef<HTMLInputElement>();
    const passRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

   async function signup(){
        const username = userRef.current?.value; 
        const password = passRef.current?.value;

       const response = await axios.post(BACKEND_URL + "/api/v1/signin", {username, password});
       const jwt = response.data.token;
       localStorage.setItem("token", jwt);
       navigate("/dashboard");
        
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded p-4 border min-w-48">
        <Input refe={userRef} placeholder="Username"/>
        <Input refe={passRef} placeholder="Password"/>
        <div className="flex justify-center">
        <Button onclick={signup} variant="primary" text="SignIn" fullWidth={true}/>
        </div>
        </div>
    </div>
}