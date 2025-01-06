import { useEffect, useState } from 'react';

export default function LicznikEfekt(){

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("Hello world!")
    }, [])

    useEffect(() => {
        console.log("Licznik zwiększył się do " + count)
    }, [count])

    return(
        <div>
            <p>{count}</p>
            <button onClick={() => {setCount(count + 1)}}>Dodaj</button>
        </div>
    )
}