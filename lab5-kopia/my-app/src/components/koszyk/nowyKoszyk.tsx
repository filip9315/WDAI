import Produkt from "./produkt";

export default function NowyKoszyk(){

    const Produkty: string[] = ['Jabłko', 'Banan', 'Gruszka', 'Śliwka', 'Pomidor'];

    return(
        <>
        {Produkty.map(function(produkt) {
            return(
                <Produkt
                    nazwa={produkt}
                />
            )
        })}
        </>
    )
}