import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Rezultat() {
  const navigate = useNavigate();
  const [bodovi, setBodovi] = useState<number | null>(null); 

  useEffect(() => {
    const spremljeniRezultat = localStorage.getItem("rezultatKviz");
    if (spremljeniRezultat !== null) {
      setBodovi(JSON.parse(spremljeniRezultat)); // Učitavanje bodova
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1A1B41] text-white">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg p-6 w-full max-w-md text-center rounded-lg border border-white/20">
        <h1 className="text-4xl font-bold text-[#00FFFF] mb-4 animate-pulse">Tvoj rezultat</h1>

        {/* Prikaz bodova samo ako su učitani */}
        {bodovi !== null ? (
          <>
            <p className="text-5xl font-extrabold mt-4 text-[#6A5ACD] drop-shadow-[0_0_10px_#6A5ACD]">
              {bodovi} / 10
            </p>

            {/* Poruke prema rezultatu */}
            <p className="mt-4 text-lg font-medium">
              {bodovi === 10
                ? "Odlično! Sve si točno riješio/la! 🎉"
                : bodovi >= 7
                ? "Jako dobro! 🎯"
                : bodovi >= 4
                ? "Nije loše, možeš još vježbati! 🔥"
                : "Probaj ponovno! ❌"}
            </p>

            {/* Gumbi za ponovno igranje i povratak na početnu */}
            <div className="mt-6 space-x-4">
              <button
                className="bg-[#6A5ACD] px-6 py-3 rounded-lg font-medium text-white hover:bg-[#00FFFF] transition shadow-[0_0_20px_#6A5ACD] hover:shadow-[0_0_25px_#00FFFF]"
                onClick={() => {
                  localStorage.removeItem("rezultatKviz");
                  navigate("/quiz");
                }}
              >
                Pokušaj ponovno
              </button>

              <button
                className="bg-[#00FFFF] px-6 py-3 rounded-lg font-medium text-black hover:bg-[#6A5ACD] transition shadow-[0_0_20px_#00FFFF] hover:shadow-[0_0_25px_#6A5ACD]"
                onClick={() => {
                  localStorage.removeItem("rezultatKviz");
                  navigate("/");
                }}
              >
                Početna stranica
              </button>
            </div>
          </>
        ) : (
          <p className="text-xl mt-4">Učitavanje rezultata...</p>
        )}
      </div>
    </div>
  );
}

export default Rezultat;
