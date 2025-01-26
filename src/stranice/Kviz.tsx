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

    let noviBodovi = bodovi;
    if (pitanje.tip === "nadopuna" || pitanje.tip === "slika") {
      if (
        typeof odabraniOdgovor === "string" &&
        odabraniOdgovor.toLowerCase().trim() === pitanje.tocanOdgovor.toLowerCase().trim()
      ) {
        noviBodovi++;
      }
    } else if (odabraniOdgovor === pitanje.tocanOdgovor) {
      noviBodovi++;
    }

    setBodovi(noviBodovi);
    localStorage.setItem("rezultatKviz", JSON.stringify(noviBodovi));
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

    

    <div className="flex flex-col items-center justify-center h-screen bg-[#1A1B41] text-white px-6">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg p-6 w-full max-w-2xl rounded-lg border border-white/20">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#00FFFF]">
  {pitanje.pitanje}
</h1>


        {/* ABCD Odgovori */}
        {pitanje.tip === "abc" && pitanje.odgovori && (
          <div className="grid grid-cols-1 gap-3">
            {pitanje.odgovori.map((odgovor: string, index: number) => (
              <button
                key={index}
                className={`px-6 py-3 border rounded-lg transition font-medium text-white border-white/30 ${
                  potvrdjeno
                    ? index === pitanje.tocanOdgovor
                      ? "bg-green-500 shadow-green-500/50"
                      : index === odabraniOdgovor
                      ? "bg-red-500 shadow-red-500/50"
                      : "bg-white/20"
                    : odabraniOdgovor === index
                    ? "bg-[#6A5ACD] shadow-[#6A5ACD]/50"
                    : "bg-white/10 hover:shadow-[#00FFFF]/50"
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
              className="border px-4 py-2 rounded-lg mt-4 w-full text-center bg-white/10 text-white"
              value={odabraniOdgovor || ""}
              onChange={(e) => setOdabraniOdgovor(e.target.value)}
              disabled={potvrdjeno}
            />
          </div>
        )}
        
        {pitanje.tip === "slika_vise" && pitanje.slike && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {pitanje.slike.map((slika: string, index: number) => (
              <img
                key={index}
                src={slika}
                alt={`Opcija ${index + 1}`}
                className={`cursor-pointer border-4 rounded-lg shadow-lg transition ${
                  odabraniOdgovor === index ? "border-[#00FFFF] shadow-[#00FFFF]/50" : "border-gray-300"
                }`}
                onClick={() => setOdabraniOdgovor(index)}
              />
            ))}
         </div>
        )}


        {/* Točno / Netočno */}
        {pitanje.tip === "tocno_netocno" && (
          <div className="flex space-x-4">
            <button
              className={`px-6 py-3 border rounded-lg font-medium text-white border-white/30 ${
                odabraniOdgovor === "točno" ? "bg-blue-400 shadow-[#00FFFF]/50" : "bg-white/10 hover:shadow-[#00FFFF]/50"
              }`}
              onClick={() => setOdabraniOdgovor("točno")}
              disabled={potvrdjeno}
            >
              Točno
            </button>
            <button
              className={`px-6 py-3 border rounded-lg font-medium text-white border-white/30 ${
                odabraniOdgovor === "netočno" ? "bg-blue-400 shadow-[#00FFFF]/50" : "bg-white/10 hover:shadow-[#00FFFF]/50"
              }`}
              onClick={() => setOdabraniOdgovor("netočno")}
              disabled={potvrdjeno}
            >
              Netočno
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          {!potvrdjeno ? (
            <button
              className="bg-[#6A5ACD] text-white px-6 py-3 rounded-lg font-medium hover:shadow-[#00FFFF]/50 transition animate-pulse"
              onClick={provjeriOdgovor}
              disabled={odabraniOdgovor === null || odabraniOdgovor === ""}
            >
              Potvrdi odgovor
            </button>
          ) : (
            <button
              className="bg-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-[#00FFFF]/50 transition mt-4"
              onClick={sljedecePitanje}
            >
              Sljedeće pitanje
            </button>
          )}
        </div>

        {/* Završi kviz link */}
        <p
          className="mt-4 text-sm text-gray-400 cursor-pointer hover:text-[#00FFFF] transition duration-300 text-center"
          onClick={() => {
            localStorage.setItem("rezultatKviz", JSON.stringify(bodovi));
            window.location.href = "/rezultat";
          }}
        >
          Završi kviz
        </p>
      </div>
    </div>
  );
}

export default Kviz;
