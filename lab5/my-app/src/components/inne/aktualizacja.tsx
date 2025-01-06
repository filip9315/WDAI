import { useState } from "react";

export default function Aktualizacja() {
  const [produkt, setProdukt] = useState({ nazwa: "Pomidor", cena: 50 });

  const zmienCene = () => {
    setProdukt((prev) => ({ ...prev, cena: 100 }));
  };

  return (
    <div>
      <p>
        Aktualnie {produkt.nazwa} kosztuje {produkt.cena}.
      </p>
      <button onClick={zmienCene}>Zmień cenę</button>
    </div>
  );
}
