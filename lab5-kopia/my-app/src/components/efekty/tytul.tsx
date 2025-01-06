import React, { useState, useEffect } from "react";

function Tytul() {
  const [tytul, setTytul] = useState("Nowy tytuł");

  useEffect(() => {
    document.title = tytul;
  }, [tytul]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTytul(e.target.value);
  }

  return (
    <div>
      <input
        type="text"
        value={tytul}
        onChange={handleInputChange}
        placeholder="Wpisz tytuł strony"
      />
    </div>
  );
}

export default Tytul;
