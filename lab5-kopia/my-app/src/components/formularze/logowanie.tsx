import { useState, useRef } from "react";

export default function Logowanie(){

    const [disabled, setDisabled] = useState(true)
    const [zgodne, setZgodne] = useState(false)

    const input1 = useRef<HTMLInputElement>(null);
    const input2 = useRef<HTMLInputElement>(null);
    const login = useRef<HTMLInputElement>(null);

    function handleClick(zgodne: Boolean){
        if (zgodne){
            alert("Zalogowano poprawnie")
        } else{
            alert("Hasła nie są zgodne!")
        }
    }

    function handleChange(){
        let in1 = input1.current?.value || ''
        let in2 = input2.current?.value || ''
        let l = login.current?.value || ''


        if(in1 == '' || in2 == '' || l == ''){
            setDisabled(true)
        } else if(in1 != in2){
            setDisabled(false)
            setZgodne(false)
        } else if(in1 == in2){
            setDisabled(false)
            setZgodne(true)
        }
    }

    return(
        <div>
            <p>Nazwa uzytkownika:</p>
            <input type="text" id="login" onChange={handleChange} ref={login}></input>
            <p>Wpisz hasło:</p> 
            <input type="text" id="haslo" onChange={handleChange} ref={input1}></input>
            <p>Powtórz hasło:</p>
            <input type="text" id="haslo2" onChange={handleChange} ref={input2}></input>
            <button disabled={disabled} onClick={() => handleClick(zgodne)}>Logowanie</button>
        </div>
    )
}