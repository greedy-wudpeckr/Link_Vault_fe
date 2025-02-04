import { ReactElement } from "react";
import Trash from "../icons/Trash";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { CardContainer } from "./3Dcard";
import { XEmbed } from "react-social-media-embed";

interface CardProps {
  appIcon: ReactElement;
  type: "youtube" | "twitter";
  title: string;
  link: string;
  keyy: string;
  keyId: string;
  onDelete: (link: string) => void;
}

// Utility function to validate Twitter links
function isValidTwitterLink(url: string): boolean {
  return /^https?:\/\/(www\.)?(twitter|x)\.com\/\w+\/status\/\d+/.test(url);
}

export function Card1(props: CardProps) {
  async function deleteCard(event: React.MouseEvent) {
    event.preventDefault();
    console.log(props);

    try {
      // Send delete request to the server
      const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: {
          contentId: props.keyy, // Assuming `keyy` is the unique content ID
          //@ts-ignore
          userId: props.keyId._id,
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
    <CardContainer className="border-2 bg-black flex flex-col border-gray-200 rounded-md p-4 m-4 max-w-72">
      <div id="1st box" className="flex w-full justify-between">
        <div id="1st left" className="flex pl-3">
          <div className="pr-2 text-white">{props.appIcon}</div>
          <div className="text-white">{props.title}</div>
        </div>
        <div id="1st ryt" className="flex">
          <div onClick={deleteCard} className="pr-2 cursor-pointer text-white">
            <Trash />
          </div>
        </div>
      </div>
      <div id="2nd box">
        <div className="pt-4 hover:z-50">
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
          ) : isValidTwitterLink(props.link) ? (
            <XEmbed url={props.link} width={500} height={600} />
          ) : (
            <p className="text-white">Invalid Twitter/X link</p>
          )}
        </div>
      </div>
    </CardContainer>
  );
}
