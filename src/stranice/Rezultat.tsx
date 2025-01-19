import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Rezultat() {
  const navigate = useNavigate();
  const [bodovi, setBodovi] = useState(0);

  useEffect(() => {
    const spremljeniRezultat = localStorage.getItem("rezultatKviz");
    if (spremljeniRezultat) {
      setBodovi(JSON.parse(spremljeniRezultat));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Tvoj rezultat</h1>
      <p className="text-2xl mb-6">{bodovi} / 10</p>

      {bodovi === 10 ? (
        <p className="text-green-600 font-bold">Odlično! Sve si točno riješio/la! </p>
      ) : bodovi >= 7 ? (
        <p className="text-blue-600 font-bold">Jako dobro! </p>
      ) : bodovi >= 4 ? (
        <p className="text-yellow-600 font-bold">Nije loše, možeš još vježbati! </p>
      ) : (
        <p className="text-red-600 font-bold">Probaj ponovno! </p>
      )}

      <button
        className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        onClick={() => navigate("/")}
      >
        Početna stranica
      </button>
    </div>
  );
}

export default Rezultat;
