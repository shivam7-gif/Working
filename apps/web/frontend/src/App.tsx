import "./index.css";
import {useState} from "react";
import {Form} from "./components/Form";
import { Interview } from "./components/Interview";
import {Result} from "./components/Result";
import {Toaster} from "sonner";
export function App() {
  const [page ,setPage] = useState<"form" | "interview" | "result">("form");
  return (
    <div className= "h-screen w-screen flex justify-center items-center">
     {
      page == "form" && <Form/>
     }
     {
      page == "interview" && <Interview/>
     }
     {
      page == "result" && <Result/>
     }
     <Toaster/>
    </div>
  );
}

export default App;
