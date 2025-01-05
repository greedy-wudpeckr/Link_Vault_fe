import { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signup(){
    
    const userRef = useRef<HTMLInputElement>();
    const passRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

   async function signup(){
        const username = userRef.current?.value; 
        const password = passRef.current?.value;

        await axios.post(BACKEND_URL + "/api/v1/signup", {username, password});
        alert("Signup successful");
        navigate("/signup");
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded p-4 border min-w-48">
        <Input refe={userRef} placeholder="Username"/>
        <Input refe={passRef} placeholder="Password"/>
        <div className="flex justify-center">
        <Button onclick={signup} variant="primary" text="Signup" fullWidth={true}/>
        </div>
        </div>
    </div>
}