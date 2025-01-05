
import { Button } from '../components/Button'
import PlusIcon from '../icons/PlusIcon'
import ShareIcon from '../icons/ShareIcon'
import { Card } from '../components/Card'
import CreateContent from '../components/Create'
import { useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { YtIcon } from '../icons/yt'
import { TwitterIcon } from '../icons/twitter'

export default function Dash() {
  const [modalOpen, setModalOpen] = useState(false)
    const {contents , setContents,refresh} = useContent();

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
  }, [modalOpen]);



  function handleDelete(link: string) {
    setContents((prevContents) =>
      prevContents.filter((content) => content.link !== link)
    );
  }


  return (
    <div>
      <Sidebar/>
    <div className='p-4 ml-72 min-h-screen bg-slate-100 border-2'>
      <CreateContent open={modalOpen} onclose={()=>{
        setModalOpen(false);
      }}/>
      
    <div className='flex justify-end '>
    <Button
     onclick={shareBrain}  
     variant="primary" 
     text='Share Brain' 
     startIcon={<ShareIcon/>}/>
    

    <Button onclick={()=>{
        setModalOpen(true);
      }} variant='secondary' text='Add Content' startIcon={<PlusIcon/>}/>
    </div>
    
    <div className='flex items-start flex-wrap'>
    {contents.map(({title,link ,type } ) => (
        <Card 
         onDelete={handleDelete}
          type={type} 
          link={link} 
          appIcon={type === "youtube" ? <YtIcon /> : <TwitterIcon />}
          title={title} />
      ))}
    </div>
    
    </div>
    </div>
  )
}

