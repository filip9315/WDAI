import { useState } from 'react';

function Przycisk({funkcja} : {funkcja: () => void}){
    return(
        <button onClick={funkcja}>Dodaj</button>
    )
    
}

export default function NowyLicznik(){

    const [count, setCount] = useState(0);

    function increment(){
        setCount(count + 1)
    }

    return(
        <div>
            <p>{count}</p>
            <Przycisk
                funkcja={increment}
            />
        </div>
    )
}