import { Button } from '../components/Button'
import PlusIcon from '../icons/PlusIcon'
import ShareIcon from '../icons/ShareIcon'
import { Card1 } from '../components/Card3D'
import CreateContent from '../components/Create'
import { useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { YtIcon } from '../icons/yt'
import { TwitterIcon } from '../icons/twitter'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Nav'


export default function Dashh() {
  const [modalOpen, setModalOpen] = useState(false)
    const {contents , setContents,refresh} = useContent();
    const navigate = useNavigate();

    async function fetchUserInfo() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user`, { withCredentials: true });
        const userI = response.data; // This contains the user info
      } catch (error) {
        console.error('Error fetching user info:', error);
        navigate("/signup");
        return null;
      }
    }

    async function logout() {
      try {
        const response = await axios.get(`${BACKEND_URL}/logout`, { withCredentials: true });
        if (response.status === 200) {
          // Display a success message (e.g., using a modal or toast)
          console.log("Successfully Logged Out.");
          navigate("/signin");
          alert("Logged Out , Sign in again")
        }
      } catch (error) {
        console.error("Logout failed:", error);
        // Display an error message
      }
    }


    async function shareBrain() {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/brain/share`,
          { share: true },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
    
        if (response.data && response.data.message) {
          const shareUrl = `http://localhost:5173${response.data.message}`;
          alert(`Here is your shareable link: ${shareUrl}`);
        } else {
          alert("Failed to generate a shareable link. Please try again.");
        }
      } catch (error) {
        console.error("Error sharing brain:", error);

        //@ts-ignore

        if (error.response) {
          // @ts-ignore
          const { status, data } = error.response;
    
          if (status === 500) {
            alert("Server error: Unable to generate the link. Please try again later.");
          } else {
            alert(data.error || "An unexpected error occurred.");
          }
        } else {
          alert("No response from the server. Check your internet connection.");
        }
      }
    }
    


    // refresh when u click the cross icon

  useEffect(() => {
    refresh();
    // fetchUserInfo();
  }, [modalOpen]);



  function handleDelete(link: string) {
    setContents((prevContents) =>
      prevContents.filter((content) => content.link !== link)
    );
  }

  return (
    <div className="flex flex-col relative h-screen w-screen
     overflow-x-hidden
  bg-gradient-to-br from-law via-ren to-cium
   before:absolute before:left-[5%] before:top-[5%]
  before:h-[60%] before:w-[60%] before:animate-blob before:origin-center
before:bg-red-200 before:rounded-full before:blur-[80px]
before:brightness-125

after:absolute after:right-[5%] after:bottom-[10%]
after:h-[60%] after:w-[60%] after:animate-blob-reverse after:origin-center
after:bg-purple-600 after:rounded-full after:blur-[80px]
after:brightness-125
    ">

<div id="Navbar" className="w-screen bg-black pt-3 z-10 pl-5 pr-5 flex justify-between">
            <div id="leftSide" className="">
                <img className="h-10 m-2 mt-0" src="src\assets\lll2.png" alt="logo" />
            </div>
            <div id="rytSide" className="flex">

            {/* <Button
     onclick={shareBrain}  
     variant="primary" 
     text='Share Brain' 
     startIcon={<ShareIcon/>}/> */}
    

    <Button onclick={()=>{
        setModalOpen(true);
      }} variant='secondary' text='Add Content' startIcon={<PlusIcon/>}/>

            <button 
            onClick={logout}
            className="relative m-2 mt-0 w-24 inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Logout
            </span>
            </button>

            </div>
        </div>

    <div className='p-4 min-h-screen z-10'>
      <CreateContent open={modalOpen} onclose={()=>{
        setModalOpen(false);
      }}/>
      
    <div className='flex  justify-end '>

    </div>
    
    <div className='flex items-start flex-wrap'>
    
    {contents.length === 0 ? (
  <div className='h-screen w-screen flex items-center justify-center'>
    No data to show 
    Start Creating One
    </div>
) : (
  contents.map(({ title, link, type, _id, userId }) => (
    <Card1
      onDelete={handleDelete}
      type={type}
      link={link}
      keyId={userId}
      keyy={_id}
      appIcon={type === "youtube" ? <YtIcon /> : <TwitterIcon />}
      title={title}
    />
  ))
)}
    </div>
    
    </div>
    </div>
  )
}

