"use client";

export default function GetStartedButton() {
  const handleClick = () => {
    document.getElementById("predict-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleClick}
      className="glass mt-6 px-8 py-4 rounded-xl
                 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500
                 text-white font-semibold text-lg
                 shadow-lg hover:scale-105
                 transition-transform duration-300"
    >
      Get Started
    </button>
  );
}
