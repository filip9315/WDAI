import React, { useState } from "react";

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

const Students: Student[] = [
  { imie: "Jan", nazwisko: "Kowalski", rocznik: 2001 },
  { imie: "Anna", nazwisko: "Nowak", rocznik: 2002 },
  { imie: "Piotr", nazwisko: "Zieliński", rocznik: 2000 },
];

function Dodawanie({ onAdd }: { onAdd: (student: Student) => void }) {
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [rocznik, setRocznik] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!imie || !nazwisko || !rocznik || isNaN(Number(rocznik))) {
      alert("Wszystkie pola muszą być poprawnie wypełnione.");
      return;
    }

    const newStudent: Student = {
      imie,
      nazwisko,
      rocznik: Number(rocznik),
    };

    onAdd(newStudent);
    setImie("");
    setNazwisko("");
    setRocznik("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Imię:
          <input
            type="text"
            value={imie}
            onChange={(e) => setImie(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Nazwisko:
          <input
            type="text"
            value={nazwisko}
            onChange={(e) => setNazwisko(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Rocznik:
          <input
            type="text"
            value={rocznik}
            onChange={(e) => setRocznik(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Dodaj</button>
    </form>
  );
}

export default function StudentManager() {
  const [studenci, setStudents] = useState<Student[]>(Students);

  function addStudent(nowy: Student) {
    setStudents((prev) => [...prev, nowy]);
  }

  return (
    <div>
      <h1>Lista Studentów</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {studenci.map((student, index) => (
            <tr key={index}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dodawanie onAdd={addStudent} />
    </div>
  );
}
