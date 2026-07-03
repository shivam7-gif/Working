import { useState } from "react";
import {Button} from "./ui/button";
import {Input} from "./ui/input";
import {toast} from "sonner";
import axios from "axios";
import {BACKEND_URL} from "../lib/config";
export function Form(){
    const[gitHub , setGitHub] = useState("");
    // const[linkedin ,setLinkedin] = useState("");
    async function onSubmit(){
        if(!gitHub ){
            toast("It's not a github Or Linkedin", {
          description: "Please provide valid github and linkedin urls",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
          position : "top-center"
        })
        }
        await axios.post(`${BACKEND_URL}/api/v1/pre-interview`,{
            gitHub
        })
        console.log("Form submitted", { gitHub});
    }
    return(

        <div className ="h-screen w-screen flex justify-center items-center">
      <div>
        <h2 className ="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">Ai Interviewer Kickstart</h2>
        <Input placeholder ="GitHub URL" onChange ={(e)=> setGitHub(e.target.value)}/>
        <div className="flex justify-center pt-4">
          <Button onClick={onSubmit} >Start Interview</Button>
          <Button onClick={() => toast("Event has been created")}>Toast check</Button>
        </div>
      </div>
    </div>
)
}