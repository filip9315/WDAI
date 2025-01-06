import { useState } from 'react';

export default function Licznik(){

    const [count, setCount] = useState(localStorage.clickcount);

    function handleClick(){
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount) + 1;
        } else {
            localStorage.clickcount = 1;
        }
        setCount(localStorage.clickcount)
    }

    return(
        <div>
            <p>{count}</p>
            <button onClick={handleClick}>Dodaj</button>
        </div>
    )
}