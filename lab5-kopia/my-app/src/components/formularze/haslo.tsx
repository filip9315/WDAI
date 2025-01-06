import { useState, useRef } from "react";

export default function Haslo(){

    const [message, setMessage] = useState<string>("")

    const input1 = useRef<HTMLInputElement>(null);
    const input2 = useRef<HTMLInputElement>(null);

    function handleChange(){
        let in1 = input1.current?.value || ''
        let in2 = input2.current?.value || ''
        if(in1 != in2){
            setMessage("Hasła nie są takie same!")
        } else if(in1 == '' && in2 == ''){
            setMessage("Proszę wpisać hasło")
        } else if(in1 == in2){
            setMessage("")
        }
    }

    return(
        <div>
            <p>Wpisz hasło:</p> 
            <input type="text" id="haslo" onChange={handleChange} ref={input1}></input>
            <p>Powtórz hasło:</p>
            <input type="text" id="haslo2" onChange={handleChange} ref={input2}></input>
            <div>{message}</div>
        </div>
    )
}