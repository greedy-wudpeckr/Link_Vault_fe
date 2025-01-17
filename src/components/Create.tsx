import { useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon"
import  {Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";


axios.defaults.withCredentials = true;

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter"
}

async function fetchUserInfo() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user`, { withCredentials: true });
      return response.data; // This contains the user info
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  }


export default  function CreateContent({ open, onclose }: { open: boolean, onclose: () => void }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

 async function addContent() {
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;
      const user = await fetchUserInfo();
      if (!user) {
        console.error('User not logged in');
        return;
      }
      

      await axios.post(BACKEND_URL + "/api/v1/content", {
        link,
        title,
        type,
        userId : user._id
      },{withCredentials : true});

      onclose();
  }

  return (
      <div className="z-10">
          {open && (
              <div className="w-screen z-10 h-screen bg-slate-500 fixed top-0 left-0 flex justify-center items-center bg-opacity-50">
                  <div  className="bg-white rounded p-4 shadow-lg">
                      <div className="cursor-pointer flex pl-2  justify-end" onClick={onclose}><CrossIcon /></div>
                      <div>
                          <Input refe={titleRef} placeholder="Title" />
                          <Input refe={linkRef} placeholder="Link" />
                      </div>

                      <div id="2 btns" className="flex justify-center">
                          <Button
                              onclick={() => setType(ContentType.Youtube)}
                              variant={type === ContentType.Youtube ? "primary" : "secondary"}
                              text="Youtube"
                          />
                          <Button
                              onclick={() => setType(ContentType.Twitter)}
                              variant={type === ContentType.Twitter ? "primary" : "secondary"}
                              text="Twitter"
                          />
                      </div>

                      <div className="flex justify-center">
                          <Button onclick={addContent} variant="primary" text="Submit" />
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
}