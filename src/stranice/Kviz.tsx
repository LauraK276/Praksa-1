import { useState } from "react";
import { pitanja } from "../data/pitanja";

function Kviz() {
  const [trenutnoPitanje, setTrenutnoPitanje] = useState(0);
  const [odabraniOdgovor, setOdabraniOdgovor] = useState<string | number | null>(null);
  const [potvrdjeno, setPotvrdjeno] = useState(false);
  const [bodovi, setBodovi] = useState(0);

  const pitanje = pitanja[trenutnoPitanje];

  const provjeriOdgovor = () => {
    setPotvrdjeno(true);

    if (pitanje.tip === "nadopuna" || pitanje.tip === "slika") {
      if (
        typeof odabraniOdgovor === "string" &&
        odabraniOdgovor.toLowerCase().trim() === pitanje.tocanOdgovor.toLowerCase().trim()
      ) {
        setBodovi(bodovi + 1);
      }
    } else if (odabraniOdgovor === pitanje.tocanOdgovor) {
      setBodovi(bodovi + 1);
    }
  };

  const sljedecePitanje = () => {
    if (trenutnoPitanje < pitanja.length - 1) {
      setTrenutnoPitanje(trenutnoPitanje + 1);
      setOdabraniOdgovor(null);
      setPotvrdjeno(false);
    } else {
      localStorage.setItem("rezultatKviz", JSON.stringify(bodovi));
      window.location.href = "/rezultat";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">{pitanje.pitanje}</h1>

        {/* ABCD Odgovori */}
        {pitanje.tip === "abc" && pitanje.odgovori && (
          <div className="grid grid-cols-1 gap-3">
            {pitanje.odgovori.map((odgovor: string, index: number) => (
              <button
                key={index}
                className={`px-6 py-3 border rounded-lg transition font-medium ${
                  potvrdjeno
                    ? index === pitanje.tocanOdgovor
                      ? "bg-green-500 text-white"
                      : index === odabraniOdgovor
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                    : odabraniOdgovor === index
                    ? "bg-blue-400 text-white"
                    : "bg-gray-100 hover:bg-gray-300"
                }`}
                onClick={() => setOdabraniOdgovor(index)}
                disabled={potvrdjeno}
              >
                {odgovor}
              </button>
            ))}
          </div>
        )}

        {/* Pitanja s unosom */}
        {(pitanje.tip === "nadopuna" || pitanje.tip === "slika") && (
          <div className="flex flex-col items-center">
            {pitanje.tip === "slika" && pitanje.slika && (
              <img src={pitanje.slika} alt="Pitanje" className="w-64 h-64 object-cover mt-4 rounded-lg shadow-lg" />
            )}
            <input
              type="text"
              className="border px-4 py-2 rounded-lg mt-4 w-full text-center"
              value={odabraniOdgovor || ""}
              onChange={(e) => setOdabraniOdgovor(e.target.value)}
              disabled={potvrdjeno}
            />
            {!potvrdjeno && odabraniOdgovor === "" && (
              <p className="text-red-500 mt-2">Molimo unesite odgovor!</p>
            )}
          </div>
        )}

        {/* Točno / Netočno */}
        {pitanje.tip === "tocno_netocno" && (
          <div className="flex space-x-4">
            <button
              className={`px-6 py-3 border rounded-lg font-medium ${
                odabraniOdgovor === "točno" ? "bg-blue-400 text-white" : "bg-gray-100 hover:bg-gray-300"
              }`}
              onClick={() => setOdabraniOdgovor("točno")}
              disabled={potvrdjeno}
            >
              Točno
            </button>
            <button
              className={`px-6 py-3 border rounded-lg font-medium ${
                odabraniOdgovor === "netočno" ? "bg-blue-400 text-white" : "bg-gray-100 hover:bg-gray-300"
              }`}
              onClick={() => setOdabraniOdgovor("netočno")}
              disabled={potvrdjeno}
            >
              Netočno
            </button>
          </div>
        )}

        {/* Pitanje s više slika */}
        {pitanje.tip === "slika_vise" && pitanje.slike && (
          <div className="grid grid-cols-2 gap-4">
            {pitanje.slike.map((slika: string, index: number) => (
              <img
                key={index}
                src={slika}
                alt={`Opcija ${index + 1}`}
                className={`cursor-pointer border-4 rounded-lg shadow-lg transition ${
                  odabraniOdgovor === index ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setOdabraniOdgovor(index)}
              />
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          {!potvrdjeno ? (
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              onClick={provjeriOdgovor}
              disabled={odabraniOdgovor === null || odabraniOdgovor === ""}
            >
              Potvrdi odgovor
            </button>
          ) : (
            <button
              className="bg-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition mt-4"
              onClick={sljedecePitanje}
            >
              Sljedeće pitanje
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Kviz;
