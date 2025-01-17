import { useNavigate } from "react-router-dom"

export default function Navbar(){
    const navigate = useNavigate();

    const signup = ()=>{
        navigate("/signup");
    };

    const signin = ()=>{
        navigate("/signin");
    }

    return (
        <div id="Navbar" className="w-screen -mt-3 bg-black pl-5 pr-5 z-10 flex justify-between">
            <div id="leftSide" className="">
                <img className="h-10 m-3" src="src\assets\lll2.png" alt="logo" />
            </div>
            <div id="rytSide" className="flex">



            <button className="relative m-3 w-24 inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={signup}>
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Signup
            </span>
            </button>

            <button className="relative m-3 w-24 inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={signin}>
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Signin
            </span>
            </button>


            </div>
        </div>
    )
}