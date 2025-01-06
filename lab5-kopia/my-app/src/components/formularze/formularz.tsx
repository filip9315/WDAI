import { useState } from "react";

export default function Fromularz(){

    const [t, setT] = useState<string>("");
    let myInput = document.getElementById("in")

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setT(event.target.value)
    }
    

    return(
        <div>
            <div>{t}</div>
            <input type="text" onChange={handleChange} value={t}></input>
        </div>
        
    )
}