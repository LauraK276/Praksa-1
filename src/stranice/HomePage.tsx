import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Dobrodošli u kviz!</h1>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        onClick={() => navigate("/quiz")}
      >
        Započni kviz
      </button>
    </div>
  );
}

export default HomePage;
