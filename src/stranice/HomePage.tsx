import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1A1B41] text-white relative">
      {/* Neonski okvir */}
      <div className="border-[4px] border-[#FF00FF] shadow-[0_0_50px_#FF00FF] rounded-xl w-[50vw] h-[65vh] flex flex-col items-center justify-center relative z-10">
        {/* Neonski naslov */}
        <h1 className="text-6xl font-extrabold mb-12 text-[#00FFFF] animate-pulse drop-shadow-[0_0_20px_#00FFFF]">
          Kviz
        </h1>

        {/* Gumb s neonskim sjajem */}
        <button
          className="bg-[#6A5ACD] text-white px-10 py-5 rounded-lg font-bold text-2xl 
                  hover:bg-[#00FFFF] transition duration-300 hover:text-black
                  shadow-[0_0_30px_#6A5ACD] hover:shadow-[0_0_35px_#00FFFF]"
          onClick={() => navigate("/quiz")}
        >
          Započni Kviz
        </button>
      </div>

      {/* Zatamnjeni rubovi */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
    </div>
  );
}

export default HomePage;
