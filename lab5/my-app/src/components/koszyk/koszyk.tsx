import Produkt from "./produkt";

export default function Koszyk(){
    return(
        <div>
            <Produkt
                nazwa='Jabłko'
            />
            <Produkt
                nazwa='Banan'
            />
            <Produkt
                nazwa='Gruszka'
            />
            <Produkt
                nazwa='Śliwka'
            />
            <Produkt
                nazwa='Pomidor'
            />
        </div>
        
    )
}