import { ReactElement } from "react";
import  Trash  from "../icons/Trash";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface CardProps{
    appIcon : ReactElement;
    type : "youtube" | "twitter";
    title : string;
    link : string;
    keyy: string;
    keyId: string;
    onDelete : (link : string) => void;
}

// async function fetchUserInfo() {
//   try {
//     const response = await axios.get(`${BACKEND_URL}/api/v1/user`, { withCredentials: true });
//     return response.data; // This contains the user info
//   } catch (error) {
//     console.error('Error fetching user info:', error);
//     return null;
//   }
// }



export function Card(props: CardProps) {
    async function deleteCard(event: React.MouseEvent) {
        event.preventDefault(); 
        console.log(props);

        try {
          // Send delete request to the server
          const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
            data: {
              contentId: props.keyy, // Assuming `link` is used as the unique content ID
              //@ts-ignore
              userId : props.keyId._id  
            },
          });
    
          // Check if the server confirms deletion
          if (response.status === 200) {
            props.onDelete(props.link); // Notify the parent component to remove the card from UI
          } else {
            console.error("Failed to delete content:", response.data.error);
            alert("Failed to delete the content.");
          }
        } catch (error) {
          console.error("An error occurred while deleting content:", error);
          alert("An error occurred while deleting the content. Please try again.");
        }
      }
  
    return (
      <div className="border-2 border-gray-200 rounded-md p-4 m-4 max-w-72">
        <div id="1st box" className="flex justify-between">
          <div id="1st left" className="flex">
            <div className="pr-2">{props.appIcon}</div>
            <div>{props.title}</div>
          </div>
          <div id="1st ryt" className="flex">
            <div
              onClick={deleteCard}
              className="pr-2 cursor-pointer"
            >
              <Trash />
            </div>
          </div>
        </div>
        <div id="2nd box">
          <div className="pt-4">
            {props.type === "youtube" ? (
              <iframe
                className="w-full p-3"
                src={props.link.replace("youtu.be", "youtube.com/embed")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              <blockquote className="twitter-tweet">
                <a href={props.link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            )}
          </div>
        </div>
      </div>
    );
  }
  